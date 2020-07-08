namespace ASP.NETCoreWebApplication.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public int ParentCatId { get; set; }
    }
}