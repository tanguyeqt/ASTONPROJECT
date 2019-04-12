import React from 'react';

class LevelChoices extends React.Component
{    
    render() 
    {
        return (
            <option value={this.props.id}>{this.props.name}</option>
        );
    }
}
export default LevelChoices;