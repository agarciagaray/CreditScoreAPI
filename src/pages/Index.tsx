import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Check,
  CreditCard,
  FileText,
  Home,
  Info,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SCORE_MIN = 150;
const SCORE_MAX = 950;

const Index = () => {
  const [formData, setFormData] = useState({
    documentType: "CC",
    documentNumber: "",
    fullName: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    monthlyIncome: "",
    monthlyExpenses: "",
    occupation: "",
    yearsEmployed: "",
    education: "bachiller",
    maritalStatus: "soltero",
    dependents: "0",
    housingType: "renta",
    creditScore: "",
    overdueDebts: "0",
    activeObligations: "0",
    totalDebt: "",
    loanAmount: "",
    loanTerm: "12",
    interestRate: "1.53",
    purpose: "personal",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const calculateMonthlyPayment = (amount, term, interestRate) => {
    amount = Number(amount);
    term = Number(term);
    interestRate = Number(interestRate) / 100;

    if (!amount || !term || interestRate === undefined) return 0;
    if (interestRate === 0) return amount / term;
    const x = Math.pow(1 + interestRate, term);
    return (amount * interestRate * x) / (x - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payment = calculateMonthlyPayment(
        formData.loanAmount,
        formData.loanTerm,
        formData.interestRate
      );
      setMonthlyPayment(payment);

      await new Promise((resolve) => setTimeout(resolve, 1500));
      const score = calculateCreditScore(formData, payment);
      const adjustments = calculateAdjustments(formData, payment);

      const income = Number(formData.monthlyIncome);
      const expenses = Number(formData.monthlyExpenses);
      const paymentCapacity = income - expenses;

      // Nueva lógica de decisión
      let decision = "APROBADO";
      if (score < SCORE_MIN && paymentCapacity < payment) {
        decision = "RECHAZADO";
      } else if (score < SCORE_MIN || paymentCapacity < payment) {
        decision = "APROBADO_CON_AJUSTE";
      } else if (score > 700) {
        decision = "APROBADO";
      } else if (score > 500 && adjustments.canApproveWithAdjustments) {
        decision = "APROBADO_CON_AJUSTE";
      } else {
        decision = "RECHAZADO";
      }

      const evaluation = {
        decision,
        score: score,
        percentile: Math.round((score / SCORE_MAX) * 100),
        factors: getDecisionFactors(score, formData, payment),
        maxAmount: score > 500 ? Math.round(adjustments.recommendedAmount) : 0,
        recommendedTerm: adjustments.recommendedTerm,
        monthlyPayment: Math.round(payment),
        adjustedMonthlyPayment: adjustments.adjustedMonthlyPayment
          ? Math.round(adjustments.adjustedMonthlyPayment)
          : 0,
        evaluationId: `EVAL-${Date.now()}`,
        timestamp: new Date().toISOString(),
        modelVersion: "1.1.0",
      };

      // Preparar los datos del cliente
      const clientData = {
        documentType: formData.documentType,
        documentNumber: formData.documentNumber,
        fullName: formData.fullName,
        birthDate: formData.birthDate,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        monthlyIncome: Number(formData.monthlyIncome),
        monthlyExpenses: Number(formData.monthlyExpenses),
        occupation: formData.occupation,
        yearsEmployed: formData.yearsEmployed,
        education: formData.education,
        maritalStatus: formData.maritalStatus,
        dependents: formData.dependents,
        housingType: formData.housingType,
        creditScore: formData.creditScore,
        overdueDebts: formData.overdueDebts,
        activeObligations: formData.activeObligations,
        totalDebt: formData.totalDebt,
        loanAmount: Number(formData.loanAmount),
        loanTerm: Number(formData.loanTerm),
        interestRate: Number(formData.interestRate),
        purpose: formData.purpose,
      };

      // Guardar la evaluación y el cliente en el backend
      try {
        const response = await fetch("http://localhost:3001/api/evaluaciones", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientData,
            evaluationData: evaluation,
          }),
        });

        if (!response.ok) {
          throw new Error("Error al guardar la evaluación");
        }
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "❌ Error",
          description: "No se pudo guardar la evaluación en el sistema",
          variant: "destructive",
        });
      }

      setResult(evaluation);
      let toastTitle = "";
      let toastVariant: "default" | "destructive" | undefined = "default";

      if (evaluation.decision === "APROBADO") {
        toastTitle = "✅ Solicitud aprobada";
        toastVariant = "default";
      } else if (evaluation.decision === "APROBADO_CON_AJUSTE") {
        toastTitle = "⚠️ Aprobada con ajuste";
        toastVariant = "default";
      } else {
        toastTitle = "❌ Solicitud rechazada";
        toastVariant = "destructive";
      }

      toast({
        title: toastTitle,
        description: `Score crediticio: ${score}`,
        variant: toastVariant,
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateAdjustments = (data, payment) => {
    const income = Number(data.monthlyIncome);
    const expenses = Number(data.monthlyExpenses);
    const paymentCapacity = income - expenses;
    const maxRecommendedPayment = paymentCapacity * 0.3;
    const needsAdjustment = payment > maxRecommendedPayment;
    const loanAmount = Number(data.loanAmount);
    const term = Number(data.loanTerm);
    const interestRate = Number(data.interestRate) / 100 / 12;

    let recommendedAmount = loanAmount;
    let recommendedTerm = term;
    let adjustedMonthlyPayment = null;
    let canApproveWithAdjustments = false;

    if (needsAdjustment) {
      const maxTerm = 60;
      if (term < maxTerm) {
        let adjustedTerm = term;
        while (adjustedTerm < maxTerm) {
          adjustedTerm += 12;
          const newPayment = calculateMonthlyPayment(
            loanAmount,
            adjustedTerm,
            data.interestRate
          );
          if (newPayment <= maxRecommendedPayment) {
            recommendedTerm = adjustedTerm;
            adjustedMonthlyPayment = newPayment;
            canApproveWithAdjustments = true;
            break;
          }
        }
      }
      if (!canApproveWithAdjustments) {
        if (interestRate > 0) {
          const x = Math.pow(1 + interestRate, recommendedTerm);
          recommendedAmount =
            (maxRecommendedPayment * (x - 1)) / (interestRate * x);
        } else {
          recommendedAmount = maxRecommendedPayment * recommendedTerm;
        }
        adjustedMonthlyPayment = calculateMonthlyPayment(
          recommendedAmount,
          recommendedTerm,
          data.interestRate
        );
        canApproveWithAdjustments = recommendedAmount >= loanAmount * 0.7;
      }
    } else {
      canApproveWithAdjustments = true;
    }

    return {
      needsAdjustment,
      recommendedAmount,
      recommendedTerm,
      adjustedMonthlyPayment,
      canApproveWithAdjustments,
    };
  };

  // Ajusta los límites de score aquí
  const calculateCreditScore = (data, payment) => {
    if (
      data.creditScore &&
      Number(data.creditScore) >= SCORE_MIN &&
      Number(data.creditScore) <= SCORE_MAX
    ) {
      return Number(data.creditScore);
    }

    let score = 650;
    const income = Number(data.monthlyIncome);
    if (income > 4000000) score += 50;
    else if (income > 2500000) score += 35;
    else if (income > 1500000) score += 20;

    const expenses = Number(data.monthlyExpenses);
    const paymentCapacity = income - expenses;
    const paymentCapacityRatio = paymentCapacity / income;

    if (paymentCapacityRatio > 0.6) score += 45;
    else if (paymentCapacityRatio > 0.4) score += 30;
    else if (paymentCapacityRatio > 0.2) score += 15;
    else score -= 30;

    if (payment > paymentCapacity) score -= 90;
    else if (payment > paymentCapacity * 0.5) score -= 45;
    else if (payment > paymentCapacity * 0.3) score -= 15;
    else score += 45;

    const yearsEmployed = Number(data.yearsEmployed);
    if (yearsEmployed > 5) score += 30;
    else if (yearsEmployed > 2) score += 20;
    else if (yearsEmployed > 1) score += 10;

    switch (data.education) {
      case "posgrado":
        score += 15;
        break;
      case "profesional":
        score += 12;
        break;
      case "tecnico":
        score += 8;
        break;
      case "bachiller":
        score += 3;
        break;
    }

    switch (data.housingType) {
      case "propia":
        score += 15;
        break;
      case "familiar":
        score += 8;
        break;
      case "renta":
        score += 3;
        break;
    }

    const overdueDebtsCount = Number(data.overdueDebts);
    if (overdueDebtsCount >= 3) score -= 90;
    else if (overdueDebtsCount === 2) score -= 60;
    else if (overdueDebtsCount === 1) score -= 30;
    else score += 15;

    const totalDebt = Number(data.totalDebt);
    const debtToIncomeRatio = totalDebt / (income * 12);

    if (debtToIncomeRatio > 0.8) score -= 40;
    else if (debtToIncomeRatio > 0.5) score -= 20;
    else if (debtToIncomeRatio < 0.3) score += 20;

    const loanAmount = Number(data.loanAmount);
    const loanToIncome = loanAmount / (income * 12);

    if (loanToIncome < 0.2) score += 45;
    else if (loanToIncome < 0.5) score += 30;
    else if (loanToIncome < 0.8) score += 15;
    else score -= 30;

    // Limita el score al rango correcto
    return Math.min(SCORE_MAX, Math.max(SCORE_MIN, Math.round(score)));
  };

  const getDecisionFactors = (score, data, payment) => {
    const factors = [];
    const income = Number(data.monthlyIncome);
    const expenses = Number(data.monthlyExpenses);
    const paymentCapacity = income - expenses;

    if (income < 1500000) {
      factors.push("Ingresos mensuales por debajo del rango recomendado");
    }

    if (expenses && paymentCapacity / income < 0.3) {
      factors.push(
        "Capacidad de pago limitada debido a gastos mensuales elevados"
      );
    }

    if (payment > paymentCapacity) {
      factors.push("Cuota mensual excede la capacidad de pago total");
    } else if (payment > paymentCapacity * 0.5) {
      factors.push(
        "Cuota mensual representa más del 50% de su capacidad de pago"
      );
    } else if (payment > paymentCapacity * 0.3) {
      factors.push(
        "Cuota mensual representa más del 30% de su capacidad de pago"
      );
    }

    const yearsEmployed = Number(data.yearsEmployed);
    if (yearsEmployed < 1) {
      factors.push("Estabilidad laboral insuficiente");
    }

    switch (data.education) {
      case "posgrado":
        factors.push("Nivel de educación superior");
        break;
      case "profesional":
        factors.push("Nivel de educación superior");
        break;
      case "tecnico":
        factors.push("Nivel de educación superior");
        break;
      case "bachiller":
        factors.push("Nivel de educación básico");
        break;
    }

    switch (data.housingType) {
      case "propia":
        factors.push("Propiedad propia");
        break;
      case "familiar":
        factors.push("Propiedad familiar");
        break;
      case "renta":
        factors.push("Arrendamiento");
        break;
    }

    const overdueDebtsCount = Number(data.overdueDebts);
    if (overdueDebtsCount >= 3) factors.push("Tiene 3 o más deudas en mora");
    else if (overdueDebtsCount === 2) factors.push("Tiene 2 deudas en mora");
    else if (overdueDebtsCount === 1) factors.push("Tiene 1 deuda en mora");

    const totalDebt = Number(data.totalDebt);
    const debtToIncomeRatio = totalDebt / (income * 12);

    if (debtToIncomeRatio > 0.8) factors.push("Nivel de endeudamiento alto");
    else if (debtToIncomeRatio > 0.5)
      factors.push("Nivel de endeudamiento moderado");
    else if (debtToIncomeRatio < 0.3)
      factors.push("Nivel de endeudamiento bajo");

    const loanAmount = Number(data.loanAmount);
    const loanToIncome = loanAmount / (income * 12);

    if (loanToIncome < 0.2) factors.push("Monto solicitado muy bajo");
    else if (loanToIncome < 0.5) factors.push("Monto solicitado bajo");
    else if (loanToIncome < 0.8) factors.push("Monto solicitado moderado");
    else factors.push("Monto solicitado alto");

    if (factors.length === 0 && score > 700) {
      factors.push("Perfil crediticio sólido con buena capacidad de pago");
    } else if (factors.length === 0 && score > 500) {
      factors.push(
        "Perfil crediticio aceptable con capacidad de pago moderada"
      );
    }

    return factors;
  };

  // Rango de riesgo visual y colores
  const getScoreRiskLevel = (score) => {
    if (score >= 851)
      return { label: "Riesgo muy bajo", color: "from-green-400 to-green-600" };
    if (score >= 701)
      return { label: "Riesgo bajo", color: "from-lime-400 to-lime-600" };
    if (score >= 501)
      return { label: "Riesgo medio", color: "from-amber-400 to-amber-600" };
    if (score >= 301)
      return { label: "Riesgo alto", color: "from-orange-400 to-orange-600" };
    return { label: "Riesgo muy alto", color: "from-red-400 to-red-600" };
  };

  // Exportar PDF con nombre personalizado
  const exportPDF = async () => {
    const input = document.getElementById("resultado-evaluacion");
    if (!input) return;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Nombre personalizado: NombreApellido-CC12345678.pdf
    const nombre = formData.fullName.replace(/\s+/g, "_");
    const cedula = formData.documentNumber;
    pdf.save(`${nombre}-CC${cedula}.pdf`);
  };

  const getDecisionStyles = (decision) => {
    switch (decision) {
      case "APROBADO":
        return {
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-800",
          icon: <Check className="h-6 w-6 text-green-600" />,
          title: "Solicitud Aprobada",
          description: "¡Felicitaciones! Su crédito ha sido aprobado.",
        };
      case "APROBADO_CON_AJUSTE":
        return {
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          textColor: "text-amber-800",
          icon: <Info className="h-6 w-6 text-amber-600" />,
          title: "Solicitud Aprobada con Ajustes",
          description:
            "Su crédito ha sido aprobado con modificaciones en el monto o plazo.",
        };
      case "RECHAZADO":
        return {
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          textColor: "text-red-800",
          icon: <X className="h-6 w-6 text-red-600" />,
          title: "Solicitud Rechazada",
          description:
            "Lo sentimos, su solicitud de crédito no ha sido aprobada.",
        };
      default:
        return {
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          textColor: "text-gray-800",
          icon: null,
          title: "",
          description: "",
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-50 py-10 px-2 sm:px-6 lg:px-8 transition-all duration-500">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-900 mb-2 tracking-tight drop-shadow-sm">
          <span className="inline-flex items-center gap-2">
            <Check className="h-8 w-8 text-indigo-500" />
            CreditScore Pro
          </span>
        </h1>
        <p className="text-center text-gray-600 mb-10 text-lg">
          Evalúe la elegibilidad crediticia en segundos
        </p>

        <Card className="mb-10 shadow-xl border-0 bg-white/80 backdrop-blur-md rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-t-2xl">
            <CardTitle className="text-indigo-800 flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-400" />
              Formulario de Solicitud
            </CardTitle>
            <CardDescription className="text-indigo-600">
              Ingresa los datos personales y crediticios para evaluar la
              solicitud
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* --- DATOS PERSONALES --- */}
                <div className="col-span-2">
                  <h2 className="text-lg font-semibold text-indigo-700 mb-4 border-b border-indigo-200 pb-2 flex items-center gap-2">
                    <User className="h-5 w-5 text-indigo-400" />
                    Datos Personales
                  </h2>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="documentType">Tipo de Documento</Label>
                  <Select
                    name="documentType"
                    value={formData.documentType}
                    onValueChange={(value) =>
                      handleSelectChange("documentType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione tipo de documento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
                      <SelectItem value="CE">Cédula de Extranjería</SelectItem>
                      <SelectItem value="PS">Pasaporte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="documentNumber">Número de Documento</Label>
                  <Input
                    name="documentNumber"
                    value={formData.documentNumber}
                    onChange={handleChange}
                    placeholder="Ej. 1020304050"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nombre Completo</Label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Ej. Juan Carlos Rodríguez"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                  <Input
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="usuario@ejemplo.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Teléfono</Label>
                  <Input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Ej. 3101234567"
                    required
                  />
                </div>
                {/* --- INFORMACIÓN FINANCIERA --- */}
                <div className="col-span-2">
                  <h2 className="text-lg font-semibold text-indigo-700 mb-4 mt-4 border-b border-indigo-200 pb-2 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-indigo-400" />
                    Información Financiera
                  </h2>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">
                    Ingresos Mensuales (COP)
                  </Label>
                  <Input
                    name="monthlyIncome"
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    placeholder="Ej. 2500000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyExpenses">
                    Gastos Mensuales (COP)
                  </Label>
                  <Input
                    name="monthlyExpenses"
                    type="number"
                    value={formData.monthlyExpenses}
                    onChange={handleChange}
                    placeholder="Ej. 1500000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Ocupación</Label>
                  <Input
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="Ej. Ingeniero, Comerciante, etc."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearsEmployed">Años en empleo actual</Label>
                  <Input
                    name="yearsEmployed"
                    type="number"
                    value={formData.yearsEmployed}
                    onChange={handleChange}
                    placeholder="Ej. 3"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education">Nivel Educativo</Label>
                  <Select
                    name="education"
                    value={formData.education}
                    onValueChange={(value) =>
                      handleSelectChange("education", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione nivel educativo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primaria">Primaria</SelectItem>
                      <SelectItem value="bachiller">Bachiller</SelectItem>
                      <SelectItem value="tecnico">Técnico/Tecnólogo</SelectItem>
                      <SelectItem value="profesional">Profesional</SelectItem>
                      <SelectItem value="posgrado">Postgrado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">Estado Civil</Label>
                  <Select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onValueChange={(value) =>
                      handleSelectChange("maritalStatus", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione estado civil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="soltero">Soltero(a)</SelectItem>
                      <SelectItem value="casado">Casado(a)</SelectItem>
                      <SelectItem value="unionLibre">Unión Libre</SelectItem>
                      <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                      <SelectItem value="viudo">Viudo(a)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dependents">Personas a Cargo</Label>
                  <Select
                    name="dependents"
                    value={formData.dependents}
                    onValueChange={(value) =>
                      handleSelectChange("dependents", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione número" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4+">4 o más</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="housingType">Tipo de Vivienda</Label>
                  <Select
                    name="housingType"
                    value={formData.housingType}
                    onValueChange={(value) =>
                      handleSelectChange("housingType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="propia">Propia</SelectItem>
                      <SelectItem value="renta">Arrendada</SelectItem>
                      <SelectItem value="familiar">Familiar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* --- HISTORIAL CREDITICIO --- */}
                <div className="col-span-2">
                  <h2 className="text-lg font-semibold text-indigo-700 mb-4 mt-4 border-b border-indigo-200 pb-2 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-indigo-400" />
                    Historial Crediticio
                  </h2>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="creditScore">Puntaje Crediticio</Label>
                  <Input
                    name="creditScore"
                    type="number"
                    value={formData.creditScore}
                    onChange={handleChange}
                    placeholder="Ej. 750 (150-950)"
                    min={SCORE_MIN}
                    max={SCORE_MAX}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="overdueDebts">Deudas en Mora</Label>
                  <Select
                    name="overdueDebts"
                    value={formData.overdueDebts}
                    onValueChange={(value) =>
                      handleSelectChange("overdueDebts", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione número" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4+">4 o más</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activeObligations">
                    Obligaciones Activas
                  </Label>
                  <Select
                    name="activeObligations"
                    value={formData.activeObligations}
                    onValueChange={(value) =>
                      handleSelectChange("activeObligations", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione número" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5+">5 o más</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalDebt">
                    Valor Total Deudas Actuales (COP)
                  </Label>
                  <Input
                    name="totalDebt"
                    type="number"
                    value={formData.totalDebt}
                    onChange={handleChange}
                    placeholder="Ej. 15000000"
                  />
                </div>
                {/* --- CRÉDITO SOLICITADO --- */}
                <div className="col-span-2">
                  <h2 className="text-lg font-semibold text-indigo-700 mb-4 mt-4 border-b border-indigo-200 pb-2 flex items-center gap-2">
                    <Home className="h-5 w-5 text-indigo-400" />
                    Crédito Solicitado
                  </h2>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Monto Solicitado (COP)</Label>
                  <Input
                    name="loanAmount"
                    type="number"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    placeholder="Ej. 10000000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loanTerm">Plazo (meses)</Label>
                  <Select
                    name="loanTerm"
                    value={formData.loanTerm}
                    onValueChange={(value) =>
                      handleSelectChange("loanTerm", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione plazo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 meses</SelectItem>
                      <SelectItem value="24">24 meses</SelectItem>
                      <SelectItem value="36">36 meses</SelectItem>
                      <SelectItem value="48">48 meses</SelectItem>
                      <SelectItem value="60">60 meses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interestRate">
                    Tasa de Interés Mensual (TNM %)
                  </Label>
                  <Input
                    name="interestRate"
                    type="number"
                    value={formData.interestRate}
                    onChange={handleChange}
                    placeholder="Ej. 1.53"
                    required
                    min="0"
                    max="10"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purpose">Destino del Crédito</Label>
                  <Select
                    name="purpose"
                    value={formData.purpose}
                    onValueChange={(value) =>
                      handleSelectChange("purpose", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione destino" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Libre inversión</SelectItem>
                      <SelectItem value="vehiculo">Vehículo</SelectItem>
                      <SelectItem value="vivienda">Vivienda</SelectItem>
                      <SelectItem value="educacion">Educación</SelectItem>
                      <SelectItem value="salud">Salud</SelectItem>
                      <SelectItem value="negocio">Negocio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-8">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-opacity-20 border-t-white rounded-full"></div>
                      Procesando...
                    </div>
                  ) : (
                    "Evaluar Solicitud"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {result && (
          <Card
            className="shadow-2xl border-0 rounded-2xl bg-white/90 backdrop-blur-md transition-all duration-300 animate-fade-in mt-8"
            id="resultado-evaluacion"
          >
            <CardHeader
              className={`${
                getDecisionStyles(result.decision).bgColor
              } border-b-2 ${
                getDecisionStyles(result.decision).borderColor
              } rounded-t-2xl`}
            >
              <div className="flex items-center space-x-3">
                {getDecisionStyles(result.decision).icon}
                <div>
                  <CardTitle
                    className={getDecisionStyles(result.decision).textColor}
                  >
                    {getDecisionStyles(result.decision).title}
                  </CardTitle>
                  <CardDescription
                    className={getDecisionStyles(result.decision).textColor}
                  >
                    {getDecisionStyles(result.decision).description}
                  </CardDescription>
                  {/* Línea solo visible al imprimir */}
                  <div className="print:block hidden text-xs mt-1 text-gray-700">
                    Cliente: {formData.fullName} - CC: {formData.documentNumber}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 p-4 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-700">
                      Puntaje crediticio
                    </h3>
                    <div className="flex items-end">
                      <p className="text-3xl font-bold text-indigo-700">
                        {result.score}
                      </p>
                      <p className="text-gray-500 ml-1 mb-1">/ {SCORE_MAX}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {getScoreRiskLevel(result.score).label}
                    </span>
                  </div>
                  <div className="mt-2 sm:mt-0 w-full sm:w-1/3">
                    <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
                      <div
                        className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${
                          getScoreRiskLevel(result.score).color
                        }`}
                        style={{ width: `${result.percentile}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-right text-gray-500 mt-1">
                      Percentil {result.percentile}%
                    </p>
                  </div>
                </div>
                <Alert
                  variant={
                    result.decision === "APROBADO"
                      ? "default"
                      : result.decision === "APROBADO_CON_AJUSTE"
                      ? "default"
                      : "destructive"
                  }
                >
                  <h3 className="font-medium">Factores determinantes</h3>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    {result.factors.map((factor, index) => (
                      <li
                        key={index}
                        className="text-sm"
                      >
                        {factor}
                      </li>
                    ))}
                  </ul>
                </Alert>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border rounded-lg p-4">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-1">
                      Cuota mensual calculada
                    </h3>
                    <p className="text-2xl font-semibold text-indigo-700">
                      ${result.monthlyPayment.toLocaleString("es-CO")}{" "}
                      <span className="text-sm text-gray-500">COP</span>
                    </p>
                  </div>
                  {Number(formData.monthlyIncome) &&
                    Number(formData.monthlyExpenses) && (
                      <div>
                        <h3 className="font-medium text-gray-700 mb-1">
                          Capacidad de pago mensual
                        </h3>
                        <p className="text-2xl font-semibold text-indigo-700">
                          $
                          {(
                            Number(formData.monthlyIncome) -
                            Number(formData.monthlyExpenses)
                          ).toLocaleString("es-CO")}{" "}
                          <span className="text-sm text-gray-500">COP</span>
                        </p>
                      </div>
                    )}
                </div>
                {result.decision !== "RECHAZADO" && (
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-lg ${
                      result.decision === "APROBADO_CON_AJUSTE"
                        ? "bg-amber-50 border border-amber-200"
                        : "bg-green-50 border border-green-200"
                    }`}
                  >
                    <div>
                      <h3 className="font-medium text-gray-700">
                        Monto máximo recomendado
                      </h3>
                      <p className="text-2xl font-semibold text-indigo-700">
                        ${result.maxAmount.toLocaleString("es-CO")}{" "}
                        <span className="text-sm text-gray-500">COP</span>
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700">
                        Plazo recomendado
                      </h3>
                      <p className="text-2xl font-semibold text-indigo-700">
                        {result.recommendedTerm}{" "}
                        <span className="text-sm text-gray-500">meses</span>
                      </p>
                    </div>
                    {result.decision === "APROBADO_CON_AJUSTE" &&
                      result.adjustedMonthlyPayment > 0 && (
                        <div className="col-span-2">
                          <h3 className="font-medium text-amber-800 mb-1">
                            Recomendación de ajuste
                          </h3>
                          <p className="text-sm text-amber-700">
                            Con los ajustes recomendados, su cuota mensual sería
                            de:{" "}
                            <strong>
                              $
                              {result.adjustedMonthlyPayment.toLocaleString(
                                "es-CO"
                              )}{" "}
                              COP
                            </strong>
                          </p>
                        </div>
                      )}
                  </div>
                )}
                <div className="pt-4 border-t border-gray-200 text-xs text-gray-500 space-y-1">
                  <p>ID de Evaluación: {result.evaluationId}</p>
                  <p>
                    Fecha: {new Date(result.timestamp).toLocaleString("es-CO")}
                  </p>
                  <p>Versión del modelo: {result.modelVersion}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setResult(null)}
              >
                Nueva evaluación
              </Button>
              <Button
                className="w-full"
                onClick={exportPDF}
              >
                Exportar a PDF
              </Button>
              <Button
                className="w-full"
                onClick={() => window.print()}
              >
                Imprimir
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
      {/* Footer fijo en una sola línea, contenido a la izquierda y enlaces a la derecha */}
      <footer className="fixed bottom-0 left-0 w-full bg-white/90 border-t border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between text-xs text-gray-500">
          <div>
            © 2024 CreditScore Pro &nbsp;•&nbsp; Desarrollado por{" "}
            <a
              href="https://www.igdsas.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-indigo-700"
            >
              Ingeniería, Gestión y Desarrollo S. A. S.
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/privacy" className="underline hover:text-indigo-700">
              Política de Privacidad
            </Link>
            <span>|</span>
            <Link
              to="/terms"
              className="underline hover:text-indigo-700"
            >
              Términos de Uso
            </Link>
            <span>|</span>
            <a
              href="#"
              className="underline hover:text-indigo-700"
            >
              Contacto
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
