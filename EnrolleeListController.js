({
    doInit : function(component, event, helper) {
        console.log("Doing Init....");
        helper.getEnrollees(component);
    },
    setupSliders : function(){
        console.log("Sliders getting set....");
        $(".slider").each(function(){
            var parent = $(this).parent();
            var label = parent.find("label");
            $(this).slider({
                orientation: "horizontal",
                range: "min",
                max: 10,
                value: 0,
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
        console.log("Scripts Loaded....");
        var action = component.get("c.setupSliders");
        $A.enqueueAction(action);
        setTimeout(function(){//wait a half second bec of loading issues...
            console.log("Half a second later....");
            $A.enqueueAction(action);
        }, 500);
    },
    onClick : function(component, event, helper) { 
        var id = event.target.id;
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