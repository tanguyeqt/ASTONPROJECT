function shuffleResponses(response)
{
    var responses = [];
    var k = 0;
    response.correctresponse.forEach(function(rep) {
        responses[k++] = rep;
    });
    response.incorrectresponse.forEach(function(rep) {
        responses[k++] = rep;
    });

    var tmp, rand, inc;
    for (inc = responses.length - 1; inc > 0; inc--) {
        rand = Math.floor(Math.random() * (inc + 1));
        tmp = responses[inc];
        responses[inc] = responses[rand];
        responses[rand] = tmp;
    }

    return responses;
}

function getQuestionnaire(questionnaire, questions)
{
    var html = "<!DOCTYPE html>" +
                '<html id="html" style="width:1240px;">' +
                    '<head>' +
                        '<title></title>' +
                        '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">' +
                    '</head>' +
                    '<body>' +
                        '<h1 class="text-center text-danger">' + questionnaire.category + '</h1><br />' +
                        'Élève :' +
                        '<br />' +
                        'Classe :' +
                        '<br /><br />' +
                        '<table width="100%" style="background-color:white;">' +
                            '<tr>' +
                                '<td style="border: 1px solid black; padding: 2%; width: 30%; background-color:white;">' +
                                    '<p><u>Note</u> :</p>' +
                                    '<div class="row">' +
                                        '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5"></div>' +
                                        '<div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">' +
                                            (questionnaire.showpoints ? '<span style="font-size: 75px;">/</span><span style="font-size: 55px;">' + questionnaire.pointsmax + '</span>' : '<br /><br /><br />') + 
                                        '</div>' +
                                    '</div>' +
                                '</td>' +
                                '<td style="border: 1px solid black; padding: 2%;">' +
                                    '<u>Commentaire</u> :<br /><br /><br /><br /><br />' +
                                '</td>' +
                            '</tr>' +
                        '</table>' +
                        '<br />' +
                        '<h3 class="text-center">' + questionnaire.theme + '</h3>';
    var i = 0;
    questions.forEach(function(question) {
        i++;
        html += '<br />' +
                '<div class="row">' +
                    '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>' +
                    '<div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">' +
                        '<h5>' + i + '. ' + question.question + (questionnaire.showpoints ? '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/' + question.points : '') + '</h5> ' +
                    '</div>' +
                    '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>' +
                '</div>' +
                '<br />' +
                '<div class="row">' +
                    '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>' +
                    '<div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">';

        var response = JSON.parse(question.response);
        var responses = shuffleResponses(response);

        switch (response.typeresponse)
        {
            case 1:
                responses.forEach(function(rep) {
                    var length = (Math.round(rep.length / 15) != 0 ? Math.round(rep.length / 15) : 1);
                    var inc;
                    for (inc = 0; inc < length; inc++) {
                        html += '<hr />';
                        if (inc + 1 < length)
                            html += '<br />';
                    }
                });
                break;
            case 2:
                responses.forEach(function(rep) {
                    html += '<input type="checkbox"/> &nbsp;' + rep + '<br />';
                });
                break;
            case 3:
                responses.forEach(function(rep) {
                    html += '<input type="radio" name="question' + i + '"/> &nbsp;' + rep + '<br />';
                });
                break;
            default : 
                break;
        }
                        
        html += '</div>' +
            '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>' +
        '</div>';
    });

    return html;
}

function getCorrection(questionnaire, questions) {
    var html = "<!DOCTYPE html>" +
                '<html id="html" style="width:1240px;">' +
                    '<head>' +
                        '<title></title>' +
                        '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">' +
                    '</head>' +
                    '<body>' +
                        '<h1 class="text-center text-danger">' + questionnaire.category + '</h1><br />' +
                        '<h3 class="text-center">' + questionnaire.theme + '</h3>';
    var i = 0;
    questions.forEach(function(question) {
        i++;
        html += '<br />' +
                '<div class="row">' +
                    '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>' +
                    '<div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">' +
                        '<h5>' + i + '. ' + question.question + (questionnaire.showpoints ? '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/' + question.points : '') + '</h5> ' +
                    '</div>' +
                    '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>' +
                '</div>' +
                '<br />' +
                '<div class="row">' +
                    '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>' +
                    '<div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">';

        var response = JSON.parse(question.response);

        switch (response.typeresponse)
        {
            case 1:
                response.correctresponse.forEach(function(rep) {
                    html += '<p style="color:red; font-size: 30px;">' + rep + '<br /></p>';
                });
                break;
            case 2:
                response.correctresponse.forEach(function(rep) {
                    html += '<input type="checkbox" checked/> &nbsp;' + rep + '<br />';
                });
                response.incorrectresponse.forEach(function(rep) {
                    html += '<input type="checkbox"/> &nbsp;' + rep + '<br />';
                });
                break;
            case 3:
                response.correctresponse.forEach(function(rep) {
                    html += '<input type="radio" name="question' + i + '" checked/> &nbsp;' + rep + '<br />';
                });
                response.incorrectresponse.forEach(function(rep) {
                    html += '<input type="radio" name="question' + i + '"/> &nbsp;' + rep + '<br />';
                });
                break;
            default : 
                break;
        }
                        
        html += '</div>' +
            '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>' +
        '</div>';
    });

    return html;
}

module.exports = {
    getQuestionnaire: getQuestionnaire,
    getCorrection: getCorrection
}