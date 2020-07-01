using System;
using System.Collections.Generic;

namespace ConsoleApp1
{
    public class Listing
    {
        public string listingId { get; private set; }
        public string userId{ get; private set; }
        public string eventId { get; private set; }
        public string createdTime { get; private set; }
        public double price { get; private set; }
        public int quantity { get; private set; }

        public Dictionary<String, Transactions> transactions;

        public Listing(string listingId, string userId, string eventId, string createdTime, double price, int quantity)
        {
            this.listingId = listingId;
            this.userId = userId;
            this.eventId = eventId;
            this.createdTime = createdTime;
            this.price = price;
            this.quantity = quantity;
            transactions = new Dictionary<string, Transactions>();
        }
        
        
    }
}