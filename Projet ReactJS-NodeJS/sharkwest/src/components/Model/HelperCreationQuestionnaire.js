import React from 'react';
import { Redirect } from 'react-router';

class HelperCreationQuestionnaire extends React.Component
{
    constructor() 
    {
        super();
        this.state = { redirect: false };
        this.goToQuestionnaire = this.goToQuestionnaire.bind(this);
    }

    goToQuestionnaire() {
        this.setState({redirect: true});
    }

    render()
    {
        if (this.state.redirect) {
            return <Redirect push to="/Logged/createQuestionnaire" />;
        }

        return (
                <div className="container">
                    <div className="row pb-10">
                        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <h4 className="pt-10 text-black">Vous n'avez aucun questionnaire !</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-md-12 col-xs-12 col-sm-12">
                            <div className="text-black">Créer vos questionnaires facilement et ajoutez-y toutes les questions que vous aimez !</div>
                            <div className="pt-10">
                                <button className="btn btn-default" onClick={this.goToQuestionnaire}>
                                    Créer mon questionnaire
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
export default HelperCreationQuestionnaire;