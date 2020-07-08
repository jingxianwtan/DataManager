using System.Collections.Generic;
using ASP.NETCoreWebApplication.Models;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NETCoreWebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : Controller
    {
        // GET
        [HttpGet]
        public IEnumerable<Transaction> Get([FromQuery(Name = "listing")] string lid)
        {
            if (DataManager.Instance().TransactionDict.ContainsKey(lid))
            {
                return DataManager.Instance().TransactionDict[lid];   
            }
            else
            {
                return new List<Transaction>();
            }
            /*throw new NotImplementedException();*/
        }
    }
}