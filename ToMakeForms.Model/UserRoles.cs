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
    
    public partial class UserRoles
    {
        public UserRoles()
        {
            this.Users = new HashSet<Users>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public string Privilege { get; set; }
    
        public virtual ICollection<Users> Users { get; set; }
    }
}
