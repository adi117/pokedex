export interface AuthContextType {
  user: string | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
}