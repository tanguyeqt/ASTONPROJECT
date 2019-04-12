var co = require('../connection/connection')
var db = co.db;
var schema = co.schema;

function getMyQuestionnaires(req, res, next) {
    var id = parseInt(req.params.id);
    var query = schema +
                "SELECT "+
                "account.login, "+
                "questionnaire.id, "+
                "color, "+
                "questionnaire.name AS name, "+
                "grade.name AS level, "+
                "category AS category, "+
                "theme AS theme, "+
                "CONCAT(( "+
                  "SELECT "+
                      "difficulty.name "+
                    "FROM "+
                      "difficulty "+
                    "WHERE "+
                      "difficulty.id = ( "+
                                  "SELECT "+
                                      "question.difficulty "+
                                    "FROM "+
                                      "usingquestion "+
                                      "LEFT JOIN question ON question.id = usingquestion.idquestion "+
                                    "WHERE "+
                                      "idquestionnaire = questionnaire.id "+
                                    "ORDER BY "+
                                      "question.difficulty ASC "+
                                    "LIMIT 1 "+
                                        ") "+
                    "LIMIT 1 "+
                "), " +
                "' - ', "+
                "( "+
                  "SELECT "+
                      "difficulty.name "+
                    "FROM "+
                      "difficulty "+
                    "WHERE "+
                      "difficulty.id = ( "+
                                  "SELECT "+
                                      "question.difficulty "+
                                    "FROM "+
                                      "usingquestion "+
                                      "LEFT JOIN question ON question.id = usingquestion.idquestion "+
                                    "WHERE "+
                                      "idquestionnaire = questionnaire.id "+
                                    "ORDER BY "+
                                      "question.difficulty DESC "+
                                    "LIMIT 1 "+
                                        ") "+
                ")) AS rangedifficulty, "+
                "( "+
                  "SELECT "+
                      "difficulty.name "+
                    "FROM "+
                      "difficulty "+
                    "WHERE "+
                      "difficulty.id = ( "+
                                  "SELECT "+
                                      "ROUND(AVG(question.difficulty)) "+
                                    "FROM "+
                                      "usingquestion "+
                                      "LEFT JOIN question ON question.id = usingquestion.idquestion "+
                                    "WHERE "+
                                      "idquestionnaire = questionnaire.id "+
                                        ") "+
                ") AS difficulty, "+
                "pointsmax AS bareme, "+
                "showpoints AS showbareme, "+
                "to_char(lastmodified, 'DD/MM/YYYY') AS lastmodified, "+
                "( "+
                    "SELECT "+
                      "count(*) "+
                    "FROM "+
                      "usingquestion "+
                    "WHERE "+
                      "idquestionnaire = questionnaire.id "+
                ") AS questions "+
            "FROM "+
                "questionnaire "+
                "LEFT JOIN grade ON grade.id = questionnaire.grade "+
                "LEFT JOIN account ON account.id = questionnaire.account "+
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
  
function getQuestionnaire(req, res, next) {
    var id = parseInt(req.params.id);

    var query = schema +
                "SELECT " +
                    "account.login, " +
                    "questionnaire.id, " +
                    "color, " +
                    "questionnaire.name AS Name, " +
                    "grade.name AS Level, " +
                    "grade.id AS Levelid, " +
                    "category AS Category, " +
                    "theme AS Theme, " +
                    "CONCAT(( "+
                        "SELECT "+
                            "difficulty.name "+
                        "FROM "+
                            "difficulty "+
                        "WHERE "+
                            "difficulty.id = ( "+
                                        "SELECT "+
                                            "question.difficulty "+
                                        "FROM "+
                                            "usingquestion "+
                                            "LEFT JOIN question ON question.id = usingquestion.idquestion "+
                                        "WHERE "+
                                            "idquestionnaire = questionnaire.id "+
                                        "ORDER BY "+
                                            "question.difficulty ASC "+
                                        "LIMIT 1 "+
                                            ") "+
                        "LIMIT 1 "+
                    "), " +
                    "' - ', "+
                    "( "+
                        "SELECT "+
                            "difficulty.name "+
                        "FROM "+
                            "difficulty "+
                        "WHERE "+
                            "difficulty.id = ( "+
                                        "SELECT "+
                                            "question.difficulty "+
                                        "FROM "+
                                            "usingquestion "+
                                            "LEFT JOIN question ON question.id = usingquestion.idquestion "+
                                        "WHERE "+
                                            "idquestionnaire = questionnaire.id "+
                                        "ORDER BY "+
                                            "question.difficulty DESC "+
                                        "LIMIT 1 "+
                                            ") "+
                    ")) AS rangedifficulty, "+
                    "( " +
                        "SELECT " +
                            "difficulty.name " +
                        "FROM " +
                            "difficulty " +
                        "WHERE " +
                            "difficulty.id = ( " +
                                            "SELECT " +
                                                "ROUND(AVG(question.difficulty)) " +
                                                "FROM " +
                                                "usingquestion " +
                                                "LEFT JOIN question ON question.id = usingquestion.idquestion " +
                                                "WHERE " +
                                                "idquestionnaire = questionnaire.id " +
                                            ") " +
                    ") AS difficultymoy, " +
                    "pointsmax, " +
                    "showpoints, " +
                    "to_char(lastmodified, 'DD/MM/YYYY') AS lastmodified, " +
                    "( " +
                        "SELECT " +
                            "count(*) " +
                        "FROM " +
                            "usingquestion " +
                        "WHERE " +
                            "idquestionnaire = questionnaire.id " +
                    ") AS numberofquestions, " +
                    "( " +
                        "SELECT " +
                            "rate.rate " +
                        "FROM " +
                            "( " +
                                "SELECT " +
                                    "AVG(rate.rate) AS rate " +
                                "FROM " +
                                    "rate " +
                                    "LEFT JOIN usingquestion ON usingquestion.idquestion = rate.idquestion " +
                                "WHERE " +
                                    "idquestionnaire = questionnaire.id " +
                                "GROUP BY " +
                                    "rate.idquestion " +
                            ") AS rate " +
                        "ORDER BY rate.rate DESC  " +
                        "LIMIT 1  " +
                    ") AS notemax, " +
                    "( " +
                    "SELECT " +
                    "rate.rate " +
                "FROM " +
                        "( " +
                            "SELECT " +
                                "AVG(rate.rate) AS rate " +
                            "FROM " +
                                "rate " +
                                "LEFT JOIN usingquestion ON usingquestion.idquestion = rate.idquestion " +
                            "WHERE " +
                                "idquestionnaire = questionnaire.id " +
                            "GROUP BY " +
                                "rate.idquestion " +
                        ") AS rate " +
                        "ORDER BY rate.rate ASC  " +
                        "LIMIT 1  " +
                    ") AS notemin, " +
                    "( " +
                        "SELECT " +
                            "AVG(rate.rate) AS rate " +
                        "FROM " +
                            "( " + 
                                "SELECT " + 
                                    "AVG(rate.rate) AS rate " + 
                                "FROM " + 
                                    "rate " + 
                                    "LEFT JOIN usingquestion ON usingquestion.idquestion = rate.idquestion " + 
                                "WHERE " + 
                                    "usingquestion.idquestionnaire = questionnaire.id " + 
                                "GROUP BY " + 
                                    "rate.idquestion " + 
                            ") AS rate " + 
                    ") AS notemoy, " +
                    "account.id AS accountid " +
                "FROM " +
                    "questionnaire " +
                    "LEFT JOIN grade ON grade.id = questionnaire.grade " +
                    "LEFT JOIN account ON account.id = questionnaire.account " +
                "WHERE " +
                    "questionnaire.id = " + id;

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

function getQuestionnaireQuestions(req, res, next) {
    var id = parseInt(req.params.id);
    var query = schema +
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
                    "to_char(lastmodified, 'DD/MM/YYYY') AS lastmodified, " +
                    "usingquestion.points AS points " +
                "FROM "+
                    "usingquestion " +
                    "LEFT JOIN question ON idquestion = question.id " +
                    "LEFT JOIN grade ON grade.id = question.grade " +
                    "LEFT JOIN account ON account.id = question.account " +  
                "WHERE " +
                    "idquestionnaire = " + id +
                    " ORDER BY idquestion ASC";

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

function getMyQuestionnairesWithoutThisQuestion(req, res, next) {
    var query = schema +
                "SELECT "+
                "account.login, "+
                "questionnaire.id, "+
                "color, "+
                "questionnaire.name AS name, "+
                "grade.name AS level, "+
                "category AS category, "+
                "theme AS theme, "+
                "CONCAT(( "+
                  "SELECT "+
                      "difficulty.name "+
                    "FROM "+
                      "difficulty "+
                    "WHERE "+
                      "difficulty.id = ( "+
                                  "SELECT "+
                                      "question.difficulty "+
                                    "FROM "+
                                      "usingquestion "+
                                      "LEFT JOIN question ON question.id = usingquestion.idquestion "+
                                    "WHERE "+
                                      "idquestionnaire = questionnaire.id "+
                                    "ORDER BY "+
                                      "question.difficulty ASC "+
                                    "LIMIT 1 "+
                                        ") "+
                    "LIMIT 1 "+
                "), " +
                "' - ', "+
                "( "+
                  "SELECT "+
                      "difficulty.name "+
                    "FROM "+
                      "difficulty "+
                    "WHERE "+
                      "difficulty.id = ( "+
                                  "SELECT "+
                                      "question.difficulty "+
                                    "FROM "+
                                      "usingquestion "+
                                      "LEFT JOIN question ON question.id = usingquestion.idquestion "+
                                    "WHERE "+
                                      "idquestionnaire = questionnaire.id "+
                                    "ORDER BY "+
                                      "question.difficulty DESC "+
                                    "LIMIT 1 "+
                                        ") "+
                ")) AS rangedifficulty, "+
                "( "+
                  "SELECT "+
                      "difficulty.name "+
                    "FROM "+
                      "difficulty "+
                    "WHERE "+
                      "difficulty.id = ( "+
                                  "SELECT "+
                                      "ROUND(AVG(question.difficulty)) "+
                                    "FROM "+
                                      "usingquestion "+
                                      "LEFT JOIN question ON question.id = usingquestion.idquestion "+
                                    "WHERE "+
                                      "idquestionnaire = questionnaire.id "+
                                        ") "+
                ") AS difficulty, "+
                "pointsmax AS bareme, "+
                "showpoints AS showbareme, "+
                "to_char(lastmodified, 'DD/MM/YYYY') AS lastmodified, "+
                "( "+
                    "SELECT "+
                      "count(*) "+
                    "FROM "+
                      "usingquestion "+
                    "WHERE "+
                      "idquestionnaire = questionnaire.id "+
                ") AS questions "+
            "FROM "+
                "questionnaire "+
                "LEFT JOIN grade ON grade.id = questionnaire.grade "+
                "LEFT JOIN account ON account.id = questionnaire.account "+
            "WHERE "+
                "account.id = " + req.body.idaccount +
                "AND ( " +
                    "SELECT " +
                        "count(*) " +
                    "FROM " +
                        "usingquestion " +
                    "WHERE " +
                        "idquestionnaire = questionnaire.id " +
                        "AND idquestion = " + req.body.idquestion +
                ") = 0";

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

function createQuestionnaire(req, res, next) {
    var query = schema + "INSERT INTO questionnaire(color, name, pointsmax, showpoints, grade, category, theme, account) " + 
                "VALUES ('" + req.body.color + "', '" + co.replaceQuote(req.body.name) + "', " + req.body.pointsmax + ", " + req.body.showpoints + 
                ", " + req.body.grade + ", '" + co.replaceQuote(req.body.category) + "', '" + co.replaceQuote(req.body.theme) + "', " + req.body.account + ")";

    db.none(query)
    .then(function () {
        res.status(200)
            .json({
            status: '200',
            message: 'Création du questionnaire effectuée avec succès'
            });
    })
    .catch(function (err) {
        res.status(302)
            .json({
            status: '302',
            message: "La création du questionnaire a échouée"
            });
    });
}

function updateQuestionnaire(req, res, next) {
    var query = schema + 
                "UPDATE questionnaire " +
                "SET color = '" + req.body.color + "', " +
                    "name = '" + req.body.name + "', " + 
                    "pointsmax = " + req.body.pointsmax + ", " + 
                    "showpoints = " + req.body.showpoints + ", " + 
                    "grade = " + req.body.grade + ", " +
                    "category = '" + req.body.category + "', " +
                    "theme = '" + req.body.theme + "' " + 
                "WHERE " +
                    "id = " + req.body.id;

    db.none(query)
    .then(function () {
        res.status(200)
            .json({
            status: '200',
            message: 'Modification du questionnaire effectuée avec succès'
            });
    })
    .catch(function (err) {
        res.status(302)
            .json({
            status: '302',
            message: "La modification du questionnaire a échouée"
            });
    });
}

function deleteQuestionnaire(req, res, next)
{
    var id = parseInt(req.params.id);

    var query = schema + 
                "DELETE FROM usingquestion WHERE idquestionnaire = " + id + ";" +
                "DELETE FROM questionnaire " +
                "WHERE " +
                    "id = " + id;

    db.none(query)
    .then(function () {
        res.status(200)
            .json({
            status: '200',
            message: 'Suppression du questionnaire effectuée avec succès'
            });
    })
    .catch(function (err) {
        res.status(302)
            .json({
            status: '302',
            message: "La suppression du questionnaire a échouée"
            });
    });
}

module.exports = {
    getMyQuestionnaires: getMyQuestionnaires,
    getQuestionnaire: getQuestionnaire,
    getQuestionnaireQuestions: getQuestionnaireQuestions,
    getMyQuestionnairesWithoutThisQuestion: getMyQuestionnairesWithoutThisQuestion,
    createQuestionnaire: createQuestionnaire,
    updateQuestionnaire: updateQuestionnaire,
    deleteQuestionnaire: deleteQuestionnaire
}