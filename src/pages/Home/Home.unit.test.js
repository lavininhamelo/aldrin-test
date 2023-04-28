import { screen } from "@testing-library/react";
import Home from "./Home";
import { getBoards } from "../../api";
import { customRender } from "../../setupTests";

const mockCoinData = [
  {
    id: "1",
    name: "Bitcoin",
    symbol: "BTC",
  },
  {
    id: "2",
    name: "Ethereum",
    symbol: "ETH",
  },
];

jest.mock("../../api", () => ({
  getBoards: jest.fn(()=>Promise.resolve(mockCoinData)),
}));

describe("Home", () => {
  beforeEach(() => {
    getBoards.mockReset();
  });


  test("should show no coins found message", async () => {
    getBoards.mockResolvedValue([]);

    customRender(<Home />, null, {
      mockGetBoards: getBoards,
    })

    expect(getBoards).toHaveBeenCalledTimes(1);

    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();

    const noCoinsFound = await screen.findByText("No coins found");
    expect(noCoinsFound).toBeInTheDocument();
  });

  test("should customRender coin list", async () => {
    getBoards.mockResolvedValue(mockCoinData);

    customRender(<Home />, null, {
      mockGetBoards: getBoards,
    })

    expect(getBoards).toHaveBeenCalledTimes(1);

    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();

    await screen.findByTestId("coin-list");

    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("BTC")).toBeInTheDocument();
    expect(screen.getByText("Ethereum")).toBeInTheDocument();
    expect(screen.getByText("ETH")).toBeInTheDocument();
  });

 

  test("should filter coins by search term", async () => {
    getBoards.mockResolvedValue(mockCoinData);

    customRender(<Home />, null, {
      mockGetBoards: getBoards,
    })

    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();

    await screen.findByTestId("coin-list");
    const searchInput = screen.getByRole("textbox");
    const searchTerm = "bit";
    const filteredCoins = mockCoinData.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    searchInput.value = searchTerm;
    screen.getByDisplayValue(searchTerm);

    const coinList = screen.getByTestId("coin-list");
    expect(coinList).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();

    filteredCoins.forEach((coin) => {
      expect(screen.getByText(coin.name)).toBeInTheDocument();
      expect(screen.getByText(coin.symbol)).toBeInTheDocument();
    });
  });
});

