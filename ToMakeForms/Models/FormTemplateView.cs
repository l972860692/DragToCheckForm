using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ToMakeForms.Model;

namespace ToMakeForms.Models
{
    public class FormTemplateView
    {

    }


    public class CheckContentDTO
    {
        public int NowIndex { get; set; }//cat位置
        public int Index { get; set; }//本身位置
        public string ContentName { get; set; }
        public int Id { get; set; }
        public string BigCatName { get; set; }
        public int BigId { get; set; }
        public int CatId { get; set; }
        public string CatName { get; set; }
      //  public CheckContentCat CheckContentCat { get; set; }
        public List<CheckPoints> CheckPointss { get; set; }//检查点
        public List<RefRuleDocs> relRuleDocs { get; set; }//法律法规

    }
}