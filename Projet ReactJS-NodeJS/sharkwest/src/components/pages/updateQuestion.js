import React, { Component } from 'react';
import LevelChoices from '../Model/LevelChoices';
import Popup from 'react-popup';
import NotFound from './notFound';
import $ from 'jquery';
import { APIURL } from '../../config-connections';

var bibli = require('../Model/Bibliotheque');

class UpdateQuestionPage extends Component 
{
    constructor() {
        super();
        var id = localStorage.getItem('id');
        this.state = {id: id, levels: [], status: "404"};
        this.updateSimpleQuestion = this.updateSimpleQuestion.bind(this);
        this.updateMultipleChoicesQuestion = this.updateMultipleChoicesQuestion.bind(this);
        this.updateSimpleChoiceQuestion = this.updateSimpleChoiceQuestion.bind(this);
        this.resetQuestion = this.resetQuestion.bind(this);
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

        fetch(APIURL +'/Question/GetQuestion?id=' + this.props.match.params.id, {
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
            let status = data.value.status;
            this.setState({
                question: question,
                status: status
            })
            var response = JSON.parse(question.response);

            var i = 0;
            var a = 0;
            var b = 0;

            if(response.typeresponse === 1)
                $('#simpleresponse').val(response.correctresponse[0]);
            else if(response.typeresponse === 2)
            {
                i=0;
                for(a=0; a<response.correctresponse.length; a++)
                {
                    $(".checkbox").find('input')[i].checked = true;
                    $(".checkbox").find('textarea').eq(i).val(response.correctresponse[a]);
                    i++;
                }
                for(b=0; b<response.incorrectresponse.length; b++)
                {
                    $(".checkbox").find('textarea').eq(i).val(response.incorrectresponse[b]);
                    i++;
                }
            }
            else if(response.typeresponse === 3)
            {
                i = 0;
                for(a=0; a<response.correctresponse.length; a++)
                {
                    $(".radio").find('input')[i].checked = true;
                    $(".radio").find('textarea').eq(i).val(response.correctresponse[a]);
                    i++;
                }
                for(b=0; b<response.incorrectresponse.length; b++)
                {
                    $(".radio").find('textarea').eq(i).val(response.incorrectresponse[b]);
                    i++;
                }
            }

            $('#selectLevel').val(question.levelId);
            $('#myCategory').val(question.category);
            $('#myTheme').val(question.theme);
            var index = parseInt(question.difficulty.toString(),10)-1;
            $("input:radio[name='difficultyRadio']")[index].checked = true;
            $('#question').val(question.question);
            var colorId = bibli.getColorId(question.color);
            $("#selectColor option:eq(" + colorId + ")").attr('selected','true');
        })
    }

    resetQuestion() {
        var response = JSON.parse(this.state.question.response);

        $(".checkbox").each(function () {
            $(this).find('textarea').eq(0).val('');
            $(this).find('input')[0].checked = false;
        });

        $(".radio").each(function () {
            $(this).find('textarea').eq(0).val('');
            $(this).find('input')[0].checked = false;
        });

        var i = 0;
        var a = 0;
        var b = 0;

        if(response.typeresponse === 1)
            $('#simpleresponse').val(response.correctresponse[0]);
        else if(response.typeresponse === 2)
        {
            i = 0;
            for(a=0; a<response.correctresponse.length; a++)
            {
                $(".checkbox").find('input')[i].checked = true;
                $(".checkbox").find('textarea').eq(i).val(response.correctresponse[a]);
                i++;
            }
            for(b=0; b<response.incorrectresponse.length; b++)
            {
                $(".checkbox").find('textarea').eq(i).val(response.incorrectresponse[b]);
                i++;
            }
        }
        else if(response.typeresponse === 3)
        {
            i = 0;
            for(a=0; a<response.correctresponse.length; a++)
            {
                $(".radio").find('input')[i].checked = true;
                $(".radio").find('textarea').eq(i).val(response.correctresponse[a]);
                i++;
            }
            for(b=0; b<response.incorrectresponse.length; b++)
            {
                $(".radio").find('textarea').eq(i).val(response.incorrectresponse[b]);
                i++;
            }
        }

        $('#selectLevel').val(this.state.question.levelid);
        $('#myCategory').val(this.state.question.category);
        $('#myTheme').val(this.state.question.theme);
        var index = parseInt(this.state.question.difficulty.toString(),10)-1;
        $("input:radio[name='difficultyRadio']")[index].checked = true;
        $('#question').val(this.state.question.question);
        var colorId = bibli.getColorId(this.state.question.color);
        $("#selectColor option:eq(" + colorId + ")").attr('selected','true');
    }

