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
        var date = component.get("v.displayDate");
        console.log(date);
        var d = new Date(date);
        console.log(d);
        date = ((d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear());
        var action = component.get("c.createAttendees");
        action.setParams({
            "studentIds" : jsonStr,
            "sessionId" : sessionIdVar,
            "classId" : classIdVar,
            "dateStr" : date
        });
        action.setCallback(this, function(a){
            console.log(a);
            component.set("v.sessionId", a.getReturnValue());
            var evt = $A.get("e.force:showToast");
            var mess = a.getState();
            evt.setParams({
                "title" : "Save Results ",
                "message" : mess
            });
            evt.fire();
            if(a.getState() === "SUCCESS"){
                //navigate to the session record for edits
                var event = $A.get("e.force:navigateToSObject");
                event.setParams({
                    "recordId" : a.getReturnValue()
                });
                event.fire();
            }
        });
        $A.enqueueAction(action);
    }
})