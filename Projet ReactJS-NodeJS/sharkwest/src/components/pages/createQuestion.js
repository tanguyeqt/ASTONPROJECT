import React, { Component } from 'react';
import LevelChoices from '../Model/LevelChoices';
import $ from 'jquery';
import { APIURL } from '../../config-connections';

class CreateQuestionPage extends Component 
{
    constructor() {
        super();
        var id = localStorage.getItem('id');
        this.state = {id: id, levels: []};
        this.addSimpleQuestion = this.addSimpleQuestion.bind(this);
        this.addMultipleChoicesQuestion = this.addMultipleChoicesQuestion.bind(this);
        this.addSimpleChoiceQuestion = this.addSimpleChoiceQuestion.bind(this);
    }

    componentWillMount() {
        // Récupération de tous les niveaux
        fetch(APIURL + '/Grade/GetAll', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET'
        }})
        .then(results => 
        {
            return results.json();
        })
        .then(data => 
        {
            if(data.status === "200")
            {
                this.setState({
                    id: this.state.id,
                    levels: data.data
                })
            }
        });
    }

    addSimpleQuestion() {
        var grad = $('#selectLevel1').val();
        var color = $('#selectColor1').val();
        var category = $('#myCategory1').val();
        var theme = $('#myTheme1').val();
        var difficulty = $("input:radio[name='difficultyRadio1']:checked").val();
        var question = $('#question1').val();
        var response = $('#simpleresponse1').val();

        var errorMsg = "";

        if(grad === "0")
            errorMsg += "<li>Niveau</li>";
        if(category === "")
            errorMsg += "<li>Catégorie</li>";
        if(theme === "")
            errorMsg += "<li>Thème</li>";
        if(difficulty === undefined)
            errorMsg += "<li>Difficulté</li>";
        if(question === "")
            errorMsg += "<li>Question</li>";
        if(response === "")
            errorMsg += "<li>Réponse</li>";
        
        if(errorMsg === "")
        {
            fetch(APIURL + '/Question/CreateQuestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST'
                },
                body: JSON.stringify({
                    color: color,
                    grade: grad,
                    category: category,
                    theme: theme,
                    account: this.state.id,
                    difficulty: difficulty,
                    question: question,
                    response: JSON.stringify(
                    {
                        typeresponse: 1,
                        correctresponse: 
                        [
                            response
                        ],
                        incorrectresponse: []
                    })                    
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
                    $('#msgInfos1').text(data.message);
                    $('#msgInfos1').addClass('text-success');
                    $('#msgInfos1').removeClass('text-danger');
                }
                else
                {
                    $('#msgInfos1').text(data.message);
                    $('#msgInfos1').removeClass('text-success');
                    $('#msgInfos1').addClass('text-danger');
                }
            })
        }
        else
        {
            $('#msgInfos1').html("Les éléments suivants ne sont pas renseignés : <ul>" + errorMsg + "</ul>");
            $('#msgInfos1').removeClass('text-success');
            $('#msgInfos1').addClass('text-danger');
        }
        
    }

    addMultipleChoicesQuestion() {
        var grad = $('#selectLevel2').val();
        var color = $('#selectColor2').val();
        var category = $('#myCategory2').val();
        var theme = $('#myTheme2').val();
        var difficulty = $("input:radio[name='difficultyRadio2']:checked").val();
        var question = $('#question2').val();

        var errorMsg = "";

        if(grad === "0")
            errorMsg += "<li>Niveau</li>";
        if(category === "")
            errorMsg += "<li>Catégorie</li>";
        if(theme === "")
            errorMsg += "<li>Thème</li>";
        if(difficulty === undefined)
            errorMsg += "<li>Difficulté</li>";
        if(question === "")
            errorMsg += "<li>Question</li>";
        
        if(errorMsg === "")
        {
            var res = [];
            var nores = [];
            var cpt = 0;
            var isOneChecked = false;
            var isOk = true;

            $(".checkbox").each(function () {
                var val = $(this).find('textarea')[0].value;

                if(val !== "")
                {
                    if($(this).find('input')[0].checked)
                    {
                        res.push(val);
                        isOneChecked = true;
                    }
                    else
                        nores.push(val);

                    cpt++;
                }
            });

            if(!isOneChecked)
            {
                $('#msgInfos2').text("Il faut sélectionner au minimum un réponse valable pour la question.");
                $('#msgInfos2').removeClass('text-success');
                $('#msgInfos2').addClass('text-danger');
                return;
            }
            if(cpt < 2)
            {
                $('#msgInfos2').text("Il faut remplir au minimum deux réponses possibles afin de poster la question.");
                $('#msgInfos2').removeClass('text-success');
                $('#msgInfos2').addClass('text-danger');
                return;
            }
            if(!isOk)
            {
                $('#msgInfos2').text("Il faut remplir au minimum deux réponses possibles afin de poster la question.");
                $('#msgInfos2').removeClass('text-success');
                $('#msgInfos2').addClass('text-danger');
                return;
            }
            
            var response =
            {
                typeresponse: 2,
                correctresponse: res,            
                incorrectresponse: nores
            }

            fetch(APIURL + '/Question/CreateQuestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST'
                },
                body: JSON.stringify({
                    color: color,
                    grade: grad,
                    category: category,
                    theme: theme,
                    account: this.state.id,
                    difficulty: difficulty,
                    question: question,
                    response: JSON.stringify(response)               
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
                    $('#msgInfos2').text(data.message);
                    $('#msgInfos2').addClass('text-success');
                    $('#msgInfos2').removeClass('text-danger');
                }
                else
                {
                    $('#msgInfos2').text(data.message);
                    $('#msgInfos2').removeClass('text-success');
                    $('#msgInfos2').addClass('text-danger');
                }
            });
        }
        else
        {
            $('#msgInfos2').html("Les éléments suivants ne sont pas renseignés : <ul>" + errorMsg + "</ul>");
            $('#msgInfos2').removeClass('text-success');
            $('#msgInfos2').addClass('text-danger');
        }
    }

    addSimpleChoiceQuestion() {
        var grad = $('#selectLevel3').val();
        var color = $('#selectColor3').val();
        var category = $('#myCategory3').val();
        var theme = $('#myTheme3').val();
        var difficulty = $("input:radio[name='difficultyRadio3']:checked").val();
        var question = $('#question3').val();
        
        var errorMsg = "";

        if(grad === "0")
            errorMsg += "<li>Niveau</li>";
        if(category === "")
            errorMsg += "<li>Catégorie</li>";
        if(theme === "")
            errorMsg += "<li>Thème</li>";
        if(difficulty === undefined)
            errorMsg += "<li>Difficulté</li>";
        if(question === "")
            errorMsg += "<li>Question</li>";
        
        if(errorMsg === "")
        {
            var res = [];
            var nores = [];
            var isOneChecked = false;

            $(".radio").each(function () {
                var val = $(this).find('textarea')[0].value;
    
                if(val !== "")
                {
                    if($(this).find('input')[0].checked)
                    {
                        res.push(val);
                        isOneChecked = true;
                    }
                    else
                        nores.push(val);
                }
            });

            if(!isOneChecked)
            {
                $('#msgInfos3').text("Il faut sélectionner une réponse valable pour la question.");
                $('#msgInfos3').removeClass('text-success');
                $('#msgInfos3').addClass('text-danger');
                return;
            }
            
            var response =
            {
                typeresponse: 3,
                correctresponse: res,            
                incorrectresponse: nores
            }

            fetch(APIURL + '/Question/CreateQuestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST'
                },
                body: JSON.stringify({
                    color: color,
                    grade: grad,
                    category: category,
                    theme: theme,
                    account: this.state.id,
                    difficulty: difficulty,
                    question: question,
                    response: JSON.stringify(response)               
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
                    $('#msgInfos3').text(data.message);
                    $('#msgInfos3').addClass('text-success');
                    $('#msgInfos3').removeClass('text-danger');
                }
                else
                {
                    $('#msgInfos3').text(data.message);
                    $('#msgInfos3').removeClass('text-success');
                    $('#msgInfos3').addClass('text-danger');
                }
            });
        }
        else
        {
            $('#msgInfos3').html("Les éléments suivants ne sont pas renseignés : <ul>" + errorMsg + "</ul>");
            $('#msgInfos3').removeClass('text-success');
            $('#msgInfos3').addClass('text-danger');
        }    
    }

    render() 
    {
        return (        
            <div className="container">
                <ol className="breadcrumb">
                    <li><i className="fa fa-home fa-fw"></i></li>
                    <li className="active">Créer une question</li>
                </ol>
                <div className="row pt-10">
                    <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                        <ul className="nav nav-pills">
                            <li className="active">
                                <a href="#simple-question" data-toggle="tab">Question simple</a>
                            </li>
                            <li>
                                <a href="#multiple-question" data-toggle="tab">Question à choix multiple</a>
                            </li>
                            <li>
                                <a href="#single-question" data-toggle="tab">Question à choix unique</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane fade in active" id="simple-question">
                                <div className="row pt-10">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="panel panel-default background-white">
                                            <div className="panel-body">
                                                <div className="row">
                                                    <div className="col-lg-10 col-lg-offset-1">
                                                        <div className="form-group">
                                                            <label className="question-label">Niveau*</label>
                                                            <select id="selectLevel1" className="form-control">
                                                                <option value="0">Non renseigné</option>
                                                                {this.state.levels.map((level) =>
                                                                    <LevelChoices
                                                                        key = {level.id}
                                                                        id = {level.id}
                                                                        name = {level.name}
                                                                    />
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-10 col-lg-offset-1">
                                                        <div className="form-group">
                                                            <label className="question-label">Couleur de la carte</label>
                                                            <select id="selectColor1" className="form-control select-color-creation-question">
                                                                <option value="primary" className="color-bleu" >Bleu</option>
                                                                <option value="red" className="color-red">Rouge</option>
                                                                <option value="green" className="color-green">Vert</option>
                                                                <option value="yellow" className="color-yellow">Jaune</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-10 col-lg-offset-1">
                                                        <div className="form-group">
                                                            <label className="question-label">Catégorie*</label>
                                                            <input id="myCategory1" className="form-control" placeholder="Entrez la catégorie de la question" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-10 col-lg-offset-1">
                                                        <div className="form-group">
                                                            <label className="question-label">Thème*</label>
                                                            <input id="myTheme1" className="form-control" placeholder="Entrez le thème de la question" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col-lg-10 col-lg-offset-1">                                                            
                                                            <label className="question-label">Difficulté*</label>
                                                            <div className="row pt-10">
                                                                <div className="col-lg-1"></div>
                                                                <div className="col-lg-2">
                                                                    <div className="radio-inline">
                                                                        <label className="question-label">
                                                                            <input type="radio" name="difficultyRadio1" id="optionsRadios1" value="1"/>
                                                                            <span className="grey">Très facile</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="radio-inline">
                                                                        <label className="question-label">
                                                                            <input type="radio" name="difficultyRadio1" id="optionsRadios2" value="2"/>
                                                                            <span className="grey">Facile</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="radio-inline">
                                                                        <label className="question-label">
                                                                            <input type="radio" name="difficultyRadio1" id="optionsRadios3" value="3"/>
                                                                            <span className="grey">Moyen</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="radio-inline">
                                                                        <label className="question-label">
                                                                            <input type="radio" name="difficultyRadio1" id="optionsRadios3" value="4"/>
                                                                            <span className="grey">Difficile</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="radio-inline">
                                                                        <label className="question-label">
                                                                            <input type="radio" name="difficultyRadio1" id="optionsRadios3" value="5"/>
                                                                            <span className="grey">Très difficile</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row pt-10">
                                                    <div className="col-lg-10 col-lg-offset-1">
                                                        <div className="form-group">
                                                            <label className="question-label">Question*</label>
                                                            <textarea id="question1" className="form-control" placeholder="Ecrivez l'intitulé de votre question" rows="6"></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-10 col-lg-offset-1">
                                                        <div className="form-group">
                                                            <label className="question-label">Réponse*</label>
                                                            <textarea id="simpleresponse1" placeholder="Ecrivez la réponse de la question" className="form-control" rows="6"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row pt-10">
                                                    <div className="col-lg-8 col-lg-offset-2">
                                                        <div className="row text-center pagination-centered">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                <button type="reset" className="btn btn-warning">
                                                                    <i className="fa fa-times"></i> Remettre à zéro
                                                                </button>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                <button type="submit" className="btn btn-success" onClick={this.addSimpleQuestion}>
                                                                    <i className="fa fa-check"></i> Créer
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row pt-50">
                                                    <div className="col-lg-8 col-lg-offset-2">
                                                        <label id="msgInfos1"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="multiple-question">
                                <div className="row pt-10">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="panel panel-default background-white">
                                            <div className="panel-body">
                                                <div className="row">
                                                    <div className="col-lg-10 col-lg-offset-1">
                                                        <div className="form-group">
                                                            <label className="question-label">Niveau*</label>
                                                            <select id="selectLevel2" className="form-control">
                                                                <option value="0">Non renseigné</option>
                                                                {this.state.levels.map((level) =>
                                                                    <LevelChoices
                                                                        key = {level.id}
                                                                        id = {level.id}
                                                                        name = {level.name}
                                                                    />
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-10 col-lg-offset-1">
                                                        <div className="form-group">
                                                            <label className="question-label">Couleur de la carte</label>
                                                            <select  id="selectColor2" className="form-control select-color-creation-question">
                                                                <option value="primary" className="color-bleu" >Bleu</option>
                                                                <option value="red" className="color-red">Rouge</option>
                                                                <option value="green" className="color-green">Vert</option>
                                                                <option value="yellow" className="color-yellow">Jaune</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-10 col-lg-offset-1">
                                                        <div className="form-group">
                                                            <label className="question-label">Catégorie*</label>
                                                            <input id="myCategory2" className="form-control" placeholder="Entrez la catégorie de la question" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-10 col-lg-offset-1">
                                                        <div className="form-group">
                                                            <label className="question-label">Thème*</label>
                                                            <input id="myTheme2" className="form-control" placeholder="Entrez le thème de la question" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col-lg-10 col-lg-offset-1">                                                            
                                                            <label className="question-label">Difficulté*</label>
                                                            <div className="row pt-10">
                                                                <div className="col-lg-1"></div>
                                                                <div className="col-lg-2">
                                                                    <div className="radio-inline">
                                                                        <label className="question-label">
                                                                            <input type="radio" name="difficultyRadio2" id="optionsRadios1" value="1"/>
                                                                            <span className="grey">Très facile</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="radio-inline">
                                                                        <label className="question-label">
                                                                            <input type="radio" name="difficultyRadio2" id="optionsRadios2" value="2"/>
                                                                            <span className="grey">Facile</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="radio-inline">
                                                                        <label className="question-label">
                                                                            <input type="radio" name="difficultyRadio2" id="optionsRadios3" value="3"/>
                                                                            <span className="grey">Moyen</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="radio-inline">
                                                                        <label className="question-label">
                                                                            <input type="radio" name="difficultyRadio2" id="optionsRadios3" value="4"/>
                                                                            <span className="grey">Difficile</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="radio-inline">
                                                                        <label className="question-label">
                                                                            <input type="radio" name="difficultyRadio2" id="optionsRadios3" value="5"/>
                                                                            <span className="grey">Très difficile</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row pt-10">
                                                    <div className="col-lg-10 col-lg-offset-1">
                                                        <div className="form-group">
                                                            <label className="question-label">Question*</label>
                                                            <textarea id="question2" className="form-control" placeholder="Ecrivez l'intitulé de votre question" rows="6"></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-10 col-lg-offset-1">
                                                        <div id="multipleresponse" className="form-group">
                                                            <label className="question-label">Réponses*</label>
                                                            <div className="checkbox" name="multipleresponse">
                                                                <label className="question-label">
                                                                    <input type="checkbox"/>
                                                                    <textarea className="form-control" placeholder="Entrez une réponse" rows="1" cols="600"></textarea>
                                                                </label>
                                                            </div>
                                                            <div className="checkbox" name="multipleresponse">
                                                                <label className="question-label">
                                                                    <input type="checkbox"/>
                                                                    <textarea className="form-control" placeholder="Entrez une réponse" rows="1" cols="600"></textarea>
                                                                </label>
                                                            </div>
                                                            <div className="checkbox" name="multipleresponse">
                                                                <label className="question-label">
                                                                    <input type="checkbox"/>
                                                                    <textarea className="form-control" placeholder="Entrez une réponse" rows="1" cols="600"></textarea>
                                                                </label>
                                                            </div>
                                                            <div className="checkbox" name="multipleresponse">
                                                                <label className="question-label">
                                                                    <input type="checkbox"/>
                                                                    <textarea className="form-control" placeholder="Entrez une réponse" rows="1" cols="600"></textarea>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row pt-10">
                                                    <div className="col-lg-8 col-lg-offset-2">
                                                        <div className="row text-center pagination-centered">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                <button type="reset" className="btn btn-warning">
                                                                    <i className="fa fa-times"></i> Remettre à zéro
                                                                </button>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                <button type="submit" className="btn btn-success" onClick={this.addMultipleChoicesQuestion}>
                                                                    <i className="fa fa-check"></i> Créer
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row pt-50">
                                                    <div className="col-lg-8 col-lg-offset-2">
                                                        <label id="msgInfos2"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="single-question">
                                <div className="row pt-10">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="panel panel-default background-white">
                                            <div className="panel-body">
                                                <div className="row">
                                                    <div className="col-lg-10 col-lg-offset-1">
                                                        <div className="form-group">
                                                            <label className="question-label">Niveau*</label>
                                                            <select id="selectLevel3" className="form-control">
                                                                <option value="0">Non renseigné</option>
                                                                {this.state.levels.map((level) =>
                                                                    <LevelChoices
                                                                        key = {level.id}
                                                                        id = {level.id}
                                                                        name = {level.name}
                                                                    />
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-10 col-lg-offset-1">
                                                        <div className="form-group">
                                                            <label className="question-label">Couleur de la carte</label>
                                                            <select id="selectColor3" className="form-control select-color-creation-question">
                                                                <option value="primary" className="color-bleu" >Bleu</option>
                                                                <option value="red" className="color-red">Rouge</option>
                                                                <option value="green" className="color-green">Vert</option>
                                                                <option value="yellow" className="color-yellow">Jaune</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-10 col-lg-offset-1">
                                                        <div className="form-group">
                                                            <label className="question-label">Catégorie*</label>
                                                            <input id="myCategory3" className="form-control" placeholder="Entrez la catégorie de la question" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-10 col-lg-offset-1">
                                                        <div className="form-group">
                                                            <label className="question-label">Thème*</label>
                                                            <input id="myTheme3" className="form-control" placeholder="Entrez le thème de la question" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col-lg-10 col-lg-offset-1">                                                            
                                                            <label className="question-label">Difficulté*</label>
                                                            <div className="row pt-10">
                                                                <div className="col-lg-1"></div>
                                                                <div className="col-lg-2">
                                                                    <div className="radio-inline">
                                                                        <label className="question-label">
                                                                            <input type="radio" name="difficultyRadio3" id="optionsRadios1" value="1"/>
                                                                            <span className="grey">Très facile</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="radio-inline">
                                                                        <label className="question-label">
                                                                            <input type="radio" name="difficultyRadio3" id="optionsRadios2" value="2"/>
                                                                            <span className="grey">Facile</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="radio-inline">
                                                                        <label className="question-label">
                                                                            <input type="radio" name="difficultyRadio3" id="optionsRadios3" value="3"/>
                                                                            <span className="grey">Moyen</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="radio-inline">
                                                                        <label className="question-label">
                                                                            <input type="radio" name="difficultyRadio3" id="optionsRadios3" value="4"/>
                                                                            <span className="grey">Difficile</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="radio-inline">
                                                                        <label className="question-label">
                                                                            <input type="radio" name="difficultyRadio3" id="optionsRadios3" value="5"/>
                                                                            <span className="grey">Très difficile</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-1"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row pt-10">
                                                    <div className="col-lg-10 col-lg-offset-1">
                                                        <div className="form-group">
                                                            <label className="question-label">Question*</label>
                                                            <textarea id="question3" className="form-control" placeholder="Ecrivez l'intitulé de votre question" rows="6"></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-10 col-lg-offset-1">
                                                        <div className="form-group">
                                                            <label className="question-label">Réponse*</label>
                                                            <div className="radio">
                                                                <label className="question-label">
                                                                    <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1"/>
                                                                    <textarea className="form-control" placeholder="Entrez une réponse" rows="1" cols="600"></textarea>
                                                                </label>
                                                            </div>
                                                            <div className="radio">
                                                                <label className="question-label">
                                                                    <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2"/>
                                                                    <textarea className="form-control" placeholder="Entrez une réponse" rows="1" cols="600"></textarea>
                                                                </label>
                                                            </div>
                                                            <div className="radio">
                                                                <label className="question-label">
                                                                    <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3"/>
                                                                    <textarea className="form-control" placeholder="Entrez une réponse" rows="1" cols="600"></textarea>
                                                                </label>
                                                            </div>
                                                            <div className="radio">
                                                                <label className="question-label">
                                                                    <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3"/>
                                                                    <textarea className="form-control" placeholder="Entrez une réponse" rows="1" cols="600"></textarea>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row pt-10">
                                                    <div className="col-lg-8 col-lg-offset-2">
                                                        <div className="row text-center pagination-centered">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                <button type="reset" className="btn btn-warning">
                                                                    <i className="fa fa-times"></i> Remettre à zéro
                                                                </button>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                <button type="submit" className="btn btn-success" onClick={this.addSimpleChoiceQuestion}>
                                                                    <i className="fa fa-check"></i> Créer
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row pt-50">
                                                    <div className="col-lg-8 col-lg-offset-2">
                                                        <label id="msgInfos3"></label>
                                                    </div>
                                                </div>
                                            </div>
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
export default CreateQuestionPage;