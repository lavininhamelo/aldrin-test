import { Link } from "react-router-dom";
import { Loading, SearchInput, CoinCard } from "../../components/common";
import "./Home.css";
import { useCoinContext } from "../../contexts/CoinsContext";

const Home = () => {
  const {
    filteredCoins,
    isLoading,
    searchTerm,
    handleSearchTermChange,
    currentPage,
    loadMore,
    coinsPerPage,
    currentCoins,
  } = useCoinContext();

  return (
    <>
      <section className="container">
        <h1 className="container__title">Coins</h1>

        <SearchInput searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange}></SearchInput>

        {isLoading ? (
          <Loading />
        ) : filteredCoins.length ? (
          <main className="container__coins" data-testid="coin-list">
            {currentCoins.map((coin) => (
              <Link to={`/coin/${coin.id}`} key={coin.id}>
                <CoinCard name={coin.name} symbol={coin.symbol} />
              </Link>
            ))}

            <div className="container__arrows">
              <button onClick={loadMore} disabled={currentPage === Math.ceil(filteredCoins.length / coinsPerPage)}>
                Load More
              </button>
            </div>
          </main>
        ) : (
          <p>No coins found</p>
        )}
      </section>
    </>
  );
};

export default Home;
