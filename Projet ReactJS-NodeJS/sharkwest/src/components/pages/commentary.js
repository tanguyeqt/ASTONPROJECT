import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Commentaire from '../Model/Commentaire';
import NotFound from './notFound';
import $ from 'jquery';
import { APIURL } from '../../config-connections';
import Image from './../../Assets/img/profile.jpg';

class CommentaryPage extends Component 
{
    constructor() 
    {
        super();
        const id = localStorage.getItem('id');
        this.state = { id: id, question : [], comments : [], status: 200 };
        this.getComments = this.getComments.bind(this);
        this.sendComment = this.sendComment.bind(this);
    }

    componentWillMount() 
    {
        var id = this.props.match.params.id;

        fetch(APIURL +'/Question/GetQuestion?id='+id, {
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
            let question = data.value.data;
            let status = data.value.status;
            this.setState({
                question: question,
                status: status
            })
        })

        this.getComments(id);
    }

    getComments (id) {
        fetch(APIURL + '/Question/GetComments?id=' + id, {
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
            let comments = data.data;
            this.setState({
                id: this.state.id,
                question: this.state.question,
                status: this.state.status,
                comments: comments
            })
        })
    }

    sendComment () {
        var corps = $('#contentComment').val();
        var idquestion = this.props.match.params.id;

        if(corps === "")
        {
            $("#contentComment").addClass("red-input");
            return;
        }
        else
            $("#contentComment").removeClass("red-input");

        fetch(APIURL + '/Question/AddComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST'
                },
                body: JSON.stringify({
                    corps: corps,
                    account: this.state.id,
                    idquestion: idquestion           
                })
            })
            .then(results => 
            {
                return results.json();
            })
            .then(data => 
            {
                if(data.status === "200")
                {
                    this.getComments(idquestion)
                }
                else
                {
                    console.log('KO');
                }
                $('#contentComment').val("");
            });
    }

    render() 
    {
        if(this.state.status === "200")
        {
            return (
                <div className="container">
                    <ol className="breadcrumb">
                        <li><i className="fa fa-home fa-fw"></i></li>
                        {
                            this.state.id === this.state.question.accountId.toString()
                            ?
                            <li>
                                <Link to={"/Logged/MyQuestions"}>Mes questions</Link>
                            </li>
                            :
                            <li className="active">
                                <Link to={"/Logged/FilQuestion"}>Fil des questions</Link>
                            </li>
                        }
                        <li>
                            <Link to={"/Logged/Question/" + this.state.question.id}>#{this.state.question.id}</Link>
                        </li>
                        <li className="active">Commentaires <span className="badge badge-dark">{this.state.comments.length}</span></li>
                    </ol>
                    <div className="row">
                    {/* Encadré commentaires */}
                    <div className="row form-group">
                        <div className="col-lg-offset-1 col-lg-10">
                            <div className="panel panel-default">
                                <div className="panel-body body-panel block-commentaire">
                                    <ul className="chat">
                                        {this.state.comments.map((comment) =>
                                            <Commentaire
                                                key = {"333"+comment.id}
                                                id = {comment.id}
                                                text = {comment.text}
                                                owner = {comment.owner}
                                                ownerid = {comment.ownerid}
                                                date = {comment.date}
                                                image = {Image}
                                            />
                                        )}
                                    </ul>
                                </div>
                                <div className="panel-footer clearfix">
                                    <div className="row">
                                        <div className="col-md-10">
                                            <textarea id="contentComment" placeholder="Ecrivez votre commentaire" className="form-control" rows="2"></textarea>
                                        </div>
                                        <div className="col-md-2">
                                            <button className="btn btn-primary btn-lg btn-block text-center" id="btn-chat" onClick={this.sendComment}>Envoyer</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            );
        }
        else
        {
            return (
                <NotFound />
            );
        }
    }
}
export default CommentaryPage;