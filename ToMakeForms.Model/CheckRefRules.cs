//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace ToMakeForms.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class CheckRefRules
    {
        public int Id { get; set; }
        public string Rule { get; set; }
        public string RuleNo { get; set; }
        public Nullable<int> RuleDocId { get; set; }
        public Nullable<int> IsUsed { get; set; }
    
        public virtual RefRuleDocs RefRuleDocs { get; set; }
    }
}
