using System.Collections.Generic;
using ConsoleApp1;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NETCoreWebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ListingsController : Controller
    {
        DAOImp dao = new DAOImp();
        // GET
        [HttpGet]
        public IEnumerable<Listing> Get([FromQuery(Name = "event")] string eventId) // ?event=1
        {
            return dao.GetListingsOfEvent(eventId);
        }
    }
}