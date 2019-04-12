using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webAPI.DAL;
using webAPI.Model;

namespace webAPI.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [EnableCors("CorsPolicy")]
    public class GradeController : Controller
    {
        private readonly SharkwestDbContext _context;

        public GradeController(SharkwestDbContext sharkwestDbContext)
        {
            _context = sharkwestDbContext;
        }

        /// <summary>
        /// Récupérer tous les niveaux dans la base
        /// </summary>
        /// <returns>Retourne tous les niveaux</returns>
        [HttpGet("[action]")]
        public ActionResult GetAll()
        {
            try
            {                
                var grades = _context.Grade.Select(x => new { x.Id, x.Name }).ToList();
                return Json(new
                {
                    status = "200",
                    data = grades,
                    message = "ok",
                    success = true
                });
            }
            catch (Exception e)
            {
                return Json(new
                {
                    status = "500",
                    message = "Une erreur est survenue lors de la récupération des informations du compte ! Si le problème persiste, contactez le support. --> " + e,
                    success = false
                });
            }
        }
    }
}