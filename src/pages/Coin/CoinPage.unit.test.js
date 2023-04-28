import { render, screen } from "@testing-library/react";
import CoinPage from "./CoinPage";
import { getCoinInfo, getBoards } from "../../api";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CoinProvider } from "../../contexts/CoinsContext";


jest.mock("../../api", () => ({
  getCoinInfo: jest.fn(),
}));

const mockCoinData = {
  name: "Bitcoin",
  symbol: "BTC",
  image: { small: "https://example.com/btc.png" },
  contract_address: "0x1234567890",
  categories: ["Cryptocurrency"],
};

const renderWithRouter = (id, mock) =>
  render(
    <MemoryRouter initialEntries={["/coin/" + id]}>
      <CoinProvider getBoards={getBoards} getCoinInfo={mock}>
        <Routes>
          <Route path="/coin/:id" element={<CoinPage />} />
        </Routes>
      </CoinProvider>
    </MemoryRouter>
  );

describe("CoinPage", () => {
  beforeEach(() => {
    getCoinInfo.mockReset();
  });

  test("should render coin info", async () => {
    getCoinInfo.mockResolvedValue(mockCoinData);

    const { container } = renderWithRouter("btc", getCoinInfo);

    expect(getCoinInfo).toHaveBeenCalledTimes(1);
    expect(getCoinInfo).toHaveBeenCalledWith("btc");

    await screen.findByText("Bitcoin");
    expect(container).toHaveTextContent("BTC");
    expect(container).toHaveTextContent("0x1234567890");
    expect(container).toHaveTextContent("Cryptocurrency");
  });

  test("should show error message", async () => {
    getCoinInfo.mockRejectedValue(new Error("/Coin not found/"));

    const { container } = renderWithRouter("unknown", getCoinInfo);

    expect(getCoinInfo).toHaveBeenCalledTimes(1);
    expect(getCoinInfo).toHaveBeenCalledWith("unknown");

    const notFound = await screen.findByText("Coin not found!");
    expect(notFound).toBeInTheDocument();
    expect(container).not.toHaveTextContent("Bitcoin");
  });

});
