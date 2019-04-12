import React from 'react';
import { Redirect } from 'react-router';

class HelperCreationQuestion extends React.Component
{
    constructor() 
    {
        super();
        this.state = { redirect: false };
        this.goToQuestion = this.goToQuestion.bind(this);
    }

    goToQuestion() {
        this.setState({redirect: true});
    }

    render()
    {
        if (this.state.redirect) {
            return <Redirect push to="/Logged/createQuestion" />;
        }

        return (
                <div className="container">
                    <div className="row pb-10">
                        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <h4 className="pt-10 text-black">Vous n'avez aucune question !</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <div className="text-black">Créer vos questions facilement et ajoutez-les à vos questionnaires !</div>
                            <div className="pt-10">
                                <button className="btn btn-default" onClick={this.goToQuestion}>
                                    Créer une question
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
export default HelperCreationQuestion;