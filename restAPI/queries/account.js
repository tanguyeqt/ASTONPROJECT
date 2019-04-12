var co = require('../connection/connection')
var db = co.db;
var schema = co.schema;

function checkAccount(req, res, next) {

    var query = schema +
                "SELECT "+
                  "account.id, "+
                  "account.login "+
                "FROM "+
                  "account " +
                "WHERE " +
                  "(email = '" + req.body.login + "' OR LOWER(login) = LOWER('" + req.body.login + "')) "+
                  "AND password = '" + req.body.password + "'";
  
    db.any(query)
      .then(function (data) {
        if(data.length != 0)
        {
          res.status(200)
             .json({
              status: '200',
              isOk: true,
              id: data,
              message: 'ok'
            });
        }
        else
        {
          res.status(200)
             .json({
              status: '200',
              isOk: false,
              message: 'ok'
            });
        }
      })
      .catch(function (err) {
        return next(err);
      });
}
  
function addAccount(req, res, next) {

var query = schema +
            "INSERT INTO v1.account(login, password, firstname, lastname, email, birthdate) " +
            "VALUES ('"+ req.body.login + "','"+ req.body.password + "', '"+ req.body.firstname + "', '"+ req.body.lastname + "','"+ req.body.email + "', '"+ req.body.birthdate + "')";

if(req.body.email != req.body.email2)
{
    res.status(202)
        .json({
        status: '202',
        message: "Les deux adresses email ne sont pas identiques !"
    });
}

if(req.body.password != req.body.password2)
{
    res.status(202)
        .json({
        status: '202',
        message: "Les deux mots de passes ne sont pas identiques !"
    });
}

var errorMessage = [];

if(req.body.login == "" || req.body.login == undefined || req.body.login == null)
    errorMessage.push("nom d'utilisateur");

if(req.body.password == "" || req.body.password == undefined || req.body.password == null)
    errorMessage.push("mot de passe");

if(req.body.firstname == "" || req.body.firstname == undefined || req.body.firstname == null)
    errorMessage.push("prénom");

if(req.body.lastname == "" || req.body.lastname == undefined || req.body.lastname == null)
    errorMessage.push("nom");

if(req.body.email == "" || req.body.email == undefined || req.body.email == null)
    errorMessage.push("email");

if(req.body.birthdate == "" || req.body.birthdate == undefined || req.body.birthdate == null)
    errorMessage.push("date de naissance");

if(errorMessage.length > 0)
{
    var message = "";

    if(errorMessage.length == 1)
    message = "Le champ " + errorMessage[0] + " n'est pas correctement renseigné";
    else
    {
    message = "Les champs suivants ne sont pas correctements renseignés : ";

    for(var i = 0; i<errorMessage.length; i++)
    {
        if(i==errorMessage.length-1)
        message += errorMessage[i];
        else
        message += errorMessage[i] + ", ";
    }
    }

    res.status(202)
        .json({
        status: '202',
        message: message
    });
}
else
{
    var ok = true;

    db.any(schema + "SELECT account.id FROM account WHERE email = '" + req.body.email + "'")
    .then(function (data) {
        if(data.length != 0)
        {
        res.status(300)
            .json({
            status: '300',
            message: "Cette adresse email est déjà utilisée."
        });
        }
        else
        {
        db.any(schema + "SELECT account.id FROM account WHERE LOWER(login) = LOWER('" + req.body.login + "')")
            .then(function (data) {
            if(data.length != 0)
            {
                res.status(300)
                .json({
                status: '300',
                message: "Ce nom d'utilisateur est déjà utilisé."
                });
            }
            else
            {
                db.none(query)
                .then(function () {
                    res.status(200)
                        .json({
                        status: '200',
                        message: 'Compte créé avec succès !'
                    });
                })
                .catch(function (err) {
                    res.status(500)
                        .json({
                        status: '500',
                        message: 'Une erreur est survenue lors de la création du compte'
                    });
                });
            }
            })
            .catch(function (err) {
            return next(err);
            });
        }
    })
    .catch(function (err) {
    return next(err);
    });
}
}

