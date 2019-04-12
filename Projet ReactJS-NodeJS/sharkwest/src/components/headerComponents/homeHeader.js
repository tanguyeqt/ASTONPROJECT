import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeHeader extends Component 
{
  render() 
  {
    return (
      <nav className="navbar navbar-default navbar-static-top">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <Link className="navbar-brand" to="/LogIn/">Sharkwest</Link>
            </div>

            <ul className="nav navbar-top-links navbar-right">
                <li>
                  <Link to="/LogIn/Inscription">S'inscrire</Link>
                </li>
                <li>
                  <Link to="/LogIn/Connexion">Se connecter</Link>
                </li>
            </ul>
        </nav>
    );
  }
}
export default HomeHeader;