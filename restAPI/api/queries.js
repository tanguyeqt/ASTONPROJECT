/////////////////////
// Query Functions
/////////////////////

var question = require('../queries/question')
var questionnaire = require('../queries/questionnaire')
var account = require('../queries/account')
var theme = require('../queries/theme')
var category = require('../queries/category')
var grade = require('../queries/grade')

/////////////
// Exports
/////////////

module.exports = {
    getQuestions: question.getQuestions,
    getMyQuestions: question.getMyQuestions,
    getQuestion: question.getQuestion,
    getComments: question.getComments,
    getMyQuestionnaires: questionnaire.getMyQuestionnaires,
    getMyQuestionnairesWithoutThisQuestion: questionnaire.getMyQuestionnairesWithoutThisQuestion,
    getQuestionnaire: questionnaire.getQuestionnaire,
    getQuestionnaireQuestions: questionnaire.getQuestionnaireQuestions,
    checkAccount: account.checkAccount,
    addAccount: account.addAccount,
    updateAccount : account.updateAccount,
    getProfile : account.getProfile,
    addNote: question.addNote,
    addQuestionToQuestionnaire: question.addQuestionToQuestionnaire,
    deleteQuestionFromQuestionnaire: question.deleteQuestionFromQuestionnaire,
    createQuestionnaire: questionnaire.createQuestionnaire,
    updateQuestionnaire: questionnaire.updateQuestionnaire,
    deleteQuestionnaire: questionnaire.deleteQuestionnaire,
    getAllTheme: theme.getAllTheme,
    getAllCategory: category.getAllCategory,
    getAllGrade: grade.getAllGrade,
    createCategory: category.createCategory,
    createTheme: theme.createTheme,
    createQuestion: question.createQuestion,
    updateQuestion: question.updateQuestion,
    addComment: question.addComment
   
};
