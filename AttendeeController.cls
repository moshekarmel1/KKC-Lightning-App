public class AttendeeController {
    @AuraEnabled
    public static List<Attendee__c> getEnrollees(){
        return [Select Id, Name From Attendee__c limit 20];
    }
    
    @AuraEnabled
    public static List<Enrollee__c> getEnrollees(String classId){
        return [Select Id, Name, Class__c, Student__c, Student__r.Name From Enrollee__c Where Class__c = :classId];
    }
    
    static Map<string,Object> DeserializeJSONString(string JSONString){
        Map<string,Object> objMap = (Map<string,Object>)JSON.deserializeUntyped(JSONString);
        return objMap;
    }
    
    @AuraEnabled
    public static boolean createAttendees(String studentIds, String sessionId, String classId){
        if(sessionId == 'createNew'){
            Session__c s = new Session__c(
              Class__c = (Id)classId,
                Date__c = Date.today()
            );
            insert s;
            sessionId = s.Id;
        }
        List<Attendee__c> attendees = new List<Attendee__c>();
        Map<String,Object> jsonMap = DeserializeJSONString(studentIds);
        Integer count = jsonMap.size();
        for(Integer i = 0; i < count; i++){
            Map<String,Object> details = (Map<String,Object>)jsonMap.get(String.valueOf(i));
            attendees.add(new Attendee__c(
              Student__c = (Id)details.get('id'),
                Session__c = (Id)sessionId,
                Pain_Score_Before__c = Integer.valueOf(details.get('before')),
                Pain_Score_After__c = Integer.valueOf(details.get('after'))
            ));
        }
        System.debug(attendees);
        try{
          insert attendees;
        }catch(Exception e){
            return false;
        }
        return true;
    }
}