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
    
    public partial class Departments
    {
        public Departments()
        {
            this.Users = new HashSet<Users>();
            this.Departments1 = new HashSet<Departments>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public Nullable<int> ParentDeptId { get; set; }
    
        public virtual ICollection<Users> Users { get; set; }
        public virtual ICollection<Departments> Departments1 { get; set; }
        public virtual Departments Departments2 { get; set; }
    }
}