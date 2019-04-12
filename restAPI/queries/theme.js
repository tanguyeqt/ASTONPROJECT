var co = require('../connection/connection')
var db = co.db;
var schema = co.schema;

function getAllTheme(req, res, next) {
  
    var query = schema + "SELECT "+
                            "id, "+
                            "name "+
                         "FROM theme";
  
    db.any(query)
    .then(function (data) {
      if(data.length != 0)
        {
          res.status(200)
          .json({
            status: '200',
            data: data,
            message: 'ok'
          });
        }
        else
        {
          res.status(404)
          .json({
            status: '404',
            data: data,
            message: 'not found'
          });
        }
    })
    .catch(function (err) {
        res.status(500)
        .json({
          status: '500',
          message: err.message
        });
    });
}

function createTheme(req, res, next) {

    var query = schema + "INSERT INTO theme(name) " +
                        "VALUES ('" + req.body.name + "') RETURNING id;";

    db.one(query)
      .then(function (data) {
        res.status(200)
           .json({
             status: '200',
             data: data.id,
             message: "Création du thème effectuée avec succès"
           });
      })
      .catch(function (err) {
        res.status(302)
            .json({
              status: '302',
              message: "Création du thème impossible. Il doit déjà exister."
            });
      });
}

module.exports = {
    getAllTheme: getAllTheme,
    createTheme: createTheme
}