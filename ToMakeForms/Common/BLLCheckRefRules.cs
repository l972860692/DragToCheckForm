using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToMakeForms.Model;
using System.Linq.Expressions;
using System.Data.Entity;


namespace BLL
{
     public class BLLCheckRefRules
     {
             DSMSEntities DBEntity = new DSMSEntities();
             //根据条件获取列表
              public IQueryable<CheckRefRules> GetList(Expression<Func<CheckRefRules, bool>> pred = null)
             {
                      IQueryable<CheckRefRules> list=null;
                     if(  pred == null)
                       {
                            list = DBEntity.CheckRefRules;
                        }
                      else{list = DBEntity.CheckRefRules.Where(pred); }
                     return list;
             }
              //根据条件获取一个对象
              public  CheckRefRules  GetOne(Expression<Func<CheckRefRules, bool>> pred )
              {
                     var  CheckRefRules = DBEntity.CheckRefRules.SingleOrDefault(pred);
                     return  CheckRefRules;
              }
              //新增
              public  CheckRefRules Add(CheckRefRules CheckRefRules)
               {
                     DBEntity.CheckRefRules.Add(CheckRefRules);
                         DBEntity.SaveChanges();
                     return  CheckRefRules ;
               }
              //删除
               public int Del(int ID)
               {
                     CheckRefRules CheckRefRules= DBEntity.CheckRefRules.SingleOrDefault(a => a.Id == ID);
                     if (CheckRefRules != null)
                     {
                         DBEntity.CheckRefRules.Attach(CheckRefRules);
                         DBEntity.Entry<CheckRefRules>(CheckRefRules).State = EntityState.Deleted;
                         return DBEntity.SaveChanges();
                     }
                     else return -1;
               }
              //是否存在
              public bool IsExsit(int ID)
             {
                     CheckRefRules CheckRefRules = DBEntity.CheckRefRules.SingleOrDefault(a => a.Id == ID);
                     if (CheckRefRules != null)
                     {
                         return true;
                     }
                     else  return false;
             }
              //编辑
              public CheckRefRules Edit(CheckRefRules CheckRefRules)
              {
                  DBEntity.CheckRefRules.Attach(CheckRefRules);
                  DBEntity.Entry<CheckRefRules>(CheckRefRules).State = EntityState.Modified;
                  DBEntity.SaveChanges();
                  return CheckRefRules;
              }
     }
}