    updateSimpleQuestion() {
        var res = $('#simpleresponse').val();
        
        var grad = $('#selectLevel').val();
        var color = $('#selectColor').val();
        var category = $('#myCategory').val();
        var theme = $('#myTheme').val();
        var difficulty = $("input:radio[name='difficultyRadio']:checked").val();
        var question = $('#question').val();

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
        if(res === "")
            errorMsg += "<li>Réponse</li>";
        
        if(errorMsg === "")
        {
            fetch(APIURL + '/Question/UpdateQuestion?id=' + this.state.question.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST'
                },
                body: JSON.stringify({
                    account: this.state.id,
                    color: color,
                    grade: grad,
                    category: category,
                    theme: theme,
                    difficulty: difficulty,
                    question: question,
                    response: JSON.stringify(
                    {
                        typeresponse: 1,
                        correctresponse: 
                        [
                            res
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
                console.log(data);
                if(data.status === "200")
                {
                    $('#msgInfos').text(data.message);
                    $('#msgInfos').addClass('text-success');
                    $('#msgInfos').removeClass('text-danger');
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
            $('#msgInfos').html("Les éléments suivants ne sont pas renseignés : <ul>" + errorMsg + "</ul>");
            $('#msgInfos').removeClass('text-success');
            $('#msgInfos').addClass('text-danger');
        }
    }

    updateMultipleChoicesQuestion() {
        var grad = $('#selectLevel').val();
        var color = $('#selectColor').val();
        var category = $('#myCategory').val();
        var theme = $('#myTheme').val();
        var difficulty = $("input:radio[name='difficultyRadio']:checked").val();
        var question = $('#question').val();

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
                $('#msgInfos').text("Il faut sélectionner au minimum un réponse valable pour la question.");
                $('#msgInfos').removeClass('text-success');
                $('#msgInfos').addClass('text-danger');
                return;
            }
            if(cpt < 2)
            {
                $('#msgInfos').text("Il faut remplir au minimum deux réponses possibles afin de poster la question.");
                $('#msgInfos').removeClass('text-success');
                $('#msgInfos').addClass('text-danger');
                return;
            }
            if(!isOk)
            {
                $('#msgInfos').text("Il faut remplir au minimum deux réponses possibles afin de poster la question.");
                $('#msgInfos').removeClass('text-success');
                $('#msgInfos').addClass('text-danger');
                return;
            }
            
            var response =
            {
                typeresponse: 2,
                correctresponse: res,            
                incorrectresponse: nores
            }

            fetch(APIURL + '/Question/UpdateQuestion?id=' + this.state.question.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST'
                },
                body: JSON.stringify({
                    account: this.state.id,
                    color: color,
                    grade: grad,
                    category: category,
                    theme: theme,
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
                    $('#msgInfos').text(data.message);
                    $('#msgInfos').addClass('text-success');
                    $('#msgInfos').removeClass('text-danger');
                }
                else
                {
                    $('#msgInfos').text(data.message);
                    $('#msgInfos').removeClass('text-success');
                    $('#msgInfos').addClass('text-danger');
                }
            });
        }
        else
        {
            $('#msgInfos').html("Les éléments suivants ne sont pas renseignés : <ul>" + errorMsg + "</ul>");
            $('#msgInfos').removeClass('text-success');
            $('#msgInfos').addClass('text-danger');
        }
    }

    updateSimpleChoiceQuestion() {
        var grad = $('#selectLevel').val();
        var color = $('#selectColor').val();
        var category = $('#myCategory').val();
        var theme = $('#myTheme').val();
        var difficulty = $("input:radio[name='difficultyRadio']:checked").val();
        var question = $('#question').val();
        
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
                $('#msgInfos').text("Il faut sélectionner une réponse valable pour la question.");
                $('#msgInfos').removeClass('text-success');
                $('#msgInfos').addClass('text-danger');
                return;
            }
            
            var response =
            {
                typeresponse: 3,
                correctresponse: res,            
                incorrectresponse: nores
            }

            fetch(APIURL + '/Question/UpdateQuestion?id=' + this.state.question.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST'
                },
                body: JSON.stringify({
                    account: this.state.id,
                    color: color,
                    grade: grad,
                    category: category,
                    theme: theme,
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
                    $('#msgInfos').text(data.message);
                    $('#msgInfos').addClass('text-success');
                    $('#msgInfos').removeClass('text-danger');
                }
                else
                {
                    $('#msgInfos').text(data.message);
                    $('#msgInfos').removeClass('text-success');
                    $('#msgInfos').addClass('text-danger');
                }
            });
        }
        else
        {
            $('#msgInfos').html("Les éléments suivants ne sont pas renseignés : <ul>" + errorMsg + "</ul>");
            $('#msgInfos').removeClass('text-success');
            $('#msgInfos').addClass('text-danger');
        }
    }

