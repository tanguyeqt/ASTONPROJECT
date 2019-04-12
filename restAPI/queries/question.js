var co = require('../connection/connection')
var db = co.db;
var schema = co.schema;

function getQuestions(req, res, next) {
    var query = schema +
                "SELECT * FROM (" + 
                  "SELECT " +
                    "question.id, " +
                    "color, " +
                    "grade.name AS level, " +
                    "category AS category, " +
                    "theme AS theme, " +
                    "coalesce(" +
                      "( " +
                        "SELECT " +
                          "( " +
                            "CASE "+
                              "WHEN ROUND(AVG(r.rate)) is null THEN 0 "+
                              "ELSE ROUND(AVG(r.rate),2) "+
                            "END "+
                          ") "+
                        "FROM " +
                          "rate r " +
                        "WHERE " +
                          "idquestion = question.id " +
                      "), " +
                    "0) AS note," +
                    "difficulty, " +
                    "(SELECT name FROM difficulty WHERE id = question.difficulty) AS difficultytext, " +
                    "question, " +
                    "response, " +
                    "( " +
                      "SELECT " +
                        "count(*) " +
                      "FROM " +
                        "rate " +
                      "WHERE " +
                        "idquestion = question.id " +
                    ") AS avis, " +
                    "( " +
                      "SELECT " +
                          "count(*) " +
                      "FROM "+
                          "commentary " +
                      "WHERE " +
                          "idquestion = question.id " +
                    ") AS comments, " +
                    "( " +
                      "SELECT " +
                        "count(*) " +
                      "FROM " +
                        "usingquestion " +
                      "WHERE idquestion = question.id" +
                    ") AS uses, " +
                    "account.id AS accountId, " +
                    "account.login, " +
                    "to_char(lastmodified, 'DD/MM/YYYY à HH24:MI') AS lastmodified " +
                  "FROM " +
                    "question " +
                    "LEFT JOIN grade ON grade.id = question.grade " +
                    "LEFT JOIN account ON account.id = question.account " +
                  "WHERE " +
                    "lower(unaccent_string(category)) LIKE lower(unaccent_string('%" + req.body.searchParameters.category + "%')) " +
                    "AND lower(unaccent_string(theme)) LIKE lower(unaccent_string('%" + req.body.searchParameters.theme + "%')) " +
                    "AND (lower(unaccent_string(question)) LIKE lower(unaccent_string('%" + req.body.searchParameters.search + "%')) OR lower(unaccent_string(response)) LIKE lower(unaccent_string('%" + req.body.searchParameters.search + "%'))) ";
                    
                    if(req.body.searchParameters.level != null && req.body.searchParameters.level != 0)
                      query +="AND grade.id =" + req.body.searchParameters.level + " ";

                    if(req.body.searchParameters.typequestion != null && req.body.searchParameters.typequestion != 0)
                      query +="AND lower(unaccent_string(response)) LIKE lower(unaccent_string('%typeresponse\":" + req.body.searchParameters.typequestion + "%')) ";

                    if(req.body.searchParameters.difficulty != null && req.body.searchParameters.difficulty != 0)
                      query +="AND difficulty = " + req.body.searchParameters.difficulty + " ";

                    if(req.body.searchParameters.username != null && req.body.searchParameters.username != "")
                      query +="AND lower(unaccent_string(account.login)) LIKE lower(unaccent_string('%" + req.body.searchParameters.username + "%')) ";

                  query += "ORDER BY " +
                    "question.id DESC) AS resultat ";

                    var one = false;

                    if(req.body.searchParameters.review != null && req.body.searchParameters.review >= 0 && req.body.searchParameters.review != "")
                    {
                      query +="WHERE avis >= " + req.body.searchParameters.review + " ";
                      one = true;
                    }

                    if(req.body.searchParameters.rate != null && req.body.searchParameters.rate != "")
                    {
                      if(one)
                        query +="AND note >= " + req.body.searchParameters.rate + " ";
                      else
                        query +="WHERE note >= " + req.body.searchParameters.rate + " ";
                    }

                    if(req.body.searchParameters.top != null && req.body.searchParameters.top != "")
                      query += " LIMIT " + req.body.searchParameters.top;

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
    
function getMyQuestions(req, res, next) {
    var id = parseInt(req.params.id);

    var query = schema +
                "SELECT * FROM (" + 
                  "SELECT " +
                    "question.id, " +
                    "color, " +
                    "grade.name AS level, " +
                    "category AS category, " +
                    "theme AS theme, " +
                    "coalesce(" +
                      "( " +
                        "SELECT " +
                          "( " +
                            "CASE "+
                              "WHEN ROUND(AVG(r.rate)) is null THEN 0 "+
                              "ELSE ROUND(AVG(r.rate),2) "+
                            "END "+
                          ") "+
                        "FROM " +
                          "rate r " +
                        "WHERE " +
                          "idquestion = question.id " +
                      "), 0) AS note," +
                    "difficulty, " +
                    "(SELECT name FROM difficulty WHERE id = question.difficulty) AS difficultytext, " +
                    "question, " +
                    "response, " +
                    "( " +
                      "SELECT " +
                        "count(*) " +
                      "FROM " +
                        "rate " +
                      "WHERE " +
                        "idquestion = question.id " +
                    ") AS avis, " +
                    "( " +
                      "SELECT " +
                          "count(*) " +
                      "FROM "+
                          "commentary " +
                      "WHERE " +
                          "idquestion = question.id " +
                    ") AS comments, " +
                    "( " +
                      "SELECT " +
                        "count(*) " +
                      "FROM " +
                        "usingquestion " +
                      "WHERE idquestion = question.id" +
                    ") AS uses, " +
                    "account.id AS accountId, " +
                    "account.login, " +
                    "to_char(lastmodified, 'DD/MM/YYYY à HH24:MI') AS lastmodified " +
                  "FROM " +
                    "question " +
                    "LEFT JOIN grade ON grade.id = question.grade " +
                    "LEFT JOIN account ON account.id = question.account " +
                "WHERE " +
                  "account.id = " + id + 
                " ORDER BY " +
                  "question.id DESC) AS resultat ";
  
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

function getQuestion(req, res, next) {
    var id = parseInt(req.params.id);

    var query = schema +
                "SELECT * FROM (" + 
                  "SELECT " +
                    "question.id, " +
                    "color, " +
                    "grade.name AS level, " +
                    "grade.id AS levelid, " +
                    "category AS category, " +
                    "theme AS theme, " +
                    "coalesce(" +
                      "( " +
                        "SELECT " +
                          "( " +
                            "CASE "+
                              "WHEN ROUND(AVG(r.rate)) is null THEN 0 "+
                              "ELSE ROUND(AVG(r.rate),2) "+
                            "END "+
                          ") "+
                        "FROM " +
                          "rate r " +
                        "WHERE " +
                          "idquestion = question.id " +
                      "), 0) AS note," +
                    "difficulty, " +
                    "question, " +
                    "response, " +
                    "( " +
                      "SELECT " +
                        "count(*) " +
                      "FROM " +
                        "rate " +
                      "WHERE " +
                        "idquestion = question.id " +
                    ") AS avis, " +
                    "( " +
                      "SELECT " +
                          "count(*) " +
                      "FROM "+
                          "commentary " +
                      "WHERE " +
                          "idquestion = question.id " +
                    ") AS comments, " +
                    "( " +
                      "SELECT " +
                        "count(*) " +
                      "FROM " +
                        "usingquestion " +
                      "WHERE idquestion = question.id" +
                    ") AS uses, " +
                    "account.id AS accountId, " +
                    "account.login, " +
                    "to_char(lastmodified, 'DD/MM/YYYY à HH24:MI') AS lastmodified " +
                  "FROM " +
                    "question " +
                    "LEFT JOIN grade ON grade.id = question.grade " +
                    "LEFT JOIN account ON account.id = question.account " +
                  "WHERE " +
                    "question.id = " + id +
                    ") AS resultat";

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

function getComments(req, res, next) {
    var id = parseInt(req.params.id);
  
    var query = schema +
                "SELECT " +
                  "commentary.id, " +
                  "commentary.body AS text, " +
                  "account.login AS owner,  " +
                  "account.id AS ownerid,  " +
                  "account.image AS image,  " +
                  "to_char(commentary.posted, 'DD/MM/YYYY à HH24:MI') AS date " +
                "FROM  " +
                  "Commentary " +
                  "LEFT JOIN account ON commentary.account = account.id " +
                "WHERE  " +
                  "idquestion = " + id +
                " ORDER BY commentary.posted DESC";
  
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

function addComment(req, res, next) {
  var corps = co.replaceQuote(req.body.corps);
  
  var query = schema +
              "INSERT INTO commentary " +
                "(account, body, posted, idquestion, seen) " +
              "VALUES " +
                "(" + req.body.account + ", '" +
                corps + "', " +
                "DEFAULT, " +
                req.body.idquestion + ", " + 
                "DEFAULT);";

  db.none(query)
    .then(function () {
      res.status(200)
          .json({
            status: '200',
            message: 'Ajout du commentaire effectué avec succès'
          });
  })
  .catch(function (err) {
    res.status(302)
        .json({
          status: '302',
          message: "Impossible d'ajouter le commentaire. Erreur : " + err
        });
  });
}

function addNote(req, res, next) {
    var query = schema + 
                "INSERT INTO " + 
                  "rate(idquestion, idaccount, rate) " +
                "VALUES " + 
                  "(" + req.body.idquestion + ", " + req.body.idaccount + ", " + req.body.rate + ");";
    
    db.none(query)
      .then(function () {
        res.status(200)
            .json({
              status: '200',
              message: 'Ajout et mise à jour réalisés avec succès'
            });
      })
      .catch(function (err) {
        res.status(500)
          .json({
            status: '500',
            message: "Erreur lors de l'ajout de la note"
          });
      });
}

function addQuestionToQuestionnaire(req, res, next)
{
  var query = schema + 
              "INSERT INTO " + 
                "usingquestion(idquestionnaire, idquestion, points) " +
              "VALUES " + 
                "(" + req.body.idquestionnaire + ", " + req.body.idquestion + ", " + req.body.points + ")";

  var queryUpdate = schema + 
                    "UPDATE " +
                      "questionnaire " +
                    "SET " +
                      "lastmodified = current_timestamp " +
                    "WHERE " +
                      "id = " + req.body.idquestionnaire + " ";
                      
  db.none(query)
  .then(function () {
    db.none(queryUpdate)
      .then(function () {
        res.status(200)
            .json({
              status: '200',
              message: 'Ajout de la question au questionnaire réalisé avec succès'
            });
      })
      .catch(function (err) {
        res.status(500)
          .json({
            status: '500',
            message: "Erreur lors de l'ajout de la question au questionnaire"
          });
      });
  })
  .catch(function (err) {
    res.status(500)
      .json({
        status: '302',
        message: "La question est déjà présente dans ce questionnaire"
      });
  });
}

function deleteQuestionFromQuestionnaire(req, res, next)
{
  var query = schema + 
              "DELETE FROM " + 
                "usingquestion " +
              "WHERE " + 
                "idquestionnaire = " + req.body.idquestionnaire + " AND idquestion = " + req.body.idquestion + ";";

  var queryUpdate = schema + 
                    "UPDATE " +
                      "questionnaire " +
                    "SET " +
                      "lastmodified = current_timestamp " +
                    "WHERE " +
                      "id = " + req.body.idquestionnaire + " ";
                      
  db.none(query)
  .then(function () {
    db.none(queryUpdate)
      .then(function () {
        res.status(200)
            .json({
              status: '200',
              message: 'Suppression de la question du questionnaire réalisé avec succès'
            });
      })
      .catch(function (err) {
        res.status(500)
          .json({
            status: '500',
            message: "Erreur lors de la suppression de la question du questionnaire"
          });
      });
  })
  .catch(function (err) {
    res.status(500)
      .json({
        status: '302',
        message: "La question n'est pas présente dans ce questionnaire"
      });
  });
}

function createQuestion(req, res, next)
{
  var question = co.replaceQuote(req.body.question);
  var response = JSON.stringify(req.body.response);
  var newresponse = co.replaceQuote(response.toString());

  var query = schema + 
            "INSERT INTO question "+
              "(color, "+
              "grade,  "+
              "category,  "+
              "theme,  "+
              "account,  "+
              "difficulty,  "+
              "question,  "+
              "response) "+
            "VALUES "+ 
              "('" + req.body.color + "', "+
              req.body.grade + ", "+
              "'" + co.replaceQuote(req.body.category) + "', "+
              "'" + co.replaceQuote(req.body.theme) + "', "+
              req.body.account + ", "+
              req.body.difficulty + ", "+
              "'" + question + "', "+
              "'" + newresponse + "')";

  db.none(query)
    .then(function () {
      res.status(200)
          .json({
            status: '200',
            message: 'Création de la question réalisée avec succès'
          });
  })
  .catch(function (err) {
    res.status(302)
        .json({
          status: '302',
          message: "Impossible de créer la question. Erreur : " + err
        });
  });
}

function updateQuestion(req, res, next) {
  
  var question = co.replaceQuote(req.body.question);
  var response = JSON.stringify(req.body.response);
  var newresponse = co.replaceQuote(response.toString());

  var query = schema + 
            "UPDATE question SET "+
              "color = '" + req.body.color + "', "+
              "grade = " + req.body.grade + ", "+
              "category = '" + req.body.category + "', "+
              "theme = '" + req.body.theme + "', "+
              "difficulty = " + req.body.difficulty + ", "+
              "question = '" + question + "', "+
              "response = '" + newresponse + "', "+
              "lastmodified = current_timestamp "+
            "WHERE "+ 
              "id = " + req.body.questionid;
    
    console.log(query);

    db.none(query)
    .then(function () {
        res.status(200)
            .json({
            status: '200',
            message: 'Modification de la question effectuée avec succès'
            });
    })
    .catch(function (err) {
        res.status(302)
            .json({
            status: '302',
            message: "La modification de la question a échouée"
            });
    });
}

module.exports = {
    getQuestions: getQuestions,
    getMyQuestions: getMyQuestions,
    getQuestion: getQuestion,
    getComments: getComments,
    addNote: addNote,
    addQuestionToQuestionnaire: addQuestionToQuestionnaire,
    deleteQuestionFromQuestionnaire: deleteQuestionFromQuestionnaire,
    createQuestion: createQuestion,
    updateQuestion: updateQuestion,
    addComment: addComment
}