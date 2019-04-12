import React, { Component } from 'react';

class LostPasswordPage extends Component 
{
  render() 
  {
    return (
      <div className="row vertical-center">
        <div className="col-md-6 col-md-offset-3 pt-50 background-white">
          <div className="row">
              <div className="form-group col-md-10 col-md-offset-1">
                  <h1>Mot de passe oublié</h1>
              </div>
          </div>
          <div className="row pt-10">
              <div className="form-group col-md-10 col-md-offset-1 pl-60 pr-60">
                  <p>Un email vous sera envoyé pour que vous puissiez modifier votre mot de passe</p>
              </div>
          </div>
          <div className="row pt-10">
              <div className="form-group col-md-10 col-md-offset-1 pl-60 pr-60">
                  <input id="mailfromlostaccount" type="email" className="form-control" placeholder="Veuillez entrer l'email associé à votre compte"/>
              </div>
          </div>
          <div className="row pt-10">
              <div className="form-group col-md-10 col-md-offset-1">
                  <button id="lostBtn" type="submit" className="btn btn-primary center-block" onClick={this.sendMail}>Envoyer l'email</button>
              </div>
          </div>
          </div>
      </div>
    );
  }
}
export default LostPasswordPage;