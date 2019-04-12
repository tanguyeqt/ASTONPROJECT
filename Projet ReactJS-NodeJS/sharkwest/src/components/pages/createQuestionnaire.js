import React, { Component } from 'react';
import LevelChoices from '../Model/LevelChoices';
import $ from 'jquery';
import { APIURL } from '../../config-connections';

class CreateQuestionnairePage extends Component 
{
    constructor() {
        super();
        var id = localStorage.getItem('id');
        this.state = {id: id, levels: []};
        this.addQuestionnaire = this.addQuestionnaire.bind(this);
        this.resetQuestionnaire = this.resetQuestionnaire.bind(this);
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

    addQuestionnaire() {
        var cat = $('#myCategory').val();
        var them = $('#myTheme').val();
        var grad = $('#selectLevel').val();
        var nam = $('#nameInput').val();
        var ptsmax = $('#maxNoteInput').val();
        var checked = $('#baremeCheckbox:checked').length !== 0

        var isOk = true;
        var msg = "";

        if(nam === '')
            msg += "<li>nom du questionnaire</li>";
        if(grad === "0")
            msg += "<li>niveau</li>";
        if(cat === "")
            msg += "<li>catégorie</li>";
        if(them === "")
            msg += "<li>thème</li>";
        if(checked && ptsmax === '')
            msg += "<li>note maximale</li>";
        else if(!checked)
            ptsmax = "0";

        if(msg !== "")
            isOk = false;

        if(isOk)
        {
            // Ajout d'un questionnaire
            fetch(APIURL + '/Questionnaire/CreateQuestionnaire', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST'
                },
                body: JSON.stringify({
                    color : $('#selectColor').val(),
                    name : nam,
                    pointsmax : ptsmax,
                    showpoints : checked,
                    grade : grad,
                    category : cat,
                    theme : them,
                    account : this.state.id
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
                    this.resetQuestionnaire();
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

    resetQuestionnaire() {
        $('#myCategory').val("");
        $('#myTheme').val("");
        $('#selectLevel').val("0");
        $('#selectColor').val("0");
        $('#nameInput').val("");
        $('#maxNoteInput').val("");
        $('#baremeCheckbox')[0].checked = false;
    }

    render() 
    {
        return (        
            <div className="container">
                <ol className="breadcrumb">
                    <li><i className="fa fa-home fa-fw"></i></li>
                    <li className="active">Créer un questionnaire</li>
                </ol>
                <div className="row pt-10">
                    <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                        <div className="tab-content">
                            <div className="tab-pane fade in active">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="panel panel-default pt-10 background-white">
                                            <div className="panel-body">
                                                <div className="row">
                                                    <div className="col-lg-8 col-lg-offset-2">
                                                        <div className="form-group">
                                                            <label>Nom du questionnaire*</label>
                                                            <input id="nameInput" className="form-control" placeholder="Entrez le nom du questionnaire" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-8 col-lg-offset-2">
                                                        <div className="form-group">
                                                            <label>Niveau*</label>
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
                                                    <div className="col-lg-8 col-lg-offset-2">
                                                        <div className="form-group">
                                                            <label>Couleur du questionnaire</label>
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
                                                    <div className="col-lg-8 col-lg-offset-2">
                                                        <div className="form-group">
                                                            <label>Categorie*</label>
                                                            <input id="myCategory" className="form-control" placeholder="Entrez la catégorie du questionnaire" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-8 col-lg-offset-2">
                                                        <div className="form-group">
                                                            <label>Theme*</label>
                                                            <input id="myTheme" className="form-control" placeholder="Entrez le thème du questionnaire" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-8 col-lg-offset-2">
                                                        <div className="form-group">
                                                            <label>Bareme (activer/desactiver)</label>
                                                            <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <input id="baremeCheckbox" type="checkbox" value="0" />
                                                                </span>
                                                                <input type="number" id="maxNoteInput" className="form-control" step="1" min="0" placeholder="Note max. du questionnaire (si bareme activé)" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row pt-10">
                                                    <div className="col-lg-8 col-lg-offset-2">
                                                        <div className="row text-center pagination-centered">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                <button type="reset" className="btn btn-warning" onClick={this.resetQuestionnaire}>
                                                                    <i className="fa fa-times"></i> Remettre à zéro
                                                                </button>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                <button type="submit" className="btn btn-success" onClick={this.addQuestionnaire}>
                                                                    <i className="fa fa-check"></i> Créer
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row pt-50">
                                                    <div className="col-lg-8 col-lg-offset-2">
                                                        <label id="msgInfos"></label>
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
export default CreateQuestionnairePage;