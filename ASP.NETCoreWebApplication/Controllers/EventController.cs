using System;
using System.Collections.Generic;
using ASP.NETCoreWebApplication.Models;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NETCoreWebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventController : Controller
    {
        // GET
        [HttpGet]
        public IEnumerable<Event> Get([FromQuery(Name = "category")] string cid)
        {
            return DataManager.Instance().EventDict[cid];
            /*throw  new NotImplementedException();*/
        }
    }
}