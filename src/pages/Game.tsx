import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Wallet, Trophy, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Game = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(30);
  const [betAmount, setBetAmount] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [balance] = useState(1000); // Mock balance
  const [roundNumber] = useState(1234);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handlePlaceBet = () => {
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    if (!betAmount || parseFloat(betAmount) <= 0) {
      toast.error("Please enter a valid bet amount");
      return;
    }
    if (parseFloat(betAmount) > balance) {
      toast.error("Insufficient balance");
      return;
    }
    
    toast.success(`Bet of ₹${betAmount} placed on ${selectedColor}!`);
    setBetAmount("");
    setSelectedColor(null);
  };

  const colorButtons = [
    { name: "Red", gradient: "bg-gradient-red", shadow: "shadow-glow-red", color: "game-red" },
    { name: "Green", gradient: "bg-gradient-green", shadow: "shadow-glow-green", color: "game-green" },
    { name: "Blue", gradient: "bg-gradient-blue", shadow: "shadow-glow-blue", color: "game-blue" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            ColorWin
          </h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => navigate("/wallet")}
            >
              <Wallet className="h-4 w-4" />
              ₹{balance.toFixed(2)}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
            >
              <div className="h-8 w-8 rounded-full bg-gradient-primary" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Timer Card */}
        <Card className="p-6 mb-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary opacity-10" />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Round #{roundNumber}</span>
            </div>
            <div className="text-6xl font-bold mb-2">{timeLeft}s</div>
            <div className="text-sm text-muted-foreground">Time Left to Place Bet</div>
            <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-primary transition-all duration-1000"
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Color Selection */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Select Your Color</h2>
          <div className="grid grid-cols-1 gap-4">
            {colorButtons.map((btn) => (
              <button
                key={btn.name}
                onClick={() => handleColorSelect(btn.name)}
                className={`p-6 rounded-xl ${btn.gradient} ${
                  selectedColor === btn.name ? btn.shadow : ""
                } transition-all duration-300 transform hover:scale-105 border-2 ${
                  selectedColor === btn.name ? "border-white" : "border-transparent"
                }`}
              >
                <span className="text-2xl font-bold text-white drop-shadow-lg">
                  {btn.name}
                </span>
              </button>
            ))}
          </div>
        </Card>

        {/* Bet Amount */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Enter Bet Amount</h2>
          <div className="space-y-4">
            <Input
              type="number"
              placeholder="Enter amount (₹10 minimum)"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="text-lg"
              min="10"
            />
            <div className="flex gap-2 flex-wrap">
              {[10, 50, 100, 500, 1000].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => setBetAmount(amount.toString())}
                >
                  ₹{amount}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Place Bet Button */}
        <Button
          className="w-full py-6 text-lg font-bold bg-gradient-primary hover:opacity-90 shadow-glow-primary"
          onClick={handlePlaceBet}
          disabled={timeLeft < 3}
        >
          Place Bet
        </Button>

        {/* Recent Results */}
        <Card className="p-6 mt-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Recent Results</h2>
          </div>
          <div className="space-y-2">
            {[
              { round: 1233, color: "Green", pool: "₹2,456" },
              { round: 1232, color: "Blue", pool: "₹3,123" },
              { round: 1231, color: "Red", pool: "₹1,890" },
            ].map((result) => (
              <div
                key={result.round}
                className="flex items-center justify-between p-3 bg-secondary rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full ${
                      result.color === "Red"
                        ? "bg-gradient-red"
                        : result.color === "Green"
                        ? "bg-gradient-green"
                        : "bg-gradient-blue"
                    }`}
                  />
                  <div>
                    <div className="font-medium">Round #{result.round}</div>
                    <div className="text-sm text-muted-foreground">
                      Winner: {result.color}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{result.pool}</div>
              </div>
            ))}
          </div>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="container mx-auto px-4 py-3 flex justify-around">
          <Button
            variant="ghost"
            className="flex-col h-auto py-2"
            onClick={() => navigate("/")}
          >
            <Trophy className="h-5 w-5 mb-1" />
            <span className="text-xs">Game</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-col h-auto py-2"
            onClick={() => navigate("/wallet")}
          >
            <Wallet className="h-5 w-5 mb-1" />
            <span className="text-xs">Wallet</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-col h-auto py-2"
            onClick={() => navigate("/profile")}
          >
            <div className="h-5 w-5 rounded-full bg-gradient-primary mb-1" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Game;
