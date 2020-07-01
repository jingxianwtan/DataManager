using System.Collections.Generic;
using ConsoleApp1;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NETCoreWebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : Controller
    {
        DAOImp dao = new DAOImp();
        // GET
        [HttpGet]
        public IEnumerable<Transactions> Get([FromQuery(Name = "listing")] string listId)
        {
            return dao.GetTransactionsByListing(listId);
        }
    }
}