    render() 
    {
        if (this.state.status === "404")
            return <NotFound/>
        
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
                        <a href="/Logged/MyQuestions">Mes Questions</a>
                    </li>
                    <li>
                        <a href={"/Logged/Question/" + this.state.question.id}>#{this.state.question.id}</a>
                    </li>
                    <li className="active">Modifier la question</li>
                </ol>
                <div className="row pt-10">
                    <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                        <div className="tab-content">
                        {
                            JSON.parse(this.state.question.response).typeresponse === 1
                            ?
                            <div className="tab-pane fade in active">
                                <div className="row pt-10">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="panel panel-default">
                                            <div className="panel-body">
                                                <div className="row">
                                                    <div className="col-lg-10 col-lg-offset-1">
                                                        <div className="form-group">
                                                            <label className="question-label">Niveau*</label>
                                                            <select id="selectLevel" className="form-control">
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
                                                            <select id="selectColor" className="form-control select-color-creation-question">
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
                                                            <input id="myCategory" className="form-control" placeholder="Entrez la catégorie de la question" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-10 col-lg-offset-1">
                                                        <div className="form-group">
                                                            <label className="question-label">Thème*</label>
                                                            <input id="myTheme" className="form-control" placeholder="Entrez le thème de la question" />
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
                                                                            <input type="radio" name="difficultyRadio" id="optionsRadios1" value="1"/>
                                                                            <span className="grey">Très facile</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="radio-inline">
                                                                        <label className="question-label">
                                                                            <input type="radio" name="difficultyRadio" id="optionsRadios2" value="2"/>
                                                                            <span className="grey">Facile</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="radio-inline">
                                                                        <label className="question-label">
                                                                            <input type="radio" name="difficultyRadio" id="optionsRadios3" value="3"/>
                                                                            <span className="grey">Moyen</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="radio-inline">
                                                                        <label className="question-label">
                                                                            <input type="radio" name="difficultyRadio" id="optionsRadios3" value="4"/>
                                                                            <span className="grey">Difficile</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <div className="radio-inline">
                                                                        <label className="question-label">
                                                                            <input type="radio" name="difficultyRadio" id="optionsRadios3" value="5"/>
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
                                                            <textarea id="question" className="form-control" placeholder="Ecrivez l'intitulé de votre question" rows="6"></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-10 col-lg-offset-1">
                                                        <div className="form-group">
                                                            <label className="question-label">Réponse*</label>
                                                            <textarea id="simpleresponse" placeholder="Ecrivez la réponse de la question" className="form-control" rows="6"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row pt-10">
                                                    <div className="col-lg-8 col-lg-offset-2">
                                                        <div className="row text-center pagination-centered">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                <button type="reset" className="btn btn-warning" onClick={this.resetQuestion}>
                                                                    <i className="fa fa-times"></i> Annuler les modifications
                                                                </button>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                <button type="submit" className="btn btn-success" onClick={this.updateSimpleQuestion}>
                                                                    <i className="fa fa-check"></i> Modifier
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row pt-10">
                                                    <div className="col-lg-8 col-lg-offset-2">
                                                        <label id="msgInfos"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            (
                                JSON.parse(this.state.question.response).typeresponse === 2
                                ?
                                <div className="tab-pane fade in active">
                                    <div className="row pt-10">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    <div className="row">
                                                        <div className="col-lg-10 col-lg-offset-1">
                                                            <div className="form-group">
                                                                <label className="question-label">Niveau*</label>
                                                                <select id="selectLevel" className="form-control">
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
                                                                <select  id="selectColor" className="form-control select-color-creation-question">
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
                                                                <input id="myCategory" className="form-control" placeholder="Entrez la catégorie de la question" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-10 col-lg-offset-1">
                                                            <div className="form-group">
                                                                <label className="question-label">Thème*</label>
                                                                <input id="myTheme" className="form-control" placeholder="Entrez le thème de la question" />
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
                                                                                <input type="radio" name="difficultyRadio" id="optionsRadios1" value="1"/>
                                                                                <span className="grey">Très facile</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="radio-inline">
                                                                            <label className="question-label">
                                                                                <input type="radio" name="difficultyRadio" id="optionsRadios2" value="2"/>
                                                                                <span className="grey">Facile</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="radio-inline">
                                                                            <label className="question-label">
                                                                                <input type="radio" name="difficultyRadio" id="optionsRadios3" value="3"/>
                                                                                <span className="grey">Moyen</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="radio-inline">
                                                                            <label className="question-label">
                                                                                <input type="radio" name="difficultyRadio" id="optionsRadios3" value="4"/>
                                                                                <span className="grey">Difficile</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="radio-inline">
                                                                            <label className="question-label">
                                                                                <input type="radio" name="difficultyRadio" id="optionsRadios3" value="5"/>
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
                                                                <textarea id="question" className="form-control" placeholder="Ecrivez l'intitulé de votre question" rows="6"></textarea>
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
                                                                    <button type="reset" className="btn btn-warning" onClick={this.resetQuestion}>
                                                                        <i className="fa fa-times"></i> Annuler les modifications
                                                                    </button>
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                    <button type="submit" className="btn btn-success" onClick={this.updateMultipleChoicesQuestion}>
                                                                        <i className="fa fa-check"></i> Modifier
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row pt-10">
                                                        <div className="col-lg-8 col-lg-offset-2">
                                                            <label id="msgInfos"></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="tab-pane fade in active">
                                    <div className="row pt-10">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    <div className="row">
                                                        <div className="col-lg-10 col-lg-offset-1">
                                                            <div className="form-group">
                                                                <label className="question-label">Niveau*</label>
                                                                <select id="selectLevel" className="form-control">
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
                                                                <select id="selectColor" className="form-control select-color-creation-question">
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
                                                                <input id="myCategory" className="form-control" placeholder="Entrez la catégorie de la question" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-10 col-lg-offset-1">
                                                            <div className="form-group">
                                                                <label className="question-label">Thème*</label>
                                                                <input id="myTheme" className="form-control" placeholder="Entrez le thème de la question" />
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
                                                                                <input type="radio" name="difficultyRadio" id="optionsRadios1" value="1"/>
                                                                                <span className="grey">Très facile</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="radio-inline">
                                                                            <label className="question-label">
                                                                                <input type="radio" name="difficultyRadio" id="optionsRadios2" value="2"/>
                                                                                <span className="grey">Facile</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="radio-inline">
                                                                            <label className="question-label">
                                                                                <input type="radio" name="difficultyRadio" id="optionsRadios3" value="3"/>
                                                                                <span className="grey">Moyen</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="radio-inline">
                                                                            <label className="question-label">
                                                                                <input type="radio" name="difficultyRadio" id="optionsRadios3" value="4"/>
                                                                                <span className="grey">Difficile</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <div className="radio-inline">
                                                                            <label className="question-label">
                                                                                <input type="radio" name="difficultyRadio" id="optionsRadios3" value="5"/>
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
                                                                <textarea id="question" className="form-control" placeholder="Ecrivez l'intitulé de votre question" rows="6"></textarea>
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
                                                                    <button type="reset" className="btn btn-warning" onClick={this.resetQuestion}>
                                                                        <i className="fa fa-times"></i> Annuler les modifications
                                                                    </button>
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                    <button type="submit" className="btn btn-success" onClick={this.updateSimpleChoiceQuestion}>
                                                                        <i className="fa fa-check"></i> Modifier
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row pt-10">
                                                        <div className="col-lg-8 col-lg-offset-2">
                                                            <label id="msgInfos"></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateQuestionPage;