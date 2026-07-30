export type UserRole = "admin" | "visitor";

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  authProvider?: "local" | "google";
  isEmailVerified?: boolean;
  avatar?: { url: string };
  isOnline?: boolean;
  lastSeen?: string;
}
