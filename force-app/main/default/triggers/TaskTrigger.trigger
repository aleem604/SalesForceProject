trigger TaskTrigger on Task (after update, before insert) {
    
    if(Trigger.isBefore && Trigger.isInsert) {
        TaskTriggerHandler.handleActivitiesBeforeInsert(Trigger.New);
    }
    
    
    if(Trigger.isAfter && Trigger.isUpdate) {
        AsyncFutureUseCase.handleTaskCheckboxUpdate(Trigger.New);
    }
    
}