({
	getSessions : function(id, component) {
		var action = component.get("c.getSessionsById");
        action.setParams({
            "Id" : id
        });
        action.setCallback(this, function(a){
            component.set("v.sessions", a.getReturnValue());
        });
        $A.enqueueAction(action);
	}
})