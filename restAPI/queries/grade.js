var co = require('../connection/connection')
var db = co.db;
var schema = co.schema;

function getAllGrade(req, res, next) {
  
    var query = schema + "SELECT "+
                            "id, "+
                            "name "+
                         "FROM grade";
  
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
          res.status(300)
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

module.exports = {
    getAllGrade: getAllGrade
}