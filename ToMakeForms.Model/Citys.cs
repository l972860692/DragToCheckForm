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
    
    public partial class Citys
    {
        public Citys()
        {
            this.Companys = new HashSet<Companys>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public int ProvinceId { get; set; }
    
        public virtual ICollection<Companys> Companys { get; set; }
        public virtual Provinces Provinces { get; set; }
    }
}