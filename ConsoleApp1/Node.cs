using System;
using System.Collections.Generic;

namespace ConsoleApp1
{
    public class Node
    {
        public string id { get; private set; }
        public string name { get; private set; }
        public string parentId { get; private set; }

        private Dictionary<String, Node> children;

        public Event Event { private set; get; }

        public bool isEvent  { get; private set; }

        public Node(string id, string name, string parentId)
        {
            isEvent = false;
            this.id = id;
            this.name = name;
            this.parentId = parentId;
            children = new Dictionary<string, Node>();
        }

        public Node(Event Event)
        {
            this.Event = Event;
            this.isEvent = true;
            this.name = Event.eventName;
            this.parentId = Event.categoryId;
            this.id = Event.eventId;
        }
        public Node(string eventId, string categoryId, string eventTime, string location, string eventName,
            string team)
        {
            Event = new Event( eventId,  categoryId,  eventTime,  location,  eventName, team);
            isEvent = true;
        }

        public void setEvent(Event e)
        {
            this.Event = e;
            isEvent = true;
        }

        public Dictionary<string, Node> GetChildrenNodes()
        {
            if (isEvent) throw new NotImplementedException("This is an event (leaf category), it has no sub-categories");
            return children;
        }

        public Event GetEvent()
        {
            if (!isEvent) throw new NotImplementedException("This is not an event, it only contains sub-categories");
            return Event;
        }

    }
}