
DGCheckModule.controller('DGCheckRltCtrl', ['$scope', '$http', '$filter', '$location', 'alertService','API_SERVER',

    function ($scope, $http, $filter, $location, alertService, API_SERVER) {

        //------------搜索相关---------
        $scope.openBegin = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.openedBegin = !$scope.openedBegin;
        };
       
        $scope.format = "yyyy-MM-dd";
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1          
            

        };
        $scope.openEnd = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.openedEnd = !$scope.openedEnd;
        };

        $scope.format = "yyyy-MM-dd";
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1


        };
        $scope.submit_search = function () {

            $scope.getData();
        }

        //----------------------
        $scope.keyword = "";
        $scope.BeginTime="";
        $scope.EndTime = "";
        $scope.getData = function getDGCheckData() {
            $http({
                method: "GET",
                url: API_SERVER + "/api/V1/CheckResults",
                params: { "pageIndex": $scope.currentPage, "pageSize": 10,"key":$scope.keyword,"BeginTime":$scope.BeginTime,"EndTime":$scope.EndTime}
            }).success(function (data, status, headers, config) {
                if (status == 401)
                {
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
        //--------------------
        $scope.DeleteDGCheckRlt = DeleteDGCheckRlt;
        function DeleteDGCheckRlt(data) {
            var urlback = API_SERVER + "/api/V1/CheckResults" + "/" + data
            $http(
            {
                method:"DELETE",
                url:urlback
            }).success(function (data, status, headers, config) {

                $scope.getData();
                alert("成功");

            })

        }

        $scope.ResultDGCheckRlt = function (Id) {
            $location.path("ResultDGCheckRlt/" + Id).replace();
        }
        $scope.DetailDGCheckRlt = DetailDGCheckRlt;
        function DetailDGCheckRlt(Id) {
            $location.path("DetailDGCheckRlt/" + Id).replace();

        }
        //-------------------------------

    }
])
DGCheckModule.controller('AddDGCheckRltCtrl', ["$http", "$scope", "$timeout", "$location", "$routeParams", "filterFilter", "InfoTree", "alertService", "API_SERVER", function ($http, $scope, $timeout, $location, $routeParams, filterFilter, InfoTree, alertService, API_SERVER) {
    $scope.noSure = true
    $scope.NewCheckResults = {
        Result: "",
        CompanyId: "",
        Location: "",
        Opinion: "",
        CheckFormId: "",
        Project: "",
        Checker: "",
        Name: "",
        TheNotes: ""
    };
    $http.get(API_SERVER + "/api/V1/Companys").success(function (data) {
        $scope.Companys = data.data;
    })
    $http.get(API_SERVER + "/api/V1/CheckForms?pageIndex=1&pageSize=1000").success(function (data) {
        $scope.CheckFormsCheck = data.data;
        $scope.NewCheckResults.CheckFormId = "";
    })
    $scope.toTrueCheckForm = function () {

        if ($scope.NewCheckResults.CheckFormId == undefined || $scope.NewCheckResults.CheckFormId == "") {
            alert("请选择模板");
        }
        else {
            $scope.noSure = false;
        }
    }
    $scope.changeCheckForm = function () {
        // alert($scope.NewCheckResults.CheckFormId);
        var urlCheckForms = API_SERVER + "/api/V1/CheckForms?id=" + $scope.NewCheckResults.CheckFormId;
        $http.get(urlCheckForms).success(function (data, status, headers, config) {
            $scope.NewCheckForms = data.cForm;
            deelBegin(data.data);
            $scope.bigArray = tempBigArray;
            tempBigArray = [];
            tempCatArray = [];


        });


    }
    $scope.backSaveCKRlt = function () {

        // $scope.NewCheckResults
        //$scope.NewCheckResults = {
        //    Result: "",
        //    CompanyId: "",
        //    Location: "",
        //    Opinion: "",
        //    CheckFormId: "",
        //    Project: "",
        //    Checker: ""
        //};
        if ($scope.NewCheckResults.Location == "" || $scope.NewCheckResults.CompanyId == "" || $scope.NewCheckResults.Opinion == "" || $scope.NewCheckResults.Project == "" || $scope.NewCheckResults.Checker == "") {
            alert("请输入完整信息");
            return false;

        }
        getBackResult();
        $scope.NewCheckResults.Result = $scope.backSaveResult;
        $scope.NewCheckResults.TheNotes = $scope.backSaveNote;
        $http.post(API_SERVER + "/api/V1/CheckResults", $scope.NewCheckResults).success(function (data) {
            if (data == null) {
                alertService.launch("error", "", "未能找到数据！")
                return false;
            }
            else {
                $scope.back();
            }
        }).error(function () {
            alertService.launch("error", "", "请求出错或者服务器未响应！")
        })
    }
    $scope.tempTostoreResult = [];



    //---------------------------
    $scope.back = function () {
        $location.path("DGCheckRlt").replace();

    }
    //---------------------
    $scope.storeBackIndex = function (a, b, c) {
        //if (a == 0) {
        //    $scope.backContentIndex = b;
        //}
        //else {
        //    $scope.backContentIndex = $scope.backContentIndex + "," + b;
        //}

        // var tempClass = { Id: b, Checks: c };
        //  $scope.tempTostoreResult.push(tempClass);
        return false;
    }
    //------保存更改--------
    $scope.backSaveResult = -1;
    $scope.backSaveNote = "";
    function getBackResult() {

        var tempLen = $scope.bigArray.length;
        for (var i = 0; i < tempLen; i++) {
            for (var j = 0; j < $scope.bigArray[i].ListCat.length; j++) {
                for (var k = 0; k < $scope.bigArray[i].ListCat[j].ListContent.length; k++) {
                    if ($scope.backSaveResult == -1) {
                        $scope.backSaveResult = $scope.bigArray[i].ListCat[j].ListContent[k].Id;
                        $scope.backSaveNote = $scope.bigArray[i].ListCat[j].ListContent[k].Id;
                    }
                    else {
                        $scope.backSaveResult = $scope.backSaveResult + ',' + $scope.bigArray[i].ListCat[j].ListContent[k].Id;
                        $scope.backSaveNote = $scope.backSaveNote + ',' + $scope.bigArray[i].ListCat[j].ListContent[k].Id;
                    }
                    for (var k1 = 0; k1 < $scope.bigArray[i].ListCat[j].ListContent[k].CheckPointss.length; k1++) {
                        $scope.backSaveResult = $scope.backSaveResult + 'r' + $scope.bigArray[i].ListCat[j].ListContent[k].CheckPointss[k1].IsChecked;
                        $scope.backSaveNote = $scope.backSaveNote + 'r' + $scope.bigArray[i].ListCat[j].ListContent[k].CheckPointss[k1].Note;
                    }

                }

            }
        }

    }
//-----------------------------
    //处理 将得到项处理成树形结构--------------------------
    var tempBigArray = new Array();
    var tempCatArray = new Array();
    function deelBegin(data) {
        var tempLen = data.length;
        for (var i = 0; i < tempLen; i++) {
            if (isNotEBig(tempBigArray, data[i].BigId)) {
                var tempBigCat = { BigId: data[i].BigId, BigCatName: data[i].BigCatName, ListCat: [], nowBigIndex: 0 };
                tempBigArray.push(tempBigCat);
                var tempCat = { CatId: data[i].CatId, CatName: data[i].CatName, BigId: data[i].BigId, ListContent: [] };
                tempCatArray.push(tempCat);

            }
            else {
                if (isNotECat(tempCatArray, data[i].CatId)) {
                    var tempCat = { CatId: data[i].CatId, CatName: data[i].CatName, BigId: data[i].BigId, ListContent: [], CatIndex: 0, nowCatIndex: 0 };
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


    //-----------------------------------------------------------------------------------
}
])
DGCheckModule.controller('DetailDGCheckRltCtrl', ["$http", "$scope", "$timeout", "$location", "$routeParams", "filterFilter", "beginBigCat", "alertService", "API_SERVER", function ($http, $scope, $timeout, $location, $routeParams, filterFilter, beginBigCat, alertService, API_SERVER) {

    $scope.canChangeDet = true;
    $scope.canChangeShowSave = false;
    $scope.theId = $routeParams["Id"];
//---------保存更改------------------------------



    //--更改--

    $scope.OldCheckResults = {
        Id:"",
        Result: "",
        CompanyId: "",
        Location: "",
        Opinion: "",
        CheckFormId: "",
        Project: "",
        Checker: "",
        Name: "",
        TheNotes: ""
    };
    $scope.OldCheckResults.Id = $scope.theId;
    $scope.backSaveResult = -1;
    $scope.backSaveNote = "";
    //--此方法可以写成服务如果需要---
    function getBackResult() {

        var tempLen = $scope.bigArray.length;
        for (var i = 0; i < tempLen; i++) {
            for (var j = 0; j < $scope.bigArray[i].ListCat.length; j++) {
                for (var k = 0; k < $scope.bigArray[i].ListCat[j].ListContent.length; k++) {
                    if ($scope.backSaveResult == -1) {
                        $scope.backSaveResult = $scope.bigArray[i].ListCat[j].ListContent[k].Id;
                        $scope.backSaveNote = $scope.bigArray[i].ListCat[j].ListContent[k].Id;
                    }
                    else {
                        $scope.backSaveResult = $scope.backSaveResult + ',' + $scope.bigArray[i].ListCat[j].ListContent[k].Id;
                        $scope.backSaveNote = $scope.backSaveNote + ',' + $scope.bigArray[i].ListCat[j].ListContent[k].Id;
                    }
                    for (var k1 = 0; k1 < $scope.bigArray[i].ListCat[j].ListContent[k].CheckPointss.length; k1++) {
                        $scope.backSaveResult = $scope.backSaveResult + 'r' + $scope.bigArray[i].ListCat[j].ListContent[k].CheckPointss[k1].IsChecked;
                        //此次如果选择不等于不合格让其意见清空
                        if ($scope.bigArray[i].ListCat[j].ListContent[k].CheckPointss[k1].IsChecked != 3)
                        {
                            $scope.bigArray[i].ListCat[j].ListContent[k].CheckPointss[k1].Note="";
                        }
                        $scope.backSaveNote = $scope.backSaveNote + 'r' + $scope.bigArray[i].ListCat[j].ListContent[k].CheckPointss[k1].Note;
                    }

                }

            }
        }

    }
    //--
    //保存
    $scope.tosaveallchangnow = function () {
        getBackResult();
        $scope.OldCheckResults.Result = $scope.backSaveResult;
        $scope.OldCheckResults.TheNotes = $scope.backSaveNote;
        $http.put(API_SERVER + "/api/V1/CheckResults", $scope.OldCheckResults).success(function (data, status, headers, config) {
            if (status == 200) {
                $scope.back();
            }
            else {
                alertService.launch("error", "", "修改失败！")
            }
        }).error(function () {
            alertService.launch("error", "", "修改失败！")
        })

    }


    //----返回-----
    $scope.back = function () {
        $location.path("DGCheckRlt").replace();

    }
    //------

//----------------------------------------------------------------------
    $http.get(API_SERVER + "/api/V1/CheckResults/" + $scope.theId).success(function (data) {

        $scope.NewCheckResults = data.data;
        getCheckFormById(data.data.Id, data.backString,data.backNoteString);


    })
    $scope.toTrueCheckForm = function () {

        if ($scope.NewCheckResults.CheckFormId == undefined || $scope.NewCheckResults.CheckFormId == "") {
            alert("请选择模板");
        }
        else {
            $scope.noSure = false;
        }
    }
    function getCheckFormById(Id,backs,note) {
        // alert($scope.NewCheckResults.CheckFormId);
        var urlCheckForms = API_SERVER + "/api/V1/CheckForms?id=" + $scope.NewCheckResults.CheckFormId;
        $http.get(urlCheckForms).success(function (data, status, headers, config) {
            $scope.bigArray = beginBigCat.deelBegin(data.data);
            getBackIsChecked(backs, note);


        });


    }

//-----------------------------------------------
    function getBackIsChecked(all,note) {
        var allTempi = 0;

        var tempLen = $scope.bigArray.length;
        for (var i = 0; i < tempLen; i++) {
            for (var j = 0; j < $scope.bigArray[i].ListCat.length; j++) {
                for (var k = 0; k < $scope.bigArray[i].ListCat[j].ListContent.length; k++) {
                    for (var k1 = 0; k1 < $scope.bigArray[i].ListCat[j].ListContent[k].CheckPointss.length; k1++) {
                        $scope.bigArray[i].ListCat[j].ListContent[k].CheckPointss[k1].IsChecked = all[allTempi];
                        $scope.bigArray[i].ListCat[j].ListContent[k].CheckPointss[k1].Note = note[allTempi++];
                    }

                }

            }
        }

    }

    //---------------------------
    $scope.back = function () {
        $location.path("DGCheckRlt").replace();

    }
    //计算分项的Index---------------------------------
    $scope.calucatlocation = function (a, b) {
        var tempLocation = 0;
        for (var i = 0; i < a; i++) {
            tempLocation = tempLocation + $scope.bigArray[i].ListCat.length;
        }
        tempLocation = tempLocation + b + 1;
        return tempLocation;
    }


    //-----------------------------------------------------------------------------------
}
])

DGCheckModule.factory("beginBigCat", ["filterFilter", function (filterFilter) {

    //处理 将得到项处理成树形结构--------------------------
    return {
        deelBegin: function (data) {

            var tempBigArray = new Array();
            var tempCatArray = new Array();
            var tempLen = data.length;
            for (var i = 0; i < tempLen; i++) {
                if (isNotEBig(tempBigArray, data[i].BigId)) {
                    var tempBigCat = { BigId: data[i].BigId, BigCatName: data[i].BigCatName, ListCat: [], nowBigIndex: 0 };
                    tempBigArray.push(tempBigCat);
                    var tempCat = { CatId: data[i].CatId, CatName: data[i].CatName, BigId: data[i].BigId, ListContent: [] };
                    tempCatArray.push(tempCat);

                }
                else {
                    if (isNotECat(tempCatArray, data[i].CatId)) {
                        var tempCat = { CatId: data[i].CatId, CatName: data[i].CatName, BigId: data[i].BigId, ListContent: [], CatIndex: 0, nowCatIndex: 0 };
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
            return tempBigArray;
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


}])

DGCheckModule.controller('DGCheckRltResultCtrl', ['$scope', '$http', '$filter', '$location', '$routeParams', 'alertService','API_SERVER',

    function ($scope, $http, $filter, $location, $routeParams, alertService, API_SERVER) {

        //-------------------------
        $scope.printme = function ()
        {
          //  document.body.innerHTML = document.getElementById('toprint').innerHTML;// + '<br/>' + document.getElementById('div2').innerHTML;
            window.print();
        }

        $scope.startPrint = function startPrint() {
            var obj =  document.getElementById('toprint');
            var oWin = window.open("", "_blank");
            var strPrint = "<h4 class='noprint' style='font-size:18px; text-align:center;'>打印预览区</h4>\n";

            strPrint = strPrint + "<script type=\"text/javascript\">\n";
            strPrint = strPrint + "function printWin()\n";
            strPrint = strPrint + "{";
            strPrint = strPrint + "var oWin=window.open(\"\",\"_blank\");\n";
            strPrint = strPrint + "oWin.document.write(document.getElementById(\"content\").innerHTML);\n";
            strPrint = strPrint + "oWin.focus();\n";
            strPrint = strPrint + "oWin.document.close();\n";
            strPrint = strPrint + "oWin.print()\n";
            strPrint = strPrint + "oWin.close()\n";
            strPrint = strPrint + "}\n";
            strPrint = strPrint + "<\/script>\n";

            strPrint = strPrint + "<style type='text/css' media='print'>.noprint{display : none }</style>";
            strPrint = strPrint + "<style type='text/css'>.tdmain{height:500px}table{border: 1px solid;}.tdnoover{border-right-width: 1px;border-right-style: solid;}.td1{height:50px;border-bottom-width: 1px;border-bottom-style: solid;}.th1{height:50px;border-bottom-width: 1px;border-bottom-style: solid;}.td3{height:50px;border-bottom-width: 1px;border-bottom-style: solid;}.td3over{border-bottom-width:0px}.td4{height:60px;}.divtd6{margin-top:2px}.printtr1{}.printtr2{}.printtr3{}.printtr4{}.printtr5{}</style>";       


            
            strPrint = strPrint + "<div id=\"content\">\n";
            strPrint = strPrint + obj.innerHTML + "\n";
            strPrint = strPrint + "</div>\n";
          
            strPrint = strPrint + "<div class='noprint' style='text-align:center'><button class='btn btn-primary' onclick='window.print()' style='padding-left:4px;padding-right:4px;'>打  印</button><button class='btn btn-primary' onclick='window.opener=null;window.close();'  style='padding-left:4px;padding-right:4px;'>关  闭</button></div>\n";
            oWin.document.write(strPrint);
            oWin.focus();
            oWin.document.close();
        }
        //--------------------------
        //--------------------
        $scope.theId = $routeParams["Id"];
        $http.get(API_SERVER + "/api/V1/CheckResults/" + $scope.theId).success(function (data) {
            //之所以这样考虑到ajax的异步 无法设置angularjs http请求的async为同步
            $scope.CheckResults = data.data;
            getCheckFormById(data.data.CheckFormId, data.backString, data.backNoteString);


        })

        function getCheckFormById(Id, backs,notes) {
            var urlCheckForms = API_SERVER + "/api/V1/CheckForms?id=" + Id;
            $http.get(urlCheckForms).success(function (data, status, headers, config) {
                $scope.checkFormdata = data.data;
                getBackIsChecked(backs, notes);

            });


        }
        //通过返回选择结果字符串数值与not记录字符串数值
        //循环选择结果数值通过结果剔除掉不合格的,在循环的同时为所有检查点赋值
        function getBackIsChecked(all,notes) {
            var allTempi = all.length - 1;

            var tempLen = $scope.checkFormdata.length - 1;
            for (var i = tempLen; i > -1 ; i--) {
                for (var j = $scope.checkFormdata[i].CheckPointss.length - 1; j > -1; j--) {
                    $scope.checkFormdata[i].CheckPointss[j].Note = notes[allTempi];

                    if (all[allTempi] == "1" || all[allTempi] == "2") {
                        $scope.checkFormdata[i].CheckPointss.splice(j, 1)
                    }
                    allTempi = allTempi - 1;
                }
                if ($scope.checkFormdata[i].CheckPointss.length == 0) {
                    $scope.checkFormdata.splice(i, 1);
                }

            }

        }
        //-----------计算-----------
        $scope.aindex = 1;
        $scope.calIndex = function (b) {
            if (b) {
                $scope.aindex = $scope.aindex + 1;
            }
            return $scope.aindex;

        }

        //-------------------------------
        $scope.back = function () {
            $location.path("DGCheckRlt").replace();

        }
        //------------------

    }
])