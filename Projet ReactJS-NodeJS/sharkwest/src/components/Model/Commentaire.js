import React from 'react';
import { Link } from 'react-router-dom';

class Commentaire extends React.Component
{
    render()
    {
        return (
            <li className="left clearfix">
                <div className="row">
                    <div className="col-lg-1 col-md-1">
                        <img style={{display: 'inline-block' }} alt="User" src={this.props.image} className="img-circle img-responsive img-border roundedImage-40"/>
                    </div>
                    <div className="col-lg-10 col-md-10">
                        <div className="header">
                            <Link to={"/Logged/Profile/" + this.props.ownerid}> {this.props.owner}</Link> 
                            <small className="pull-right text-muted">
                                <span className="glyphicon glyphicon-time"></span>{this.props.date}
                            </small>
                        </div>
                        <p>
                            {this.props.text}
                        </p>
                    </div>
                </div>
            </li>
        );
    }
}

export default Commentaire;
