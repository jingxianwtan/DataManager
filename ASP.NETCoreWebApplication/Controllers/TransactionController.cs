using System.Collections.Generic;
using System.Threading.Tasks;
using ASP.NETCoreWebApplication.Models;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NETCoreWebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : Controller
    {
        Test_dataContext _context = new Test_dataContext();
        
        // GET
        [HttpGet]
        public IEnumerable<Transaction> GetTransactions([FromQuery(Name = "listing")] string lid)
        {
            if (DataManager.Instance().TransactionDict.ContainsKey(lid))
            {
                return DataManager.Instance().TransactionDict[lid];   
            }
            else
            {
                return new List<Transaction>();
            }
        }
        
        [HttpPost]
        [Route("api/create")]
        public async Task<ActionResult<Transaction>> PostTodoItem([FromQuery(Name = "listing")] string lid, Transaction transaction)
        {
            _context.Transaction.Add(transaction);
            await _context.SaveChangesAsync();
            DataManager.Instance().TransactionDict[lid].Add(transaction);
            
            return CreatedAtAction("GetTransactions", new { id = transaction.TransactionId }, transaction);
        }
    }
}