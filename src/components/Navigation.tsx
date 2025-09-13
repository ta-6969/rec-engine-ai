import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, User, Home, BarChart3, Shield } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'user';
}

interface NavigationProps {
  user?: User | null;
  onLogin?: () => void;
  onLogout?: () => void;
  onAdminAccess?: () => void;
}

export const Navigation = ({ user, onLogin, onLogout, onAdminAccess }: NavigationProps) => {
  return (
    <nav className="govt-header sticky top-0 z-50 w-full border-b border-border/40">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <div className="mr-6 flex items-center space-x-2">
            <Building2 className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block text-primary-foreground">
              PM Internship Recommendation Engine
            </span>
          </div>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden text-primary-foreground"
            >
              <Building2 className="h-6 w-6" />
              <span className="ml-2 font-bold">PM Portal</span>
            </Button>
          </div>
          
          <nav className="flex items-center space-x-2">
            {user ? (
              <>
                <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <User className="h-4 w-4 mr-2" />
                  {user.name}
                </Button>
                {user.role === 'admin' && (
                  <Button 
                    onClick={onAdminAccess} 
                    variant="ghost" 
                    className="text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                )}
                <Button onClick={onLogout} variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={onLogin} className="govt-accent hover:bg-accent/90">
                Access Portal
              </Button>
            )}
          </nav>
        </div>
      </div>
    </nav>
  );
};