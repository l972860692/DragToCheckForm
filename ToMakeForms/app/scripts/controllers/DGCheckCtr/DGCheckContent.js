/// <reference path="../../views/DGCheckContentCat/TreeTPL.html" />
/// <reference path="../../bowers/angular/angular.js" />

DGCheckModule.controller("DGCheckContentCat", ["$scope", "$http", "API_SERVER", function ($scope, $http, API_SERVER) {


}]).controller("showCat", ["$scope", "$http", "API_SERVER", function ($scope, $http, API_SERVER) {

    var urlCheckContentCat = API_SERVER + '/api/V1/CheckContentCat';
    $scope.cats = [];
    $scope.getData = function getData() {

        var urlback = urlCheckContentCat;
        $http.get(urlback, {

        }).success(function (data, status, headers, config) {
            var temp={ CategoryName:"分类", Id:0, ParentId:-1, closed:true, haschildren:true };
            $scope.cats = data;
            $scope.cats.push(temp);
        })

    }
    $scope.getData();
    $scope.persons = [{ sex: 2, hasBaby: true }, { sex: 1, hasBaby: true }, { sex: 2, hasBaby: true }]
    //$scope.del = function delNow(Id) {
    //    if (confirm("确定要删除该条数据吗？")) {
    //        $http.delete("API_SERVER/api/V1/CheckContentCat/" + id).success(function (data, status, headers, config) {
    //            if (status == 200) {
    //                alertService.launch("shows", "", "删除成功！")
    //                //刷新当前路由
    //                GetData();
    //            }
    //            else {
    //                alertService.launch("error", "", "删除失败！")
    //            }
    //        }).error(function () {
    //            alertService.launch("error", "", "删除失败！")
    //        })
    //    }

    //}
    $scope.add = function addNow(Id) {

    }


}]).directive('mytree', ["$http", "alertService", "API_SERVER", function ($http, alertService, API_SERVER) {
    return {
        restrict: "AEMC",
        replace: true,
        scope: {
            cats: '='
        },
        controller: function ($scope, alertService) {
            // $scope.cats = [];
            //   $scope.ToData();
            $scope.del = function delNow(Id) {
                if (confirm("确定要删除该条数据吗？")) {
                    $http(
                    {
                        method:"DELETE",
                        url: API_SERVER + "/api/V1/CheckContentCat/" + Id
                    }).success(function (data, status, headers, config) {
                        if (status == 200) {
                            alertService.launch("shows", "", "删除成功！")
                            //刷新当前路由
                            $scope.$parent.getData();
                        }
                        else {
                            alertService.launch("error", "", "删除失败！")
                        }
                    }).error(function () {
                        alertService.launch("error", "", "删除失败！")
                    })
                }

            }
            $scope.add = function (Id, Item) {
                if (Item == "") {
                    alertService.launch("error", "", "请输入名称")
                    return false;
                }
                $http.post(API_SERVER + '/api/V1/CheckContentCat', { CategoryName: Item, ParentId: Id }).success(function (data, status, headers, config) {
                    if (status == 200) {
                        alertService.launch("shows", "", "添加成功！")
                        $scope.beginshowsave = false;
                        //刷新当前路由
                        $scope.$parent.getData();
                    }
                    else {
                        alertService.launch("error", "", "添加失败！")
                    }
                }).error(function () {
                    alertService.launch("error", "", "添加失败！")
                })
            }

        },
        templateUrl: 'views/DGCheckContentCat/TreeTPL.html'
    }
}]).controller('cccindexCtr', ['$scope', '$http', 'filterFilter', '$rootScope', '$q', 'Info', 'alertService', 'pmService', '$location', '$routeParams', '$route', 'API_SERVER', function ($scope, $http, filterFilter, $rootScope, $q, Info, alertService, pmService, $location, $routeParams, $route, API_SERVER) {
    //打开检查项编辑操作方法
    $scope.checkcontentdit = function (id) {
        //新增
        if (id == null) {
            if ($scope.ngShowAdd == "false") {
                alertService.launch("error", "", "你没有该权限！")
                return;
            }
            else {
                //  $location.path("userAdd").replace();
            }
        }
            //编辑
        else {
            if ($scope.ngShowEdit == "false") {
                alertService.launch("error", "", "你没有该权限！")
                return;
            } else {
                $location.path("EditDGCheckContent/" + id).replace();
            }
        }
    }//

    //打开检查项新增操作方法新增
    $scope.checkcontentadd = function () {

        if ($scope.ngShowEdit == "false") {
            alertService.launch("error", "", "你没有该权限！")
            return;
        } else {
            $location.path("AddDGCheckContent").replace();
        }

    }//
    $scope.checkcontentdelete = function (id) {
        if ($scope.ngShowDelete == "false") {
            alertService.launch("error", "", "你没有该权限！")
            return;
        } else {
            if (confirm("确定要删除该条数据吗？")) {
                $http( {
                    method:"DELETE",
                    url: API_SERVER + "/api/V1/CheckContents/" + id
                }   ).success(function (data, status, headers, config) {
                    if (status == 200) {
                        alertService.launch("shows", "", "删除成功！")
                        //刷新当前路由
                        $scope.getData();
                    }
                    else {
                        alertService.launch("error", "", "删除失败！")
                    }
                }).error(function () {
                    alertService.launch("error", "", "删除失败！")
                })
            }
        }
    }

    //




    $scope.selectCat = function () {
        $scope.nowPage = 1;
        $scope.getData();
    }


    $scope.searchKey = "";
    $scope.catId = -1;

    $scope.getData = function GetData1() {
        var urlCC = API_SERVER + '/api/V1/CheckContents';
        var urlback = urlCC //+ "?pageIndex=" + $scope.currentPage + "?pageSize=3";

        $http.get(urlback, {
            params: { catId: $scope.catId, keyVaule: $scope.searchKey, pageIndex: $scope.currentPage, pageSize: 10 }

        }).success(function (data) {
            if (data == null) {
                alertService.launch("error", "", "未能找到数据！")
                return;
            }
            else {
                $scope.callBackData(data);
            }
        }).error(function () {
            alertService.launch("error", "", "请求出错或者服务器未响应！")
        })

    }
    //$scope.DeleteDGCheck = DeleteDGCheck;
    //function DeleteDGCheck(data) {
    //    var urlback = url + "/" + data
    //    $http.delete(urlback, {

    //    }).success(function (data, status, headers, config) {

    //        alert("成功");
    //        $rootScope.ToData();
    //    })

    //}



    var myarray = [];
    var mylength = 0;
    var toDataAllBackG = [];
    var abcdback = [{ Name: "全部", Id: -1, ParentId: -1 }];
    //
    getCatNow();
    function getCatNow() {
        var urlCCC = API_SERVER + '/api/V1/CheckContentCat/1';
        $http.get(urlCCC, {
        }).success(function (data, status, headers, config) {
            myarray = data;
            toDataAllBackG = filterFilter(myarray, { ParentId: 0 }, true);
            mylength = toDataAllBackG.length;
            //GetAllDataNow();
            $scope.filteredArray = GetAllDataNow();//abcdback;
            $scope.needData = $scope.filteredArray;

        })
    }


    function GetAllDataNow() {
        var i = 0;
        for (i; i < mylength; i++) {
            abcdback.push(toDataAllBackG[i]);
            var backT = "----";
            need(backT, toDataAllBackG[i].Id)
        }
        return abcdback;

    }

    function need(st, idd) {
        var tempboss = filterFilter(myarray, { ParentId: idd }, true);
        var len = tempboss.length;
        if (len != 0) {
            var i = 0;
            for (i; i < len; i++) {
                tempboss[i].Name = st + tempboss[i].Name;
                abcdback.push(tempboss[i]);
                st = st + '--';
                need(st, tempboss[i].Id);
                st = st.substring(0, st.lastIndexOf('-') - 1);
            }
        }
    }






}]).controller('cccAddCtr', ['$scope', '$rootScope', '$http', '$modal', '$log', '$location', 'InfoTree','Info','alertService', 'API_SERVER', function ($scope, $rootScope, $http, $modal, $log, $location, InfoTree,Info,alertService, API_SERVER) {


        //  getAllCatNow();
    function getAllCatNow() {
        var url = API_SERVER + '/api/V1/CheckContentCat/1';
        $http.get(url, {
        }).success(function (data, status, headers, config) {

            $scope.filteredArray = InfoTree.querys(data);


        })
    }
    getAllCatNow();
    //提交更新后的数据
    $scope.processForm = function () {
        //$http({
        //    method: "PUT",
        //    url: "API_SERVER/api/V1/CheckContents",
        //    data: {NewCheckContents:$scope.NewCheckContents,Id:-1},
        //    headers: { "ContentType": "application/x-www-form-urlencoded" }
        //})
        if ($scope.myContentName == "")
        {
            alertService.launch("error", "", "请输入检查项名称")
            return false;
        }
        if ($scope.myCatId == "")
        {
            alertService.launch("error", "", "请选择检查项类别")
            return false;
        }
        if ($rootScope.addRuls.length == 0) {
            alertService.launch("error", "", "请添加检查点")
            return false;
        }

        
        //public int Id { get; set; }
        //public string ContentName { get; set; }
        //public Nullable<int> CatId { get; set; }
    
        //public virtual CheckContentCat CheckContentCat { get; set; }
        //public virtual ICollection<CheckPoints> CheckPoints { get; set; }


        //public int Id { get; set; }
        //public string Point { get; set; }
        //public int CheckContentId { get; set; }
        //public string PointType { get; set; }
        //public string RefRules { get; set; }
    
        var AddNewCheckContents = { "ContentName": "", "CatId": -1, "CheckPoints": [] };
     
        AddNewCheckContents.ContentName = $scope.myContentName;
        AddNewCheckContents.CatId = $scope.myCatId;
        var tempAddBackPointLen=$scope.addckPoint.length;
       // var tempJ=0;
        for (var i = 0; i < tempAddBackPointLen; i++)
        {
           //AddNewCheckContents.CheckPoints[i].Point = $scope.addckPoint[i].Name;
           //AddNewCheckContents.CheckPoints[i].PointType = $scope.addckPoint[i].Type;
            //AddNewCheckContents.CheckPoints[i].RefRules = ""; 
            var tempCheckPoints = { Point: "", PointType: "", RefRules: "" };
            tempCheckPoints.Point = $scope.addckPoint[i].Name;
            tempCheckPoints.PointType = $scope.addckPoint[i].Type;
            tempCheckPoints.RefRules = "";
            for(var j=0;j<$scope.addckPoint[i].RefRules.length;j++)
            {
                if (tempCheckPoints.RefRules == "") {
                    tempCheckPoints.RefRules = $scope.addckPoint[i].RefRules[j]
                }
                else {
                    tempCheckPoints.RefRules = tempCheckPoints.RefRules + "," + $scope.addckPoint[i].RefRules[j];
                }
            }
            AddNewCheckContents.CheckPoints.push(tempCheckPoints);
        }
        $http.post(API_SERVER + '/api/V1/CheckContents', AddNewCheckContents).success(function (data, status, headers, config) {
            if (status == 200) {
                alertService.launch("shows", "", "修改成功！")
                // $location.path("/Users").replace();
                AddNewCheckContents = [];
                $scope.back();
            }
            else {
                alertService.launch("error", "", "修改失败！")
            }
        }).error(function () {
            alertService.launch("error", "", "修改失败！")
        })
    }





    $rootScope.addDocs = [];
    $rootScope.addRuls = [];
    $rootScope.ckpoints = [];
    $rootScope.ckpointGUID = 0;
    $scope.oneAtATime = true;
    $rootScope.allCheckPoint = [];

    //返回列表页面
    $scope.back = function () {
        $location.path("/DGCheckContent").replace();
    }

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'views/DGCheckContent/temp.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
        //对话框返回之后

        modalInstance.result.then(function () {
            $scope.addselDocs = $rootScope.addDocs;
            $scope.addselRuls = $rootScope.addRuls;
            $scope.addckPoint = $rootScope.ckpoints;
            $scope.panelIsOpen = true;
        }, function () {

        });
    };


    //删除检查点
    $scope.closeckPointAlert = function (Id) {

        var i = 0;
        var tempI = 0;
        var len = $rootScope.ckpoints.length;

        var tempPoint;//要删除的检查点
        for (i; i < len; i++) {
            if ($rootScope.ckpoints[i].TempId == Id) {
                // tempPoint = $rootScope.ckpoints[i];
                // $rootScope.ckpoints.splice(i, 1);
                tempI = i;
                break;
            }
        }
        tempPoint = $rootScope.ckpoints[tempI];
        $rootScope.ckpoints.splice(tempI, 1);//现在删除此检查点
        var lenCkRul = tempPoint.RefRules.length;//要删除检查点包含的条例
        var lenCKpoints = $rootScope.ckpoints.length;//所有检查点
        var lenRuls = $rootScope.addRuls.length;//所有的条例 此条例已经整合 不包含重复的
        var delArray = [];
        for (i = 0; i < lenCkRul; i++) {
            var isDel = true;
            for (var j = 0; j < lenCKpoints; j++) {
                if (isOfArray($rootScope.ckpoints[j].RefRules, tempPoint.RefRules[i])) //此检查点所含条例是否包含在其他检查点中         
                {
                    isDel = false
                    break;
                }
            }
            if (isDel) {
                delArray.push(tempPoint.RefRules[i]);
            }

        }
        for (i = lenRuls - 1; i > -1; i--) {
            if (isOfArray(delArray, $rootScope.addRuls[i].Id)) {
                $rootScope.addRuls.splice(i, 1);
            }

        }

        lenCKpoints = $rootScope.ckpoints.length;
        if (lenCKpoints == 0)
        {
            $rootScope.addDocs = [];
            $rootScope.addRuls = [];
            $rootScope.ckpoints = [];
            $rootScope.ckpointGUID = 0;
            $scope.oneAtATime = true;
            $rootScope.allCheckPoint = [];
        }

        //------------判断是否有空的法规项
        var isDellenaddDocs= $rootScope.addDocs.length;
        var isDellenaddRuls=$rootScope.addRuls.length;
        for (i = isDellenaddDocs-1; i >-1;i--)
        {
            var isDelDoc=true;
            for (var j = 0; j < isDellenaddRuls; j++)
            {
                if ($rootScope.addDocs[i].Id == $rootScope.addRuls[j].RuleDocId)
                {
                    isDelDoc = false;
                    break;
                }
            }
            if (isDelDoc)
            { $rootScope.addDocs.splice(i, 1); }
        }
          




        //  --------------------

        //处理之后改变repeat
        $scope.addckPoint = $rootScope.ckpoints;
        $scope.addselRuls = $rootScope.addRuls;
        $scope.addselDocs = $rootScope.addDocs;
    }

    //a为数组
    function isOfArray(a, b) {
        if (a.indexOf(b) == -1) {
            return false;
        }
        return true;
    }



}]


).controller('ModalInstanceCtrl', function ($scope, $rootScope, $modalInstance, $http, alertService, API_SERVER,items) {
    //新增检查点的所有数据--------------------------------------------------------------------
    //获取法律法规信息
    $http.get(API_SERVER + "/api/V1/RefRuleDocs?type=2").success(function (data) {
        $scope.CheckRefRuleNow = data.data;
    });
    $scope.rulNos = "";
    //得到条例数据
    $scope.getData = function getCheckRefData() {
        $http({
            method: "GET",
            url: API_SERVER + "/api/V1/CheckRefRules",
            params: { "DocId": $scope.slRuleDocId, "pageIndex": $scope.currentPage, "pageSize": 10, "Rule": $scope.slRuleNo, "rulNos": $scope.rulNos }
        }).success(function (data) {
            if (data == null) {
                alertService.launch("error", "", "未能找到数据！")
                return;
            }
            else {
                $scope.callBackData(data);
            }
        }).error(function () {
            alertService.launch("error", "", "请求出错或者服务器未响应！")
        })

    }
    //1法律文件2条例

    $scope.selDocs = [];
    $scope.selRuls = [];
    // $scope.Doc={ "Id": 2, "DocName": "中华人民共和国安全生产aaa", "CheckRefRules": [] }

    //------------选择条例------------

    //  {"RefRuleDocs":{"Id":2,"DocName":"中华人民共和国安全生产aaa","CheckRefRules":[]},"Id":2,"Rule":"中华大的地方asdfasdfasdf","RuleDocId":2,"RuleNo":3}
    $scope.chooseRefNow = function (all) {
        if ($scope.selDocs.length == 0) {
            $scope.selDocs.push(all.RefRuleDocs)
        }
        else {
            var c = isNotE($scope.selDocs, all.RefRuleDocs);
            if (c) {
                ////将选择到的条例加入自己条例的法规中--------以后实现
                //var addchRel = { "Id": -1, "Rule": "", "RuleDocId": -1, "RuleNo": -1 };
                //addchRel.Id = all.Id;
                //addchRel.Rule = all.Rule;
                //addchRel.RuleDocId = all.RuleDocId;
                //addchRel.RuleNo = all.RuleNo;
                //all.RefRuleDocs.CheckRefRules.push(addchRel);
                
                $scope.selDocs.push(all.RefRuleDocs);

            }
        }
        $scope.selRuls.push(all);
        $scope.rulNos = $scope.rulNos + "," + all.Id;
        $scope.currentPage = 1;
        $scope.getData();

    }


    //选择法律下拉框
    $scope.selectRef = function () {
        $scope.showChoseTable = true;
        $scope.getData();


    }

    $scope.$watch('slRuleNo', function (newValue, oldValue) {
        $scope.getData();
    });
    //--------------alert-------------------
    //  $scope.ruls = [
    //{ type: 'danger', DocName: 'Oh snap! Change a few things up and try submitting again.', Name: "ccccc" },
    //{ type: 'success', DocName: 'Well done! You successfully read this important alert message.', Name: "ddcccc" }
    //  ];
    //  $scope.addAlert = function () {
    //      $scope.alerts.push({ msg: 'Another alert!' });
    //  };
    //删除所有法规包含的条例同时删除词条法规
    $scope.closeAlert = function (DocId) {
        $scope.rulNos = "";
        var i = 0;
        var len = $scope.selRuls.length;
        var lenDoc = $scope.selDocs.length;

        for (i = len - 1; i > -1; i--) {
            if (DocId == $scope.selRuls[i].RuleDocId) {
                $scope.selRuls.splice(i, 1);
            }
            else {
                $scope.rulNos = $scope.rulNos + "," + $scope.selRuls[i].Id;
            }
        }

        for (i = lenDoc - 1; i > -1 ; i--) {
            if ($scope.selDocs[i].Id == DocId) {
                $scope.selDocs.splice(i, 1);

            }
        }
        $scope.getData();



    };
    //删除条例最后需要判断此法规是否还有条例
    $scope.closeCh = function (Id) {
        var i = 0;
        var len = $scope.selRuls.length;
        var lenselDocs = $scope.selDocs.length;
        var DocId = -1;
        var allTotal = 0;
        var tempDoc = $scope.selDocs[0];//这个法规（要删除条例属于的）
        $scope.rulNos = "";
        //去除这条条例
        for (i = len - 1; i > -1; i--) {
            if (Id == $scope.selRuls[i].Id) {
                DocId = $scope.selRuls[i].RuleDocId;
                $scope.selRuls.splice(i, 1);
            }
            else {
                $scope.rulNos = $scope.rulNos + "," + $scope.selRuls[i].Id;//同时重构返回条例ID组
            }
        }
        len = $scope.selRuls.length;
        if (len == 0) {
            $scope.selDocs = [];
        }
        else {
            //判断法规内部是否还有其它条例 如果没有则删除此法规 即页面不显示法规名称
            for (i = len - 1; i > -1; i--) {
                if (DocId == $scope.selRuls[i].RuleDocId) {
                    allTotal = allTotal + 1;
                }
            }
            if (allTotal == 0) {
                for (i = len - 1; i > -1; i--) {
                    if (DocId == $scope.selDocs[i].Id) {
                        $scope.selDocs.splice(i, 1);
                    }
                }
            }
        }
        //以后实现-------------------------------------
        //else {    //------Doc去除条例
        //    for (i = 0; i < $scope.selDocs.length; i++) {
        //        if (DocId == $scope.selDocs[i].Id) {
        //            tempDoc = $scope.selDocs[i];
        //        }
        //    }

        //}
        ////用与add页面 这个条例所属于的法规  在所属法规中删除自己------Doc去除条例
        //var lenTempDocRuls = tempDoc.CheckRefRules.length;
        //for (i = 0; i < lenTempDocRuls; i++) {
        //    if (tempDoc.CheckRefRules[i].Id == Id) {
        //        tempDoc.CheckRefRules.splice(i, 1);
        //        break;
        //    }
        //}
        //----------------------------------------------------------
        $scope.getData();

    }
    //-------------对话框设置相关------------------------------------------

    $scope.oneckpoint = { Name: "", Type: "b", RefRules: [] };//一个检查点的信息用于返回给总检查点 最后返回数据库
    $scope.oneckpoint.RefRules = [];
    $scope.ok = function () {

        if ($scope.oneckpoint.Name=="")
        {
            alertService.launch("error", "", "请输入检查点名称")
            return false;
        }
        if ($scope.selRuls.length == 0)
        {
            alertService.launch("error", "", "请选择法规依据")
            return false;
        }


        $scope.showref = false;
        var len = $scope.selRuls.length;
        var lenDoc = $scope.selDocs.length;
        if ($rootScope.addDocs.length == 0) {
            $rootScope.addDocs = $scope.selDocs;
            $rootScope.addRuls = $scope.selRuls;
            for (var i = 0; i < len; i++) {
                $scope.oneckpoint.RefRules.push($scope.selRuls[i].Id);
            }
        }
        else {
            //判断重复的法规 踢出掉  即当法规重复时不加入  $rootScope.addDocs
            for (var i = 0; i < lenDoc; i++) {
                var c = isNotE($rootScope.addDocs, $scope.selDocs[i]);
                if (c) {
                    $rootScope.addDocs.push($scope.selDocs[i]);
                }
            }
            //判断重复的条例 踢出掉  即当条例重复时不加入 $rootScope.addRuls
            for (var i = 0; i < len; i++) {
                var c = isNotE($rootScope.addRuls, $scope.selRuls[i]);
                $scope.oneckpoint.RefRules.push($scope.selRuls[i].Id);
                if (c) {
                    $rootScope.addRuls.push($scope.selRuls[i]);
                }
            }
        }
        $scope.oneckpoint.TempId = ++$rootScope.ckpointGUID;//给条例加上临时的ID 方便在add页面查找
        $rootScope.ckpoints.push($scope.oneckpoint);
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $scope.showref = false;
        $modalInstance.dismiss('cancel');
    };
    //---------------------------------------------------------------------------------------------
})


    .factory('Info', ['$http', '$q', function ($http, $q) {



    }]).factory('InfoTree', ['$http', '$q', 'filterFilter', function ($http, $q, filterFilter) {

        var myarray = [];
        var mylength = 0;
        var toDataAllBackG = [];
        var abcdback = [];
        function GetAllDataNow() {
            var i = 0;
            for (i; i < mylength; i++) {
                abcdback.push(toDataAllBackG[i]);
                var backT = "----";
                need(backT, toDataAllBackG[i].Id)
            }
            return abcdback;

        }

        function need(st, idd) {
            var tempboss = filterFilter(myarray, { ParentId: idd }, true);
            var len = tempboss.length;
            if (len != 0) {
                var i = 0;
                for (i; i < len; i++) {
                    tempboss[i].Name = st + tempboss[i].Name;
                    abcdback.push(tempboss[i]);
                    st = st + '--';
                    need(st, tempboss[i].Id);
                    st = st.substring(0, st.lastIndexOf('-') - 1);
                }
            }
        }

        function callBackFc(data) {
           
            myarray = data;
            toDataAllBackG = filterFilter(myarray, { ParentId: 0 }, true);
            mylength = toDataAllBackG.length;
            GetAllDataNow();
            return abcdback;
        }

        return {
            query: function () {

                return "asdf";  
            },
            querys: function (data) {
                abcdback = [];
                myarray = data;
                toDataAllBackG = filterFilter(myarray, { ParentId: 0 }, true);
                mylength = toDataAllBackG.length;
                GetAllDataNow();
                return abcdback;   
            }

        };
    }]).factory('TreeNeedService', ['$http', 'filterFilter', function ($http, filterFilter) {




        var myarray = [];
        var mylength = 0;
        var toDataAllBackG = [];
        var abcdback = [{ Name: "全部", Id: -1, ParentId: -1 }];
        //
        function getCatNow() {
            var url = API_SERVER + '/api/V1/CheckContentCat/1';
            $http.get(url, {
            }).success(function (data, status, headers, config) {
                myarray = data;
                toDataAllBackG = filterFilter(myarray, { ParentId: 0 }, true);
                mylength = toDataAllBackG.length;
                GetAllDataNow();


            })
        }


        function GetAllDataNow() {
            var i = 0;
            for (i; i < mylength; i++) {
                abcdback.push(toDataAllBackG[i]);
                var backT = "----";
                need(backT, toDataAllBackG[i].Id)
            }

        }

        function need(st, idd) {
            var tempboss = filterFilter(myarray, { ParentId: idd }, true);
            var len = tempboss.length;
            if (len != 0) {
                var i = 0;
                for (i; i < len; i++) {
                    tempboss[i].Name = st + tempboss[i].Name;
                    abcdback.push(tempboss[i]);
                    st = st + '--';
                    need(st, tempboss[i].Id);
                    st = st.substring(0, st.lastIndexOf('-') - 1);
                }
            }
        }
        function BeginGetData() {
            getCatNow();
            return abcdback;
        }


        return {
            getDataTree: function () {
                getCatNow();
                return abcdback;
            }
        };



    }])
