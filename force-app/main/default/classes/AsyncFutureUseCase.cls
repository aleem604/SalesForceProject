public with sharing class AsyncFutureUseCase {


    public static void handleTaskCheckboxUpdate(List<Task> newTasks) {
        for (Task task : newTasks) {
            if (task.Subject == null || task.Subject.trim() == '') {
                task.Subject = 'Default Subject';
            }
        }

    }
}