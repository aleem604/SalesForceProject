public with sharing class TaskTriggerHandler {
    
    public static void handleActivitiesBeforeInsert(List<Task> newTasks) {
        for (Task task : newTasks) {
            if (task.ActivityDate < System.today()) {
                task.ActivityDate = System.today() + 12;
            }
        }

    }
}