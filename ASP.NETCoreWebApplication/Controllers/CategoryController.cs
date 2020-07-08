using System.Collections.Generic;
using ASP.NETCoreWebApplication.Models;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NETCoreWebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : Controller
    {
        // GET
        [HttpGet]
        public IEnumerable<Category> Get([FromQuery(Name = "parent_cat")] string pid)
        {
            if (DataManager.Instance().CategoryDict.ContainsKey(pid))
            {
                return DataManager.Instance().CategoryDict[pid];   
            }
            else
            {
                return new List<Category>();
            }
            /*throw  new NotImplementedException();*/
        }
    }
}