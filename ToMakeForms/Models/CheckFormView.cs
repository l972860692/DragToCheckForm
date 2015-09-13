using System;
using System.Collections.Generic;
using System.Linq;
using System.Web; 

namespace ToMakeForms.Models
{
    public class CheckFormView
    {
    }
    public class CheckFormDTO
    {
        public int id { get;set;}
        public string Name { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime TouchDate { get; set; }
        public string UserName { get; set; }
        public int Status { get; set; }
    }
}