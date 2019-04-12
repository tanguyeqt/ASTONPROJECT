import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import $ from 'jquery';
import { APIURL } from '../../config-connections';

class ConnexionPage extends Component 
{
  constructor() {
    super();
    this.state = {redirect: false};

    this.checkAccount = this.checkAccount.bind(this);
  }

  handleKeyPress = (event) => 
  {
    if(event.charCode === 13)
    {
        this.checkAccount();
    }
  }
  
  checkAccount()
  {
    var login = $('#login')[0].value.toLowerCase();

    fetch(APIURL + '/Account/Check', {
        method: 'POST',
        async: false,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST'
        },
        body: JSON.stringify({
            login: login,
            password: $('#password')[0].value
        })
    })
    .then(results => 
    {
        return results.json();
    })
    .then(data =>
    {
        if(!data.value.isOk)
        {
            $("#msgError").text("L'adresse email (ou nom d'utilisateur) et le mot de passe que vous avez entrés ne correspondent pas à ceux présents dans nos fichiers. Veuillez vérifier et réessayer.");
            $("#login")[0].value = "";
            $("#password")[0].value = "";
        }
        else
        {
            var id = data.value.id;
            var name = data.value.login;
            localStorage.setItem('id', id);
            localStorage.setItem('nameprofile', name);
        }

        this.setState({redirect: data.value.isOk});
    });
  }

  render() 
  {
    if (this.state.redirect) {
        return <Redirect push to="/Logged/FilQuestion" />;
    }

    return (
        <div className="row vertical-center"> {/*  Bloc de connexion */}

            <div className="col-md-6 col-md-offset-3 pt-50 background-white">

                <div className="row">
                    <div className="form-group col-md-6 col-md-offset-3">
                        <h1>Connexion</h1>
                    </div>
                </div>
                <div className="row pt-10">
                    <div className="form-group col-md-6 col-md-offset-3 pl-60 pr-60">
                        <input id="login" type="email" className="form-control" placeholder="Nom d'utilisateur ou email" onKeyPress={this.handleKeyPress}/>
                    </div>
                </div>
                <div className="row pt-10">
                    <div className="form-group col-md-6 col-md-offset-3 pl-60 pr-60">
                        <input id="password" type="password" className="form-control" placeholder="Mot de passe" onKeyPress={this.handleKeyPress}/>
                    </div>
                </div>
                <div className="row pt-10">
                    <div className="form-group col-md-6 col-md-offset-3">
                        <button id="connectBtn" type="submit" className="btn btn-primary center-block" onClick={this.checkAccount}>Se connecter</button>
                    </div>
                </div>
                <div className="row pt-25 pb-10">
                    <div className="form-group col-md-6 col-md-offset-3 text-center">
                        <Link to="/LogIn/LostPassword">Mot de passe oublié ?</Link>
                    </div>
                </div>
                <div className="row pb-50">
                    <div className="form-group col-md-6 col-md-offset-3 text-center">
                        <label id="msgError" className="text-danger"></label>
                    </div>
                </div>

            </div>

        </div>
    );
  }
}
export default ConnexionPage;