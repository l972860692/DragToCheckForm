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
     public class BLLCheckPoints
     {
             DSMSEntities DBEntity = new DSMSEntities();
             //根据条件获取列表
              public IQueryable<CheckPoints> GetList(Expression<Func<CheckPoints, bool>> pred = null)
             {
                      IQueryable<CheckPoints> list=null;
                     if(  pred == null)
                       {
                            list = DBEntity.CheckPoints;
                        }
                      else{list = DBEntity.CheckPoints.Where(pred); }
                     return list;
             }
              //根据条件获取一个对象
              public  CheckPoints  GetOne(Expression<Func<CheckPoints, bool>> pred )
              {
                     var  CheckPoints = DBEntity.CheckPoints.SingleOrDefault(pred);
                     return  CheckPoints;
              }
              //新增
              public  CheckPoints Add(CheckPoints CheckPoints)
               {
                     DBEntity.CheckPoints.Add(CheckPoints);
                         DBEntity.SaveChanges();
                     return  CheckPoints ;
               }
              //删除
               public int Del(int ID)
               {
                     CheckPoints CheckPoints= DBEntity.CheckPoints.SingleOrDefault(a => a.Id == ID);
                     if (CheckPoints != null)
                     {
                         DBEntity.CheckPoints.Attach(CheckPoints);
                         DBEntity.Entry<CheckPoints>(CheckPoints).State = EntityState.Deleted;
                         return DBEntity.SaveChanges();
                     }
                     else return -1;
               }
              //是否存在
              public bool IsExsit(int ID)
             {
                     CheckPoints CheckPoints = DBEntity.CheckPoints.SingleOrDefault(a => a.Id == ID);
                     if (CheckPoints != null)
                     {
                         return true;
                     }
                     else  return false;
             }
              //编辑
              public CheckPoints Edit(CheckPoints CheckPoints)
              {
                  DBEntity.CheckPoints.Attach(CheckPoints);
                  DBEntity.Entry<CheckPoints>(CheckPoints).State = EntityState.Modified;
                  DBEntity.SaveChanges();
                  return CheckPoints;
              }
     }
}
