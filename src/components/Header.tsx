
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getLastUpdatedTime } from "@/services/cryptoApi";
import { RefreshCw } from "lucide-react";
import { format } from "date-fns";

export function Header() {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    // Initial update
    updateTimestamp();
    
    // Set up interval to check for updates every 10 seconds
    const intervalId = setInterval(updateTimestamp, 10000);
    
    return () => clearInterval(intervalId);
  }, []);

  const updateTimestamp = () => {
    const timestamp = getLastUpdatedTime();
    setLastUpdated(new Date(timestamp));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-crypto-quai to-crypto-qi flex items-center justify-center">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <span className="font-bold text-xl">QUAI/QI</span>
        </div>
        <div className="flex items-center space-x-4">
          {lastUpdated && (
            <div className=" md:flex items-center text-xs text-muted-foreground">
              <RefreshCw className="h-3 w-3 mr-1" />
              <span>Data Updated: {format(lastUpdated, "HH:mm:ss")}</span>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
