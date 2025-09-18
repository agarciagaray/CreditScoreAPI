import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowRight, CreditCard, Shield, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-10">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="max-w-4xl w-full space-y-8">
        {/* Encabezado */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-bold mb-2">
              Plataforma Interna de Evaluación Crediticia
            </CardTitle>
            <CardDescription className="text-lg">
              Herramienta para asesores y personal autorizado de la empresa.
              Evalúa el score crediticio de clientes, analiza riesgos y gestiona
              solicitudes de crédito de manera ágil y segura.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Secciones principales */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Consulta y análisis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Ingresa los datos del cliente y obtén su score crediticio,
                factores de riesgo y recomendaciones automáticas.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Decisión informada</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                El sistema clasifica la solicitud: Aprobada, Aprobada con ajuste,
                En observación o Rechazada, según el perfil y alertas detectadas.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Gestión y seguimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Registra evaluaciones, consulta historial y realiza seguimiento a
                clientes en observación o con condiciones especiales.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Acciones principales */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="w-full md:w-auto"
                onClick={() => navigate("/scoring")}
              >
                Ingresar a Evaluación de Score
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <a
                href="https://contabilidad.igdsas.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full md:w-auto"
                >
                  Solicitar Crédito
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Información adicional */}
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-sm text-muted-foreground">
              Solo personal autorizado puede acceder a esta plataforma. Para
              soporte, contacta a{" "}
              <a
                href="mailto:soporte@igdsas.com.co"
                className="underline hover:text-primary"
              >
                soporte@igdsas.com.co
              </a>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
