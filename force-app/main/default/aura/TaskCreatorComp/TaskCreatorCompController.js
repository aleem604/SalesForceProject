({
    createTask: function(component, event, helper) {
        // Validate required fields
        var subject = component.get("v.taskSubject");
        var dueDate = component.get("v.taskDueDate");
        var description = component.get("v.taskDescription");
        var priority = component.get("v.taskPriority");
        var status = component.get("v.taskStatus");
        
        if (!$A.util.isEmpty(subject) && 
            !$A.util.isEmpty(dueDate) && 
            // !$A.util.isEmpty(description) &&
            !$A.util.isEmpty(priority) &&
            !$A.util.isEmpty(status)) {
            
            // Set loading state
            component.set("v.isLoading", true);
            
            // Call Apex method
            var action = component.get("c.createTaskRecord");
            action.setParams({
                "taskSubject": subject,
                "taskDescription": description,
                "taskDueDate": dueDate,
                "taskPriority": priority,
                "taskStatus": status
            });
            
            action.setCallback(this, function(response) {
                var state = response.getState();
                component.set("v.isLoading", false);
                
                if (state === "SUCCESS") {
                    // Show success message
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "Task created successfully.",
                        "type": "success"
                    });
                    toastEvent.fire();
                    
                    // Reset form
                    component.set("v.taskSubject", "");
                    component.set("v.taskDueDate", "");
                    component.set("v.taskDescription", "");
                    component.set("v.taskPriority", "");
                    component.set("v.taskStatus", "");
                    
                } else {
                    // Show error message
                    var errors = response.getError();
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Error",
                        "message": errors && errors[0] ? errors[0].message : "Failed to create task.",
                        "type": "error"
                    });
                    toastEvent.fire();
                }
            });
            
            $A.enqueueAction(action);
            
        } else {
            // Show validation error
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Validation Error",
                "message": "Please fill in all required fields.",
                "type": "error"
            });
            toastEvent.fire();
        }
    },
    
    resetForm: function(component, event, helper) {
        component.set("v.taskSubject", "");
        component.set("v.taskDueDate", "");
        component.set("v.taskDescription", "");
        component.set("v.taskPriority", "");
        component.set("v.taskStatus", "");
        component.set("v.isLoading", false);
        
        // Show reset confirmation
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Reset",
            "message": "Form has been reset.",
            "type": "info"
        });
        toastEvent.fire();
    }
})