import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Política de Privacidad
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium">
              Sistema de Evaluación de CreditScore Pro
            </p>
            <p className="text-xs text-muted-foreground">
              Ingeniería, Gestión y Desarrollo S.A.S. <br />
              Barranquilla, Colombia
            </p>
          </div>
          <section>
            <h2 className="font-semibold text-primary mb-2 text-base">
              Introducción
            </h2>
            <p className="text-sm text-muted-foreground">
              En Ingeniería, Gestión y Desarrollo S.A.S. (en adelante "la Empresa"), entendemos la importancia de la privacidad y la protección de datos personales. Esta Política de Privacidad describe cómo recopilamos, usamos, almacenamos y protegemos la información obtenida a través de nuestro aplicativo de Evaluación de CreditScore Pro, en cumplimiento con la Ley Estatutaria 1581 de 2012, el Decreto Reglamentario 1377 de 2013, y demás normativas vigentes sobre protección de datos personales en Colombia.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-primary mb-2 text-base">
              Marco Legal Aplicable
            </h2>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Ley Estatutaria 1581 de 2012 (Ley de Protección de Datos Personales)</li>
              <li>Decreto Reglamentario 1377 de 2013</li>
              <li>Decreto 1074 de 2015</li>
              <li>Circular Externa 002 de 2015 de la Superintendencia de Industria y Comercio</li>
              <li>Cualquier otra normativa aplicable sobre protección de datos personales en Colombia</li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold text-primary mb-2 text-base">
              Información Recopilada
            </h2>
            <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-1">
              <li>Datos de identificación personal: Nombres, apellidos, número de identificación, fecha de nacimiento, dirección, correo electrónico, número telefónico.</li>
              <li>Información financiera: Historial crediticio, ingresos, obligaciones financieras, patrimonio, comportamiento de pago.</li>
              <li>Datos de transacciones: Registro de consultas realizadas, resultados de evaluaciones crediticias, fechas y horas de acceso.</li>
              <li>Información técnica: Direcciones IP, logs de sistema, metadatos de conexión.</li>
            </ol>
          </section>
          <section>
            <h2 className="font-semibold text-primary mb-2 text-base">
              Finalidad del Tratamiento de Datos
            </h2>
            <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-1">
              <li>Realizar evaluaciones de riesgo crediticio y generar puntuaciones de crédito (credit scores).</li>
              <li>Verificar la identidad de los titulares de los datos.</li>
              <li>Procesar solicitudes de crédito y facilitar decisiones informadas.</li>
              <li>Generar reportes estadísticos y analíticos para nuestros clientes.</li>
              <li>Cumplir con obligaciones legales y regulatorias.</li>
              <li>Mejorar y optimizar el funcionamiento de nuestros servicios.</li>
              <li>Prevenir fraudes y actividades ilegales.</li>
            </ol>
          </section>
          <section>
            <h2 className="font-semibold text-primary mb-2 text-base">
              Principios para el Tratamiento de Datos Personales
            </h2>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Principio de legalidad: El tratamiento de datos se realizará conforme a las disposiciones legales aplicables.</li>
              <li>Principio de finalidad: El tratamiento obedece a finalidades legítimas informadas al titular.</li>
              <li>Principio de libertad: El tratamiento solo se ejercerá con el consentimiento previo del titular.</li>
              <li>Principio de veracidad: La información sujeta a tratamiento debe ser veraz, completa y actualizada.</li>
              <li>Principio de transparencia: Garantizamos el derecho del titular a obtener información sobre sus datos.</li>
              <li>Principio de acceso y circulación restringida: Los datos personales no estarán disponibles en medios públicos.</li>
              <li>Principio de seguridad: Implementamos medidas técnicas para garantizar la seguridad de los datos.</li>
              <li>Principio de confidencialidad: Todas las personas involucradas en el tratamiento de datos están obligadas a garantizar la reserva de la información.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold text-primary mb-2 text-base">
              Derechos de los Titulares de Datos
            </h2>
            <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-1">
              <li>Conocer, actualizar y rectificar sus datos personales.</li>
              <li>Solicitar prueba de la autorización otorgada para el tratamiento de sus datos.</li>
              <li>Ser informado sobre el uso que se ha dado a sus datos personales.</li>
              <li>Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la normativa.</li>
              <li>Revocar la autorización y/o solicitar la supresión de datos cuando no se respeten los principios, derechos y garantías constitucionales y legales.</li>
              <li>Acceder gratuitamente a sus datos personales que hayan sido objeto de tratamiento.</li>
            </ol>
          </section>
          <section>
            <h2 className="font-semibold text-primary mb-2 text-base">
              Seguridad de la Información
            </h2>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Protocolos de encriptación SSL/TLS para la transmisión de datos.</li>
              <li>Autenticación multifactor para el acceso a los sistemas.</li>
              <li>Firewalls y sistemas de detección de intrusiones.</li>
              <li>Controles de acceso basados en roles y privilegios.</li>
              <li>Monitoreo continuo de actividades sospechosas.</li>
              <li>Respaldos periódicos de la información.</li>
              <li>Actualizaciones regulares de seguridad.</li>
              <li>Capacitación del personal en prácticas de seguridad de la información.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold text-primary mb-2 text-base">
              Confidencialidad
            </h2>
            <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-1">
              <li>No divulgar información confidencial a terceros no autorizados.</li>
              <li>Mantener acuerdos de confidencialidad con todo el personal que tenga acceso a los datos.</li>
              <li>Implementar controles para prevenir la fuga de información.</li>
              <li>Limitar el acceso a la información solo al personal estrictamente necesario.</li>
            </ol>
          </section>
          <section>
            <h2 className="font-semibold text-primary mb-2 text-base">
              Transferencia y Transmisión de Datos
            </h2>
            <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-1">
              <li>Cuando exista autorización expresa del titular.</li>
              <li>Por requerimiento de una entidad pública o administrativa en ejercicio de sus funciones legales.</li>
              <li>Por orden judicial.</li>
              <li>Para la ejecución de un contrato entre el titular y la Empresa o sus clientes autorizados.</li>
            </ol>
            <p className="text-sm text-muted-foreground mt-2">
              En todos los casos, la Empresa garantizará que los receptores de los datos cumplan con estándares adecuados de protección de datos personales.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-primary mb-2 text-base">
              Tiempo de Conservación de los Datos
            </h2>
            <p className="text-sm text-muted-foreground">
              Los datos personales serán conservados durante el tiempo necesario para cumplir con las finalidades descritas en esta política, y de acuerdo con las obligaciones legales y contractuales aplicables. Una vez cumplida la finalidad del tratamiento, procederemos a la supresión de los datos personales, a menos que exista una obligación legal o contractual que requiera su conservación.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-primary mb-2 text-base">
              Procedimiento para Ejercer Derechos
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
              Dirección física: Cra. 54 #64-97 Edif. Centro Boulevar, oficina 102
            </li>
            <li>
              Teléfono:{" "}
              <a
                href="https://wa.me/573157880734"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-primary hover:text-primary/80"
              >
                (+57) 315  788 0734 (WhatsApp)
              </a>
            </li>
          </ul>
            <p className="text-sm text-muted-foreground mt-2">
              Las solicitudes deberán contener como mínimo:
            </p>
            <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-1">
              <li>Identificación completa del titular.</li>
              <li>Descripción de los hechos que dan lugar a la solicitud.</li>
              <li>Dirección de notificación.</li>
              <li>Documentos y anexos que se quieran hacer valer.</li>
            </ol>
            <p className="text-sm text-muted-foreground mt-2">
              La Empresa responderá la solicitud en un plazo máximo de quince (15) días hábiles contados a partir de la fecha de recibo.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-primary mb-2 text-base">
              Modificaciones a la Política de Privacidad
            </h2>
            <p className="text-sm text-muted-foreground">
              La Empresa se reserva el derecho de modificar esta Política de Privacidad en cualquier momento. Cualquier cambio será informado a través de nuestra página web o por correo electrónico a nuestros clientes, con al menos diez (10) días de anticipación a su implementación.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-primary mb-2 text-base">
              Autoridad de Protección de Datos
            </h2>
            <p className="text-sm text-muted-foreground">
              La autoridad nacional de protección de datos en Colombia es la Superintendencia de Industria y Comercio. Para más información sobre la protección de datos personales en Colombia, puede visitar:{" "}
            <a
              href="https://www.sic.gov.co"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-primary hover:text-primary/80"
            >
              www.sic.gov.co
            </a>
              .
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-primary mb-2 text-base">
              Aceptación de la Política
            </h2>
            <p className="text-sm text-muted-foreground">
              El uso de nuestra aplicación implica la aceptación de esta Política de Privacidad. Si no está de acuerdo con los términos aquí establecidos, deberá abstenerse de utilizar nuestros servicios.
            </p>
          </section>
          <div className="border-t pt-4">
            <div className="text-xs text-muted-foreground text-center mb-4">
              Última actualización: Mayo 2025 <br />
              © 2025 Ingeniería, Gestión y Desarrollo S.A.S. Todos los derechos reservados. Barranquilla, Colombia.
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

export default Privacy;