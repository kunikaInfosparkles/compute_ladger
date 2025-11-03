import './header.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Dropdown } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Dropdown } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'My Files', path: '/my-group' },
    { label: 'Sheets', path: '/sheets' },
    { label: 'Ledger', path: '/ledger' },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Profile',
    },
    {
      key: 'settings',
      label: 'Settings',
    },
    {
      key: 'logout',
      label: 'Logout',
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header-wrapper">
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <div className="logo" onClick={() => navigate('/my-group')}>
              <span className="logo-text">DMS</span>
              <span className="logo-subtitle">Lorem Ipsum</span>
            </div>
          </div>

          <nav className="header-nav">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="header-right">
            <Dropdown
              menu={{ items: userMenuItems }}
              trigger={['click']}
              placement="bottomRight"
            >
              <button className="user-dropdown">
                <div className="user-avatar">
                  <UserOutlined />
                </div>
                <span className="user-name">User</span>
                <DownOutlined className="dropdown-icon" />
              </button>
            </Dropdown>
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                className={`mobile-nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header