function getProfile(req, res, next) 
{
var id = parseInt(req.params.id);
var query = schema +
                "SELECT " + 
                    "id, " +
                    "login, " +
                    "password, " +
                    "firstname, " +
                    "lastname, " +
                    "email, " +
                    "image, " +
                    "to_char(birthdate, 'DD/MM/YYYY') AS birthdate, " +
                    "( " +
                        "SELECT " +
                            "count(*) " +
                        "FROM " +
                            "question " +
                        "WHERE " +
                            "question.account = account.id " +
                    ") AS nbquestion, " +
                    "( " +
                        "SELECT " + 
                            "count(*) " +
                        "FROM " +
                            "questionnaire " +
                        "WHERE " +
                            "questionnaire.account = account.id " +
                    ") AS nbquestionnaire, " +
                    "(" +
                        "SELECT " +
                            "count(*) " +
                        "FROM " +
                            "commentary " +
                        "WHERE " + 
                            "commentary.account = account.id " +
                    ") AS nbcommentary, "+
                    "( "+
                        "SELECT " +
                            "COUNT(*) "+
                        "FROM "+
                            "rate "+
                        "WHERE "+
                            "rate.idaccount = " + id +	
                    ") AS nbnotes, "	+
                    "( " +
                        "SELECT " +
                            "ROUND(AVG(rate),2) " +
                        "FROM "+
                            "rate "+
                        "WHERE " +
                            "idquestion in ("+
                                            "SELECT "+
                                                "id " + 
                                            "FROM " + 
                                                "question " +
                                            "WHERE " +
                                                "question.account =" + id +
                                            ")" + 
                    ") AS notesmoyenne, " +
                    "( " +
                        "SELECT "+
                            "CASE "+
                            "WHEN AVG(difficulty)<=1 THEN 'Très facile' "+
                            "WHEN AVG(difficulty)<=2 THEN 'Facile' "+
                            "WHEN AVG(difficulty)<=3 THEN 'Moyen'	 "+
                            "WHEN AVG(difficulty)<=4 THEN 'Difficile' "+
                            "WHEN AVG(difficulty)<=5 THEN 'Très difficile' "+    
                            "END "+
                        "FROM " +
                            "question " +
                        "WHERE " +
                            "account= "+ id +
                    ") AS difficultemoyenne " +
                "FROM " +
                    "account " +		
                "WHERE "+
                    "account.id = " + id;

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
    return next(err);
    });
}

function updateAccount(req, res, next) {

    var query = schema +
                "UPDATE account SET "+
                    "login = '" + req.body.login + "', "+
                    "firstname = '" + req.body.firstname + "', "+
                    "lastname = '" + req.body.lastname + "', "+
                    "email = '" + req.body.email + "', "+
                    "password = '" + req.body.password + "', "+
                    "birthdate = '" + req.body.birthdate +"' "+     
                "WHERE "+ 
                    "id =" + req.body.accountid + " " ;
                    

              db.any(schema + "SELECT account.id FROM account WHERE email = '" + req.body.email + "' AND NOT id = '"+ req.body.accountid +"'")
              .then(function (data) {
                  if(data.length != 0)
                  {
                  res.status(300)
                      .json({
                      status: '300',
                      message: "Cette adresse email est déjà utilisée."
                  });
                  }
                  else
                  {
                  db.any(schema + "SELECT account.id FROM account WHERE login = '" + req.body.login + "' AND NOT id = '"+ req.body.accountid +"'")
                      .then(function (data) {
                      if(data.length != 0)
                      {
                          res.status(300)
                          .json({
                          status: '300',
                          message: "Ce nom d'utilisateur est déjà utilisé."
                          });
                      }
                      else
                      {
                        db.none(query)
                        .then(function () {
                            res.status(200)
                                .json({
                                status: '200',
                                message: 'Modification de votre profil effectuée avec succès'
                                });
                        })
                        .catch(function (err) {
                            res.status(302)
                                .json({
                                status: '302',
                                message: "La modification de votre profil a échouée"
                                });
                        });
                      }
                      })
                      .catch(function (err) {
                      return next(err);
                      });
                  }
              })
              .catch(function (err) {
              return next(err);
              });


             
          }
    

module.exports = {
    updateAccount : updateAccount,
    checkAccount: checkAccount,
    addAccount: addAccount,
    getProfile : getProfile
}