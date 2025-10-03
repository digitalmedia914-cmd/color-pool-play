import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, User, Mail, Phone, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    // Add logout logic here
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Profile</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Profile Header */}
        <Card className="p-6 mb-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary opacity-10" />
          <div className="relative z-10">
            <div className="w-24 h-24 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
              <User className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-1">Guest User</h2>
            <p className="text-muted-foreground">ID: #USER12345</p>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">24</div>
            <div className="text-sm text-muted-foreground">Total Bets</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-game-green">12</div>
            <div className="text-sm text-muted-foreground">Wins</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-game-red">12</div>
            <div className="text-sm text-muted-foreground">Losses</div>
          </Card>
        </div>

        {/* Account Info */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Account Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div className="font-medium">user@example.com</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Phone</div>
                <div className="font-medium">+91 98765 43210</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={() => toast.info("Settings coming soon!")}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Button>
          <Button
            variant="destructive"
            className="w-full justify-start gap-3"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>

        {/* Info Section */}
        <Card className="p-6 mt-6 bg-muted">
          <h3 className="font-semibold mb-2">How ColorWin Works</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Each round lasts 30 seconds</li>
            <li>• The color with the LEAST total bets wins</li>
            <li>• Winners get 2x their bet minus 5% platform fee</li>
            <li>• Minimum bet: ₹10</li>
            <li>• Results are transparent and fair</li>
          </ul>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
