import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import App from "../src/App";
import { CoinProvider } from "./contexts/CoinsContext";

afterEach(cleanup);

describe("App", () => {
  test("should render a home page", async () => {
    render(<App />, {
      wrapper: CoinProvider,
    })
    expect(await screen.findByText("Coins")).toBeTruthy();
    expect(await screen.findByTestId("search-input")).toBeTruthy();
  });
});
