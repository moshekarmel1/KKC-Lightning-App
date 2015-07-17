({
    doInit : function(component, event, helper) {
    	helper.getEnrollees(component);
    },
    setupSliders : function(){
        $(".slider").each(function(){
            var parent = $(this).parent();
            var label = parent.find("label");
            $(this).slider({
                orientation: "horizontal",
                range: "min",
                max: 10,
                value: 5,
                slide : function(event, ui){
                    if(label){
                        var prefix = label[0].className;
                        label.text(prefix + " : " + ui.value);
                    }
                }
            });
        });
    },
    doScriptLoad : function(component, event, helper) {
        var action = component.get("c.setupSliders");
        $A.enqueueAction(action);
    },
	onClick : function(component, event, helper) { 
        var id = event.target.id;
        console.log(id);
        $('#' + id).toggleClass('btn-success');
        $('#div' + id).toggleClass('hidden');
	},
    saveStuff : function(component, event, helper) {
        var obj = {};
        var iterator = 0;
        $('.btn-success').each(function(i, btn){
            var id = $(this).attr('id');
            var div = $('#div' + id);
            var labelText = div.find('label').text();
            var index = labelText.match(/\d+/).index;
            var beforeNum = labelText.match(/\d+/)[0];
            labelText = labelText.substring(index + beforeNum.length);
            var afterNum = labelText.match(/\d+/)[0];
            obj[iterator] = {
                "id" : id,
                "before" : beforeNum,
                "after" : afterNum
            }
            iterator++;
        });
        helper.saveAttendees(component, obj);
	},
})