//var DGCheckModule = angular.module('appPage');
DGCheckModule.controller('DGCheckCtrl', ['$scope', '$http', '$filter', '$location', 'alertService', 'API_SERVER',

    function ($scope, $http, $filter, $location, alertService, API_SERVER) {
        //  $scope.ToData();

        //$scope.ToData=  function GetData()
        //{
        //    //alert("...");
        //    var urlback = url + "?pageIndex=" + $scope.nowPage;
        //    $http.get(urlback, {

        //    }).success(function (data, status, headers, config) {
        //        $scope.DefCallbackPart(data);
        //    })

        //}
        $scope.getData = function getDGCheckData() {
            $http({
                method: "GET",
                url: API_SERVER + "/api/CheckForms",
                params: { "pageIndex": $scope.currentPage, "pageSize": 10 }
            }).success(function (data, status, headers, config) {
                if (status == 401) {
                    alertService.launch("error", "", "无权限");
                    return;
                }
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


        $scope.DeleteDGCheck = DeleteDGCheck;
        var urlmyCheckForm = API_SERVER + '/api/CheckForms';
        function DeleteDGCheck(data) {
            var urlback = urlmyCheckForm + "/" + data
            $http(
            {
                method: "DELETE",
                url: urlback
            }).success(function (data, status, headers, config) {

                $scope.getData();
                alert("成功");

            });

        }


        $scope.DetailDGCheck = DetailDGCheck;
        function DetailDGCheck(Id) {
            $location.path("MCheckDetail/" + Id).replace();

        }

    }
]).filter('showstring', function () {
    return function (input, uppercase) {
        var out = "确认";
        switch (input) {
            case -1:
                out = "退回"
                break;
            case 0:
                out = "新提交"
                break;
            case 1:
                out = "确认"
                break;
            default:
                out = "error"
                break;
        }
        return out;
    };
});

DGCheckModule.filter("showcheck", function () {


    return function (input, uppercase) {
        var out = "确认";
        switch (input) {
            case -1:
                out = "退回"
                break;
            case 0:
                out = "新提交"
                break;
            case 1:
                out = "已使用"
                break;
            default:
                out = "error"
                break;
        }
        return out;

    }
});
DGCheckModule.filter("showcatindex", function () {
    return function (input) {
        var output = "一";
        switch (input) {
            case 1:
                output = "一";
                break;
            case 2:
                output = "二";
                break;
            case 3:
                output = "三";
                break;
            case 4:
                output = "四";
                break;
            case 5:
                output = "五";
                break;
            case 6:
                output = "六";
                break;
            case 7:
                output = "七";
                break;
            case 8:
                output = "八";
                break;
            default:
                output = "九";
                break;
        }
        return output;

    }
});
DGCheckModule.controller("DGChecksAddCtr", ["$http", "$scope", "$timeout", "$location", "InfoTree", "beginBigCat", "alertService", "API_SERVER", function ($http, $scope, $timeout, $location, InfoTree, beginBigCat, alertService, API_SERVER) {
    //初始化下拉菜单
    // 
    $scope.bigArray = [];
    $scope.docxs = [];
    $scope.selectNCC = function () {

        var url = API_SERVER + '/api/CheckContents?Id=-1&CatId=' + $scope.NowCatId;
        //  var hasChoose = "";
        //  function calculateChoose() {

        var tempdocxsLen = $scope.docxs.length;
        var i = 0;
        for (i; i < tempdocxsLen; i++) {
            url = url + 'a' + $scope.docxs[i].Id;
        }

        //  }
        $http.get(url, {}).success(

        function (data, status, headers, config) {
            $scope.docs = data;
        }
            );


    }
    //提交
    $scope.checksubmit = function () {


        var tempDocxsLen = $scope.docxs.length;
        if ($scope.newFormName == "") {
            alertService.launch("error", "", "请输入检查单名称！");
            return false;
        }
        if (tempDocxsLen == 0) {
            alertService.launch("error", "", "请添加检查项！")
            return false;
        }
        var formTemplate = "";
        for (var i = 0; i < tempDocxsLen; i++) {
            if (formTemplate == "") {

                formTemplate = $scope.docxs[i].Id;
            }
            else {
                formTemplate = formTemplate + "," + $scope.docxs[i].Id;
            }

        }
        $http.post(API_SERVER + "/api/CheckForms", { Name: $scope.newFormName, FormTemplate: formTemplate }).success(function (data, status, headers, config) {
            if (status == 200) {
                alertService.launch("shows", "", "添加成功！")

                //刷新当前路由
                $location.path("/MCheck").replace();
            }
            else {
                alertService.launch("error", "", "添加失败！")
            }
        }).error(function () {
            alertService.launch("error", "", "添加失败！")
        })
    }

    //
    $scope.AllCats = [];
    getAllCatNow();
    function getAllCatNow() {
        var url = API_SERVER + '/api/CheckContentCat/1';
        $http.get(url, {
        }).success(function (data, status, headers, config) {

            $scope.AllCats = InfoTree.querys(data);
            // $scope.NowCatId = $scope.AllCats[0].Id;

        })
    }
    $scope.docxs = [];
    //-----------------更新页面model-------------------------------------------
    $scope.tobigarray = function () {
        $scope.bigArray = [];
        $scope.bigArray = beginBigCat.deelBegin($scope.docxs);
        //  $scope.selectNCC();
        return false;
    }


    $scope.dropCallback = function (event, ui) {
        $scope.tobigarray();
        $scope.selectNCC();
    };
    //---重新赋值$scope.docxs----



    function getBackDocxs() {
        $scope.docxs = [];

        var tempLen = $scope.bigArray.length;
        for (var i = 0; i < tempLen; i++) {
            for (var j = 0; j < $scope.bigArray[i].ListCat.length; j++) {
                for (var k = 0; k < $scope.bigArray[i].ListCat[j].ListContent.length; k++) {
                    $scope.docxs.push($scope.bigArray[i].ListCat[j].ListContent[k]);

                }

            }
        }

    }
    //-------------------------------------------------
    //计算分项的Index---------------------------------
    $scope.calucatlocation = function (a, b) {
        var tempLocation = 0;
        for (var i = 0; i < a; i++) {
            tempLocation = tempLocation + $scope.bigArray[i].ListCat.length;
        }
        tempLocation = tempLocation + b + 1;
        return tempLocation;
    }
    //----------------------------------------------
    //上下移动----------------------------------------
    $scope.oncatNameClickUp = function (a, b, c, d) {
        switch (a) {
            case 1:

                var tempBigChange = $scope.bigArray[b - 1];
                $scope.bigArray[b - 1] = $scope.bigArray[b];
                $scope.bigArray[b] = tempBigChange;
                break;
            case 2:
                var tempCatChange = $scope.bigArray[b].ListCat[c - 1];
                $scope.bigArray[b].ListCat[c - 1] = $scope.bigArray[b].ListCat[c];
                $scope.bigArray[b].ListCat[c] = tempCatChange;
                break;
            case 3:
                var tempContentChange = $scope.bigArray[b].ListCat[c].ListContent[d - 1];
                $scope.bigArray[b].ListCat[c].ListContent[d - 1] = $scope.bigArray[b].ListCat[c].ListContent[d];
                $scope.bigArray[b].ListCat[c].ListContent[d] = tempContentChange;
                break;
            default:
                alert("error");

        }
        getBackDocxs();
    }
    //删除
    $scope.oncatNameClickRe = function (a, b, c, d) {
        $scope.docxs = [];
        $scope.bigArray[b].ListCat[c].ListContent.splice(d, 1);
        if ($scope.bigArray[b].ListCat[c].ListContent.length == 0) {
            $scope.bigArray[b].ListCat.splice(c, 1);
        }
        if ($scope.bigArray[b].ListCat.length == 0) {
            $scope.bigArray.splice(b, 1);
        }
        getBackDocxs();
        $scope.selectNCC();
    }
    //移动
    $scope.oncatNameClickDo = function (a, b, c, d) {
        $scope.backContentIndex = "a";//初始返回值
        switch (a) {
            case 1:

                var tempBigChange = $scope.bigArray[b + 1];
                $scope.bigArray[b + 1] = $scope.bigArray[b];
                $scope.bigArray[b] = tempBigChange;

                break;
            case 2:
                var tempCatChange = $scope.bigArray[b].ListCat[c + 1];
                $scope.bigArray[b].ListCat[c + 1] = $scope.bigArray[b].ListCat[c];
                $scope.bigArray[b].ListCat[c] = tempCatChange;

                break;
            case 3:
                var tempContentChange = $scope.bigArray[b].ListCat[c].ListContent[d + 1];
                $scope.bigArray[b].ListCat[c].ListContent[d + 1] = $scope.bigArray[b].ListCat[c].ListContent[d];
                $scope.bigArray[b].ListCat[c].ListContent[d] = tempContentChange;

                break;
            default:
                alert("error");

        }
        getBackDocxs();

    }






    //-----------------------------------------
    $scope.hideCC = function () {
        if ($scope.docs == undefined || $scope.docs == null) {
            return false;
        }
        return $scope.docs.length > 0;
    }

    $scope.hideCCS = function () {
        if ($scope.docxs == undefined || $scope.docxs == null) {
            return false;
        }
        return $scope.docxs.length > 0;
    }

}]);
DGCheckModule.controller("DGChecksDetailCtr", ["$http", "$scope", "$timeout", "$location", "$routeParams", "filterFilter", "InfoTree", "alertService", "API_SERVER", function ($http, $scope, $timeout, $location, $routeParams, filterFilter, InfoTree, alertService, API_SERVER) {

    //处理 将得到项处理成树形结构-这是第一次写以后会写成服务-------------------------
    var tempBigArray = new Array();
    var tempCatArray = new Array();
    function deelBegin(data) {
        var tempLen = data.length;
        for (var i = 0; i < tempLen; i++) {
            if (isNotEBig(tempBigArray, data[i].BigId)) {
                var tempBigCat = { BigId: data[i].BigId, BigCatName: data[i].BigCatName, ListCat: [], nowBigIndex: 0 };
                tempBigArray.push(tempBigCat);
                var tempCat = { CatId: data[i].CatId, CatName: data[i].CatName, BigId: data[i].BigId, ListContent: [], CatIndex: 0, nowCatIndex: 0 };
                tempCatArray.push(tempCat);

            }
            else {
                if (isNotECat(tempCatArray, data[i].CatId)) {
                    var tempCat = { CatId: data[i].CatId, CatName: data[i].CatName, BigId: data[i].BigId, ListContent: [] };
                    tempCatArray.push(tempCat);
                }
            }

        }
        for (var i = 0; i < tempCatArray.length; i++) {
            var tempContents = filterFilter(data, { CatId: tempCatArray[i].CatId }, true);
            tempCatArray[i].ListContent = tempContents;
        }
        for (var i = 0; i < tempBigArray.length; i++) {
            var tempCats = filterFilter(tempCatArray, { BigId: tempBigArray[i].BigId }, true);
            tempBigArray[i].ListCat = tempCats;
        }
    }
    //a为数组b为int
    function isNotECat(a, b) {
        var i = 0;
        var len = a.length;
        for (i = 0; i < len; i++) {
            if (a[i].CatId == b)
                return false;

        }
        return true;
    }
    function isNotEBig(a, b) {
        var i = 0;
        var len = a.length;
        for (i = 0; i < len; i++) {
            if (a[i].BigId == b)
                return false;

        }
        return true;
    }
    //----------------------------------------------
    //计算分项的Index---------------------------------
    $scope.calucatlocation = function (a, b) {
        var tempLocation = 0;
        for (var i = 0; i < a; i++) {
            tempLocation = tempLocation + $scope.bigArray[i].ListCat.length;
        }
        tempLocation = tempLocation + b + 1;
        return tempLocation;
    }
    //----------------------------------------------
    //上下移动----------------------------------------
    $scope.oncatNameClickUp = function (a, b, c, d) {
        //var tempLen = $scope.docxs.length;
        //var dealArrayb = new Array();
        //var dealArraybb = new Array();
        switch (a) {
            case 1:

                var tempBigChange = $scope.bigArray[b - 1];
                $scope.bigArray[b - 1] = $scope.bigArray[b];
                $scope.bigArray[b] = tempBigChange;
                break;
            case 2:
                var tempCatChange = $scope.bigArray[b].ListCat[c - 1];
                $scope.bigArray[b].ListCat[c - 1] = $scope.bigArray[b].ListCat[c];
                $scope.bigArray[b].ListCat[c] = tempCatChange;
                break;
            case 3:
                var tempContentChange = $scope.bigArray[b].ListCat[c].ListContent[d - 1];
                $scope.bigArray[b].ListCat[c].ListContent[d - 1] = $scope.bigArray[b].ListCat[c].ListContent[d];
                $scope.bigArray[b].ListCat[c].ListContent[d] = tempContentChange;
                break;
            default:
                alert("error");

        }
    }
    $scope.oncatNameClickRe = function (a, b, c, d) {
        $scope.bigArray[b].ListCat[c].ListContent.splice(d, 1);
        if ($scope.bigArray[b].ListCat[c].ListContent.length == 0) {
            $scope.bigArray[b].ListCat.splice(c, 1);
        }
        if ($scope.bigArray[b].ListCat.length == 0) {
            $scope.bigArray.splice(b, 1);
        }
    }
    $scope.oncatNameClickDo = function (a, b, c, d) {
        $scope.backContentIndex = "a";//初始返回值
        switch (a) {
            case 1:

                var tempBigChange = $scope.bigArray[b + 1];
                $scope.bigArray[b + 1] = $scope.bigArray[b];
                $scope.bigArray[b] = tempBigChange;
                break;
            case 2:
                var tempCatChange = $scope.bigArray[b].ListCat[c + 1];
                $scope.bigArray[b].ListCat[c + 1] = $scope.bigArray[b].ListCat[c];
                $scope.bigArray[b].ListCat[c] = tempCatChange;
                break;
            case 3:
                var tempContentChange = $scope.bigArray[b].ListCat[c].ListContent[d + 1];
                $scope.bigArray[b].ListCat[c].ListContent[d + 1] = $scope.bigArray[b].ListCat[c].ListContent[d];
                $scope.bigArray[b].ListCat[c].ListContent[d] = tempContentChange;
                break;
            default:
                alert("error");

        }

    }



    //
    $scope.Id = $routeParams["Id"];
    var url = API_SERVER + "/api/CheckForms?id=" + $scope.Id;
    $http.get(url).success(function (data, status, headers, config) {
        $scope.NewCheckForms = data.cForm;
        deelBegin(data.data);
        $scope.bigArray = tempBigArray;
        tempBigArray = [];


    });
    //提交--------
    $scope.storeBackIndex = function (a, b) {
        if (a == 0) {
            $scope.backContentIndex = b;
        }
        else {
            $scope.backContentIndex = $scope.backContentIndex + "," + b;
        }
        return false;
    }
    //-------
    $scope.back = function () {
        $location.path("/MCheck").replace();

    }
    $scope.backSave = function () {

        $scope.NewCheckFormsBack = { FormTemplate: "", Id: -1, Name: "", };
        $scope.NewCheckFormsBack.FormTemplate = $scope.backContentIndex;
        $scope.NewCheckFormsBack.Name = $scope.NewCheckForms.Name;
        // $scope.NewCheckFormsBack.FormTemplate = "1234";
        $scope.NewCheckFormsBack.Id = $scope.NewCheckForms.Id;
        $http.put(API_SERVER + "/api/CheckForms", $scope.NewCheckFormsBack).success(function (data, status, headers, config) {
            if (status == 200) {
                alertService.launch("error", "", "修改成功！")
                //刷新当前路由
                $location.path("/MCheck").replace();
            }
            else {
                alertService.launch("error", "", "修改失败！")
            }
        }).error(function () {
            alertService.launch("error", "", "修改失败！")
        })
    }






}]);



// DGChecksDetailCtr