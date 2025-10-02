import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Shield } from "lucide-react";
import {
  calculatePasswordStrength,
  getStrengthColor,
  getStrengthText,
} from "@/utils/passwordStrength";

export function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const strength = calculatePasswordStrength(password);

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-secondary/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Password Strength Checker</h2>
          <p className="text-sm text-muted-foreground">
            Test your password security
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password-check">Enter Password</Label>
          <div className="relative">
            <Input
              id="password-check"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type your password here..."
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {password && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Strength:</span>
              <span
                className={`text-sm font-bold ${
                  strength.level === "weak"
                    ? "text-destructive"
                    : strength.level === "medium"
                    ? "text-warning"
                    : strength.level === "strong"
                    ? "text-success"
                    : "text-accent"
                }`}
              >
                {getStrengthText(strength.level)}
              </span>
            </div>

            <div className="flex gap-1 h-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all ${
                    i <= (strength.level === "weak" ? 1 : strength.level === "medium" ? 2 : strength.level === "strong" ? 3 : 4)
                      ? getStrengthColor(strength.level)
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>

            {strength.feedback.length > 0 && (
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs font-medium mb-2">Suggestions:</p>
                <ul className="space-y-1">
                  {strength.feedback.map((tip, index) => (
                    <li key={index} className="text-xs text-muted-foreground">
                      • {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
