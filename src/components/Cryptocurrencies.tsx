import { useState, useEffect } from 'react';
import { Row, Col, Card, Input } from 'antd';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

interface CryptocurrenciesProps {
  simplified: boolean;
}

interface Currency {
  id: number;
  uuid: string;
  rank: number;
  name: string;
  iconUrl: string;
  price: number;
  marketCap: number;
  change: number;
}


export default function Cryptocurrencies({ simplified }: CryptocurrenciesProps) {
  const count = simplified ? 10 : 100;
  
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

    const filteredData = cryptosList?.data?.coins?.filter((coin: Currency) => coin.name.toLowerCase().includes((searchTerm.toLowerCase())));

    setCryptos(filteredData)
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader/>;

  return (
    <>
      {!simplified && (
      <div className="search-crypto">
        <Input placeholder="Search Cryptocurrency" onChange={ (e) => setSearchTerm(e.target.value) } />
      </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency: Currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt="icon"
                  />
                }
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}