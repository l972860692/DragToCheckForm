using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ToMakeForms.Model;
using ToMakeForms.Models;
using BLL;
using System.Web.Mvc;
namespace ToMakeForms.Controllers
{
    public class CheckContentCatController : ApiController
    {
      
       // public IBLLCheckContentCat ICheckContentCat { get; set; }
        DSMSEntities db = new DSMSEntities();
        BLLCheckContentCat ICheckContentCat = new BLLCheckContentCat();
        // GET api/CheckContentCat
        public IEnumerable<dynamic> Get()
        {


            var cats = db.CheckContentCat.OrderBy(a => a.Id)
                .Select(a => new
                {
                    a.CategoryName,
                    a.Id,
                    a.ParentId,
                    closed = true,
                    haschildren = db.CheckContentCat.FirstOrDefault(x => x.ParentId == a.Id) == null ? false : true
                });

            return cats;
        }
        // GET api/CheckContentCat/5
        public IEnumerable<dynamic> Get(int id)
        {
            var cats = db.CheckContentCat.OrderBy(a => a.Id)
    .Select(a => new
    {
        Name = a.CategoryName,
        a.Id,
        a.ParentId,
        closed = true,
        haschildren = db.CheckContentCat.FirstOrDefault(x => x.ParentId == a.Id) == null ? false : true,
        beginshowsave = false,
        newItem = ""
    });

            return cats;
        }


        #region //递归读出部门

        //读出部门
        private List<SelectListItem> selectList;
        /// <summary>
        /// 递归读出部门
        /// </summary>
        /// <param name="id">部门id</param>
        /// <param name="backT">部门上一级的前缀</param>
        void Need(int id, string backT)
        {

            var c = db.CheckContentCat.FirstOrDefault(n => n.Id == id);
            if (c.ParentId == 0)
            {

                SelectListItem s = new SelectListItem { Text = "|-" + c.CategoryName, Value = c.Id.ToString() };
                backT = "----";
                selectList.Add(s);
            }
            var cc = db.CheckContentCat.Where(n => n.ParentId == id);
            if (cc.Count() != 0)
            {
                foreach (var n in cc)
                {

                    //  string nowString = c.Name.Substring(c.Name.LastIndexOf('+'))+"+";
                    SelectListItem s = new SelectListItem { Text = backT + n.CategoryName, Value = n.Id.ToString() };
                    //string  nowString = s.Text.Substring(s.Text.LastIndexOf('+'))+"+";
                    selectList.Add(s);
                    backT = backT + "--";
                    Need(n.Id, backT);
                    backT = backT.Remove(backT.LastIndexOf('-') - 1);
                    // t = t + "+";
                }
            }
        }

        #endregion
        // post api/CheckContentCat
      //  [MyAuthorize(Modules = "检查模板", Operation = "新增")]
        public HttpResponseMessage Post(CheckContentCat NewCheckContentCat)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    CheckContentCat item = new CheckContentCat();
                    item.ParentId = NewCheckContentCat.ParentId;
                    item.CategoryName = NewCheckContentCat.CategoryName;
                    db.CheckContentCat.Add(item);
                    //  db.CheckContentCat.Add(NewCheckContentCat);
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
        // PUT api/CheckContentCat/5
     //   [MyAuthorize(Modules = "检查模板", Operation = "编辑")]
        public HttpResponseMessage Put(int id, CheckContentCat NewCheckContentCat)
        {
            try
            {

                if (NewCheckContentCat == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
                else
                {
                    //待编辑的字段赋值

                    ICheckContentCat.Edit(NewCheckContentCat);
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }
        // DELETE api/CheckContentCat/5
      //  [MyAuthorize(Modules = "检查模板", Operation = "删除")]
        public HttpResponseMessage Delete(int id)
        {
            try
            {

                db.CheckContentCat.Remove(db.CheckContentCat.FirstOrDefault(x => x.Id == id));
                db.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }
    }
}
