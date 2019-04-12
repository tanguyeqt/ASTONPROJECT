var co = require('../connection/connection')
var db = co.db;
var schema = co.schema;

function getAllCategory(req, res, next) {
  
    var query = schema + "SELECT "+
                            "id, "+
                            "name "+
                         "FROM category";
  
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

function createCategory(req, res, next) {

var query = schema + "INSERT INTO category(name) " +
                      "VALUES ('" + req.body.name + "') RETURNING id;";

  db.one(query)
  .then(function (data) {
    res.status(200)
        .json({
          status: '200',
          data: data.id,
          message: "Création de la catégorie effectuée avec succès"
        });
  })
  .catch(function (err) {
    res.status(302)
        .json({
          status: '302',
          message: "Création de la catégorie impossible. Elle doit déjà exister."
        });
  });

    
}

module.exports = {
    getAllCategory: getAllCategory,
    createCategory: createCategory
}