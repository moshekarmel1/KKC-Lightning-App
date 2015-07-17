({
	getClasses : function(component) {
		var action = component.get("c.getClasses");
        action.setCallback(this, function(a){
            component.set("v.classes", a.getReturnValue());
        });
        $A.enqueueAction(action);
	}
})