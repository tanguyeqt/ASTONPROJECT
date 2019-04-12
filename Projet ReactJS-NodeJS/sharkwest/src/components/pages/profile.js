import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotFound from './notFound';
import { APIURL } from '../../config-connections';
import Image from './../../Assets/img/profile.jpg';

class ProfilePage extends Component 
{
  constructor() 
  {
      super();
      const id = localStorage.getItem('id');
      this.state = { profile: [],  status: "404", id: id};
      this.killSession = this.killSession.bind(this);
    }

  componentWillMount() 
  {
    var id = this.props.match.params.id;

    fetch(APIURL + '/Account/Get?id='+ id)
    .then(results => 
    {
        return results.json();
    })
    .then(data => 
    {
        let profile = data.data;
        let status = data.data == null ? "404" : data.data;
        this.setState({
          profile: profile,
          status: status,
          id: this.state.id
        })
    })
  }

  killSession () {
    localStorage.setItem('id','');
  }

  render() 
  {
      if(this.state.status === "404")
      {
        return (
          <NotFound />
        );
      }

      return (
        <div className="container">
          <ol className="breadcrumb">
            <li><i className="fa fa-home fa-fw"></i></li>
            <li className="active">Profil</li>
            {
              this.state.id === this.state.profile.id.toString()
              ?
              <li className="active">Mon Profil</li>
              :
              <li className="active">#{this.state.profile.id}</li>
            }
          </ol>
          { 
            this.state.id === this.state.profile.id.toString()
            ?
            <div className="row container-fluid pb-10">
              <div className="col-lg-2 col-md-3 col-xs-6 col-sm-4">
                <Link to={"/Logged/updateProfile/"}><i className="fa fa-pencil fa-fw"></i><i>  Modifier mon profil</i></Link>
              </div>
            </div>
            :
            <div></div>
          }
          <div className="row">
            <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="box box-info">
                    <div className="box-body">
                      <div className="col-sm-6">
                        <div align="center">
                          {/* <img alt="User" src={this.state.profile.image} id="profile-image1" className="img-circle img-responsive img-border roundedImage-120"/>  */}
                          <img alt="User" src={Image} id="profile-image1" className="img-circle img-responsive img-border roundedImage-120"/> 
                          {
                            this.state.id === this.state.profile.id.toString()
                            ?
                            <Link to={"/LogIn/Connexion"} onClick={this.killSession} className="lien-deconnexion no-underline"><i className="fa fa-sign-out fa-fw"></i>Se déconnecter</Link>
                            :
                            <div></div>
                          }
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <h4>{this.state.profile.login}</h4>
                        {
                        this.state.id === this.state.profile.id.toString()
                        ?
                        <span><p>{this.state.profile.firstname} {this.state.profile.lastname}</p></span>
                        :
                        <span></span>
                      }
                                
                      </div>
                      <div className="clearfix"></div>

                      <hr />
                      
                      {
                        this.state.id === this.state.profile.id.toString()
                        ?
                        <div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 tital">Date de naissance</div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">{this.state.profile.birthdate}</div>
                          <div className="clearfix"></div>
                          <div className="bot-border"></div>

                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 tital">Email</div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">{this.state.profile.email}</div>
                          <div className="clearfix"></div>
                          <div className="bot-border"></div>

                          <hr />
                        </div>
                        :
                        <div></div>
                      }

                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 tital">Nombre de questions crées</div>
                      <div className="ccol-lg-6 col-md-6 col-sm-6 col-xs-6 ">{this.state.profile.nbQuestion}</div>
                      <div className="clearfix"></div>
                      <div className="bot-border"></div>

                      <hr />

                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 tital">Nombre de commentaires</div>
                      <div className="ccol-lg-6 col-md-6 col-sm-6 col-xs-6 ">{this.state.profile.nbCommentary}</div>
                      <div className="clearfix"></div>
                      <div className="bot-border"></div>

                      <hr />

                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 tital">Nombre de questionnaires crées</div>
                      <div className="ccol-lg-6 col-md-6 col-sm-6 col-xs-6 ">{this.state.profile.nbQuestionnaires}</div>
                      <div className="clearfix"></div>
                      <div className="bot-border"></div>

                      <hr />

                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 tital">Nombre de notes données</div>
                      <div className="ccol-lg-6 col-md-6 col-sm-6 col-xs-6 ">{this.state.profile.nbNotes}</div>
                      <div className="clearfix"></div>
                      <div className="bot-border"></div>

                      <hr />

                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 tital">Note moyenne des questions crées</div>
                      <div className="ccol-lg-6 col-md-6 col-sm-6 col-xs-6 ">{this.state.profile.notesMoyenne !== -1 ? Math.round(this.state.profile.notesMoyenne*100)/100 +"/5" : "-"}</div>
                      <div className="clearfix"></div>
                      <div className="bot-border"></div>

                      <hr />

                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 tital">Difficulté moyenne des questions crées</div>
                      <div className="ccol-lg-6 col-md-6 col-sm-6 col-xs-6 ">{this.state.profile.difficulteMoyenne}</div>
                      <div className="clearfix"></div>
                      <div className="bot-border"></div>
                      
                    </div>
                  </div>
                </div> 
              </div>
            </div>  
          </div>
        </div>
      );
  }
}
export default ProfilePage;