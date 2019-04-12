import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'react-popup';
import Commentaire from '../Model/Commentaire';
import QuestionnaireChoices from '../Model/QuestionnaireChoices';
import NotFound from './notFound';
import { Redirect } from 'react-router';
import Rater from 'react-stars';
import $ from 'jquery';
import { APIURL } from '../../config-connections';
import Image from './../../Assets/img/profile.jpg';

var bibli = require('../Model/Bibliotheque');

class DisplayQuestionPage extends Component 
{
    constructor() 
    {
        super();
        const id = localStorage.getItem('id');
        this.state = { id: id, question : [], comments : [], status: "404", rate: 0, questionnaires: [], redirect: false };
        this.showResponse = this.showResponse.bind(this);
        this.getQuestionnaires = this.getQuestionnaires.bind(this);
        this.getComments = this.getComments.bind(this);
        this.sendComment = this.sendComment.bind(this);
        this.share = this.share.bind(this);
        this.addquest = this.addquest.bind(this);
        this.ratingChanged = this.ratingChanged.bind(this);
        this.rate = this.rate.bind(this);
        this.update = this.update.bind(this);
    }

    componentWillMount() 
    {
        var id = this.props.match.params.id;

        fetch(APIURL +'/Question/GetQuestion?id=' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET'
            }
        })
        .then(results => 
        {
            return results.json();
        })
        .then(data => 
        {         
            let question = data.value.data;
            let status = data.value.status == null ? "404" : data.value.status;
            this.setState({
                id: this.state.id,
                question: question,
                status: status,
                comments: this.state.comments
            })
        })
        this.getComments(id);
    }

    async getQuestionnaires (id) {
        const request = async () => {
            await fetch(APIURL + '/Questionnaire/GetMyQuestionnairesWithoutThisQuestion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST'
                    },
                    body: JSON.stringify({
                        idquestion: id,
                        idaccount: this.state.id
                    })
                })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.status === '200')
                    {
                        let questionnaires = data.data;
                        this.setState({
                            questionnaires: questionnaires
                        })
                    }
                });
        };

        await request();
    }

    getComments (id) {
        fetch(APIURL + '/Question/GetComments?id=' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET'
            }
        })
        .then(results => 
        {
            return results.json();
        })
        .then(data => 
        {
            let comments = data.data;
            this.setState({
                id: this.state.id,
                question: this.state.question,
                status: this.state.status,
                comments: comments
            })
        })
    }

    sendComment () {
        var corps = $('#contentComment').val();
        var idquestion = this.props.match.params.id;

        if(corps === "")
        {
            $("#contentComment").addClass("red-input");
            return;
        }
        else
            $("#contentComment").removeClass("red-input");

        fetch(APIURL + '/Question/AddComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST'
                },
                body: JSON.stringify({
                    corps: corps,
                    account: this.state.id,
                    idquestion: idquestion           
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
                    this.getComments(idquestion)
                }
                else
                {
                    console.log('KO');
                }
                $('#contentComment').val("");
            });
    }

    showResponse(data) {
        if (data === undefined)
            return;

        var jsonResponse = JSON.parse(data);
        if (jsonResponse.typeresponse === 1)
        {
            return (
                <div>{jsonResponse.correctresponse[0]}</div>
            )
        }
        else if (jsonResponse.typeresponse === 2)
        {
            return (
                <div>
                    {jsonResponse.correctresponse.map((correct) =>
                        <div key={"34"+correct}><input type="checkbox" checked={true} readOnly /> {correct}</div>)}
                    {jsonResponse.incorrectresponse.map((incorrect) =>
                        <div key={"34"+incorrect}><input type="checkbox" checked={false} readOnly/> {incorrect}</div>)}
                </div>
            )
        }
        else if (jsonResponse.typeresponse === 3)
        {
            return (
                <div>
                    <input type="radio" name="gender" value="male" checked={true} readOnly /> {jsonResponse.correctresponse[0]} <br />
                    {jsonResponse.incorrectresponse.map((incorrect) =>
                        <div key={"34"+incorrect}><input type="radio" name="gender" value="male" checked={false} readOnly/> {incorrect} <br /></div>
                    )}
                </div>
            )
        }
    }

    share() {
        Popup.create({
            className: 'success',
            content: 
                <div>
                    <div className="row pb-10">
                        <div className="col-md-9">
                            URL de la question :
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-9">
                            <input id="url" type="text" className="mm-popup__input" value={"localhost:3000/Logged/Question/" + this.state.question.id} readOnly/>
                        </div>
                        <div className="col-lg-3">
                            <a><i className="glyphicon glyphicon-copy" onClick={ () =>
                            {
                                document.getElementById('url').select();
                                document.execCommand('copy');
                            }}></i></a>
                        </div>
                    </div>
                </div>,
            buttons: {
                right: [{
                    text: 'OK',
                    className: 'success',
                    key: 'enter',
                    action: function () {
                        Popup.close();
                    }
                }]
            }
        },true);
    }

    async addquest() {
        var k = this;
        var id = this.props.match.params.id;

        await this.getQuestionnaires(id);

        Popup.create({
            className: 'success',
            content:
                <div className="row">
                    <h2 className="pb-10 text-center">Questionnaires</h2>
                    <div className="col-lg-10 col-lg-offset-1 quest-body">
                        <div id="addQuestFormGrp" className="form-group">
                            {k.state.questionnaires.map((questionnaire) =>
                                <QuestionnaireChoices
                                    key = {questionnaire.id+"123"}
                                    id = {questionnaire.id}
                                    text = {questionnaire.name}
                                />
                            )}
                        </div>
                    </div>
                </div>,
            buttons: {
                right: [{
                    text: 'OK',
                    className: 'success',
                    key: 'enter',
                    action: function () {

                        var selected = $('#addQuestFormGrp input:radio:checked').val();

                        if(selected !== undefined)
                        {
                            fetch(APIURL + '/Question/AddQuestionToQuestionnaire', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin': '*',
                                    'Access-Control-Allow-Methods': 'POST'
                                },
                                body: JSON.stringify({
                                    idquestion: k.state.question.id,
                                    idquestionnaire: selected,
                                    points: 0
                                })
                            })
                            .then(results => 
                            {
                                return results.json();
                            })
                            .then(data =>
                            {
                                Popup.alert(data.message);
                                Popup.close();
                            });
                        }
                        else
                        {
                            Popup.alert("Il faut sélectionner un questionnaire dans lequel ajouter cette question");
                            Popup.close();
                        }
                    }
                }],
                left: [{
                    text: 'Annuler',
                    className: 'danger',
                    action: function () {
                        Popup.close();
                    }
                }]
            }
        },true)
    }

    ratingChanged = (newRating) =>{
        this.setState({
            id: this.state.id,
            rate: newRating
        })
    }

    rate() {
        var k = this;

        Popup.create({
            className: 'success',
            content: 
                <div>
                    <div className="row pb-10">
                        <div className="col-md-8 col-md-offset-2">
                            <h3>Noter la question</h3>
                        </div>
                    </div>
                    <div className="row pb-10">
                        <div className="col-md-8 col-md-offset-2">
                            <Rater 
                                onChange={this.ratingChanged}
                                count={5}
                                size={35} />
                        </div>
                    </div>
                </div>,
            buttons: {
                right: [{
                    text: 'OK',
                    className: 'success',
                    key: 'enter',
                    action: function () {

                        fetch(APIURL + '/Question/AddRate', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Methods': 'POST'
                            },
                            body: JSON.stringify({
                                idquestion: k.state.question.id,
                                idaccount: k.state.id,
                                rate: k.state.rate
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
                                Popup.close();
                                Popup.create({
                                    className: 'success',
                                    content: 
                                        <div>
                                            <div className="row pb-10">
                                                <div className="col-md-8 col-md-offset-2">
                                                    <h3>Note prise en compte</h3>
                                                </div>
                                            </div>
                                        </div>,
                                    buttons: {
                                        right: [
                                            {
                                                text: 'OK',
                                                className: 'success',
                                                key: 'enter',
                                                action: function () {
                                                    window.location.reload()
                                                }
                                            }
                                        ]
                                    }
                                });
                            }
                            else
                            {
                                Popup.alert("Impossible de noter cette question");
                                Popup.close();
                            }
                        })
                    }
                }]
            }
        },true);
    }
    
    update () {
        this.setState({
            redirect: true
        })
    }

    render() 
    {
        if(this.state.status === "404")
            return <NotFound/>

        if (this.state.redirect)
            return <Redirect push to={"/Logged/updateQuestion/" + this.state.question.id} />;
        
        return (
            <div className="container">
                <Popup
                    className="mm-popup"
                    closeBtn={true}
                    closeHtml={null}
                    defaultOk="Ok"
                    defaultCancel="Annuler"
                    wildClasses={false}
                    escToClose={true} />
                <ol className="breadcrumb">
                    <li><i className="fa fa-home fa-fw"></i></li>
                    {
                        this.state.id === this.state.question.accountId.toString()
                        ?
                        <li>
                            <a href="/Logged/MyQuestions">Mes questions</a>
                        </li>
                        :
                        <li className="active">
                            <a href="/Logged/FilQuestion">Fil des questions</a>
                        </li>
                    }
                    <li className="active">#{this.state.question.id}</li>
                </ol>
                {/* Boutons d'actions */}
                <div className="pt-10">
                    <div className="row text-center pagination-centered">
                        <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-xs-12 col-sm-12">
                            { this.state.id === this.state.question.accountId.toString()
                                ?
                                <div className="row">
                                    <div className="col-lg-3 col-md-3 col-xs-3 col-sm-3 text-center">
                                        <button type="button" className="btn btn-primary" onClick={this.share}>
                                            <span className="hidden-sm hidden-xs visible-lg visible-md" title="Partager la question">Partager la question <i className="fa fa-share fa-fw"></i></span>
                                            <span className="visible-sm visible-xs hidden-lg hidden-md" title="Partager la question"><i className="fa fa-share fa-fw"></i></span>
                                        </button>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-xs-3 col-sm-3 text-center">
                                        <button type="button" className="btn btn-info" onClick={this.update}>
                                            <span className="hidden-sm hidden-xs visible-lg visible-md">Modifier la question <i className="fa fa-pencil fa-fw"></i></span>
                                            <span className="visible-sm visible-xs hidden-lg hidden-md"><i className="fa fa-pencil fa-fw"></i></span>
                                        </button>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-xs-3 col-sm-3 text-center">
                                        <button type="button" className="btn btn-warning" onClick={this.rate}>
                                            <span className="hidden-sm hidden-xs visible-lg visible-md" title="Noter la question">Noter la question <i className="fa fa-star fa-fw"></i></span>
                                            <span className="visible-sm visible-xs hidden-lg hidden-md" title="Noter la question"><i className="fa fa-star fa-fw"></i></span>
                                        </button>                        
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-xs-3 col-sm-3 text-center">
                                        <button type="button" className="btn btn-success" onClick={this.addquest}>
                                            <span className="hidden-sm hidden-xs visible-lg visible-md" title="Ajouter la question à un questionnaire">Ajouter la question <i className="fa fa-plus fa-fw"></i></span>
                                            <span className="visible-sm visible-xs hidden-lg hidden-md" title="Ajouter la question à un questionnaire"><i className="fa fa-plus fa-fw"></i></span>
                                        </button>
                                    </div>
                                </div>
                                :
                                <div className="row">
                                    <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4 text-center">
                                        <button type="button" className="btn btn-primary" onClick={this.share}>
                                            <span className="hidden-sm hidden-xs visible-lg visible-md" title="Partager la question">Partager la question <i className="fa fa-share fa-fw"></i></span>
                                            <span className="visible-sm visible-xs hidden-lg hidden-md" title="Partager la question"><i className="fa fa-share fa-fw"></i></span>
                                        </button>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4 text-center">
                                        <button type="button" className="btn btn-warning" onClick={this.rate}>
                                            <span className="hidden-sm hidden-xs visible-lg visible-md" title="Noter la question">Noter la question <i className="fa fa-star fa-fw"></i></span>
                                            <span className="visible-sm visible-xs hidden-lg hidden-md" title="Noter la question"><i className="fa fa-star fa-fw"></i></span>
                                        </button>                        
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4 text-center">
                                        <button type="button" className="btn btn-success" onClick={this.addquest}>
                                            <span className="hidden-sm hidden-xs visible-lg visible-md" title="Ajouter la question à un questionnaire">Ajouter la question <i className="fa fa-plus fa-fw"></i></span>
                                            <span className="visible-sm visible-xs hidden-lg hidden-md" title="Ajouter la question à un questionnaire"><i className="fa fa-plus fa-fw"></i></span>
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    {/* Titre Question */}
                    <div className="row pt-10">
                        <div className="col-lg-10 col-lg-offset-1">
                            <h3 className=""><i className="fa fa-question-circle"/> Question</h3>                        
                        </div>
                    </div>
                    {/* Nom de la question (level, catégorie et thème) */}
                    <div className="row">
                        <div className="col-lg-10 col-lg-offset-1">
                            <h3 className="text-muted"><span className={bibli.getCircleClasses(this.state.question.color)}/> [{this.state.question.level}] {this.state.question.category} - {this.state.question.theme}</h3>                        
                        </div>
                    </div>
                    {/* Note et avis */}
                    <div className="row text-muted">
                        <div className="col-lg-10 col-lg-offset-1 text-right">
                            {this.state.question.note}/5<i className="fa fa-star fa-fw pr-10"></i> {this.state.question.avis} avis
                        </div>
                    </div>
                    {/* Encadré de la question et question */}
                    <div className="row pt-10">
                        <div className="col-lg-10 col-lg-offset-1 border-question panel panel-default">
                            <div className="text-muted pt-10 pb-10">
                                {this.state.question.question}
                            </div>                        
                        </div>
                    </div>
                    {/* Titre réponse */}
                    <div className="row">
                        <div className="col-lg-10 col-lg-offset-1">
                            <h3 className=""><i className="fa fa-check-circle fa-fw"/> Réponse</h3>                        
                        </div>
                    </div>
                    {/* Encadré de la réponse et réponse */}
                    <div className="row pt-10">
                        <div className="col-lg-10 col-lg-offset-1 border-question panel panel-default">
                            <div className="text-muted pt-25 pb-10">
                                {this.showResponse(this.state.question.response)}
                            </div>                        
                        </div>
                    </div>
                    {/* Titre Informations */}
                    <div className="row">
                        <div className="col-lg-10 col-lg-offset-1">
                            <h3 className=""><i className="fa fa-info-circle"/> Informations</h3>                        
                        </div>
                    </div>
                    {/* Contenu des informations sur la question */}
                    <div className="row pt-10">
                        <div className="col-lg-10 col-lg-offset-1 border-question panel panel-default">
                            <div className="row pt-25">
                                <div className="col-lg-10 col-lg-offset-1 text-center text-muted">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            {/* Affiché sur grand écran*/}
                                            <div className="row visible-lg visible-md hidden-xs hidden-sm">
                                                <h5>Note moyenne de la question</h5>
                                                <div>{this.state.question.note}/5</div>
                                            </div>
                                            {/* Affiché sur petit écran*/}
                                            <div className="row hidden-lg hidden-md visible-xs visible-sm">
                                                <h6>Note moyenne de la question</h6>
                                                <div className="small">{this.state.question.note}/5</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            {/* Affiché sur grand écran*/}
                                            <div className="row visible-lg visible-md hidden-xs hidden-sm">
                                                <h5>Nombre de personnes ayant noté cette question</h5>
                                                {this.state.question.avis}
                                            </div>
                                            {/* Affiché sur petit écran*/}
                                            <div className="row hidden-lg hidden-md visible-xs visible-sm">
                                                <h6>Note moyenne de la question</h6>
                                                <div className="small" >{this.state.question.note}/5</div>
                                            </div>
                                        </div>
                                    </div>                           
                                </div>
                            </div>
                            <div className="row pb-10">
                                <div className="col-lg-10 col-lg-offset-1 text-center text-muted">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            {/* Affiché sur grand écran*/}
                                            <div className="row visible-lg visible-md hidden-xs hidden-sm">
                                                <h5>Nombre de personnes ayant utilisé cette question</h5>
                                                <div>{this.state.question.uses}</div>
                                            </div>
                                            {/* Affiché sur petit écran*/}
                                            <div className="row hidden-lg hidden-md visible-xs visible-sm">
                                                <h6>Nombre de personnes ayant utilisé cette question</h6>
                                                <div className="small">{this.state.question.uses}</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            {/* Affiché sur grand écran*/}
                                            <div className="row visible-lg visible-md hidden-xs hidden-sm">
                                                <h5>Nombre de commentaires pour cette question</h5>
                                                <div>{this.state.question.comments}</div>
                                            </div>
                                            {/* Affiché sur petit écran*/}
                                            <div className="hidden-lg hidden-md visible-xs visible-sm">
                                                <h6>Nombre de personnes ayant utilisé cette question</h6>
                                                <div className="small">{this.state.question.comments}</div>
                                            </div>
                                        </div>
                                    </div>                           
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Informations de modifications */}
                    <div className="row pt-10">
                        <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-xs-12 col-sm-12">
                            <div className="text-black small"><i>Dernière modification par <Link to={"/Logged/Profile/" + this.state.question.accountId}>{this.state.question.login}</Link>, le <b>{this.state.question.lastModified}</b></i></div>
                        </div>
                    </div>
                    {/* Titre Commentaires */}
                    <div className="row pt-10">
                        <div className="col-lg-10 col-lg-offset-1">
                            <h3 className=""><i className="fa fa-comments"/> Commentaires <span className="badge badge-dark">{this.state.comments.length}</span> <span className="small text-muted no-underline"><Link to={"/Logged/Commentary/" + this.props.match.params.id}><span className="text-muted small">voir plus</span></Link></span> </h3>                     
                        </div>
                    </div>
                    {/* Encadré commentaires */}
                    <div className="row pt-10 form-group">
                        <div className="col-lg-offset-1 col-lg-10">
                            <div className="panel panel-default">
                                <div className="panel-body body-panel">
                                    <ul className="chat">
                                        {this.state.comments.map((comment) =>
                                            <Commentaire 
                                                key = {"998"+comment.id}
                                                id = {comment.id}
                                                text = {comment.text}
                                                owner = {comment.owner}
                                                ownerid = {comment.ownerid}
                                                date = {comment.date}
                                                image = {Image}
                                            />
                                        )}
                                    </ul>
                                </div>
                                <div className="panel-footer clearfix">
                                    <div className="row">
                                        <div className="col-md-10">
                                            <textarea id="contentComment" placeholder="Ecrivez votre commentaire" className="form-control" rows="2"></textarea>
                                        </div>
                                        <div className="col-md-2">
                                            <button className="btn btn-primary btn-lg btn-block text-center" id="btn-chat" onClick={this.sendComment}>Envoyer</button>
                                        </div>
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

export default DisplayQuestionPage;