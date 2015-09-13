using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToMakeForms.Models
{
    public class TreeViewModel
    {
        public int id { get; set; }
        public string text { get; set; }
        public List<TreeViewModel> item { get; set; }
    }
}