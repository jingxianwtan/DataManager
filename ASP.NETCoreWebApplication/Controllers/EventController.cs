using System.Collections.Generic;
using ConsoleApp1;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NETCoreWebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventController : Controller
    {
        DAOImp dao = new DAOImp();
        // GET
        [HttpGet]
        /*public IEnumerable<Event> Get()
        {
            return dao.GetAllEvents();
        }*/
        
        [HttpGet]
        public IEnumerable<Event> Get([FromQuery(Name = "category")] string cat_id)
        {
            if (cat_id == null) return dao.GetAllEvents();
            else return dao.GetEventsByCategory(cat_id);
        }
    }
}