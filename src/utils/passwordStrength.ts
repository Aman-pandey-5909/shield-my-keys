export type StrengthLevel = "weak" | "medium" | "strong" | "very-strong";

export interface PasswordStrength {
  score: number;
  level: StrengthLevel;
  feedback: string[];
}

export function calculatePasswordStrength(password: string): PasswordStrength {
  let score = 0;
  const feedback: string[] = [];

  if (!password) {
    return {
      score: 0,
      level: "weak",
      feedback: ["Password is required"],
    };
  }

  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  
  if (password.length < 8) {
    feedback.push("Use at least 8 characters");
  }

  // Complexity checks
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  if (!/[a-z]/.test(password)) feedback.push("Add lowercase letters");
  if (!/[A-Z]/.test(password)) feedback.push("Add uppercase letters");
  if (!/[0-9]/.test(password)) feedback.push("Add numbers");
  if (!/[^a-zA-Z0-9]/.test(password)) feedback.push("Add special characters");

  // Pattern checks
  if (/(.)\1{2,}/.test(password)) {
    score -= 1;
    feedback.push("Avoid repeated characters");
  }

  if (/^[0-9]+$/.test(password) || /^[a-zA-Z]+$/.test(password)) {
    score -= 1;
  }

  // Determine level
  let level: StrengthLevel;
  if (score >= 7) {
    level = "very-strong";
  } else if (score >= 5) {
    level = "strong";
  } else if (score >= 3) {
    level = "medium";
  } else {
    level = "weak";
  }

  return { score: Math.max(0, score), level, feedback };
}

export function getStrengthColor(level: StrengthLevel): string {
  switch (level) {
    case "weak":
      return "bg-destructive";
    case "medium":
      return "bg-warning";
    case "strong":
      return "bg-success";
    case "very-strong":
      return "bg-accent";
  }
}

export function getStrengthText(level: StrengthLevel): string {
  switch (level) {
    case "weak":
      return "Weak";
    case "medium":
      return "Medium";
    case "strong":
      return "Strong";
    case "very-strong":
      return "Very Strong";
  }
}
