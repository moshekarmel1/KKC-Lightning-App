({
	doInit : function(component, event, helper) {
		helper.getClasses(component);
	},
    onClick : function(component, event, helper) {
        var id = event.target.id;
        component.set("v.selectedClassId", id);
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef: "c:SessionList",
            componentAttributes: {
            	"classId" : id
        	}
        });
        evt.fire();
	},
})