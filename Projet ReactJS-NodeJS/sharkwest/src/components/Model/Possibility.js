import React from 'react';

class Possibility extends React.Component
{
    render() 
    {
        return (
            <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12 pt-50">
                <div>
                    <div className="text-center pagination-centered">
                        <img alt="" className="img_croix" src={this.props.url}/>
                    </div>
                    <h3 className="text-center">{this.props.text}</h3>
                </div>
            </div>
        );
    }
}
export default Possibility;