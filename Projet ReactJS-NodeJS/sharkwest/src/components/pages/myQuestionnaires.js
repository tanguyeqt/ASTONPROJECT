import React, { Component } from 'react';
import Questionnaire from '../Model/Questionnaire';
import HelperCreationQuestionnaire from '../Model/HelperCreationQuestionnaire';
import { APIURL } from '../../config-connections';

class myQuestionnaire extends Component 
{
  constructor() 
  {
      super();
      const id = localStorage.getItem('id');
      this.state = { questionnaires: [], id: id, status: "404" };
  }

  componentWillMount() 
  {
    fetch(APIURL + '/Questionnaire/GetMyQuestionnaires?id=' + this.state.id, {
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
        let questionnaires = data.data;
        this.setState({
            questionnaires: questionnaires,
            id: this.state.id,
            status: data.status
        })
    })
  }
    
  render() 
  {
    if(this.state.status === "404")
    {
      return (
        <div className="container">
          <ol className="breadcrumb">
              <li><i className="fa fa-home fa-fw"></i></li>
              <li className="active">Mes questionnaires</li>
          </ol>
          <HelperCreationQuestionnaire />
        </div>
      );
    }
    else
    {
      return (        
        <div className="container">
          <ol className="breadcrumb">
            <li><i className="fa fa-home fa-fw"></i></li>
            <li className="active">Mes questionnaires <span className="badge">{this.state.questionnaires.length}</span></li>
          </ol>        
          {/* QUESTIONNAIRE */}
          {this.state.questionnaires.map((questionnaire) =>
            <Questionnaire
              key={questionnaire.id}
              id={questionnaire.id}
              color={questionnaire.color}
              name={questionnaire.name}
              level={questionnaire.level}
              category={questionnaire.category}
              theme={questionnaire.theme}
              rangeDifficulty={questionnaire.rangeDifficulty}
              showBareme={questionnaire.showBareme}
              bareme={questionnaire.bareme}
              difficulty={questionnaire.difficulty}
              lastModified={questionnaire.lastModified}
              questions={questionnaire.questions}
              />
          )}
          {/* /QUESTIONNAIRE */}
        </div>
      );
    }
  }
}
export default myQuestionnaire;