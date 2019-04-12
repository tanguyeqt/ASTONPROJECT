import React from 'react';

class QuestionnaireChoices extends React.Component
{    
    render() 
    {
        return (
            <div className="radio">
                <label>
                    <input type="radio" name="optionsRadios" id={"optionsRadios" + this.props.id} value={this.props.id}/>
                    {this.props.text}
                </label>
            </div>
        );
    }
}
export default QuestionnaireChoices;