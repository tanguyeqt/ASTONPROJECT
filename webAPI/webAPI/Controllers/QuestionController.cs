using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using webAPI.APIModel;
using webAPI.DAL;
using webAPI.Model;

namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [EnableCors("CorsPolicy")]
    public class QuestionController : Controller
    {
        private readonly SharkwestDbContext _context;

        public QuestionController(SharkwestDbContext sharkwestDbContext)
        {
            _context = sharkwestDbContext;
        }

        /// <summary>
        /// Création d'une question
        /// </summary>
        /// <param name="question">question récupérée du formulaire</param>
        /// <returns>Code http</returns>
        [HttpPost("[action]")]
        public ActionResult CreateQuestion([FromBody]FormQuestion question)
        {
            try
            {
                var newQuestion = new Question()
                {
                    Color = question.Color,
                    Account = question.Account,
                    Category = question.Category,
                    Difficulty = question.Difficulty,
                    Grade = question.Grade,
                    Theme = question.Theme,
                    Question1 = question.Question,
                    Response = question.Response
                };

                _context.Question.Add(newQuestion);
                _context.SaveChanges();

                return Json(new
                {
                    status = "200",
                    message = "Question créé avec succès !"
                });
            }
            catch (Exception)
            {
                return StatusCode(500, Json(new
                {
                    status = "500",
                    message = "Impossible de créer la question."
                }));
            }
        }

        /// <summary>
        /// Modification d'une question
        /// </summary>
        /// <param name="id">id de la question à modifier</param>
        /// <param name="question">question récupérée du formulaire</param>
        /// <returns>code retour et message</returns>
        [HttpPost("[action]")]
        public ActionResult UpdateQuestion(int id, [FromBody]FormQuestion question)
        {
            try
            {
                var q = _context.Question.FirstOrDefault(x => x.Id == id);

                if(q == null)
                    return StatusCode(404, Json(new
                    {
                        status = "404",
                        message = "La question n'existe pas"
                    }));

                if(!string.IsNullOrWhiteSpace(question.Color))
                    q.Color = question.Color;
                if(question.Account != 0)
                    q.Account = question.Account;
                if(!string.IsNullOrWhiteSpace(question.Category))
                    q.Category = question.Category;
                if(question.Difficulty != 0)
                    q.Difficulty = question.Difficulty;
                if(question.Grade != 0)
                    q.Grade = question.Grade;
                if(!string.IsNullOrWhiteSpace(question.Theme))
                    q.Theme = question.Theme;
                if (!string.IsNullOrWhiteSpace(question.Question))
                    q.Question1 = question.Question;
                if (!string.IsNullOrWhiteSpace(question.Response))
                    q.Response = question.Response;

                _context.Question.Update(q);
                _context.SaveChanges();

                return Json(new
                {
                    status = "200",
                    message = "Modification de la question effectuée avec succès"
                });
            }
            catch (Exception)
            {
                return StatusCode(500, Json(new
                {
                    status = "500",
                    message = "La modification de la question a échouée"
                }));
            }
        }

        /// <summary>
        /// Récupération de toutes les questions (avec ou sans filtres)
        /// </summary>
        /// <param name="searchParameters">paramètres de recherche</param>
        /// <returns>questions filtrées</returns>
        [HttpPost("[action]")]
        public ActionResult GetQuestions([FromBody]SearchParameters searchParameters)
        {
            try
            {
                #region query

                var questions = from x in _context.Question
                                select new
                                {
                                    x.Id,
                                    x.Color,
                                    Level = _context.Grade.First(w => w.Id == x.Grade).Name,
                                    x.Category,
                                    x.Theme,
                                    Note = x.Rate.Count > 0 ? Math.Round(x.Rate.Select(y => y.Rate1).Average(), 2) : 0,
                                    x.Difficulty,
                                    DifficultyText = _context.Difficulty.First(w => w.Id == x.Difficulty).Name,
                                    Question = x.Question1,
                                    x.Response,
                                    Avis = x.Rate.Count,
                                    Comments = x.Commentary.Count,
                                    Uses = x.UsingQuestion.Count,
                                    AccountId = x.Account,
                                    Login = x.Account != null ? _context.Account.First(w => w.Id == x.Account).Login : string.Empty,
                                    LastModified = x.Lastmodified != null ? x.Lastmodified.ToString("dd/MM/yyyy à HH:mm") : null,
                                };

                // Ordre descendant sur les résultats
                questions = questions.OrderByDescending(x => x.Id);

                #endregion

                #region filtres

                // Question (recherche)
                if (!string.IsNullOrWhiteSpace(searchParameters.Search))
                    questions = questions.Where(x => x.Question.ToLower().Contains(searchParameters.Search.ToLower()));
                // Level
                if (searchParameters.Level > 0)
                    questions = questions.Where(x => x.Level.ToLower() == searchParameters.Level.ToString().ToLower());
                // Type de question
                if (searchParameters.TypeQuestion > 0)
                    questions = questions.Where(x => x.Response.ToLower().Contains("typeresponse\":" + searchParameters.TypeQuestion.ToString().ToLower()));
                // Difficulté
                if (searchParameters.Difficulty > 0)
                    questions = questions.Where(x => x.Difficulty == searchParameters.Difficulty);
                // Nom d'utilisateur
                if (!string.IsNullOrWhiteSpace(searchParameters.UserName))
                    questions = questions.Where(x => x.Login.ToLower().Contains(searchParameters.UserName.ToLower()));
                // Catégorie
                if (!string.IsNullOrWhiteSpace(searchParameters.Category))
                    questions = questions.Where(x => x.Category.ToLower().Contains(searchParameters.Category.ToLower()));
                // Theme
                if (!string.IsNullOrWhiteSpace(searchParameters.Theme))
                    questions = questions.Where(x => x.Theme.ToLower().Contains(searchParameters.Theme.ToLower()));
                // Avis
                if (searchParameters.Review > 0)
                    questions = questions.Where(x => x.Avis >= searchParameters.Review);
                // Note moyenne
                if (searchParameters.Rate > 0)
                    questions = questions.Where(x => x.Note >= searchParameters.Rate);
                // Nombre de résultats
                if (searchParameters.Top > 0)
                    questions = questions.Take(searchParameters.Top);

                // Listing des questions             
                var result = questions.ToList();

                #endregion

                return Json(new
                {
                    status = "200",
                    data = result,
                    message = "ok",
                    success = true
                });
            }
            catch (Exception e)
            {
                return StatusCode(500, Json(new
                {
                    status = "500",
                    message = "Une erreur est survenue lors de la récupération des questions ! Si le problème persiste, contactez le support. --> " + e,
                    success = false
                }));
            }
        }

        /// <summary>
        /// Récupération de toutes les questions d'un utilisateur
        /// </summary>
        /// <param name="id">id de l'utilisateur</param>
        /// <returns>questions créés par l'utilisateur</returns>
        [HttpGet("[action]")]
        public ActionResult GetMyQuestions(int id)
        {
            try
            {
                #region query

                var questions = from x in _context.Question
                                where x.Account == id
                                select new
                                {
                                    x.Id,
                                    x.Color,
                                    Level = _context.Grade.First(w => w.Id == x.Grade).Name,
                                    x.Category,
                                    x.Theme,
                                    Note = x.Rate.Count > 0 ? Math.Round(x.Rate.Select(y => y.Rate1).Average(), 2) : 0,
                                    x.Difficulty,
                                    DifficultyText = _context.Difficulty.First(w => w.Id == x.Difficulty).Name,
                                    Question = x.Question1,
                                    x.Response,
                                    Avis = x.Rate.Count,
                                    Comments = x.Commentary.Count,
                                    Uses = x.UsingQuestion.Count,
                                    AccountId = x.Account,
                                    Login = x.Account != null ? _context.Account.First(w => w.Id == x.Account).Login : string.Empty,
                                    LastModified = x.Lastmodified != null ? x.Lastmodified.ToString("dd/MM/yyyy à HH:mm") : null,
                                };                

                // Listing des questions             
                var result = questions.ToList();

                if(result.Count == 0)
                    return Json(new
                    {
                        status = "404",
                        message = "ok",
                        success = false
                    });

                #endregion

                return Json(new
                {
                    status = "200",
                    data = result,
                    message = "ok",
                    success = true
                });
            }
            catch (Exception e)
            {
                return StatusCode(500, Json(new
                {
                    status = "500",
                    message = "Une erreur est survenue lors de la récupération des questions de l'utilisateur ! Si le problème persiste, contactez le support. --> " + e,
                    success = false
                }));
            }
        }

        /// <summary>
        /// Récupération d'une question à partir de son id
        /// </summary>
        /// <param name="id">id de la question</param>
        /// <returns>question</returns>
        [HttpGet("[action]")]
        public ActionResult GetQuestion(int id)
        {
            try
            {
                #region query

                var questions = from x in _context.Question
                                where x.Id == id
                                select new
                                {
                                    x.Id,
                                    x.Color,
                                    Level = _context.Grade.First(w => w.Id == x.Grade).Name,
                                    LevelId = x.Grade,
                                    x.Category,
                                    x.Theme,
                                    Note = x.Rate.Count > 0 ? Math.Round(x.Rate.Select(y => y.Rate1).Average(), 2) : 0,
                                    x.Difficulty,
                                    DifficultyText = _context.Difficulty.First(w => w.Id == x.Difficulty).Name,
                                    Question = x.Question1,
                                    x.Response,
                                    Avis = x.Rate.Count,
                                    Comments = x.Commentary.Count,
                                    Uses = x.UsingQuestion.Count,
                                    AccountId = x.Account,
                                    Login = x.Account != null ? _context.Account.First(w => w.Id == x.Account).Login : string.Empty,
                                    LastModified = x.Lastmodified != null ? x.Lastmodified.ToString("dd/MM/yyyy à HH:mm") : null,
                                };

                // Question correspondante             
                var result = questions.FirstOrDefault();

                // Cas où la question n'existe pas en base
                if(result == null)
                    return StatusCode(404, Json(new
                    {
                        status = "404",
                        message = "La question avec l'id " + id + " n'a pas été trouvée.",
                        success = false
                    }));

                #endregion

                return StatusCode(200, Json(new
                {
                    status = "200",
                    data = result,
                    message = "ok",
                    success = true
                }));
            }
            catch (Exception e)
            {
                return StatusCode(500, Json(new
                {
                    status = "500",
                    message = "Une erreur est survenue lors de la récupération des questions de l'utilisateur ! Si le problème persiste, contactez le support. --> " + e,
                    success = false
                }));
            }
        }

        /// <summary>
        /// Récupération de tous les commentaires d'une question
        /// </summary>
        /// <param name="id">id de la question</param>
        /// <returns>commentaires correspondants à la question</returns>
        [HttpGet("[action]")]
        public ActionResult GetComments(int id)
        {
            try
            {
                #region query

                var commentaries = from x in _context.Commentary
                                   join a in _context.Account on x.Account equals a.Id
                                   where x.Idquestion == id
                                   orderby x.Posted descending
                                   select new
                                   {
                                       x.Id,
                                       Text = x.Body,
                                       Owner = a.Login,
                                       OwnerId = a.Id,
                                       a.Image,
                                       Date = x.Posted.ToString("dd/MM/yyyy à HH:mm")
                                   };

                // Listing des commentaires             
                var result = commentaries.ToList();

                #endregion

                return Json(new
                {
                    status = "200",
                    data = result,
                    message = "ok",
                    success = true
                });
            }
            catch (Exception e)
            {
                return StatusCode(500, Json(new
                {
                    status = "500",
                    message = "Une erreur est survenue lors de la récupération des commentaires de la question ! Si le problème persiste, contactez le support. --> " + e,
                    success = false
                }));
            }
        }

        /// <summary>
        /// Ajout d'un commentaire à une question
        /// </summary>
        /// <param name="comment">commentaire récupérée du formulaire</param>
        /// <returns>message et code de retour</returns>
        [HttpPost("[action]")]
        public ActionResult AddComment([FromBody]FormComment comment)
        {
            try
            {
                var newComment = new Commentary()
                {
                    Account = comment.Account,
                    Body = comment.Corps,
                    Idquestion = comment.IdQuestion
                };

                _context.Commentary.Add(newComment);
                _context.SaveChanges();

                return Json(new
                {
                    status = "200",
                    message = "Commentaire créé avec succès !"
                });
            }
            catch (Exception)
            {
                return StatusCode(500, Json(new
                {
                    status = "500",
                    message = "Une erreur est survenue lors de la création du commentaire"
                }));
            }
        }

        /// <summary>
        /// Ajout d'une note à une question
        /// </summary>
        /// <param name="rate">note récupérée du formulaire</param>
        /// <returns>message et code de retour</returns>
        [HttpPost("[action]")]
        public ActionResult AddRate([FromBody]FormRate rate)
        {
            try
            {
                var newRate = new Rate()
                {
                    Idquestion = rate.IdQuestion,
                    Idaccount = rate.IdAccount,
                    Rate1 = rate.Rate
                };

                _context.Rate.Add(newRate);
                _context.SaveChanges();

                return Json(new
                {
                    status = "200",
                    message = "Note ajoutée avec succès !"
                });
            }
            catch (Exception)
            {
                return StatusCode(500, Json(new
                {
                    status = "500",
                    message = "Une erreur est survenue lors de l'ajout de la note"
                }));
            }
        }

        /// <summary>
        /// Ajout d'une question à un questionnaire
        /// </summary>
        /// <param name="form">informations issues du formulaire contenant l'id de la question et du questionnaire</param>
        /// <returns>message et code de retour</returns>
        [HttpPost("[action]")]
        public ActionResult AddQuestionToQuestionnaire([FromBody]FormQuestionQuestionnaire form)
        {
            try
            {
                #region Ajout dans la table UsingQuestion

                if(_context.UsingQuestion.FirstOrDefault(x => x.Idquestion == form.IdQuestion && x.Idquestionnaire == form.IdQuestionnaire) != null)
                    return StatusCode(302, Json(new
                    {
                        status = "302",
                        message = "La question est déjà présente dans ce questionnaire"
                    }));

                var uq = new UsingQuestion()
                {
                    Idquestion = form.IdQuestion,
                    Idquestionnaire = form.IdQuestionnaire
                };

                _context.UsingQuestion.Add(uq);

                #endregion

                #region Modification de la date de dernière modification dans la table Questionnaire

                var questionnaire = _context.Questionnaire.FirstOrDefault(x => x.Id == form.IdQuestionnaire);
                
                if(questionnaire != null)
                {
                    questionnaire.Lastmodified = DateTime.Now;
                    _context.Questionnaire.Update(questionnaire);
                }                

                #endregion

                _context.SaveChanges();

                return Json(new
                {
                    status = "200",
                    message = "Ajout de la question au questionnaire réalisé avec succès"
                });
            }
            catch (Exception)
            {
                return StatusCode(500, Json(new
                {
                    status = "500",
                    message = "Erreur lors de l'ajout de la question au questionnaire"
                }));
            }
        }

        /// <summary>
        /// Suppression d'une question d'un questionnaire
        /// </summary>
        /// <param name="form">informations issues du formulaire contenant l'id de la question et du questionnaire</param>
        /// <returns>message et code de retour</returns>
        [HttpPost("[action]")]
        public ActionResult DeleteQuestionFromQuestionnaire([FromBody]FormQuestionQuestionnaire form)
        {
            try
            {
                #region Suppression dans la table UsingQuestion

                var uq = _context.UsingQuestion.FirstOrDefault(x => x.Idquestion == form.IdQuestion && x.Idquestionnaire == form.IdQuestionnaire);

                if(uq == null)
                    return StatusCode(302, Json(new
                    {
                        status = "302",
                        message = "La question n'est pas présente dans ce questionnaire"
                    }));

                _context.UsingQuestion.Remove(uq);

                #endregion

                #region Modification de la date de dernière modification dans la table Questionnaire

                var questionnaire = _context.Questionnaire.FirstOrDefault(x => x.Id == form.IdQuestionnaire);

                if (questionnaire != null)
                {
                    questionnaire.Lastmodified = DateTime.Now;
                    _context.Questionnaire.Update(questionnaire);
                }

                #endregion

                _context.SaveChanges();

                return Json(new
                {
                    status = "200",
                    message = "Suppression de la question du questionnaire réalisée avec succès"
                });
            }
            catch (Exception)
            {
                return StatusCode(500, Json(new
                {
                    status = "500",
                    message = "Erreur lors de la suppression de la question du questionnaire"
                }));
            }
        }
    }
}