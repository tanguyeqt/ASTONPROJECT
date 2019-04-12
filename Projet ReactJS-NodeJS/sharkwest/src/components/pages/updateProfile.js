import React, { Component } from 'react';
import NotFound from './notFound';
import $ from 'jquery';
import { APIURL } from '../../config-connections';
import Image from './../../Assets/img/profile.jpg';

class UpdateProfilePage extends Component 
{
    constructor() 
    {
        super();
        const id = localStorage.getItem('id');
        this.state = { id: id, profile: [], status: "404"};
        this.updateAccount = this.updateAccount.bind(this);
        this.base64 = this.base64.bind(this);
    }
  
    componentWillMount() 
    {
        this.resetProfile();
    }

    updateAccount() 
    {
        var login = $('#login').val();
        // var password = $('#password').val();
        var firstname = $('#firstname').val();
        var lastname = $('#lastname').val();
        var birthdate = $('#birthdate').val();
        // var email = $('#email').val();

        var isOk = true;
        var msg = "";

        if(login.trim() === '')
            msg += "<li>Le nom d'utilisateur</li>";

        if(lastname.trim() === '')
            msg += "<li>Le nom</li>"; 

        if(firstname.trim() === '')
            msg += "<li>Le prénom</li>"; 

        if(birthdate.trim() === '')
            msg += "<li>La date de naissance</li>";  
           
        // if(email.trim() === '')
        //     msg += "<li>L'adresse mail</li>";  

        // if(password.trim() === '')
        //     msg += "<li>Le mot de passe</li>";         

        if(msg.trim() !== "")
            isOk = false;

        if(isOk)
        {
            fetch(APIURL + '/Account/Update?id=' + this.state.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST'
                },
                body: JSON.stringify({ 
                    accountid : this.state.id,                                    
                    login : login,
                    // password : password,
                    birthdate : birthdate,
                    firstname : firstname,
                    lastname : lastname
                    // email : email
                  
                })
            })
            .then(results => 
            {
                return results.json();
            })
            .then(data => 
            {
                if(data.status === "200")
                {
                    $('#msgInfos').text(data.message);
                    $('#msgInfos').addClass('text-success');
                    $('#msgInfos').removeClass('text-danger');
                    this.resetProfile();

                    localStorage.setItem('nameprofile',login);
                }
                else
                {
                    $('#msgInfos').text(data.message);
                    $('#msgInfos').removeClass('text-success');
                    $('#msgInfos').addClass('text-danger');
                }
            })
        }
        else
        {
            $('#msgInfos').html("Les éléments suivants ne sont pas renseignés : <ul>" + msg + "</ul>");
            $('#msgInfos').removeClass('text-success');
            $('#msgInfos').addClass('text-danger');
        }
    }

    resetProfile() 
    {
        fetch(APIURL + '/Account/Get?id=' + this.state.id)
        .then(results => 
        {
            return results.json();
        })
        .then(data => 
        {
            let profile = data.data;
            let status = data.status;
            this.setState({
                profile: profile,
                status: status,
                id: this.state.id
            })

            var mydate = profile.birthdate.split('/');
            var birthdate = mydate[2] + '-' + mydate[1] + '-' + mydate[0];

            $('#login').val(profile.login);
            $('#lastname').val(profile.lastname);  
            $('#firstname').val(profile.firstname);
            $('#birthdate').val(birthdate);
            // $('#email').val(profile.email);
            // $('#password').val(profile.password);
        })
    }

    base64 () {
        // const toDataURL = url => fetch(url)
        // .then(response => response.blob())
        // .then(blob => new Promise((resolve, reject) => {
        //     const reader = new FileReader()
        //     reader.onloadend = () => resolve(reader.result)
        //     reader.onerror = reject
        //     reader.readAsDataURL(blob)
        // }))

        // var p = this.state.profile;
        // // var url = $('#picturepicker').val();

        // toDataURL(url)
        // .then(dataUrl => {
        //     p.image = dataUrl;
        //     this.setState({
        //         profile: p
        //     })
        // })
    }
  
    render() 
    {
        if(this.state.status === "404")
            return (
                <NotFound />
            );

        return (
            <div className="container">
                <ol className="breadcrumb">
                    <li><i className="fa fa-home fa-fw"></i></li>
                    <li>
                        <a href={"/Logged/Profile/" + this.state.id}>Mon Profil</a>
                    </li>
                    <li className="active">Modifier mon profil</li>
                </ol>
                <div className="row">
                    <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                        <div className="panel panel-default">
                            <div className="panel-body">                  
                                <div className="box box-info">
                                    <div className="box-body">
                                        <div className="col-sm-5">
                                            <div align="center"> 
                                                <img alt="User" src={Image} id="profile-image1" className="img-circle img-responsive img-border roundedImage-160"/> 
                                                {/* <input id="picturepicker" className="form-control" type="text"/>
                                                <button onClick={this.base64} className="btn btn-primary">Valider</button> */}
                                            </div>
                                        </div>  
                                        <div className="col-sm-7">                     
                                            <div className="clearfix"></div>    
                                            <hr />  
                                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 tital text-left "> 
                                                Nom d'utilisateur
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                                                <input id="login" name="login" type="text" className="form-control"/>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="bot-border"></div>
                                            <hr />
                                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 tital text-left ">
                                                Nom 
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                                                <input id="lastname" name="lastname" type="text" className="form-control"/>
                                            </div>  
                                            <div className="clearfix"></div>
                                            <div className="bot-border"></div>
                                            <hr />
                                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 tital text-left ">
                                                Prénom 
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                                                <input id="firstname" name="firstname" type="text" className="form-control"/>
                                            </div>    
                                            <div className="clearfix"></div>
                                            <div className="bot-border"></div>
                                            <hr />
                                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 tital text-left">
                                                Date de naissance
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                                                <input id="birthdate" name="birthdate" type="date" className="form-control"/>
                                            </div>  
                                            <div className="clearfix"></div>
                                            <div className="bot-border"></div>
                                            {/* <hr />
                                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 tital text-left">
                                                Email
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                                                <input id="email" name="email" type="email" className="form-control"/>
                                            </div>  
                                            <div className="clearfix"></div>
                                            <div className="bot-border"></div>
                                            <hr />
                                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 tital text-left">
                                                Mot de passe
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
                                                <input id="password" name="password" type="password" className="form-control"/>
                                            </div>   */}
                                            <div className="clearfix"></div>
                                            <div className="bot-border"></div>
                                            <hr />  
                                        </div>
                                        <div className="col-sm-12">
                                            <div align="center">                            
                                                <button type="submit" className="btn btn-success" onClick={this.updateAccount}>
                                                        <i className="fa fa-check"></i> Modifier votre profil
                                                </button>
                                            </div>
                                        </div> 
                                        <div className="clearfix pb-50"></div>
                                        <div className="bot-border"></div>    
                                        <div className="row pb-50">
                                            <div className="form-group col-md-6 col-md-offset-3 text-center">
                                                <label id="msgInfos" className="text-danger"></label>
                                            </div>
                                        </div>                    
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
export default UpdateProfilePage;