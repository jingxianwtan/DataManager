using System.Collections.Generic;

namespace ConsoleApp1
{
    public interface DataAccessObject
    {
        public List<Node> GetAllParentCategories();
        public List<Node> GetAllCategories();
        public List<Event> GetAllEvents();
        public List<Listing> GetAllListings();
    }
}