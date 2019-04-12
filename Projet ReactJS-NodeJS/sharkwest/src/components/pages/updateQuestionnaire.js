import React, { Component } from 'react';
import LevelChoices from '../Model/LevelChoices';
import NotFound from './notFound';
import $ from 'jquery';
import { APIURL } from '../../config-connections';

class UpdateQuestionnairePage extends Component
{
    constructor() {
        super();
        var id = localStorage.getItem('id');
        this.state = {id: id, levels: [], status: "404", questionnaire: []};
        this.updateQuestionnaire = this.updateQuestionnaire.bind(this);
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

        fetch(APIURL + '/Questionnaire/GetQuestionnaire?id=' + this.props.match.params.id)
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
            this.resetQuestionnaire();
        })
    }

    updateQuestionnaire() {
        var cat = $('#myCategory').val();
        var them = $('#myTheme').val();
        var grad = $('#selectLevel').val();
        var nam = $('#nameInput').val();
        var ptsmax = $('#maxNoteInput').val();
        var checked = $('#baremeCheckbox:checked').length !== 0

        var isOk = true;
        var msg = "";

        if(nam.trim() === '')
            msg += "<li>nom du questionnaire</li>";
        if(grad === "0")
            msg += "<li>niveau</li>";
        if(cat.trim() === "")
            msg += "<li>catégorie</li>";
        if(them.trim() === "")
            msg += "<li>thème</li>";
        if(checked && ptsmax.trim() === '')
            msg += "<li>note maximale</li>";
        else if(!checked)
            ptsmax = "0";

        if(msg.trim() !== "")
            isOk = false;

        if(isOk)
        {
            // Ajout d'un questionnaire
            fetch(APIURL + '/Questionnaire/UpdateQuestionnaire?id=' + this.props.match.params.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST'
                },
                body: JSON.stringify({
                    id : this.props.match.params.id,
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
        $('#selectLevel').val(this.state.questionnaire.levelId);
        $('#nameInput').val(this.state.questionnaire.name);
        $('#myCategory').val(this.state.questionnaire.category);
        $('#myTheme').val(this.state.questionnaire.theme);
        $('#maxNoteInput').val(this.state.questionnaire.pointsMax);
        $('#baremeCheckbox').prop('checked', this.state.questionnaire.showPoints);
    }

    render()
    {
        if (this.state.status === "404")
            return <NotFound/>

        return (
            <div className="container">
                <ol className="breadcrumb">
                    <li><i className="fa fa-home fa-fw"></i></li>
                    <li>
                        <a href="/Logged/MyQuestionnaires">Mes Questionnaires</a>
                    </li>
                    <li>
                        <a href={"/Logged/Questionnaire/" + this.state.questionnaire.id}>#{this.state.questionnaire.id}</a>
                    </li>
                    <li className="active">Modifier le questionnaire</li>
                </ol>
                <div className="row pt-10">
                    <div className="col-lg-12">
                        <div className="tab-content">
                            <div className="tab-pane fade in active">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="panel panel-default pt-10">
                                            <div className="panel-body">
                                                <div className="row">
                                                    <div className="col-lg-8 col-lg-offset-2">
                                                        <div className="form-group">
                                                            <label>Nom du questionnaire*</label>
                                                            <input id="nameInput" className="form-control" placeholder="Entrez le nom du questionnaire"/>
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
                                                                {(this.state.questionnaire.color === "primary") ? <option value="primary" className="color-bleu" defaultValue>Bleu</option> : <option value="primary" className="color-bleu" >Bleu</option>}
                                                                {(this.state.questionnaire.color === "red") ? <option value="red" className="color-red" defaultValue>Rouge</option> : <option value="red" className="color-red">Rouge</option>}
                                                                {(this.state.questionnaire.color === "green") ? <option value="green" className="color-green" defaultValue>Vert</option> : <option value="green" className="color-green">Vert</option>}
                                                                {(this.state.questionnaire.color === "yellow") ? <option value="yellow" className="color-yellow" defaultValue>Jaune</option> : <option value="yellow" className="color-yellow">Jaune</option>}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-8 col-lg-offset-2">
                                                        <div className="form-group">
                                                            <label>Categorie*</label>
                                                            <input id="myCategory" className="form-control" placeholder="Entrez la catégorie du questionnaire"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-8 col-lg-offset-2">
                                                        <div className="form-group">
                                                            <label>Theme*</label>
                                                            <input id="myTheme" className="form-control" placeholder="Entrez le thème du questionnaire"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-8 col-lg-offset-2">
                                                        <div className="form-group">
                                                            <label>Bareme (activer/desactiver)</label>
                                                            <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <input id="baremeCheckbox" type="checkbox"/>
                                                                </span>
                                                                <input type="number" id="maxNoteInput" className="form-control" step="1" min="0" placeholder="Note max. du questionnaire (si bareme activé)"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row pt-10">
                                                    <div className="col-lg-8 col-lg-offset-2">
                                                        <div className="row text-center pagination-centered">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                <button type="reset" className="btn btn-warning" onClick={this.resetQuestionnaire}>
                                                                    <i className="fa fa-times"></i> Annuler les modifications
                                                                </button>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                                <button type="submit" className="btn btn-success" onClick={this.updateQuestionnaire}>
                                                                    <i className="fa fa-check"></i> Modifier
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
export default UpdateQuestionnairePage;