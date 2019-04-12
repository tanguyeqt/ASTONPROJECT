import React, { Component } from 'react';
import Question from '../Model/Question';
import LevelChoices from '../Model/LevelChoices';
import $ from 'jquery'
import { APIURL } from '../../config-connections';

class QuestionsPage extends Component 
{
  constructor() 
  {
    super();
    const id = localStorage.getItem('id');

    this.state = { questions : [], id: id, levels: [], searchParameters: {  search: '',
                                                                            category: '',
                                                                            theme: '',
                                                                            level: 0,
                                                                            typequestion: 0,
                                                                            difficulty: 0,
                                                                            review: 0,
                                                                            username: '',
                                                                            top: 200,
                                                                            rate: 0
                                                                        }
    };
    this.hideOrShowFilters = this.hideOrShowFilters.bind(this);
    this.execFilters = this.execFilters.bind(this);
    this.changeTop = this.changeTop.bind(this);
  }

  componentWillMount() 
  {
    document.addEventListener("keypress", this.handleKeyPress.bind(this));

    // Récupération de tous les niveaux
    fetch(APIURL + '/Grade/GetAll', {
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
        if(data.status === "200")
        {
            this.setState({
                id: this.state.id,
                levels: data.data,
                questions: this.state.questions
        })
        }
    });
    
    // Récupération des questions
    fetch(APIURL + '/Question/GetQuestions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST'
        },
        body: JSON.stringify(this.state.searchParameters)
    })
    .then(results => 
    {
        return results.json();
    })
    .then(data => 
    {
        let questions = data.data;
        this.setState({
            questions: questions,
            id: this.state.id,
            levels: this.state.levels,
            searchParameters: this.state.searchParameters
        })
    })
  }

  hideOrShowFilters() {
      if($('#searchParameters').is(":visible"))
      {
        $('#searchParameters').hide()
        $('#btnFilters i').text("Afficher les filtres");
      }
      else
      {
        $('#searchParameters').show()
        $('#btnFilters i').text("Cacher les filtres");
      }
  }

  execFilters() {
    var search = $('#searchInput').val();
    var category = $('#categoryInput').val();
    var theme = $('#themeInput').val();
    var level = $('#selectLevel').val() === "" ? "0" : $('#selectLevel').val();
    var typequestion = $('#selectTypequestion').val() === "" ? "0" : $('#selectTypequestion').val();
    var difficulty = $('#selectDifficulty').val();
    var review = $('#reviewsInput').val() === "" ? "0" : $('#reviewsInput').val();
    var username = $('#usernameInput').val();
    var top = $('#selectTop').val();
    var rate = $('#noteMoy').val() === "" ? "0" : $('#noteMoy').val();

    var searchParameters = {
        search: search,
        category: category,
        theme: theme,
        level: level,
        typequestion: typequestion,
        difficulty: difficulty,
        review: review,
        username: username,
        top: top,
        rate: rate
    };

    // Récupération des questions
    fetch(APIURL + '/Question/GetQuestions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-control-allow-credentials': 'true'
        },
        body: JSON.stringify(searchParameters)
    })
    .then(results => 
    {
        return results.json();
    })
    .then(data => 
    {
        let questions = data.data;
        this.setState({
            questions: questions,
            id: this.state.id,
            levels: this.state.levels,
            searchParameters: searchParameters
        })
    })
  }

  handleKeyPress = (event) => 
  {
    if(event.charCode === 13)
    {
        this.execFilters();
    }
  }

  changeTop () {
      this.execFilters();
  }

  render() 
  {
    return (
      <div className="container">
        <ol className="breadcrumb">
            <li><i className="fa fa-home fa-fw"></i></li>
            <li className="active">Fil des Questions</li>
        </ol>
        <div className="row container-fluid pb-10">
            <div className="col-lg-2 col-md-3 col-xs-6 col-sm-4">
                <a id="btnFilters" className="" onClick={this.hideOrShowFilters}><i>Afficher les filtres</i></a>
            </div>
        </div>
        <div id="searchParameters" className="tab-content container-fluid background-white" hidden>
            <div className="tab-pane active">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12">
                        <div className="form-group" onChange={this.changeTop}>
                            <select id="selectTop" className="form-control">
                                <option value="200">Nombre de questions (200 par défaut)</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12">
                        <div className="form-group">
                            <input type="number" id="reviewsInput" className="form-control" placeholder="Nombre minimum d'avis"/>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12">
                        <div className="form-group">
                            <input id="usernameInput" className="form-control" placeholder="Nom d'utilisateur"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12">
                                <div className="form-group">
                                    <input id="searchInput" className="form-control" placeholder="Rechercher"/>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12">
                                <div className="form-group">
                                    <input id="categoryInput" className="form-control" placeholder="Catégorie"/>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12">
                                <div className="form-group">
                                    <input id="themeInput" className="form-control" placeholder="Thème"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12">
                                <div className="form-group">
                                    <select id="selectLevel" className="form-control">
                                        <option value="0">Niveau</option>
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
                            <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12">
                                <div className="form-group">
                                    <select id="selectTypequestion" className="form-control">
                                        <option value="0">Type de question</option>
                                        <option value="1">Question simple</option>
                                        <option value="2">Question à choix multiples</option>
                                        <option value="3">Question à choix unique</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12">
                                <div className="form-group">
                                    <select id="selectDifficulty" className="form-control">
                                        <option value="0">Difficulté</option>
                                        <option value="1">Très Facile</option>
                                        <option value="2">Facile</option>
                                        <option value="3">Moyen</option>
                                        <option value="4">Difficile</option>
                                        <option value="5">Très Difficile</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 small">
                                <div className="form-group">
                                    <span> Note moyenne supérieure à :</span>
                                    <input id="noteMoy" className="form-control" type="number" min="0" max="5" step="0.5" defaultValue="0"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-xs-12 col-sm-12">
                                <div className="form-group text-center pagination-centered">
                                    <button className="btn btn-info" onClick={this.execFilters}>Filtrer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="pt-10"></div>
        
        {/* QUESTION */}
        {this.state.questions.map((question) =>
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12">
                    <Question 
                        key={"0"+question.id}
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
                        difficulty={question.difficultyText}
                        context={0}
                        />
                </div>
            </div>
        )}
        {/* /QUESTION */}
      </div>
    );
  }
}
export default QuestionsPage;