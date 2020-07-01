using System;
using System.Collections.Generic;

namespace ConsoleApp1
{

    class Program
    {
        static void Main(string[] args)
        {
            DataManagerTree dataManagerTree = DataManagerTree.Instance;
            Node root = dataManagerTree.getRoot();

            Queue<Node> queue = new Queue<Node>();
            List<Event> events = new List<Event>();
            queue.Enqueue(root);
            while (queue.Count != 0)
            {
                int size = queue.Count;
                for (int i = 0; i < size; i++)
                {
                    Node temp = queue.Dequeue();
                    Console.WriteLine(temp.id + ", " + temp.name + ", " + temp.parentId);
                    if (!temp.isEvent)
                    {
                        foreach (KeyValuePair<string, Node> pair in temp.GetChildrenNodes())
                        { 
                            queue.Enqueue(pair.Value);
                        }
                    }
                    else
                    {
                        events.Add(temp.Event);
                    }
                }
                Console.WriteLine("------------------------------------------");
            }
            
            List<Listing> listings = new List<Listing>();
            foreach (Event e in events)
            {
                Console.WriteLine(e.eventId + ", " + e.categoryId + ", " + e.eventTime + ", " + e.location + ", " + e.eventName + ", " + e.team);
                foreach (KeyValuePair<string, Listing> pair in e.listings)
                {
                    listings.Add(pair.Value);
                }
            }
            Console.WriteLine("------------------------------------------");

            List<Transactions> transactions = new List<Transactions>();
            foreach (Listing l in listings)
            {
                Console.WriteLine(l.listingId + ", " + l.userId + ", " + l.eventId + ", " + l.createdTime + ", $" + l.price + ", " + l.quantity);
                foreach (KeyValuePair<string, Transactions> pair in l.transactions)
                {
                    transactions.Add(pair.Value);
                }
            }
            Console.WriteLine("------------------------------------------");

            foreach (Transactions t in transactions)
            {
                Console.WriteLine(t.transactionId + ", " + t.buyerId + ", " + t.paymentId + ", " + t.listingId + ", " + t.quantityBought + ", " + t.sellerId + ", " + t.date);
            }

        }
    }
}