public with sharing class TaskCreatorController {
    
    @AuraEnabled
    public static String createTaskRecord(String taskSubject, String taskDescription, Date taskDueDate, String taskPriority, String taskStatus) {
        try {
            Task taskRec = new Task();
            taskRec.Subject = taskSubject;
            taskRec.Status = taskStatus;
            taskRec.Priority = taskPriority;
            taskRec.ActivityDate = taskDueDate;
            taskRec.Description = taskDescription;
            
            insert taskRec;
            return 'Success';
            
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}