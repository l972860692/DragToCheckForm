using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ToMakeForms.Model;
using ToMakeForms.Models;
using BLL;
namespace ToMakeForms.Controllers
{
    public class CheckContentsController : ApiController
    {
      
        // GET api/CheckContents
        DSMSEntities db = new DSMSEntities();
        BLLCheckContents ICheckContents = new BLLCheckContents();
        private Users ToGetNowUser()
        {

    
            Users user = db.Users.FirstOrDefault();
            return user;
        }
        public object GetOne(int Id, string CatId)
        {
            int[] b = new int[] { };
            if (Id != -1)

            { return db.CheckContents.FirstOrDefault(x => x.Id == Id); }
            else
            {
                var c = CatId.Split('a');
                int len = c.Length;
                b = new int[len];
                for (int i = 0; i < len; i++)
                {
                    b[i] = Convert.ToInt32(c[i]);
                }
                int NowCatId = b[0];
               // db.Configuration.LazyLoadingEnabled = true;
               // db.Configuration.ProxyCreationEnabled = true;
                var bigCat = db.CheckContentCat.FirstOrDefault(x => x.Id == NowCatId);
                var bigCatId = Convert.ToInt32(bigCat.ParentId);
                var user = ToGetNowUser();
                int isBelong = db.Companys.Find(user.CompanyId).ProvinceId;// Users.Find(user.Id).Companys.ProvinceId;
                var bigCatName = db.CheckContentCat.FirstOrDefault(x => x.Id == bigCatId).CategoryName;
                // List<int> allcomps = db.Database.SqlQuery<int>("select c.Id  from Companys as c left join Provinces as p on c.ProvinceId=p.Id where p.Id=" + isBelong).ToList();
                var data = db.CheckContents.Where(x => (x.UserId == null || db.Users.FirstOrDefault(a => a.Id == x.UserId).Companys.ProvinceId == isBelong) && x.CatId == NowCatId && !b.Contains(x.Id)).Select(x => new CheckContentDTO { CatId = NowCatId, CatName = x.CheckContentCat.CategoryName, ContentName = x.ContentName, Id = x.Id }).ToList();
                foreach (var n in data)
                {
                    n.BigId = bigCatId;
                    n.BigCatName = bigCatName;
                    n.CheckPointss = db.CheckPoints.Where(x => x.CheckContentId == n.Id).ToList();
                }

                //  var c = data;
                return data;

            }

        }
        public object Get(int catId, string keyVaule, int pageIndex = 1, int pageSize = 10)
        {
            // db.Configuration.LazyLoadingEnabled = true;
            // db.Configuration.ProxyCreationEnabled = true;
            var user = ToGetNowUser();
            int isBelong = db.Companys.Find(user.CompanyId).ProvinceId;// Users.Find(user.Id).Companys.ProvinceId;
            var datas = db.CheckContents.Where(x => (catId == -1 || x.CatId == catId || x.CheckContentCat.ParentId == catId)
                &&
                (string.IsNullOrEmpty(keyVaule) || x.ContentName == keyVaule || x.ContentName.Contains(keyVaule) || x.CheckContentCat.CategoryName == keyVaule || x.CheckContentCat.CategoryName.Contains(keyVaule)

                )
                 && (x.UserId == null || db.Users.FirstOrDefault(a => a.Id == x.UserId).Companys.ProvinceId == isBelong)
                );
            var data = datas.OrderBy(a => a.Id).Skip(pageSize * (pageIndex - 1)).Take(pageSize).Select(a => new
            {
                Id = a.Id,

                ContentCatName = a.CheckContentCat.CategoryName,
                Name = a.ContentName,


            });
            var count = datas.Count();
            var nowPage = pageIndex;
            var info = "未找到有效数据";
            if (data != null && data.Count() > 0)
            {
                info = "成功";
            }
            return new
            {
                info,
                count,
                data

            };

        }
        // GET api/CheckContents/5
        //public CheckContents Get(int id)
        //{
        //    return ICheckContents.GetOne(a => a.Id == id);
        //}
        // post api/CheckContents
        public HttpResponseMessage Post(CheckContents NewCheckContents)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Users NowUser = ToGetNowUser();
                    NewCheckContents.UserId = NowUser.Id;
                    var c = db.CheckContents.Add(NewCheckContents);
                    db.SaveChanges();
                    string allRule = "";
                    NewCheckContents.CheckPoints.ToList().ForEach(x => allRule = allRule + x.RefRules + ",");
                    var tempAllRuleAll = allRule.Split(',');
                    var tempAllRule = tempAllRuleAll.Distinct().ToList();
                    int tempLen = tempAllRule.Count() - 1;
                    for (int i = 0; i < tempLen; i++)
                    {
                        int Id = Convert.ToInt32(tempAllRule[i]);
                        var rul = db.CheckRefRules.FirstOrDefault(x => x.Id == Id);
                        if (rul != null)
                        {
                            rul.IsUsed = 1;
                            db.Entry<CheckRefRules>(rul).State = EntityState.Modified;
                        }
                    }
                    db.SaveChanges();

                    return Request.CreateResponse(HttpStatusCode.OK);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }
        // PUT api/CheckContents/5
        public HttpResponseMessage Put(CheckContents NewCheckContents)
        {
            try
            {

                if (NewCheckContents == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
                else
                {
                    //待编辑的字段赋值

                    ICheckContents.Edit(NewCheckContents);
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }
        // DELETE api/CheckContents/5
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                ICheckContents.Del(id);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }




    }
}
