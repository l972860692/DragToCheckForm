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
    
    public partial class CheckResults
    {
        public int Id { get; set; }
        public string Result { get; set; }
        public Nullable<int> CompanyId { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string Location { get; set; }
        public string Opinion { get; set; }
        public int CheckFormId { get; set; }
        public int UserId { get; set; }
        public string Project { get; set; }
        public string Checker { get; set; }
        public string TheResult { get; set; }
        public string TheNotes { get; set; }
    
        public virtual CheckForms CheckForms { get; set; }
        public virtual Users Users { get; set; }
        public virtual Companys Companys { get; set; }
    }
}