using System.Collections.Generic;

namespace ConsoleApp1
{
    public class Event
    {
        public string eventId { get; private set; }
        public string categoryId { get; private set; }
        public string eventTime { get; private set; }
        public string location { get; private set; }
        public string eventName { get; private set; }
        public string team { get; private set; }

        public Dictionary<string, Listing> listings;

        public Event(string eventId, string categoryId, string eventTime, string location, string eventName, string team)
        {
            this.eventId = eventId;
            this.categoryId = categoryId;
            this.eventTime = eventTime;
            this.location = location;
            this.eventName = eventName;
            this.team = team;
            listings = new Dictionary<string, Listing>();
        }
    }
}