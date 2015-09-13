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
    
    public partial class Companys
    {
        public Companys()
        {
            this.CheckCos = new HashSet<CheckCos>();
            this.Checkings = new HashSet<Checkings>();
            this.CheckResults = new HashSet<CheckResults>();
            this.Users = new HashSet<Users>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Tel { get; set; }
        public string Fax { get; set; }
        public int ProvinceId { get; set; }
        public int CityId { get; set; }
        public Nullable<int> IsDSMScompany { get; set; }
        public Nullable<int> AirwaysOrAirportId { get; set; }
    
        public virtual ICollection<CheckCos> CheckCos { get; set; }
        public virtual ICollection<Checkings> Checkings { get; set; }
        public virtual ICollection<CheckResults> CheckResults { get; set; }
        public virtual Citys Citys { get; set; }
        public virtual Provinces Provinces { get; set; }
        public virtual ICollection<Users> Users { get; set; }
    }
}