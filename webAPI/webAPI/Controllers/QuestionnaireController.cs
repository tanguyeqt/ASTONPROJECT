using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webAPI.APIModel;
using webAPI.DAL;
using webAPI.Model;

namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [EnableCors("CorsPolicy")]
    public class QuestionnaireController : Controller
    {
        private readonly SharkwestDbContext _context;

        public QuestionnaireController(SharkwestDbContext sharkwestDbContext)
        {
            _context = sharkwestDbContext;
        }

        /// <summary>
        /// Création d'un questionnaire
        /// </summary>
        /// <param name="questionnaire">questionnaire récupéré du formulaire</param>
        /// <returns>Code http</returns>
        [HttpPost("[action]")]
        public ActionResult CreateQuestionnaire([FromBody]FormQuestionnaire questionnaire)
        {
            try
            {
                var newQuestionnaire = new Questionnaire()
                {
                    Color = questionnaire.Color,
                    Name = questionnaire.Name,
                    Pointsmax = questionnaire.PointsMax,
                    Showpoints = questionnaire.ShowPoints,
                    Grade = questionnaire.Grade,
                    Category = questionnaire.Category,
                    Theme = questionnaire.Theme,
                    Account = questionnaire.Account,

                };

                _context.Questionnaire.Add(newQuestionnaire);
                _context.SaveChanges();

                return Json(new
                {
                    status = "200",
                    message = "Création du questionnaire effectuée avec succès"
                });
            }
            catch (Exception)
            {
                return StatusCode(500, Json(new
                {
                    status = "500",
                    message = "La création du questionnaire a échouée"
                }));
            }
        }

        /// <summary>
        /// Récupération de tous les questionnaires d'un utilisateur
        /// </summary>
        /// <param name="id">id de l'utilisateur</param>
        /// <returns>questionnaires créés par l'utilisateur</returns>
        [HttpGet("[action]")]
        public ActionResult GetMyQuestionnaires(int id)
        {
            try
            {
                #region query

                var questionnaires = from x in _context.Questionnaire
                                    join a in _context.Account on x.Account equals a.Id
                                    where a.Id == id
                                    select new
                                    {
                                        Login = a.Id,
                                        x.Id,
                                        x.Color,
                                        x.Name,
                                        Level = _context.Grade.FirstOrDefault(w => w.Id == x.Grade).Name,
                                        x.Category,
                                        x.Theme,
                                        RangedDifficulty = _context.Difficulty.FirstOrDefault(w => w.Id == x.UsingQuestion.Join(_context.Question, uq => uq.Idquestion, qu => qu.Id, (uq,qu) => new { Uq = uq, Qu = qu }).Select(y => y.Qu.Difficulty).Min()).Name  + " - " +_context.Difficulty.FirstOrDefault(w => w.Id == x.UsingQuestion.Join(_context.Question, uq => uq.Idquestion, qu => qu.Id, (uq, qu) => new { Uq = uq, Qu = qu }).Select(y => y.Qu.Difficulty).Max()).Name,
                                        Difficulty = _context.Difficulty.FirstOrDefault(w => w.Id == Math.Round(x.UsingQuestion.Join(_context.Question, uq => uq.Idquestion, qu => qu.Id, (uq, qu) => new { Uq = uq, Qu = qu }).Select(y => y.Qu.Difficulty).Average().Value, 0)).Name,
                                        Bareme = x.Pointsmax,
                                        ShowBareme = x.Showpoints,
                                        LastModified = x.Lastmodified != null ? x.Lastmodified.ToString("dd/MM/yyyy à HH:mm") : null,
                                        Questions = x.UsingQuestion.Count
                                    };

                // Listing des questionnaires             
                var result = questionnaires.ToList();

                if (result.Count == 0)
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
                    message = "Une erreur est survenue lors de la récupération des questionnaires de l'utilisateur ! Si le problème persiste, contactez le support. --> " + e,
                    success = false
                }));
            }
        }

        /// <summary>
        /// Récupération d'un questionnaire à partir de son id
        /// </summary>
        /// <param name="id">id du questionnaire</param>
        /// <returns>questionnaire</returns>
        [HttpGet("[action]")]
        public ActionResult GetQuestionnaire(int id)
        {
            try
            {
                #region query

                var questionnaire = from x in _context.Questionnaire
                                    join a in _context.Account on x.Account equals a.Id
                                    where x.Id == id
                                    select new
                                    {
                                        AccountId = a.Id,
                                        x.Id,
                                        x.Color,
                                        x.Name,
                                        Level = _context.Grade.FirstOrDefault(w => w.Id == x.Grade).Name,
                                        LevelId = x.Grade,
                                        x.Category,
                                        x.Theme,
                                        RangeDifficulty = _context.Difficulty.FirstOrDefault(w => w.Id == x.UsingQuestion.Join(_context.Question, uq => uq.Idquestion, qu => qu.Id, (uq, qu) => new { Uq = uq, Qu = qu }).Select(y => y.Qu.Difficulty).Min()).Name + " - " + _context.Difficulty.FirstOrDefault(w => w.Id == x.UsingQuestion.Join(_context.Question, uq => uq.Idquestion, qu => qu.Id, (uq, qu) => new { Uq = uq, Qu = qu }).Select(y => y.Qu.Difficulty).Max()).Name,
                                        DifficultyMoy = _context.Difficulty.FirstOrDefault(w => w.Id == Math.Round(x.UsingQuestion.Join(_context.Question, uq => uq.Idquestion, qu => qu.Id, (uq, qu) => new { Uq = uq, Qu = qu }).Select(y => y.Qu.Difficulty).Average().Value, 0)).Name,
                                        PointsMax = x.Pointsmax,
                                        ShowPoints = x.Showpoints,
                                        LastModified = x.Lastmodified != null ? x.Lastmodified.ToString("dd/MM/yyyy à HH:mm") : null,
                                        NumberOfQuestions = x.UsingQuestion.Count,
                                        NoteMax = x.UsingQuestion.Count > 0 && x.UsingQuestion.Join(_context.Rate, uq => uq.Idquestion, r => r.Idquestion, (uq, r) => new { Uq = uq, R = r }).Count() > 0 ?
                                                  x.UsingQuestion
                                                   .Join(_context.Rate, uq => uq.Idquestion, r => r.Idquestion, (uq, r) => new
                                                   {
                                                       Uq = uq,
                                                       R = r
                                                   })
                                                   .Select(y => y.R.Rate1)
                                                   .Max()
                                                   :
                                                   -1,
                                        NoteMin = x.UsingQuestion.Count > 0 && x.UsingQuestion.Join(_context.Rate, uq => uq.Idquestion, r => r.Idquestion, (uq, r) => new { Uq = uq, R = r }).Count() > 0 ?
                                                  x.UsingQuestion
                                                   .Join(_context.Rate, uq => uq.Idquestion, r => r.Idquestion, (uq, r) => new
                                                   {
                                                       Uq = uq,
                                                       R = r
                                                   })
                                                   .Select(y => y.R.Rate1)
                                                   .Min()
                                                   :
                                                   -1,
                                        NoteMoy = x.UsingQuestion.Count > 0 && x.UsingQuestion.Join(_context.Rate, uq => uq.Idquestion, r => r.Idquestion, (uq, r) => new { Uq = uq, R = r }).Count() > 0 ?
                                                  x.UsingQuestion
                                                   .Join(_context.Rate, uq => uq.Idquestion, r => r.Idquestion, (uq, r) => new
                                                   {
                                                       Uq = uq,
                                                       R = r
                                                   })
                                                   .Select(y => y.R.Rate1)
                                                   .Average()
                                                   :
                                                   -1
                                    };

                // Questionnaire correspond            
                var result = questionnaire.FirstOrDefault();

                // Cas où le questionnaire n'existe pas en base
                if (result == null)
                    return StatusCode(400, Json(new
                    {
                        status = "400",
                        message = "Le questionnaire avec l'id " + id + " n'a pas été trouvé.",
                        success = false
                    }));

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
                    message = "Une erreur est survenue lors de la récupération du questionnaire ! Si le problème persiste, contactez le support. --> " + e,
                    success = false
                }));
            }
        }

        /// <summary>
        /// Récupération des questions d'un questionnaire à partir de son id
        /// </summary>
        /// <param name="id">id du questionnaire</param>
        /// <returns>questions du questionnaire</returns>
        [HttpGet("[action]")]
        public ActionResult GetQuestionnaireQuestions(int id)
        {
            try
            {
                #region query

                var questions = from x in _context.UsingQuestion
                                join qu in _context.Question on x.Idquestion equals qu.Id
                                join g in _context.Grade on qu.Grade equals g.Id
                                join a in _context.Account on qu.Account equals a.Id
                                where x.Idquestionnaire == id
                                orderby x.Idquestion
                                select new
                                {
                                    qu.Id,
                                    qu.Color,
                                    Level = g.Name,
                                    qu.Category,
                                    qu.Theme,
                                    Note = _context.Rate.Where(w => w.Idquestion == qu.Id).Count() > 0 ? _context.Rate.Where(w => w.Idquestion == qu.Id).Average(w => w.Rate1) : 0,
                                    Question = qu.Question1,
                                    qu.Response,
                                    DifficultyText = _context.Difficulty.First(w => w.Id == qu.Difficulty).Name,
                                    Avis = _context.Rate.Where(w => w.Idquestion == qu.Id).Count(),
                                    Comments = _context.Commentary.Where(w => w.Idquestion == qu.Id).Count(),
                                    Uses = _context.UsingQuestion.Where(w => w.Idquestion == qu.Id).Count(),
                                    AccountId = a.Id,
                                    a.Login,
                                    LastModified = qu.Lastmodified != null ? qu.Lastmodified.ToString("dd/MM/yyyy à HH:mm") : null,
                                    x.Points
                                };

                // Questions présentes dans le questionnaire          
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
                    message = "Une erreur est survenue lors de la récupération des questions du questionnaire ! Si le problème persiste, contactez le support. --> " + e,
                    success = false
                }));
            }
        }

        /// <summary>
        /// Modification d'un questionnaire
        /// </summary>
        /// <param name="id">id du questionnaire à modifier</param>
        /// <param name="questionnaire">questionnaire récupéré du formulaire</param>
        /// <returns>code retour et message</returns>
        [HttpPost("[action]")]
        public ActionResult UpdateQuestionnaire(int id, [FromBody]FormQuestionnaire questionnaire)
        {
            try
            {
                #region Récupération du questionnaire

                var q = _context.Questionnaire.FirstOrDefault(x => x.Id == id);

                if (q == null)
                    return StatusCode(400, Json(new
                    {
                        status = "400",
                        message = "Le questionnaire n'existe pas"
                    }));

                #endregion

                #region Modifications des données

                if (!string.IsNullOrWhiteSpace(questionnaire.Color))
                    q.Color = questionnaire.Color;
                if (!string.IsNullOrWhiteSpace(questionnaire.Name))
                    q.Name = questionnaire.Name;
                if (questionnaire.PointsMax != 0)
                    q.Pointsmax = questionnaire.PointsMax;                
                if (questionnaire.Grade != 0)
                    q.Grade = questionnaire.Grade;
                if (!string.IsNullOrWhiteSpace(questionnaire.Category))
                    q.Category = questionnaire.Category;
                if (!string.IsNullOrWhiteSpace(questionnaire.Theme))
                    q.Theme = questionnaire.Theme;

                q.Showpoints = questionnaire.ShowPoints;

                #endregion

                #region Sauvegarde en base de données

                _context.Questionnaire.Update(q);
                _context.SaveChanges();

                #endregion

                return Json(new
                {
                    status = "200",
                    message = "Modification du questionnaire effectuée avec succès"
                });
            }
            catch (Exception)
            {
                return StatusCode(500, Json(new
                {
                    status = "500",
                    message = "La modification du questionnaire a échouée"
                }));
            }
        }

        /// <summary>
        /// Suppression d'un questionnaire
        /// </summary>
        /// <param name="id">id du questionnaire à supprimer</param>
        /// <returns>message et code de retour</returns>
        [HttpDelete("[action]")]
        public ActionResult DeleteQuestionnaire(int id)
        {
            try
            {
                #region Suppression dans la table UsingQuestion

                // Récupération de toutes les lignes UsingQuestions
                var uquList = _context.UsingQuestion.Where(x => x.Idquestionnaire == id).ToList();

                // On parcourt la liste
                foreach (var usingQuestion in uquList)
                {
                    // On supprime la ligne en base de données
                    _context.UsingQuestion.Remove(usingQuestion);
                }

                // On sauvegarde les changements en bdd
                _context.SaveChanges();

                #endregion

                #region Suppression dans la table Questionnaire

                // Récupération du Questionnaire
                var questionnaire = _context.Questionnaire.FirstOrDefault(x => x.Id == id);

                // On supprime la ligne en base de données
                _context.Questionnaire.Remove(questionnaire);

                // On sauvegarde les changements en bdd
                _context.SaveChanges();

                #endregion

                return Json(new
                {
                    status = "200",
                    message = "Suppression du questionnaire effectuée avec succès"
                });
            }
            catch (Exception)
            {
                return StatusCode(500, Json(new
                {
                    status = "500",
                    message = "La suppression du questionnaire a échouée"
                }));
            }
        }

        /// <summary>
        /// Récupère tous les questionnaires dans lequel la question n'a pas déjà été ajoutée
        /// </summary>
        /// <param name="formQuestionnaireAccount">id du compte et id de la question</param>
        /// <returns>code de retour et message</returns>
        [HttpPost("[action]")]
        public ActionResult GetMyQuestionnairesWithoutThisQuestion([FromBody]FormQuestionnaireAccount formQuestionnaireAccount)
        {
            try
            {
                var questionnaires = from x in _context.Questionnaire
                                     join g in _context.Grade on x.Grade equals g.Id
                                     join a in _context.Account on x.Account equals a.Id
                                     where a.Id == formQuestionnaireAccount.IdAccount
                                     && x.UsingQuestion.Where(w => w.Idquestion == formQuestionnaireAccount.IdQuestion).Count() == 0
                                     //&& _context.UsingQuestion.Where(w => w.Idquestionnaire == x.Id && w.Idquestion == formQuestionnaireAccount.IdQuestion).Count() == 0
                                     select new
                                     {
                                         Login = a.Id,
                                         x.Id,
                                         x.Color,
                                         x.Name,
                                         Level = _context.Grade.FirstOrDefault(w => w.Id == x.Grade).Name,
                                         x.Category,
                                         x.Theme,
                                         RangedDifficulty = _context.Difficulty.FirstOrDefault(w => w.Id == x.UsingQuestion.Join(_context.Question, uq => uq.Idquestion, qu => qu.Id, (uq, qu) => new { Uq = uq, Qu = qu }).Select(y => y.Qu.Difficulty).Min()).Name + " - " + _context.Difficulty.FirstOrDefault(w => w.Id == x.UsingQuestion.Join(_context.Question, uq => uq.Idquestion, qu => qu.Id, (uq, qu) => new { Uq = uq, Qu = qu }).Select(y => y.Qu.Difficulty).Max()).Name,
                                         DifficultyMoy = _context.Difficulty.FirstOrDefault(w => w.Id == Math.Round(x.UsingQuestion.Join(_context.Question, uq => uq.Idquestion, qu => qu.Id, (uq, qu) => new { Uq = uq, Qu = qu }).Select(y => y.Qu.Difficulty).Average().Value, 0)).Name,
                                         Bareme = x.Pointsmax,
                                         ShowBareme = x.Showpoints,
                                         LastModified = x.Lastmodified != null ? x.Lastmodified.ToString("dd/MM/yyyy à HH:mm") : null,
                                         Questions = x.UsingQuestion.Count,
                                     };


                var result = questionnaires.ToList();

                return Json(new
                {
                    status = "200",
                    data = result,
                    message = "ok",
                    success = true
                });
            }
            catch (Exception)
            {
                return StatusCode(500, Json(new
                {
                    status = "500",
                    message = "Une erreur est survenue lors de la remontée des questionnaires de l'utilisateur ! Si le problème persiste, contactez le support"
                }));
            }
        }
    }
}