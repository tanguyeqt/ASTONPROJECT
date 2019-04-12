import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class Header extends Component 
{
  constructor () {
    super();
    const id = localStorage.getItem('id');
    var name = localStorage.getItem('nameprofile');
    var redirect = (id === "" || id === null || id === undefined);  

    this.state = {id: id, name: name, redirect: redirect};
    this.killSession = this.killSession.bind(this);
  }

  killSession () {
    localStorage.setItem('id','');
  }

  render() 
  {
    if (this.state.redirect) {
        return <Redirect push to="/LogIn/Connexion" />;
    }

    return (
        <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link to="/Logged/FilQuestion" className="navbar-brand">Sharkwest</Link>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="onItemHeader">
                            <Link to="/Logged/FilQuestion" className="text-color-primary"><i className="fa fa-navicon fa-fw"></i> Fil de questions</Link>
                        </li>
                        <li className="dropdown onItemHeader">
                            <a className="dropdown-toggle text-color-primary" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-question-circle fa-fw"></i> Questions <span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to="/Logged/CreateQuestion"><i className="fa fa-plus fa-fw pt-10 pb-10"></i> Créer une question</Link>
                                </li>
                                <li>
                                    <Link to="/Logged/MyQuestions"><i className="fa fa-th-list fa-fw pt-10 pb-10"></i> Mes questions</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown onItemHeader">
                            <a className="dropdown-toggle text-color-primary" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-th-list fa-fw"></i> Questionnaires <span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to="/Logged/CreateQuestionnaire"><i className="fa fa-plus fa-fw pt-10 pb-10"></i> Créer un questionnaire</Link>
                                </li>
                                <li>
                                    <Link to="/Logged/MyQuestionnaires"><i className="fa fa-th-list fa-fw pt-10 pb-10"></i> Mes questionnaires</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown onItemHeader">
                            <a className="dropdown-toggle text-color-primary" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user fa-fw"></i> {this.state.name} <span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li>
                                    <a href={"/Logged/Profile/" + this.state.id}><i className="fa fa-user fa-fw pt-10 pb-10"></i> Mon profil</a>
                                </li>
                                <li onClick={this.killSession}>
                                    <Link to="/LogIn/Connexion"><i className="fa fa-sign-out fa-fw pt-10 pb-10"></i> Se déconnecter</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
  }
}
export default Header;