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
     public class BLLCheckResults
     {
             DSMSEntities DBEntity = new DSMSEntities();
             //根据条件获取列表
              public IQueryable<CheckResults> GetList(Expression<Func<CheckResults, bool>> pred = null)
             {
                      IQueryable<CheckResults> list=null;
                     if(  pred == null)
                       {
                            list = DBEntity.CheckResults;
                        }
                      else{list = DBEntity.CheckResults.Where(pred); }
                     return list;
             }
              //根据条件获取一个对象
              public  CheckResults  GetOne(Expression<Func<CheckResults, bool>> pred )
              {
                     var  CheckResults = DBEntity.CheckResults.SingleOrDefault(pred);
                     return  CheckResults;
              }
              //新增
              public  CheckResults Add(CheckResults CheckResults)
               {
                     DBEntity.CheckResults.Add(CheckResults);
                         DBEntity.SaveChanges();
                     return  CheckResults ;
               }
              //删除
               public int Del(int ID)
               {
                     CheckResults CheckResults= DBEntity.CheckResults.SingleOrDefault(a => a.Id == ID);
                     if (CheckResults != null)
                     {
                         DBEntity.CheckResults.Attach(CheckResults);
                         DBEntity.Entry<CheckResults>(CheckResults).State = EntityState.Deleted;
                         return DBEntity.SaveChanges();
                     }
                     else return -1;
               }
              //是否存在
              public bool IsExsit(int ID)
             {
                     CheckResults CheckResults = DBEntity.CheckResults.SingleOrDefault(a => a.Id == ID);
                     if (CheckResults != null)
                     {
                         return true;
                     }
                     else  return false;
             }
              //编辑
              public CheckResults Edit(CheckResults CheckResults)
              {
                  DBEntity.CheckResults.Attach(CheckResults);
                  DBEntity.Entry<CheckResults>(CheckResults).State = EntityState.Modified;
                  DBEntity.SaveChanges();
                  return CheckResults;
              }
     }
}
