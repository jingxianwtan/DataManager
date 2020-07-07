using System;
using System.Collections.Generic;

namespace ASP.NETCoreWebApplication.Models
{
    public partial class Transaction
    {
        public int TransactionId { get; set; }
        public int BuyerId { get; set; }
        public int PaymentId { get; set; }
        public int ListingId { get; set; }
        public int QuantBought { get; set; }
        public int SellerId { get; set; }
        public DateTime Date { get; set; }
    }
}
