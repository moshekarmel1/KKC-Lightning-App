({
	doInit : function(component, event, helper) {
        var classId = component.get("v.classId");
		helper.getSessions(classId, component);
	},
    onClick : function(component, event, helper) {
        var id = event.target.id;
        console.log(id);
        id = id.toString();
        var classIdVar = component.get("v.classId");
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef: "c:EnrolleeList",
            componentAttributes: {
                "classId" : classIdVar,
                "sessionId" : id
        	}
        });
        evt.fire();
	}
})