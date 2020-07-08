using System;

namespace ASP.NETCoreWebApplication.Models
{
    public class Event
    {
        public int EventId { get; set; }
        public int CategoryId { get; set; }
        public DateTime EventTime { get; set; }
        public string Location { get; set; }
        public string EventName { get; set; }
        public string Team { get; set; }
    }
}