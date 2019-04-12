using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webAPI.Model;
using webAPI.DAL;
using webAPI.APIModel;
using Microsoft.AspNetCore.Cors;

namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [EnableCors("CorsPolicy")]
    public class AccountController : Controller
    {
        private readonly SharkwestDbContext _context;

        public AccountController(SharkwestDbContext sharkwestDbContext)
        {
            _context = sharkwestDbContext;
        }

        /// <summary>
        /// Création d'un compte
        /// </summary>
        /// <param name="account">nouveau compte utilisateur</param>
        /// <returns>Code http</returns>
        [HttpPost("[action]")]
        public ActionResult Add([FromBody]FormAccount account)
        {
            try
            {
                if(_context.Account.FirstOrDefault(x => x.Email == account.Email) != null)
                    return StatusCode(300, Json(new
                    {
                        status = "300",
                        message = "Cette adresse email est déjà utilisée."
                    }));
                if(_context.Account.FirstOrDefault(x => x.Login == account.Login) != null)
                    return StatusCode(300, Json(new
                    {
                        status = "300",
                        message = "Ce nom d'utilisateur est déjà utilisé."
                    }));

                var newAccount = new Account()
                {
                    Firstname = account.FirstName,
                    Lastname = account.FirstName,
                    Birthdate = account.BirthDate,
                    Email = account.Email,
                    Login = account.Login,
                    Password = account.Password
                };

                _context.Account.Add(newAccount);
                _context.SaveChanges();

                return StatusCode(200, Json(new
                {
                    status = "200",
                    message = "Compte créé avec succès !"
                }));
            }
            catch (Exception)
            {
                return StatusCode(500, Json(new
                {
                    status = "500",
                    message = "Une erreur est survenue lors de la création du compte"
                }));
            }
        }

        /// <summary>
        /// Suppression d'un compte
        /// </summary>
        /// <param name="id">id du compte à supprimer</param>
        /// <returns></returns>
        [HttpDelete("[action]/id")]
        public ActionResult Delete(int id)
        {
            try
            {
                var account = _context.Account.FirstOrDefault(x => x.Id == id);

                if (account == null)
                    return StatusCode(500, Json(new
                    {
                        status = "500",
                        message = "Le compte à supprimer n'existe pas !"
                    }));

                _context.Account.Remove(account);
                _context.SaveChanges();

                return Json(new
                {
                    status = "200",
                    message = "Compte supprimé avec succès !"
                });
            }
            catch (Exception e)
            {
                return StatusCode(500, Json(new
                {
                    status = "500",
                    message = "Une erreur est survenue lors de la création du compte !"
                }));
            }
        }

        /// <summary>
        /// Connexion (à partir du login ou email ainsi que du mot de passe uniquement)
        /// </summary>
        /// <param name="account">compte utilisateur</param>
        /// <returns>id du compte utilisateur</returns>
        [HttpPost("[action]")]
        public ActionResult Check([FromBody]FormAccount account)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(account.Login) || string.IsNullOrWhiteSpace(account.Password))
                    return StatusCode(500, Json(new
                    {
                        status = "500",
                        isOk = false,
                        message = "Le nom de compte et le mot de passe doivent être renseignés"
                    }));

                var user = _context.Account.FirstOrDefault(x => (x.Email == account.Login || x.Login == account.Login) && x.Password == account.Password);

                if (user == null)
                    return StatusCode(500, Json(new
                    {
                        status = "500",
                        isOk = false,
                        message = "L'adresse email (ou nom d'utilisateur) et le mot de passe que vous avez entrés ne correspondent pas à ceux présents dans nos fichiers. Veuillez vérifier et réessayer."
                    }));
                else
                    return StatusCode(200, Json(new
                    {
                        status = "200",
                        isOk = true,
                        id = user.Id,
                        login = user.Login,
                        message = "ok"
                    }));
            }
            catch (Exception)
            {
                return StatusCode(500, Json(new
                {
                    status = "500",
                    message = "Une erreur est survenue lors de la connexion. Si le problème persiste, contactez le support."
                }));
            }            
        }

        /// <summary>
        /// Mettre à jour un compte à partir de son id (email, login et mot de passe uniquement)
        /// </summary>
        /// <param name="id">id du compte à modifier</param>
        /// <param name="account">compte utilisateur</param>
        /// <returns>id du compte utilisateur</returns>
        [HttpPost("[action]")]
        public ActionResult Update(int id, [FromBody]FormAccount account)
        {
            try
            {
                if (id <= 0)
                    return StatusCode(500, Json(new
                    {
                        status = "500",
                        message = "Modification du profil impossible car l'id du profil n'est pas conforme (inférieur à 0)"
                    }));

                var acc = _context.Account.FirstOrDefault(x => x.Id == id);                

                if (!string.IsNullOrWhiteSpace(account.Email))
                {
                    if (_context.Account.FirstOrDefault(x => x.Email == account.Email && x.Id != id)?.Id == null)
                        acc.Email = account.Email;
                    else
                        return StatusCode(500, Json(new
                        {
                            status = "500",
                            message = "Cette adresse email est déjà utilisée."
                        }));
                }

                if (!string.IsNullOrWhiteSpace(account.Login))
                {
                    if (_context.Account.FirstOrDefault(x => x.Login == account.Login && x.Id != id)?.Id == null)
                        acc.Login = account.Login;
                    else
                        return StatusCode(500, Json(new
                        {
                            status = "500",
                            message = "Ce nom d'utilisateur est déjà utilisée."
                        }));
                }

                if (!string.IsNullOrWhiteSpace(account.Password))
                {
                    acc.Password = account.Password;
                }

                _context.Account.Update(acc);
                _context.SaveChanges();

                return Json(new
                {
                    status = "200",
                    message = "Modification de votre profil effectuée avec succès"
                });
            }
            catch (Exception e)
            {
                return StatusCode(500, Json(new
                {
                    status = "500",
                    message = "Une erreur est survenue lors de la modification des informations du compte ! Si le problème persiste, contactez le support. --> " + e
                }));
            }
        }

        /// <summary>
        /// Récupérer les informations d'un compte à partir de son id
        /// </summary>
        /// <param name="id">id du compte à récupérer</param>
        /// <returns>Informations du compte utilisateur</returns>
        [HttpGet("[action]")]
        public ActionResult Get(int id)
        {
            try
            {
                if (id <= 0)
                    return StatusCode(500, Json(new
                    {
                        status = "500",
                        message = "L'id du compte à récupérer n'est pas correct"
                    }));

                /* Récupération des questions de l'utilsateur */
                var questions = _context.Question
                                        .Where(y => y.Account == id);
                var questionsId = questions.Select(w => w.Id)
                                           ?.ToList();

                /* Récupération de la moyenne des notes attribuées aux questions de l'utilisateur */
                var notes =  _context.Rate.Where(u => questionsId.Contains(u.Idquestion));
                var listNotes = notes.ToList();

                /* Récupération de la difficulté moyenne des questions de l'utilisateur */
                var difficulteMoy = string.Empty;
                var difficulties = questions.ToList().Average(f => f.Difficulty);

                if(difficulties.HasValue)
                {
                    if (difficulties.Value <= 1)
                        difficulteMoy = "Très facile";
                    else if(difficulties.Value <= 2)
                        difficulteMoy = "Facile";
                    else if (difficulties.Value <= 3)
                        difficulteMoy = "Moyen";
                    else if (difficulties.Value <= 4)
                        difficulteMoy = "Difficile";
                    else if (difficulties.Value <= 5)
                        difficulteMoy = "Très difficile";
                }
                

                /* Récupération de toutes les autres informations sur le profil de l'utilisateur */
                var acc = _context.Account
                                  .Where(x => x.Id == id)
                                  .Select(x => new
                                  {
                                      x.Id,
                                      x.Login,
                                      x.Firstname,
                                      x.Lastname,
                                      Birthdate = x.Birthdate.HasValue ? x.Birthdate.Value.ToString("dd/MM/yyyy") : null,
                                      x.Email,
                                      nbQuestion = x.Question != null ? x.Question.Count : 0,
                                      nbQuestionnaires = x.Questionnaire != null ? x.Questionnaire.Count : 0,
                                      nbCommentary = x.Commentary != null ? x.Commentary.Count : 0,
                                      nbNotes = x.Rate != null ? x.Rate.Count : 0,
                                      notesMoyenne = listNotes.Count() > 0 ? Math.Round(listNotes.Average(f => f.Rate1), 2) : -1,
                                      difficulteMoyenne = !string.IsNullOrWhiteSpace(difficulteMoy) ? difficulteMoy : "-"
                                  })
                                  .FirstOrDefault();                

                return Json(new
                {
                    status = "200",
                    data = acc,
                    message = "ok",
                    success = true
                });
            }
            catch (Exception e)
            {
                return StatusCode(500, Json(new
                {
                    status = "500",
                    message = "Une erreur est survenue lors de la récupération des informations du compte ! Si le problème persiste, contactez le support. --> " + e,
                    success = false
                }));
            }
        }
    }
}