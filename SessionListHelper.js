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
    },
    getCorrectDate : function(id, dateStr, date){
        if(id == "createNew"){
            if(!dateStr){
                date = new Date();
                //format like 2015-05-08
                return date.getFullYear() + "-" + ("0" + date.getDate()).slice(-2) + "-" + ("0" + (date.getMonth() + 1)).slice(-2);
            }else{
                return dateStr;
            }
        }else{
            if(date.indexOf("</") != -1){
                //if the target was the div, sort through the HTML and find the date
                var start = date.indexOf("</") - 10;
                date = date.substring(start, date.indexOf("</"));
                return date;
            }else{
                return date;
            }
        }
    }
})