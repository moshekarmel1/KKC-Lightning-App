({
    doInit : function(component, event, helper) {
        var classId = component.get("v.classId");
        helper.getSessions(classId, component);
    },
    onClick : function(component, event, helper) {
        var id = event.target.id;
        id = id.toString();
        console.log(event);
        var date = event.target.innerHTML;
        var classIdVar = component.get("v.classId");
        var dateStrVar = component.find("date").get("v.value");
        date = helper.getCorrectDate(id, dateStrVar, date); 
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef: "c:EnrolleeList",
            componentAttributes: {
                "classId" : classIdVar,
                "sessionId" : id,
                "displayDate" : date
            }
        });
        evt.fire();
    }
})