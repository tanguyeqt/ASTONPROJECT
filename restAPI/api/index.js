var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


// http://localhost:3001/
router.get('/', function(req, res, next) {
    res.status(200)
      .json({
        status: 'success',
        message: 'Serveur node actif'
      });
});


//////////////////////
// Postgres queries
//////////////////////

var db = require('./queries');

router.post('/api/sharkwest/questions', db.getQuestions);
router.get('/api/sharkwest/questions/:id', db.getMyQuestions);
router.get('/api/sharkwest/question/:id', db.getQuestion);
router.get('/api/sharkwest/comments/:id', db.getComments);
router.get('/api/sharkwest/questionnaires/:id', db.getMyQuestionnaires);
router.post('/api/sharkwest/questionnaires', db.getMyQuestionnairesWithoutThisQuestion);
router.get('/api/sharkwest/questionnaire/:id', db.getQuestionnaire);
router.get('/api/sharkwest/questionnairequestion/:id', db.getQuestionnaireQuestions);
router.get('/api/sharkwest/profile/:id', db.getProfile);
router.post('/api/sharkwest/account', db.checkAccount);
router.post('/api/sharkwest/addaccount', db.addAccount);
router.post('/api/sharkwest/addnote', db.addNote);
router.post('/api/sharkwest/addQuestionToQuestionnaire', db.addQuestionToQuestionnaire);
router.post('/api/sharkwest/deleteQuestionFromQuestionnaire', db.deleteQuestionFromQuestionnaire);
router.post('/api/sharkwest/createQuestionnaire', db.createQuestionnaire);
router.post('/api/sharkwest/updateQuestionnaire', db.updateQuestionnaire);
router.get('/api/sharkwest/deleteQuestionnaire/:id', db.deleteQuestionnaire);
router.get('/api/sharkwest/getAllTheme', db.getAllTheme);
router.get('/api/sharkwest/getAllCategory', db.getAllCategory);
router.get('/api/sharkwest/getAllGrade', db.getAllGrade);
router.post('/api/sharkwest/createCategory', db.createCategory);
router.post('/api/sharkwest/createTheme', db.createTheme);
router.post('/api/sharkwest/createQuestion', db.createQuestion);
router.post('/api/sharkwest/updateQuestion', db.updateQuestion);
router.post('/api/sharkwest/addComment', db.addComment);
router.post('/api/sharkwest/updateAccount/:id', db.updateAccount);


module.exports = router;
