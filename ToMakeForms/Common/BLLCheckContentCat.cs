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
     public class BLLCheckContentCat 
     {
             DSMSEntities DBEntity = new DSMSEntities();
             //根据条件获取列表
              public IQueryable<CheckContentCat> GetList(Expression<Func<CheckContentCat, bool>> pred = null)
             {
                      IQueryable<CheckContentCat> list=null;
                     if(  pred == null)
                       {
                            list = DBEntity.CheckContentCat;
                        }
                      else{list = DBEntity.CheckContentCat.Where(pred); }
                     return list;
             }
              //根据条件获取一个对象
              public  CheckContentCat  GetOne(Expression<Func<CheckContentCat, bool>> pred )
              {
                     var  CheckContentCat = DBEntity.CheckContentCat.SingleOrDefault(pred);
                     return  CheckContentCat;
              }
              //新增
              public  CheckContentCat Add(CheckContentCat CheckContentCat)
               {
                     DBEntity.CheckContentCat.Add(CheckContentCat);
                         DBEntity.SaveChanges();
                     return  CheckContentCat ;
               }
              //删除
               public int Del(int ID)
               {
                     CheckContentCat CheckContentCat= DBEntity.CheckContentCat.SingleOrDefault(a => a.Id == ID);
                     if (CheckContentCat != null)
                     {
                         DBEntity.CheckContentCat.Attach(CheckContentCat);
                         DBEntity.Entry<CheckContentCat>(CheckContentCat).State = EntityState.Deleted;
                         return DBEntity.SaveChanges();
                     }
                     else return -1;
               }
              //是否存在
              public bool IsExsit(int ID)
             {
                     CheckContentCat CheckContentCat = DBEntity.CheckContentCat.SingleOrDefault(a => a.Id == ID);
                     if (CheckContentCat != null)
                     {
                         return true;
                     }
                     else  return false;
             }
              //编辑
              public CheckContentCat Edit(CheckContentCat CheckContentCat)
              {
                  DBEntity.CheckContentCat.Attach(CheckContentCat);
                  DBEntity.Entry<CheckContentCat>(CheckContentCat).State = EntityState.Modified;
                  DBEntity.SaveChanges();
                  return CheckContentCat;
              }
     }
}
