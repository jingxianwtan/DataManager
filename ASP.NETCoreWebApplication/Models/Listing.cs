﻿using System;

namespace ASP.NETCoreWebApplication.Models
{
    public class Listing
    {
        public int ListingId { get; set; }
        public int UserId { get; set; }
        public int EventId { get; set; }
        public DateTime CreatedTime { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}