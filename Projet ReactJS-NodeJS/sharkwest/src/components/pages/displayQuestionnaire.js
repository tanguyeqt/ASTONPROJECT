import React, { Component } from 'react';
import Question from '../Model/Question';
import { Redirect } from 'react-router';
import Popup from 'react-popup';
import NotFound from './notFound';
import { APIURL } from '../../config-connections';

var pdf = require('../Model/Pdf');
var bibli = require('../Model/Bibliotheque');

class DisplayQuestionnairePage extends Component 
{
    constructor() 
    {
        super();
        var id = localStorage.getItem('id');
        this.state = { id : id, questionnaire : [], questions: [], status: "404", redirect: false};
        this.download = this.download.bind(this);
        this.goToUpdate = this.goToUpdate.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentWillMount() 
    {
        var id = this.props.match.params.id;

        fetch(APIURL + '/Questionnaire/GetQuestionnaire?id=' + id)
        .then(results => 
        {
            return results.json();
        })
        .then(data => 
        {
            let questionnaire = data.data;
            let status = data.status;
            this.setState({
                questionnaire: questionnaire,
                status: status
            })
        })

        fetch(APIURL + '/Questionnaire/GetQuestionnaireQuestions?id=' + id)
        .then(results => 
        {
            return results.json();
        })
        .then(data => 
        {
            let questions = data.data;
            this.setState({
                questions: questions
            })
        })
    }

    download()
    {
        var questionnaire = window.open("","Questionnaire","width=1240, height=500");
        questionnaire.document.write(pdf.getQuestionnaire(this.state.questionnaire, this.state.questions));
        setTimeout(function () {
            questionnaire.print();
        }, 100);
        
        // var correction = window.open("","Correction","menubar=no, status=no, scrollbars=no, menubar=no, width=1240, height=500");
        // correction.document.write(pdf.getQuestionnaire(this.state.questionnaire, this.state.questions));
        // setTimeout(function () {
        //     correction.print();
        // }, 100);
    }

    goToUpdate()
    {
        this.setState({
            redirect: true
        });
    }

    delete()
    {
        var k = this;
        Popup.create({
            className: 'success',
            content: 
                <div>
                    <div className="row pb-10">
                        <div className="col-md-8 col-md-offset-2">
                            <h3>Suppression</h3>
                        </div>
                    </div>
                    <div className="row pb-10">
                        <div className="col-md-8 col-md-offset-2">
                            Êtes-vous certain de vouloir supprimer votre questionnaire ?
                        </div>
                    </div>
                </div>,
            buttons: {
                right: [{
                    text: 'OK',
                    className: 'success',
                    key: 'enter',
                    action: function () {
                        fetch(APIURL + '/Questionnaire/DeleteQuestionnaire?id=' + k.state.questionnaire.id, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Methods': 'DELETE'
                            }
                        })
                        .then(results => 
                        {
                            window.location = "/Logged/MyQuestionnaires";
                        })
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
        },true);
    }

    render() 
    {
        if(this.state.status === "404")
            return <NotFound/>

        if (this.state.redirect)
            return <Redirect push to={"/Logged/updateQuestionnaire/" + this.state.questionnaire.id} />;

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
                    <li>
                        <a href="/Logged/MyQuestionnaires">Mes questionnaires</a>
                    </li>
                    <li className="active">#{this.state.questionnaire.id}</li>
                </ol>
                {/* Nom du questionnaire */}
                <div className="row text-center pagination-centered">
                    <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-xs-12 col-sm-12">
                        <h1 className="background-white panel panel-default pt-10 pb-10" id="element-to-print">{this.state.questionnaire.name}</h1>                        
                    </div>
                </div>
                {/* Boutons d'actions */}
                <div className="pt-10">
                    <div className="row text-center pagination-centered">
                        <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-xs-12 col-sm-12">
                        {
                            (this.state.id === this.state.questionnaire.accountId.toString()) ? 
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4 text-center">
                                    <button onClick={this.download} type="button" className="btn btn-success">
                                        <span className="hidden-sm hidden-xs visible-lg visible-md">Télécharger <i className="fa fa-download"></i></span>
                                        <span className="visible-sm visible-xs hidden-lg hidden-md"><i className="fa fa-download"></i></span>
                                    </button>
                                </div>
                                <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4 text-center">
                                    <button onClick={this.goToUpdate} type="button" className="btn btn-info">
                                        <span className="hidden-sm hidden-xs visible-lg visible-md">Modifier <i className="fa fa-pencil fa-fw"></i></span>
                                        <span className="visible-sm visible-xs hidden-lg hidden-md"><i className="fa fa-pencil fa-fw"></i></span>
                                    </button>                        
                                </div>
                                <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4 text-center">
                                    <button onClick={this.delete} type="button" className="btn btn-danger">
                                        <span className="hidden-sm hidden-xs visible-lg visible-md">Supprimer <i className="fa fa-close fa-fw"></i></span>
                                        <span className="visible-sm visible-xs hidden-lg hidden-md"><i className="fa fa-close fa-fw"></i></span>
                                    </button>
                                </div>
                            </div> :
                            <div className="row">
                                <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
                                    <div className="col-lg-6 col-md-6 col-xs-6 col-sm-6 text-center">
                                        <button onClick={this.download} type="button" className="btn btn-success">
                                            <span className="hidden-sm hidden-xs visible-lg visible-md">Télécharger <i className="fa fa-download"></i></span>
                                            <span className="visible-sm visible-xs hidden-lg hidden-md"><i className="fa fa-download"></i></span>
                                        </button>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-xs-6 col-sm-6 text-center">
                                        <button onClick={this.delete} type="button" className="btn btn-danger">
                                            <span className="hidden-sm hidden-xs visible-lg visible-md">Supprimer <i className="fa fa-close fa-fw"></i></span>
                                            <span className="visible-sm visible-xs hidden-lg hidden-md"><i className="fa fa-close fa-fw"></i></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }
                        </div>
                    </div>
                    {/* Titre Questionnaire */}
                    <div className="row pt-10">
                        <div className="col-lg-10 col-lg-offset-1">
                            <h3 className=""><i className="fa fa-list-alt"/> Questionnaire</h3>                        
                        </div>
                    </div>
                    {/* Level, catégorie et thème */}
                    <div className="row pt-10">
                        <div className="col-lg-10 col-lg-offset-1">
                            <h3 className="text-muted"><span className={bibli.getCircleClasses(this.state.questionnaire.color)}/> [{this.state.questionnaire.level}] {this.state.questionnaire.category} - {this.state.questionnaire.theme}</h3>                        
                        </div>
                    </div>
                    {/* Titre Informations */}
                    <div className="row pt-10">
                        <div className="col-lg-10 col-lg-offset-1">
                            <h3 className=""><i className="fa fa-info-circle"/> Informations</h3>                        
                        </div>
                    </div>
                    {/* Contenu des informations sur le questionnaire */}
                    <div className="row pt-10">
                        <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-xs-12 col-sm-12 background-white panel-default">
                            <div className="row pt-25 pb-30">
                                <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 text-center text-muted">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-6 col-xs-12 col-sm-12">
                                            {/* Affiché sur grand écran*/}
                                            <div className="row visible-lg visible-md hidden-xs hidden-sm">
                                                <h5 className="text-dark">Barême</h5>
                                                <div>{this.state.questionnaire.showPoints === true ? "Affiché - /" + this.state.questionnaire.pointsMax : "Masqué"}</div>
                                            </div>
                                            {/* Affiché sur petit écran*/}
                                            <div className="row hidden-lg hidden-md visible-xs visible-sm">
                                                <h6 className="text-dark">Barême</h6>
                                                <div className="small">{this.state.questionnaire.showPoints === true ? "Affiché - /" + this.state.questionnaire.pointsMax : "Masqué"}</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-xs-12 col-sm-12">
                                            {/* Affiché sur grand écran*/}
                                            <div className="row visible-lg visible-md hidden-xs hidden-sm">
                                                <h5 className="text-dark">Difficulté moyenne</h5>
                                                <div>{this.state.questionnaire.difficultyMoy !== null ? this.state.questionnaire.difficultyMoy : "?"}</div>
                                            </div>
                                            {/* Affiché sur petit écran*/}
                                            <div className="row hidden-lg hidden-md visible-xs visible-sm">
                                                <h6 className="text-dark">Difficulté moyenne</h6>
                                                <div className="small">{this.state.questionnaire.difficultyMoy !== null ? this.state.questionnaire.difficultyMoy : "?"}</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-xs-12 col-sm-12">
                                            {/* Affiché sur grand écran*/}
                                            <div className="row visible-lg visible-md hidden-xs hidden-sm">
                                                <h5 className="text-dark">Borne de difficulté</h5>
                                                <div>{this.state.questionnaire.rangeDifficulty !== null ? this.state.questionnaire.rangeDifficulty.trim() : "?"}</div>
                                            </div>
                                            {/* Affiché sur petit écran*/}
                                            <div className="hidden-lg hidden-md visible-xs visible-sm">
                                                <h6 className="text-dark">Borne de difficulté</h6>
                                                <div className="small">{this.state.questionnaire.rangeDifficulty !== null ? this.state.questionnaire.rangeDifficulty.trim() : "?"}</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-xs-12 col-sm-12">
                                            {/* Affiché sur grand écran*/}
                                            <div className="row visible-lg visible-md hidden-xs hidden-sm">
                                                <h5 className="text-dark">Note minimale</h5>
                                                <div>{this.state.questionnaire.noteMin !== -1 ? Math.round(this.state.questionnaire.noteMin*100)/100 + "/5" : "?"}</div>
                                            </div>
                                            {/* Affiché sur petit écran*/}
                                            <div className="row hidden-lg hidden-md visible-xs visible-sm">
                                                <h6 className="text-dark">Note minimale</h6>
                                                <div className="small">{this.state.questionnaire.noteMin !== -1 ? Math.round(this.state.questionnaire.noteMin*100)/100 + "/5" : "?"}</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-xs-12 col-sm-12">
                                            {/* Affiché sur grand écran*/}
                                            <div className="row visible-lg visible-md hidden-xs hidden-sm">
                                                <h5 className="text-dark">Note moyenne</h5>
                                                <div>{this.state.questionnaire.noteMoy !== -1 ? Math.round(this.state.questionnaire.noteMoy*100)/100 + "/5" : "?"}</div>
                                            </div>
                                            {/* Affiché sur petit écran*/}
                                            <div className="hidden-lg hidden-md visible-xs visible-sm">
                                                <h6 className="text-dark">Note moyenne</h6>
                                                <div className="small">{this.state.questionnaire.noteMoy !== -1 ? Math.round(this.state.questionnaire.noteMoy*100)/100 + "/5" : "?"}</div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-xs-12 col-sm-12">
                                            {/* Affiché sur grand écran*/}
                                            <div className="row visible-lg visible-md hidden-xs hidden-sm">
                                                <h5 className="text-dark">Note maximale</h5>
                                                <div>{this.state.questionnaire.noteMax !== -1 ? Math.round(this.state.questionnaire.noteMax*100)/100 + "/5" : "?"}</div>
                                            </div>
                                            {/* Affiché sur petit écran*/}
                                            <div className="hidden-lg hidden-md visible-xs visible-sm">
                                                <h6 className="text-dark">Note maximale</h6>
                                                <div className="small">{this.state.questionnaire.noteMax !== -1 ? Math.round(this.state.questionnaire.noteMax*100)/100 + "/5" : "?"}</div>
                                            </div>
                                        </div>
                                    </div>                           
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Titre Questions */}
                    <div className="row pt-10">
                        <div className="col-lg-10 col-lg-offset-1">
                            <h3 className=""><i className="fa fa-question-circle"/> Questions</h3>                        
                        </div>
                    </div>
                    {/* QUESTION */}
                    {
                        this.state.questions.length === 0
                        ?
                        <div className="row pt-10 pb-50">
                            <div className="col-lg-10 col-lg-offset-1">
                                Il n'y a aucune question dans ce questionnaire
                            </div>
                        </div>
                        :
                        this.state.questions.map((question) =>
                            <div className="row">
                                <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1">
                                    <Question 
                                        key={"090"+question.id}
                                        id={question.id}
                                        color={question.color} 
                                        level={question.level}
                                        category={question.category}
                                        theme={question.theme}
                                        note={question.note}
                                        question={question.question}
                                        response={question.response}
                                        avis={question.avis}
                                        comments={question.comments}
                                        uses={question.uses}
                                        file={question.file}
                                        accountId={question.accountId}
                                        login={question.login}
                                        lastModified={question.lastModified}
                                        context={this.state.questionnaire.id}
                                        showPoints={this.state.questionnaire.showPoints}
                                        difficulty={question.difficultyText}
                                        points={question.points}
                                        />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}
export default DisplayQuestionnairePage;