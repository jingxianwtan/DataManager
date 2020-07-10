using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASP.NETCoreWebApplication.Models;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NETCoreWebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ListingController : Controller
    {
        Test_dataContext _context = new Test_dataContext();
        // GET
        [HttpGet]
        public IEnumerable<Listing> GetListings([FromQuery(Name = "event")] string eid) // ?event=1
        {
            if (DataManager.Instance().ListingDict.ContainsKey(eid))
            {
                return DataManager.Instance().ListingDict[eid];
            }
            else
            {
                return new List<Listing>();
            }
        }

        [HttpPost]
        [Route("api/create")]
        public async Task<ActionResult<Listing>> PostTodoItem(Listing listing)
        {
            _context.Listing.Add(listing);
            await _context.SaveChangesAsync();
            
            return CreatedAtAction("GetListings", new { id = listing.ListingId }, listing);
        }
    }
}