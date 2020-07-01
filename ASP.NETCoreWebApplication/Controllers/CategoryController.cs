using System.Collections.Generic;
using ConsoleApp1;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NETCoreWebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : Controller
    {
        DAOImp dao = new DAOImp();
        // GET
        [HttpGet]
        public IEnumerable<Node> Get([FromQuery(Name = "parent_cat")] string pid)
        {
            return dao.GetACategoriesByPid(pid);
        }
    }
}