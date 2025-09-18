import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <FileText className="h-7 w-7 text-primary" />
            Términos de Uso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium">
              Sistema de Evaluación de CreditScore Pro
            </p>
            <p className="text-sm">
              Bienvenido a la plataforma CreditScore Pro
            </p>
            <p className="text-xs text-muted-foreground">
              Desarrollado por Ingeniería, Gestión y Desarrollo S.A.S. <br />
              Barranquilla, Colombia
            </p>
          </div>
          <section>
            <h2 className="font-semibold text-primary mb-2 text-base">
              Descripción del Servicio
            </h2>
            <p className="text-sm text-muted-foreground">
              Nuestra API REST proporciona un sistema avanzado de evaluación
              crediticia que permite a las empresas financieras determinar de
              manera rápida y precisa la solvencia de sus clientes potenciales.
              Utilizando algoritmos de última generación y análisis de datos
              complejos, nuestro sistema genera puntuaciones de crédito confiables
              que facilitan la toma de decisiones en procesos de aprobación de
              préstamos.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-primary mb-2 text-base">
              Características Principales
            </h2>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>
                Evaluación crediticia en tiempo real: Obtenga resultados
                inmediatos sobre la capacidad crediticia de sus clientes.
              </li>
              <li>
                Análisis multifactorial: Incorporamos diversas variables para una
                evaluación integral del riesgo.
              </li>
              <li>
                Informes detallados: Acceda a reportes completos con indicadores
                clave para cada evaluación.
              </li>
              <li>
                Interfaz RESTful segura: Comunicación encriptada y autenticación
                robusta para proteger la información sensible.
              </li>
              <li>
                Alta disponibilidad: Servicio operativo 24/7 con mínimo tiempo de
                inactividad.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold text-primary mb-2 text-base">
              Términos de Uso
            </h2>
            <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-1">
              <li>
                <strong>Licencia de Uso:</strong> El cliente adquiere únicamente
                el derecho de uso del sistema en la modalidad de servicio, no se
                transfiere la propiedad del software ni sus componentes.
              </li>
              <li>
                <strong>Restricciones:</strong> Queda estrictamente prohibido:
                <ul className="list-disc pl-5 mt-1">
                  <li>
                    Modificar, adaptar, traducir o crear trabajos derivados del
                    sistema.
                  </li>
                  <li>
                    Realizar ingeniería inversa, descompilar o desensamblar el
                    código.
                  </li>
                  <li>
                    Sublicenciar, alquilar, prestar o transferir los derechos de
                    uso a terceros.
                  </li>
                  <li>
                    Utilizar el sistema para fines distintos a los establecidos en
                    el contrato.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Modificaciones:</strong> Cualquier modificación,
                actualización o personalización del sistema solo puede ser
                realizada por Ingeniería, Gestión y Desarrollo S.A.S.
              </li>
              <li>
                <strong>Confidencialidad:</strong> El cliente se compromete a
                mantener la confidencialidad de las credenciales de acceso y la
                información procesada a través del sistema.
              </li>
              <li>
                <strong>Propiedad Intelectual:</strong> Todos los derechos de
                propiedad intelectual relacionados con el sistema, incluidos
                derechos de autor, patentes, marcas comerciales y secretos
                comerciales, son propiedad exclusiva de Ingeniería, Gestión y
                Desarrollo S.A.S.
              </li>
            </ol>
          </section>
          <section>
            <h2 className="font-semibold text-primary mb-2 text-base">
              Soporte Técnico
            </h2>
            <ul className="text-sm text-muted-foreground space-y-1 pl-5">
              <li>
                Correo electrónico:{" "}
                <a
                  href="mailto:soporte@igdsas.com.co"
                  className="underline text-primary hover:text-primary/80"
                >
                  soporte@igdsas.com.co
                </a>
              </li>
              <li>
                Teléfono:{" "}
                <a
                  href="https://wa.me/573157880734"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary hover:text-primary/80"
                >
                  (+57) 315 788 0734 (WhatsApp)
                </a>
              </li>
              <li>
                Horario de atención: Lunes a Viernes, 8:00 AM - 6:00 PM (hora
                colombiana)
              </li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold text-primary mb-2 text-base">
              Documentación Técnica
            </h2>
            <p className="text-sm text-muted-foreground">
              Los clientes con acceso autorizado pueden consultar la documentación
              detallada de nuestra API, incluyendo endpoints disponibles,
              parámetros requeridos, formatos de respuesta y ejemplos de
              implementación en la sección de desarrolladores.
            </p>
          </section>
          <div className="border-t pt-4">
            <div className="text-xs text-muted-foreground text-center mb-4">
              © 2025 Ingeniería, Gestión y Desarrollo S.A.S. Todos los derechos
              reservados. Barranquilla, Colombia.
            </div>
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => navigate("/scoring")}
              >
                Volver al inicio
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Terms;
