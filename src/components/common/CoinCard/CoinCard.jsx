import React, { useMemo } from "react";
import "./CoinCard.css";
import { Button } from "../../ui";

function CoinCard({ name = "Unknown", className = "", symbol = "", ...rest }) {
  
  const coinName = useMemo(() => {
    return name.length > 20 ? name.slice(0, 20) + "..." : name || "Unknown";
  }, [name]);

  const coinSymbol = useMemo(() => {
    return symbol.length > 20 ? symbol.slice(0, 20) + "..." : symbol || "N/A";
  }, [symbol]);

  return (
    <section className={"coin " + className} {...rest}>
      <span className="coin__symbol" data-testid="coin-symbol">{coinSymbol || "N/A"}</span>
      <h2 className="coin__name" data-testid="coin-name">{coinName}</h2>
      <Button name="View" style={{ height: "2rem" }} data-testid="coin-button" />
    </section>
  );
}

export default CoinCard;
