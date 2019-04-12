import React, { Component } from 'react';
import { Redirect } from 'react-router';
import $ from 'jquery';
import Popup from 'react-popup';
import { APIURL } from '../../config-connections';

class Inscription extends Component 
{
    constructor() {
        super();
        this.state = {redirect: false};
    
        this.addAccount = this.addAccount.bind(this);
        this.showPopup = this.showPopup.bind(this);
    }

    handleKeyPress = (event) => 
    {
        if(event.charCode === 13)
        {
            this.addAccount();
        }
    }

    handleSameEmail = (event) =>
    {
        if($("#email")[0].value === $("#email2")[0].value)
        {
            $("#email2").removeClass("red-input");
            $("#email").removeClass("red-input");
        }
        else
        {
            $("#email2").addClass("red-input");
            $("#email").addClass("red-input");
        }
    }

    handleSamePassword = (event) =>
    {
        if($("#password")[0].value !== $("#password2")[0].value)
        {
            $("#password2").addClass("red-input");
            $("#password").addClass("red-input");
        }
        else
        {
            $("#password2").removeClass("red-input");
            $("#password").removeClass("red-input");
        }
    }

    addAccount()
    {
      var login = $('#login')[0].value;
      var firstname = $('#firstname')[0].value;
      var lastname = $('#lastname')[0].value;
      var birthdate = $('#birthdate')[0].value;
      var email = $('#email')[0].value.toLowerCase();
      var email2 = $('#email2')[0].value.toLowerCase();
      var password = $('#password')[0].value;
      var password2 = $('#password2')[0].value;
    //   console.log(login + "," + firstname + ","+ lastname + ","+ birthdate + ","+ email + ","+ password)
  
      fetch(APIURL + '/Account/Add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST'
          },
          body: JSON.stringify({
              login: login,
              password: password,
              password2: password2,
              email: email,
              email2: email2,
              birthdate: birthdate,
              firstname: firstname,
              lastname: lastname
          })
      })
      .then(results => 
      {
          return results.json();
      })
      .then(data =>
      {
          if(data.value.status !== "200")
          {
            $("#msgError").text(data.message);
          }
          else
          {
            this.showPopup();
          }
      });
    }

    showPopup() {
        var k = this;
        Popup.create({
            title: "Inscription",
            className: 'success',
            content: "Inscription terminée. \nBienvenue sur sharkwest !",
            buttons: {
                right: [{
                    text: 'OK',
                    className: 'success',
                    key: 'enter',
                    action: function () {
                        $("#msgError").text("");
                        k.setState({redirect: true});
                        Popup.close();
                    }
                }]
            }
        },true);
    }
  
  
  render() 
  {
    if (this.state.redirect) {
        return <Redirect push to="/Login/Connexion" />;
    }
    

    return (
        <div className="row vertical-center"> {/*  Bloc de connexion */}
            <Popup
                className="mm-popup"
                btnClass="mm-popup__btn--success"
                closeBtn={true}
                closeHtml={null}
                defaultOk="Ok"
                defaultCancel="Cancel"
                wildClasses={false}
                escToClose={true} />

            <div className="col-md-6 col-md-offset-3 pt-50 background-white">

                <div className="row">
                    <div className="form-group col-md-6 col-md-offset-3">
                        <h1>Inscription</h1>
                    </div>
                </div>
                <div className="row pt-10">
                    <div className="form-group col-md-6 pl-60 pr-60">
                        <input id="lastname" type="text" className="form-control"  placeholder="Nom" onKeyPress={this.handleKeyPress}/>
                    </div>
                    <div className="form-group col-md-6 pl-60 pr-60">
                        <input id="firstname" type="text" className="form-control" placeholder="Prenom" onKeyPress={this.handleKeyPress}/>
                    </div>
                </div>
                <div className="row pt-10">
                    <div className="form-group col-md-6 pl-60 pr-60">
                        <input id="login" type="text" className="form-control" placeholder="Nom d'utilisateur" onKeyPress={this.handleKeyPress}/>
                    </div>
                    <div className="form-group col-md-6 pl-60 pr-60">
                        <input id="birthdate" type="date" className="form-control" placeholder="Date de naissance" onKeyPress={this.handleKeyPress}/>
                    </div>
                </div>
                <div className="row pt-10">
                    <div className="form-group col-md-6 pl-60 pr-60">
                        <input id="email" type="email" className="form-control" placeholder="E-mail" onChange={this.handleSameEmail} onKeyPress={this.handleKeyPress}/>
                    </div>
                    <div className="form-group col-md-6 pl-60 pr-60">
                        <input id="email2" type="email" className="form-control" placeholder="Confirmer l'e-mail" onChange={this.handleSameEmail} onKeyPress={this.handleKeyPress}/>
                    </div>
                </div>
                <div className="row pt-10">
                    <div className="form-group col-md-6 pl-60 pr-60">
                        <input id="password" type="password" className="form-control" placeholder="Mot de passe" onChange={this.handleSamePassword} onKeyPress={this.handleKeyPress}/>
                    </div>
                    <div className="form-group col-md-6 pl-60 pr-60">
                        <input id="password2" type="password" className="form-control" placeholder="Confirmer le mot de passe" onChange={this.handleSamePassword} onKeyPress={this.handleKeyPress}/>
                    </div>
                </div>
                <div className="row pt-25 pb-10">
                    <button id="inscriptionBtn" type="submit" className="btn btn-primary" onClick={this.addAccount}>S'inscrire</button>
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
export default Inscription;