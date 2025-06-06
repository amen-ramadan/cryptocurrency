import { Menu, Typography, Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

import icon from '../images/cryptocurrency.png';
import { useEffect, useState } from 'react';

export default function Navbar() {

  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [])
  
  useEffect(() => {
    if(screenSize <= 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize])
  const menuItems = [
    {
      label: <Link to="/">Home</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
      key: 'cryptocurrencies',
      icon: <FundOutlined />,
    },
    {
      label: <Link to="/exchanges">Exchanges</Link>,
      key: 'exchanges',
      icon: <MoneyCollectOutlined />,
    },
    {
      label: <Link to="/news">News</Link>,
      key: 'news',
      icon: <BulbOutlined />,
    },
  ];

  return (
    <div className='nav-container'>
      <div className="logo-container">
        <Avatar src={icon} size='large' />
        <Typography.Title level={2} className="logo">
          <Link to= "/">CryptoVerse</Link>
        </Typography.Title>
        <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
      </div>
      {activeMenu && (
        <Menu theme="dark" items={menuItems} />
      )}
    </div>
  );
}
