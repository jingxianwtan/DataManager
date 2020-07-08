using System.Collections.Generic;
using ASP.NETCoreWebApplication.Models;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NETCoreWebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ListingsController : Controller
    {
        // GET
        [HttpGet]
        public IEnumerable<Listing> Get([FromQuery(Name = "event")] string eid) // ?event=1
        {
            if (DataManager.Instance().ListingDict.ContainsKey(eid))
            {
                return DataManager.Instance().ListingDict[eid];
            }
            else
            {
                return new List<Listing>();
            }

            /*throw new NotImplementedException();*/
        }
    }
}