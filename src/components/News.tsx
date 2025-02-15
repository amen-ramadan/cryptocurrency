// import { Row } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Loader from "./Loader";


// const { Title, Text } = Typography;
// const {Option} = Select;

interface CryptocurrenciesProps {
  simplified: boolean;
}

export default function News({simplified }: CryptocurrenciesProps) {

  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: 'Cryptocurrency', count: simplified ? 10 : 100 });
  
  // console.log('from file news', cryptoNews);
  

  if(!cryptoNews?.data) return <Loader/>;
  
  return (
    <div>
      {/* {cryptoNews.data.items.map((news) => (
      ))} */}
      news
    </div>
  )
}
