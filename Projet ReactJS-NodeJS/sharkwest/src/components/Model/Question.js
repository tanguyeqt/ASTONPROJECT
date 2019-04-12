import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'react-popup';
import Rater from 'react-stars';
import QuestionnaireChoices from './QuestionnaireChoices';
import $ from 'jquery';
import { APIURL } from '../../config-connections';

class Question extends React.Component
{
    constructor()
    {
        super();
        const id = localStorage.getItem('id');

        this.state = {id: id, rate: 0, questionnaires: []};
        this.share = this.share.bind(this);
        this.rate = this.rate.bind(this);
        this.addquest = this.addquest.bind(this);
        this.ratingChanged = this.ratingChanged.bind(this);
        this.showResponse = this.showResponse.bind(this);
        this.getQuestionnaires = this.getQuestionnaires.bind(this);
        this.deletequest = this.deletequest.bind(this);
    }

    componentWillMount() {
        
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
                    }),
                    async: false
                })
                .then(results => 
                {
                    return results.json();
                })
                .then(data => 
                {
                    if (data.status === '200')
                    {
                        let questionnaires = data.data;
                        this.setState({
                            id: this.state.id,
                            rate: this.state.rate,
                            questionnaires: questionnaires
                        })
                    }
                });
            };

        await request();
    }

    ratingChanged = (newRating) =>{
        this.setState({
            id: this.state.id,
            rate: newRating,
            questionnaires: this.state.questionnaires
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
                                idquestion: k.props.id,
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
                            <input id="url" type="text" className="mm-popup__input" value={"localhost:3000/Logged/Question/" + this.props.id} readOnly/>
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
        var id = this.props.id;
        await this.getQuestionnaires(id);

        Popup.create({
            className: 'success',
            content:
                <div className="row">
                    <h2 className="pb-10 text-center">Questionnaires</h2>
                    <div className="col-lg-10 col-lg-offset-1 quest-body">
                        <div className="form-group">
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

                        var selected = $('.form-group input:radio:checked').val();

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
                                    idquestion: k.props.id,
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
        },true);
    }

    deletequest() {
        var idquestionnaire = this.props.context;
        var idquestion = this.props.id;

        Popup.create({
            className: 'success',
            content: 
                <div>
                    Êtes-vous sûr de vouloir retirer la question de votre questionnaire ?
                </div>,
            buttons: {
                right: [{
                    text: 'OK',
                    className: 'success',
                    key: 'enter',
                    action: function () {
                        fetch(APIURL + '/Question/DeleteQuestionFromQuestionnaire', {
                            method: 'POST',
                            async: false,
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Methods': 'POST'
                            },
                            body: JSON.stringify({
                                idquestion: idquestion,
                                idquestionnaire: idquestionnaire
                            })
                        })
                        .then(results => 
                        {
                            return results.json();
                        })
                        .then(data =>
                        {
                            Popup.close();
                            Popup.create({
                                className: 'success',
                                content:
                                    data.message,
                                buttons: {
                                    right: [{
                                        text: 'OK',
                                        className: 'success',
                                        key: 'enter',
                                        action: function () {
                                            window.location.reload();
                                        }
                                    }]
                                }
                            },true);
                            setTimeout(function () {
                                window.location.reload();
                            }, 2000);
                        });
                    }
                }],
                left: [{
                    text: 'Annuler',
                    className: 'warning',
                    key: 'escape',
                    action: function () {
                        Popup.close();
                    }
                }]
            }
        }, true);
    }

    showResponse() {
        var jsonResponse = JSON.parse(this.props.response);
        if (jsonResponse.typeresponse === 1)
        {
            return (
                <div className="prelike">{jsonResponse.correctresponse[0]}</div>
            )
        }
        else if (jsonResponse.typeresponse === 2)
        {
            return (
                <div className="prelike">
                    {jsonResponse.correctresponse.map((correct) =>
                        <div key={"34"+correct}><input type="checkbox" checked={true} readOnly/> {correct}</div>)}
                    {jsonResponse.incorrectresponse.map((incorrect) =>
                        <div key={"34"+incorrect}><input type="checkbox" checked={false} readOnly/> {incorrect}</div>)}
                </div>
            )
        }
        else if (jsonResponse.typeresponse === 3)
        {
            return (
                <div className="prelike">
                    <form action="">
                        <input type="radio" name="rep" checked={true} readOnly/> {jsonResponse.correctresponse[0]} <br />
                        {jsonResponse.incorrectresponse.map((incorrect) =>
                            <div key={"34"+incorrect}><input type="radio" name="rep" checked={false} readOnly/> {incorrect} <br /></div>
                        )}
                    </form>
                </div>
            )
        }
    }

    render()
    {
        return (
            <div className="row pt-10">
                <Popup
                    className="mm-popup"
                    closeBtn={true}
                    closeHtml={null}
                    defaultOk="Ok"
                    defaultCancel="Annuler"
                    wildClasses={false}
                    escToClose={true} />
                <div /*className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12"*/>
                    <div className={"panel panel-" + this.props.color}>
                        {/* <!-- Header --> */}
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-sm-9 col-md-8">
                                    <i data-toggle="dropdown" className="fa fa-gears fa-fw dropdown-toggle pr-30"></i>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a onClick={this.rate}>
                                                <i className="fa fa-star fa-fw"></i> Noter
                                            </a>
                                        </li>
                                        <li><Link to={"/Logged/Commentary/" + this.props.id}><i className="fa fa-comment fa-fw"></i> Commenter</Link></li>
                                        <li>
                                            <a onClick={this.share}>
                                                <i className="fa fa-share fa-fw"></i> Partager
                                            </a>
                                        </li>
                                        <li>
                                            {
                                                this.props.context == 0 ? 
                                                <a onClick={this.addquest}>
                                                    <i className="fa fa-plus fa-fw"></i> Ajouter
                                                </a> :
                                                <a onClick={this.deletequest}>
                                                    <i className="fa fa-plus fa-fw"></i> Supprimer
                                                </a>
                                            }
                                            
                                        </li>
                                    </ul>
                                    <Link to={"/Logged/Question/" + this.props.id} className="white no-underline">[{this.props.level}] {this.props.category} - {this.props.theme}</Link>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="pb-10">{this.props.question}</div>
                                    {
                                        this.showResponse()
                                    }
                                    <div className="text-muted small">Difficulté : {this.props.difficulty}</div>
                                    <i className="small">Posté par <Link to={"/Logged/Profile/" + this.props.accountId}>{this.props.login}</Link> le {this.props.lastModified}</i> 
                                </div>
                                {
                                    (this.props.context != 0 && this.props.showpoints) ?
                                    <div class="form-group pt-10 col-lg-2 col-md-2 col-sm-4 col-xs-4">
                                        Points : <input type="number" class="form-control" defaultValue={this.props.points}/>
                                    </div> : ""
                                }  
                            </div>
                        </div>
                        <div className="panel-footer">
                            <div className="row">
                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center pagination-centered">
                                    {
                                        this.props.context == 0 ?
                                        <a onClick={this.addquest} title="Ajouter la question à un questionnaire">
                                            <i className="fa fa-plus fa-fw"></i> Ajouter
                                        </a> :
                                        <a onClick={this.deletequest} title="Supprimer la question du questionnaire">
                                            <i className="fa fa-trash fa-fw"></i> Supprimer
                                        </a>
                                    }
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center pagination-centered">
                                    <a onClick={this.rate} title="Note moyenne de la question (nombre d'avis)">
                                        <i className="fa fa-star fa-fw"></i>{this.props.note} ({this.props.avis})
                                    </a>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center pagination-centered">
                                    <Link to={"/Logged/Commentary/" + this.props.id} title="Nombre de commentaires"><i className="fa fa-comments fa-fw"></i> {this.props.comments}</Link>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center pagination-centered">
                                    <div className="text-primary" title="Nombre d'utilisations de la question">
                                        <i className="fa fa-thumb-tack fa-fw"></i> {this.props.uses}
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
export default Question;