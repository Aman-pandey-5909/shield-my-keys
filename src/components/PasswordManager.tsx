import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import {
  calculatePasswordStrength,
  getStrengthText,
  type StrengthLevel,
} from "@/utils/passwordStrength";
import { useToast } from "@/hooks/use-toast";

interface SavedPassword {
  id: string;
  website: string;
  username: string;
  password: string;
  strength: StrengthLevel;
  createdAt: string;
}

export function PasswordManager() {
  const [passwords, setPasswords] = useState<SavedPassword[]>([]);
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(
    new Set()
  );
  const { toast } = useToast();

  // Load passwords from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("savedPasswords");
    if (stored) {
      setPasswords(JSON.parse(stored));
    }
  }, []);

  // Save passwords to localStorage
  const saveToLocalStorage = (newPasswords: SavedPassword[]) => {
    localStorage.setItem("savedPasswords", JSON.stringify(newPasswords));
    setPasswords(newPasswords);
  };

  const addPassword = () => {
    if (!website || !username || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const strength = calculatePasswordStrength(password);
    const newPassword: SavedPassword = {
      id: Date.now().toString(),
      website,
      username,
      password,
      strength: strength.level,
      createdAt: new Date().toISOString(),
    };

    const newPasswords = [newPassword, ...passwords];
    saveToLocalStorage(newPasswords);

    toast({
      title: "Password saved",
      description: `Password for ${website} has been saved`,
    });

    // Reset form
    setWebsite("");
    setUsername("");
    setPassword("");
  };

  const deletePassword = (id: string) => {
    const newPasswords = passwords.filter((p) => p.id !== id);
    saveToLocalStorage(newPasswords);
    toast({
      title: "Password deleted",
      description: "Password has been removed",
    });
  };

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getStrengthBadgeColor = (level: StrengthLevel) => {
    switch (level) {
      case "weak":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "strong":
        return "bg-success/10 text-success border-success/20";
      case "very-strong":
        return "bg-accent/10 text-accent border-accent/20";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-accent/10 rounded-lg">
          <Lock className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Password Manager</h2>
          <p className="text-sm text-muted-foreground">
            Save and manage your passwords locally
          </p>
        </div>
      </div>

      {/* Add Password Form */}
      <div className="space-y-4 mb-8 p-4 bg-muted/30 rounded-lg">
        <h3 className="font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Password
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="website">Website/Service</Label>
            <Input
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="e.g., Gmail"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username/Email</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="user@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Password</Label>
            <Input
              id="new-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
        </div>
        <Button onClick={addPassword} className="w-full md:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Save Password
        </Button>
      </div>

      {/* Passwords List */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">
          Saved Passwords ({passwords.length})
        </h3>

        {passwords.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Lock className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No passwords saved yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {passwords.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Website</p>
                    <p className="font-medium">{item.website}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Username</p>
                    <p className="font-medium">{item.username}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Password</p>
                    <div className="flex items-center gap-2">
                      <p className="font-mono">
                        {visiblePasswords.has(item.id)
                          ? item.password
                          : "••••••••"}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => togglePasswordVisibility(item.id)}
                      >
                        {visiblePasswords.has(item.id) ? (
                          <EyeOff className="h-3 w-3" />
                        ) : (
                          <Eye className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Strength</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStrengthBadgeColor(
                        item.strength
                      )}`}
                    >
                      {getStrengthText(item.strength)}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deletePassword(item.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
