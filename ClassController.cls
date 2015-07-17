public class ClassController {
  @AuraEnabled
    public static List<Class__c> getClasses(){
        return [Select Id, Name, City__c, Class_Time__c, Day_Held_On__c, End_Date__c, Instructor__c, Location__c, Start_Date__c, 
            State__c, Street__c, Type__c, Zip_Code__c From Class__c];
    }
    @AuraEnabled
    public static Class__c getClassById(String Id){
        return [Select Id, Name, City__c, Class_Time__c, Day_Held_On__c, End_Date__c, Instructor__c, Location__c, Start_Date__c, 
            State__c, Street__c, Type__c, Zip_Code__c From Class__c Where Id = :Id LIMIT 1];
    }
}