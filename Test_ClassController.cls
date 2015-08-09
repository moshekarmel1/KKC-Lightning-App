@isTest
public class Test_ClassController{
    public static Class__c classVar = TestUtils.createClass();
    
    static testMethod void testGetClasses(){
        List<Class__c> classes = ClassController.getClasses();
        System.assert(classes.size() > 0);
    }
    
    static testMethod void testGetClassById(){
        Class__c classQry = ClassController.getClassById(String.valueOf(classVar.Id));
        System.assertEquals(classQry.Id, classVar.Id);
    }
}