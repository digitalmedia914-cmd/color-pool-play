import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Minus, Copy, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Wallet = () => {
  const navigate = useNavigate();
  const [balance] = useState(1000);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [utrNumber, setUtrNumber] = useState("");

  const handleDeposit = () => {
    if (!depositAmount || parseFloat(depositAmount) < 10) {
      toast.error("Minimum deposit is ₹10");
      return;
    }
    toast.success("Deposit request submitted! Admin will verify your payment.");
    setDepositAmount("");
    setUtrNumber("");
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (parseFloat(withdrawAmount) > balance) {
      toast.error("Insufficient balance");
      return;
    }
    toast.success("Withdrawal request submitted! Processing may take 24-48 hours.");
    setWithdrawAmount("");
  };

  const copyUPI = () => {
    navigator.clipboard.writeText("colorwin@upi");
    toast.success("UPI ID copied to clipboard!");
  };

  const transactions = [
    { id: 1, type: "win", amount: 500, date: "2024-01-15", round: 1233 },
    { id: 2, type: "bet", amount: -100, date: "2024-01-15", round: 1233 },
    { id: 3, type: "deposit", amount: 1000, date: "2024-01-14", status: "completed" },
    { id: 4, type: "withdraw", amount: -200, date: "2024-01-13", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Wallet</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Balance Card */}
        <Card className="p-6 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary opacity-10" />
          <div className="relative z-10">
            <div className="text-sm text-muted-foreground mb-2">Total Balance</div>
            <div className="text-4xl font-bold mb-4">₹{balance.toFixed(2)}</div>
            <div className="flex gap-3">
              <Button className="flex-1 bg-gradient-green hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                Add Funds
              </Button>
              <Button variant="outline" className="flex-1">
                <Minus className="h-4 w-4 mr-2" />
                Withdraw
              </Button>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="deposit" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Deposit Tab */}
          <TabsContent value="deposit" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Add Funds</h3>
              
              {/* UPI Details */}
              <div className="bg-secondary p-4 rounded-lg mb-4">
                <div className="text-sm text-muted-foreground mb-2">Pay to UPI ID:</div>
                <div className="flex items-center justify-between">
                  <code className="text-lg font-mono">colorwin@upi</code>
                  <Button variant="ghost" size="sm" onClick={copyUPI}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="bg-secondary p-8 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-48 h-48 bg-card rounded-lg mb-2 flex items-center justify-center">
                    <span className="text-muted-foreground">QR Code</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Scan to pay</p>
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Amount (Min: ₹10)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    min="10"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    UTR Number
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter UTR number from payment"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full bg-gradient-primary hover:opacity-90"
                  onClick={handleDeposit}
                >
                  Submit Deposit Request
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Withdraw Tab */}
          <TabsContent value="withdraw" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Withdraw Funds</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Available Balance: ₹{balance.toFixed(2)}
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter withdrawal amount"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    • Minimum withdrawal: ₹100
                    <br />
                    • Processing time: 24-48 hours
                    <br />
                    • Funds will be transferred to your registered bank account
                  </p>
                </div>
                <Button
                  className="w-full bg-gradient-primary hover:opacity-90"
                  onClick={handleWithdraw}
                >
                  Request Withdrawal
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.amount > 0 ? "bg-gradient-green" : "bg-gradient-red"
                        }`}
                      >
                        {tx.amount > 0 ? (
                          <TrendingUp className="h-5 w-5 text-white" />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium capitalize">{tx.type}</div>
                        <div className="text-sm text-muted-foreground">
                          {tx.date}
                          {tx.round && ` • Round #${tx.round}`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-bold ${
                          tx.amount > 0 ? "text-game-green" : "text-game-red"
                        }`}
                      >
                        {tx.amount > 0 ? "+" : ""}₹{Math.abs(tx.amount)}
                      </div>
                      {tx.status && (
                        <div className="text-xs text-muted-foreground capitalize">
                          {tx.status}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Wallet;
