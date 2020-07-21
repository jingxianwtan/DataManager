using System.Collections.Generic;
using System.Linq;

namespace ASP.NETCoreWebApplication.Models
{
    public class DataManager
    {
        private static readonly DataManager _dataManager = new DataManager();

        private readonly Test_dataContext dao = new Test_dataContext();

        private DataManager()
        {
            CategoryDict = new Dictionary<string, List<Category>>();
            EventDict = new Dictionary<string, List<Event>>();
            ListingDict = new Dictionary<string, List<Listing>>();
            TransactionDict = new Dictionary<string, List<Transaction>>();
            
            var categories = dao.Category.ToList();
            foreach (var c in categories)
            {
                var pid = c.ParentCatId.ToString();
                if (CategoryDict.ContainsKey(pid))
                {
                    CategoryDict[pid].Add(c);
                }
                else
                {
                    CategoryDict.Add(pid, new List<Category>());
                    CategoryDict[pid].Add(c);
                }
            }
            
            var events = dao.Event.ToList();
            foreach (var e in events)
            {
                var cid = e.CategoryId.ToString();
                if (EventDict.ContainsKey(cid))
                {
                    EventDict[cid].Add(e);
                }
                else
                {
                    EventDict.Add(cid, new List<Event>());
                    EventDict[cid].Add(e);
                }
                ListingDict.Add(e.EventId.ToString(), new List<Listing>());
            }
            
            var listings = dao.Listing.ToList();
            foreach (var l in listings)
            {
                var eid = l.EventId.ToString();
                ListingDict[eid].Add(l);
                TransactionDict.Add(l.ListingId.ToString(), new List<Transaction>());
                /*if (ListingDict.ContainsKey(eid))
                {
                    ListingDict[eid].Add(l);
                }
                else
                {
                    ListingDict.Add(eid, new List<Listing>());
                    ListingDict[eid].Add(l);
                }*/
            }
            
            var transactions = dao.Transaction.ToList();
            foreach (var t in transactions)
            {
                var lid = t.ListingId.ToString();
                TransactionDict[lid].Add(t);
                /*if (TransactionDict.ContainsKey(lid))
                {
                    TransactionDict[lid].Add(t);
                }
                else
                {
                    TransactionDict.Add(lid, new List<Transaction>());
                    TransactionDict[lid].Add(t);
                }*/
            }
        }

        public Dictionary<string, List<Category>> CategoryDict { get; }
        public Dictionary<string, List<Event>> EventDict { get; }
        public Dictionary<string, List<Listing>> ListingDict { get; }
        public Dictionary<string, List<Transaction>> TransactionDict { get; }

        public static DataManager Instance()
        {
            return _dataManager;
        }
    }
}