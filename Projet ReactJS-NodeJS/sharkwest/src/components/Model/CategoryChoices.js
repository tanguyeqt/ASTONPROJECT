import React from 'react';

class CategoryChoices extends React.Component
{    
    render() 
    {
        return (
            <option value={this.props.id}>{this.props.name}</option>
        );
    }
}
export default CategoryChoices;