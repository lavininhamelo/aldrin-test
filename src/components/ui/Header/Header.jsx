import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
  return (
    <nav className="header">
      <Link to="/" className="header__home" data-testid="home-link">
        Home
      </Link>
      <div className="header__copy">
        <a target="_blank" rel="noopener noreferrer" href="mailto:lavininhamelo@hotmail.com">
          Test By Lavinia Melo
        </a>

        <a target="_blank" rel="noopener noreferrer" href="https://linkedin.com/in/laviniamelo">
          (LinkedIn)
        </a>
      </div>
    </nav>
  );
};

export default Header;
