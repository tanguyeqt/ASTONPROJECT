var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:root@localhost:5432/sharkwest';
var db = pgp(connectionString);

const schema = "set search_path='v1'; ";

function replaceQuote(chaine)
{
  return chaine.split("'").join("''");
}

module.exports = {
  db: db,
  schema: schema,
  replaceQuote: replaceQuote
}