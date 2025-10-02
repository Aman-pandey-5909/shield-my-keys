import { PasswordStrengthChecker } from "@/components/PasswordStrengthChecker";
import { PasswordManager } from "@/components/PasswordManager";
import { Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                SecurePass
              </h1>
              <p className="text-sm text-muted-foreground">
                Your password security toolkit
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Description */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">
              Check, Save & Secure Your Passwords
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Test password strength and store your credentials locally. All
              data stays on your device for maximum privacy.
            </p>
          </div>

          {/* Password Strength Checker */}
          <PasswordStrengthChecker />

          {/* Password Manager */}
          <PasswordManager />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>
            All passwords are stored locally in your browser. No data is sent to
            any server.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
