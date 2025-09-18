import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto mb-4 p-3 bg-destructive/10 rounded-full w-fit">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-4xl font-bold mb-2">404</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xl text-muted-foreground">
            ¡Oops! Página no encontrada
          </p>
          <p className="text-sm text-muted-foreground">
            La página que buscas no existe o ha sido movida.
          </p>
          <Button onClick={() => navigate("/")} className="w-full">
            Volver al inicio
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
