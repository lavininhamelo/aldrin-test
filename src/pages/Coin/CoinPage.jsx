import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loading } from "../../components/common";
import "./CoinPage.css";
import { useCoinContext } from "../../contexts/CoinsContext";

const CoinPage = () => {
  const { id } = useParams();
  const [ coinData, setCoinData] = useState(null);
  const { getCoinById, error, isLoading } = useCoinContext();

  useEffect(() => {
    const fetchCoinData = async () => {
      const data = await getCoinById(id);
      if (data) {
        setCoinData(data);
      }
    };

    if(id) {
      fetchCoinData();
    }

    return () => {}; // cleanup function
  }, []);

  return (
    <section className="coin-page">
      <div className="back">
        <Link to="/">⬅ Go Back</Link>
      </div>

      {error && (
        <h1>Coin not found!</h1>
      )}

      {isLoading && (
        <Loading />
      )}

      {coinData && (
        <section className="coin-container">
          <h1>{coinData.name}</h1>
          <span>{coinData.symbol}</span>
          <img src={coinData.image.small} alt={`${coinData.name}`} />
          <p>{coinData.contract_address}</p>
          <div className="coin-container__categories">
            {coinData.categories.map((category, index) => (
              <div key={index} className="coin-container__category">
                {category}
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default CoinPage;
