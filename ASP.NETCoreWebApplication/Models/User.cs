﻿using System;

namespace ASP.NETCoreWebApplication.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public DateTime CreatedTime { get; set; }
    }
}