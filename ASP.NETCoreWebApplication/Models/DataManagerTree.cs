using System;
using System.Collections.Generic;

namespace ConsoleApp1
{
    public class DataManagerTree
    {
        private Node root;
        
        private static DataManagerTree _dataManagerTree = new DataManagerTree();
        private DataManagerTree()
        {
            DAOImp dao = new DAOImp();
            root = new Node("1", "root", "null");
            
            List<Node> parents = dao.GetAllParentCategories();
            foreach (Node pCategory in parents)
            {
                root.GetChildrenNodes().Add(pCategory.id, pCategory);
            }

            Dictionary<string, Node> parentsDict = root.GetChildrenNodes();
            Dictionary<string, Node> categoriesDict = new Dictionary<string, Node>();
            List<Node> subCategories = dao.GetAllCategories();
            foreach (Node subCategory in subCategories)
            {
                Node parent = parentsDict[subCategory.parentId];
                parent.GetChildrenNodes().Add(subCategory.id, subCategory);
                categoriesDict.Add(subCategory.id, subCategory);
            }
            
            Dictionary<string, Node> eventsDict = new Dictionary<string, Node>();
            List<Event> events = dao.GetAllEvents();
            foreach (Event e in events)
            {
                Node categoryNode = categoriesDict[e.categoryId];
                Node eventNode = new Node(e);

                String eventId = e.eventId;
                categoryNode.GetChildrenNodes().Add(eventId, eventNode)         ;
                eventsDict.Add(eventId, eventNode);
            }
            
            Dictionary<string, Listing> listingDict = new Dictionary<string, Listing>();
            List<Listing> listings = dao.GetAllListings();
            foreach (Listing listing in listings)
            {
                Event e = eventsDict[listing.eventId].GetEvent();
                e.listings.Add(listing.listingId, listing);
                listingDict.Add(listing.listingId, listing);
            }

            List<Transactions> transactions = dao.GetAllTransactions();
            foreach (Transactions t in transactions)
            {
                Listing l = listingDict[t.listingId];
                l.transactions.Add(t.transactionId, t);
            }
        }

        public static DataManagerTree Instance
        {
            get { return _dataManagerTree;  }
        }
        public Node getRoot()
        {
            return root;
        }
    }
}