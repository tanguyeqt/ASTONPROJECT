import { Link } from 'react-router-dom';
import Popup from 'react-popup';
import React from 'react';
import { APIURL } from '../../config-connections';

class Questionnaire extends React.Component
{    
    constructor()
    {
        super();
        this.delete = this.delete.bind(this);
    }

    delete()
    {
        var k = this;
        Popup.create({
            className: 'success',
            content: 
                <div>
                    <div className="row pb-10">
                        <div className="col-md-8 col-md-offset-2">
                            <h3>Suppression</h3>
                        </div>
                    </div>
                    <div className="row pb-10">
                        <div className="col-md-8 col-md-offset-2">
                            Êtes-vous certain de vouloir supprimer votre questionnaire ?
                        </div>
                    </div>
                </div>,
            buttons: {
                right: [{
                    text: 'OK',
                    className: 'success',
                    key: 'enter',
                    action: function () {
                        fetch(APIURL + '/Questionnaire/DeleteQuestionnaire?id=' + k.props.id, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Methods': 'DELETE'
                            }
                        })
                        .then(results => 
                        {
                            window.location = "/Logged/MyQuestionnaires";
                        })
                    }
                }],
                left: [{
                    text: 'Annuler',
                    className: 'warning',
                    key: 'escape',
                    action: function () {
                        Popup.close();
                    }
                }]
            }
        },true);
    }

    render() 
    {
        return (
            <div className="row pt-10">
                <Popup
                    className="mm-popup"
                    closeBtn={true}
                    closeHtml={null}
                    defaultOk="Ok"
                    defaultCancel="Annuler"
                    wildClasses={false}
                    escToClose={true} />
                <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12">
                    <div className={"panel panel-" + this.props.color}>
                        {/* <!-- Header --> */}
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-lg-12 col-sm-9 col-md-12 col-xs-9">
                                    <i data-toggle="dropdown" className="fa fa-gears fa-fw dropdown-toggle pr-30"></i>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a>
                                                <i className="fa fa-file-pdf-o fa-fw"></i> Exporter en PDF
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                                <i className="fa fa-trash fa-fw"></i> Supprimer
                                            </a>
                                        </li>
                                    </ul>
                                    <Link to={"/Logged/Questionnaire/" + this.props.id} className="white no-underline">[{this.props.level}] {this.props.category} -  {this.props.theme} - {this.props.name}</Link>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Fin header--> */}
                        {/* <!-- Body --> */}
                        <div className="panel-body">
                            {/* <!-- questionnaire --> */}
                            <div className="col-lg-12 col-sm-12 col-md-12">
                                <h4><b>Nombre de questions : {this.props.questions}</b></h4>
                            </div>
                            <div className="col-lg-12 col-sm-12 col-md-12 small">
                                <p><i>Derniere modification le {this.props.lastModified}</i></p>
                            </div>
                            {/* <!-- Fin qestion --> */}
                            <div className="col-lg-4 col-sm-12 col-md-12 text-center">
                                <i>{this.props.rangeDifficulty !== " - " ? this.props.rangeDifficulty : ''}</i>
                            </div>
                            <div className="col-lg-4 col-sm-12 col-md-12 text-center">
                                Bareme : {this.props.showBareme === true ? "Affiché - /" + this.props.bareme : "Masqué"}
                            </div>
                            <div className="col-lg-4 col-sm-12 col-md-12 text-center"> 
                                <i>{this.props.difficulty}</i>
                            </div>
                        </div>
                        {/* <!-- Fin body -->
                        <!-- Footer --> */}
                        <div className="panel-footer">
                            <div className="row">
                                {/* <!-- Boutons d'actions --> */}
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center pagination-centered">
                                    <a title="Exporter en pdf">
                                        <i className="fa fa-file-pdf-o fa-fw"></i>Exporter en PDF
                                    </a>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center pagination-centered text-danger">
                                    <a onClick={this.delete} title="Supprimer le questionnaire">
                                        <i className="fa fa-trash fa-fw"></i>Supprimer
                                    </a>
                                </div>
                                {/* <!-- Fin boutons d'action--> */}
                            </div>
                        </div>
                        {/* <!-- Fin footer --> */}
                    </div>
                </div>
            </div>
        );
    }
}
export default Questionnaire;