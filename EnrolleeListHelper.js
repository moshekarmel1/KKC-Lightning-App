({
	getEnrollees : function(component) {
		var classIdVar = component.get("v.classId");
        var action = component.get("c.getEnrollees");
        action.setParams({
            "classId" : classIdVar
        });
        action.setCallback(this, function(a){
            component.set("v.enrollees", a.getReturnValue());
        });
        $A.enqueueAction(action);
	},
    saveAttendees : function(component, obj){
        var jsonStr = JSON.stringify(obj);
        var classIdVar = component.get("v.classId");
        var sessionIdVar = component.get("v.sessionId");
        var studentArr = [];
        $.each(obj, function(i, row){
            studentArr.push(row["id"]);
        });
        var studentIDs = studentArr.join(",");
        console.log(studentIDs);
        var action = component.get("c.createAttendees");
        action.setParams({
            "studentIds" : jsonStr,
            "sessionId" : sessionIdVar,
            "classId" : classIdVar
        });
        action.setCallback(this, function(a){
            console.log(a);
            component.set("v.success", a.getReturnValue());
            var evt = $A.get("e.force:showToast");
            var mess = (a.getReturnValue() === true) ? "SUCCESS" : "FAIL";
            evt.setParams({
                "title" : "Save Results ",
                "message" : mess
            });
            evt.fire();
        });
        $A.enqueueAction(action);
    }
})