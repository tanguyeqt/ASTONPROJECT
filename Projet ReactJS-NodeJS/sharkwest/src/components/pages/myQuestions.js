import React, { Component } from 'react';
import Question from '../Model/Question';
import HelperCreationQuestion from '../Model/HelperCreationQuestion';
import { APIURL } from '../../config-connections';

class MyQuestionsPage extends Component 
{
  constructor() 
  {
      super();
      const id = localStorage.getItem('id');
      this.state = { questions : [], id: id, status: "404" };
  }

  componentWillMount() 
  {
    fetch(APIURL + '/Question/GetMyQuestions?id='+ this.state.id)
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
              <li className="active">Mes questions</li>
          </ol>
          <HelperCreationQuestion />
        </div>
      )
    }

    return (        
      <div className="container"> {/* id="page-wrapper" */}
        <ol className="breadcrumb">
            <li><i className="fa fa-home fa-fw"></i></li>
            <li className="active">Mes questions <span className="badge">{this.state.questions.length}</span></li> 
        </ol>        
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
export default MyQuestionsPage;