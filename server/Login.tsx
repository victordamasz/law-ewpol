import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";

export function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <FileText className="h-8 w-8 text-primary" />
            <span className="ml-2 text-2xl font-bold">LawyerDesk</span>
          </div>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Insira seu email para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@exemplo.com"
                required
                data-testid="input-email"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                  onClick={(e) => e.preventDefault()}
                >
                  Esqueceu sua senha?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                data-testid="input-password"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              data-testid="button-login"
              onClick={() => console.log("Login button clicked")}
            >
              Login
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => console.log("Login with Google clicked")}
            >
              Login com Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

