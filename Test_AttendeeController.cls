@isTest
public class Test_AttendeeController{
    public static Class__c classVar;
    public static Student__c student;
    public static Enrollee__c enrollee;
    public static Session__c session;

    public static void setup(){
        classVar = TestUtils.createClass();
        student = TestUtils.createStudent();
        enrollee = TestUtils.createEnrollee(classVar, student);
        session = TestUtils.createSession(classVar);
    }

    static testMethod void testGetEnrollees(){
        setup();
        String classId = String.valueOf(classVar.Id);
        List<Enrollee__c> enrollees = AttendeeController.getEnrollees(classId);
        System.assert(enrollees.size() > 0);
    }    

    static testMethod void testCreateAttendees(){
        setup();
        List<Enrollee__c> enrollees = AttendeeController.getEnrollees(String.valueOf(classVar.Id));
        String JSONStr = '{"0":{"id":"' + enrollees[0].Student__c + '","before":"5","after":"2"}}';
        String dateStr = String.valueOf(Date.today());
        String sessionId = AttendeeController.createAttendees(JSONStr, String.valueOf(session.Id), String.valueOf(classVar.Id), dateStr);
        List<Attendee__c> attendees = [Select Id, Name, Session__c, Pain_Score_Before__c, Pain_Score_After__c From Attendee__c];
        System.debug(attendees);
        System.assert(attendees.size() > 0);
        System.assertEquals(attendees[0].Pain_Score_Before__c, 5);
        System.assertEquals(attendees[0].Pain_Score_After__c, 2);
    }

    static testMethod void testCreateAttendeesNewSession(){
        setup();
        List<Enrollee__c> enrollees = AttendeeController.getEnrollees(String.valueOf(classVar.Id));
        String JSONStr = '{"0":{"id":"' + enrollees[0].Student__c + '","before":"5","after":"2"}}';
        String dateStr = '08/09/2015';
        String sessionId = AttendeeController.createAttendees(JSONStr, 'createNew', String.valueOf(classVar.Id), dateStr);
        List<Attendee__c> attendees = [Select Id, Name, Session__c, Pain_Score_Before__c, Pain_Score_After__c From Attendee__c];
        System.debug(attendees);
        System.assert(attendees.size() > 0);
        System.assertEquals(attendees[0].Pain_Score_Before__c, 5);
        System.assertEquals(attendees[0].Pain_Score_After__c, 2);
    }
}