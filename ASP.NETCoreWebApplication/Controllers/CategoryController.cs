using System;
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
            return DataManager.Instance().CategoryDict[pid];
            /*throw  new NotImplementedException();*/
        }
    }
}