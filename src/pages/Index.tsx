import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-50 flex flex-col items-center justify-center px-2 py-10">
      <div className="max-w-4xl w-full bg-white/90 rounded-2xl shadow-2xl p-8 backdrop-blur-md animate-fade-in">
        {/* Encabezado */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-2">
            Plataforma Interna de Evaluación Crediticia
          </h1>
          <p className="text-lg text-gray-700">
            Herramienta para asesores y personal autorizado de la empresa.
            Evalúa el score crediticio de clientes, analiza riesgos y gestiona
            solicitudes de crédito de manera ágil y segura.
          </p>
        </header>

        {/* Secciones principales */}
        <section className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-indigo-50 rounded-xl p-6 flex flex-col items-center shadow">
            <div className="text-indigo-600 mb-2 text-3xl font-bold">1</div>
            <h2 className="font-semibold text-indigo-800 mb-1 text-center">
              Consulta y análisis
            </h2>
            <p className="text-sm text-gray-600 text-center">
              Ingresa los datos del cliente y obtén su score crediticio,
              factores de riesgo y recomendaciones automáticas.
            </p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-6 flex flex-col items-center shadow">
            <div className="text-indigo-600 mb-2 text-3xl font-bold">2</div>
            <h2 className="font-semibold text-indigo-800 mb-1 text-center">
              Decisión informada
            </h2>
            <p className="text-sm text-gray-600 text-center">
              El sistema clasifica la solicitud: Aprobada, Aprobada con ajuste,
              En observación o Rechazada, según el perfil y alertas detectadas.
            </p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-6 flex flex-col items-center shadow">
            <div className="text-indigo-600 mb-2 text-3xl font-bold">3</div>
            <h2 className="font-semibold text-indigo-800 mb-1 text-center">
              Gestión y seguimiento
            </h2>
            <p className="text-sm text-gray-600 text-center">
              Registra evaluaciones, consulta historial y realiza seguimiento a
              clientes en observación o con condiciones especiales.
            </p>
          </div>
        </section>

        {/* Acciones principales */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
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

        {/* Información adicional */}
        <section className="text-center text-xs text-gray-500">
          <p>
            Solo personal autorizado puede acceder a esta plataforma. Para
            soporte, contacta a{" "}
            <a
              href="mailto:soporte@igdsas.com.co"
              className="underline hover:text-indigo-700"
            >
              soporte@igdsas.com.co
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default Index;
