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
    
    public partial class CheckPoints
    {
        public int Id { get; set; }
        public string Point { get; set; }
        public int CheckContentId { get; set; }
        public string PointType { get; set; }
        public string RefRules { get; set; }
        public string IsChecked { get; set; }
        public string Note { get; set; }
    
        public virtual CheckContents CheckContents { get; set; }
    }
}
