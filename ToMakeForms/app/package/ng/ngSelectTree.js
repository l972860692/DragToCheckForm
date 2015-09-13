//We nedd the json like {"Name":"cbd","Id":1,"ParentId":0}
//You can also use filters in controllers, services, and directives. For this, inject a dependency with the name <filterName>Filter to your controller/service/directive
angular.module('mySelectTree', []).factory('initTreeData', ['filterFilter', function (filterFilter) {//no $scope

    var resultTreeData = []; //retrun the tree data 
    var originalData = null; //save the data that form the outside 
    function getTreeData(data) {
        originalData = data;
        var fatherNode = filterFilter(originalData, { ParentId: 0 }, true)//find the top node
        var i = 0, lengthOfFatherNode = fatherNode.length;
        for (i; i < lengthOfFatherNode; i++) {
            resultTreeData.push(fatherNode[i]);
            fillChildrenNode(fatherNode[i], "------");
        }
        return resultTreeData;
    }
    //fill the childNode of  the pNode to resultTreeData
    function fillChildrenNode(pNode, theStr) {

        var childNode = filterFilter(originalData, { ParentId: pNode.Id }, true)//find all childNode of  the pNode note that one tier
        var lengthOfChildNode = childNode.length;
        if (lengthOfChildNode > 0) {
            var i = 0;
            for (i; i < lengthOfChildNode; i++) {
                var tempNode = childNode[i];
                tempNode.OldName = tempNode.Name;
                tempNode.Name = theStr + tempNode.Name;
                resultTreeData.push(tempNode);
                fillChildrenNode(tempNode, theStr + "------"); //find 

            }

        }

    }
    return getTreeData;

} ])