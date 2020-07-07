using System;
using System.Collections.Generic;

namespace ASP.NETCoreWebApplication.Models
{
    public partial class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public int ParentCatId { get; set; }
    }
}
