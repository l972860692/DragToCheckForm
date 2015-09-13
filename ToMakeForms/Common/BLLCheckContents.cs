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
     public class BLLCheckContents
     {
             DSMSEntities DBEntity = new DSMSEntities();
             //根据条件获取列表
              public IQueryable<CheckContents> GetList(Expression<Func<CheckContents, bool>> pred = null)
             {
                      IQueryable<CheckContents> list=null;
                     if(  pred == null)
                       {
                            list = DBEntity.CheckContents;
                        }
                      else{list = DBEntity.CheckContents.Where(pred); }
                     return list;
             }
              //根据条件获取一个对象
              public  CheckContents  GetOne(Expression<Func<CheckContents, bool>> pred )
              {
                     var  CheckContents = DBEntity.CheckContents.SingleOrDefault(pred);
                     return  CheckContents;
              }
              //新增
              public  CheckContents Add(CheckContents CheckContents)
               {
                     DBEntity.CheckContents.Add(CheckContents);
                         DBEntity.SaveChanges();
                     return  CheckContents ;
               }
              //删除
               public int Del(int ID)
               {
                     CheckContents CheckContents= DBEntity.CheckContents.SingleOrDefault(a => a.Id == ID);
                     if (CheckContents != null)
                     {
                         DBEntity.CheckContents.Attach(CheckContents);
                         DBEntity.Entry<CheckContents>(CheckContents).State = EntityState.Deleted;
                         return DBEntity.SaveChanges();
                     }
                     else return -1;
               }
              //是否存在
              public bool IsExsit(int ID)
             {
                     CheckContents CheckContents = DBEntity.CheckContents.SingleOrDefault(a => a.Id == ID);
                     if (CheckContents != null)
                     {
                         return true;
                     }
                     else  return false;
             }
              //编辑
              public CheckContents Edit(CheckContents CheckContents)
              {
                  DBEntity.CheckContents.Attach(CheckContents);
                  DBEntity.Entry<CheckContents>(CheckContents).State = EntityState.Modified;
                  DBEntity.SaveChanges();
                  return CheckContents;
              }
     }
}
