import { createContext, useContext, useEffect, useState } from "react";

export const CoinContext = createContext();

export const CoinProvider = ({ children, getBoards, getCoinInfo }) => {
  //Coins List
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //Search
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredCoins = coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 12;
  const indexOfLastCoin = currentPage * coinsPerPage;
  const currentCoins = filteredCoins.slice(0, indexOfLastCoin);

  const loadMore = () => setCurrentPage(currentPage + 1);

  const getCoins = async () => {
    try {
      setIsLoading(true);
      if (coins.length === 0) {
        const result = await getBoards();
        setCoins(result);
      }
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCoins();
  }, []);

  //Single Coin
  const [coin, setCoin] = useState({});
  const getCoinById = async (id) => {
    try {
      setIsLoading(true);

      if (!coin.hasOwnProperty(id)) {
        const result = await getCoinInfo(id);
        setCoin((prevState) => ({
          ...prevState,
          [id]: result,
        }));
        return result;
      }

      setIsLoading(false);
      return coin[id];
    } catch (error) {
      setError(error);
      setIsLoading(false);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue = {
    coins,
    coin,
    isLoading,
    error,
    getCoinById,
    filteredCoins,
    getCoins,
    searchTerm,
    setSearchTerm,
    handleSearchTermChange,
    coinsPerPage,
    currentCoins,
    loadMore,
  };

  return <CoinContext.Provider value={contextValue}>{children}</CoinContext.Provider>;
};

export const useCoinContext = () => useContext(CoinContext);