.controller('ccceditCtr', ['$scope', '$http', '$location', '$routeParams', 'InfoTree', 'alertService', 'API_SERVER', function ($scope, $http, $location, $routeParams, InfoTree, alertService, API_SERVER) {
    //  $scope.filteredArray = treeNeedService.getDataTree();



    $scope.whoyouare = InfoTree.query();
    //返回列表页面
    $scope.back = function () {
        $location.path("/DGCheckContent").replace();
    }
    //提交更新后的数据
    $scope.processForm = function () {
        //$http({
        //    method: "PUT",
        //    url: "API_SERVER/api/V1/CheckContents",
        //    data: {NewCheckContents:$scope.NewCheckContents,Id:-1},
        //    headers: { "ContentType": "application/x-www-form-urlencoded" }
        //})

        $http.put(API_SERVER + '/api/V1/CheckContents', $scope.NewCheckContents).success(function (data, status, headers, config) {
            if (status == 200) {
                alertService.launch("shows", "", "修改成功！")
                // $location.path("/Users").replace();
                $scope.back();
            }
            else {
                alertService.launch("error", "", "修改失败！")
            }
        }).error(function () {
            alertService.launch("error", "", "修改失败！")
        })
    }
    // 
    $scope.NewCheckContents = { Id: -1, CatId: 0, ContentName: '0' }

    $scope.NewCheckContents.Id = $routeParams["Id"];
    if ($routeParams["Id"] == undefined)
    {
        $scope.NewCheckContents.Id = "";
        $scope.NewCheckContents.ContentName = "";
        getAllCatNow();
    }
    else
    {
       
        getTheCatNow();
    }
    function getTheCatNow() {
        var url = API_SERVER + '/api/V1/CheckContents?Id=' + $scope.NewCheckContents.Id + '&CatId=aa';
        $http.get(url, {
        }).success(function (data, status, headers, config) {

            $scope.NewCheckContents.CatId = data.CatId;
            $scope.NewCheckContents.ContentName = data.ContentName;
            getAllCatNow();

        })
    }

    //
    //  getAllCatNow();
    function getAllCatNow() {
        var url = API_SERVER + '/api/V1/CheckContentCat/1';
        $http.get(url, {
        }).success(function (data, status, headers, config) {

            $scope.filteredArray = InfoTree.querys(data);


        })
    }

    $scope.selectNCC = function (Id) {
        if ($scope.NewCheckContents.CatId == Id)
        {
            return true;
        }
        return false;
    }


}]


).filter('showShort', function () {
    return function (input, uppercase) {
        var out = input.substring(0, 10);

        return out + " ... ...";
    };
})

//a为数组b为类别
function isNotE(a, b) {
    var i = 0;
    var len = a.length;
    for (i = 0; i < len; i++) {
        if (a[i].Id == b.Id)
            return false;

    }
    return true;
}