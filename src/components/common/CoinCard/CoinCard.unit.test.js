import React from "react";
import { render, screen } from "@testing-library/react";
import CoinCard from "./CoinCard";

describe("CoinCard", () => {
  it("should display 'Unknown' if no name prop is provided", () => {
    render(<CoinCard />);
    expect(screen.getByTestId("coin-name")).toHaveTextContent("Unknown");
  });

  it("should display 'N/A' if no symbol prop is provided", () => {
    render(<CoinCard />);
    expect(screen.getByTestId("coin-symbol")).toHaveTextContent("N/A");
  });

  it("should display the name prop if provided", () => {
    const name = "Bitcoin";
    render(<CoinCard name={name} />);
    expect(screen.getByTestId("coin-name")).toHaveTextContent(name);
  });

  it("should display the symbol prop if provided", () => {
    const symbol = "BTC";
    render(<CoinCard symbol={symbol} />);
    expect(screen.getByTestId("coin-symbol")).toHaveTextContent(symbol);
  });

  it("should render the Button component", () => {
    render(<CoinCard />);
    expect(screen.getByTestId("coin-button")).toBeInTheDocument();
  });
});
