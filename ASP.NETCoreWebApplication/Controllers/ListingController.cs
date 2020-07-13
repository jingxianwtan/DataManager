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
        public async Task<ActionResult<Listing>> PostListing([FromQuery(Name = "event")] string eid, Listing listing)
        {
            _context.Listing.Add(listing);
            await _context.SaveChangesAsync();
            if (!DataManager.Instance().ListingDict.ContainsKey(eid))
            {
                DataManager.Instance().ListingDict.Add(eid, new List<Listing>());
            }
            DataManager.Instance().ListingDict[eid].Add(listing);
            
            return CreatedAtAction("GetListings", new { id = listing.ListingId }, listing);
        }
        
        [HttpDelete]
        [Route("api/delete")]
        public async Task<ActionResult<Listing>> PostListing([FromQuery(Name = "lid")] string lid, [FromQuery(Name = "eid")] string eid)
        {
            Listing listing = await _context.Listing.FindAsync(Int32.Parse(lid));
            if (listing == null) return NotFound();
            _context.Listing.Remove(listing);
            await _context.SaveChangesAsync();
            List<Listing> listings = DataManager.Instance().ListingDict[eid];
            foreach (Listing l in listings)
            {
                if (l.ListingId == Int32.Parse(lid))
                {
                    listings.Remove(l);
                    break;
                }
            }
            return listing;
        }
    }
}