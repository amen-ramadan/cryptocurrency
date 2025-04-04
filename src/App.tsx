import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from 'antd';

import { Cryptocurrencies, CryptoDetails, Exchanges, Homepage, Navbar, News } from './components';
function App() {

  return (
    <>
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/exchanges' element={<Exchanges />} />
                <Route path='/cryptocurrencies' element={<Cryptocurrencies simplified={false}  />} />
                <Route path='/crypto/:coinId' element={<CryptoDetails />} />
                <Route path='/news' element={<News simplified={false}  />} />
              </Routes>
            </div>
          </Layout>
        <div className="footer" >
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
            Cryptoverse <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/News">News</Link>
          </Space>
        </div>
        </div>
        </div>
    </>
  )
}

export default App
