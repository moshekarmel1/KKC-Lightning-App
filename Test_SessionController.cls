@isTest
public class Test_SessionController{
    public static Class__c classVar = TestUtils.createClass();
    public static Session__c session = TestUtils.createSession(classVar);
    
    static testMethod void testGetSessions(){
        List<Session__c> sessions = SessionController.getSessions();
        System.assert(sessions.size() > 0);
    }
    
    static testMethod void testGetSessionsById(){
        List<Session__c> sessions = SessionController.getSessionsById(String.valueOf(classVar.Id));
        System.assert(sessions.size() > 0);
        System.assertEquals(sessions[0].Class__c, classVar.Id);
    }
}