import { api, LightningElement } from 'lwc';

export default class DataBindingComp extends LightningElement {
    @api tasks = [
        {taskId: 1, taskName: 'Complete project documentation', taskPriority: 'High', taskStatus: 'In Progress'},
        {taskId: 2, taskName: 'Review code for module A', taskPriority: 'Medium', taskStatus: 'Pending'},
        {taskId: 3, taskName: 'Prepare presentation slides', taskPriority: 'Low', taskStatus: 'Completed'},
        {taskId: 4, taskName: 'Fix bug in module B', taskPriority: 'High', taskStatus: 'In Progress'},
        {taskId: 5, taskName: 'Update user guide', taskPriority: 'Medium', taskStatus: 'Pending'},
        {taskId: 6, taskName: 'Conduct team meeting', taskPriority: 'Low', taskStatus: 'Completed'},
        {taskId: 7, taskName: 'Implement feature X', taskPriority: 'High', taskStatus: 'In Progress'},
        {taskId: 8, taskName: 'Test module C', taskPriority: 'Medium', taskStatus: 'Pending'},
        {taskId: 9, taskName: 'Deploy application to production', taskPriority: 'High', taskStatus: 'Completed'},
        {taskId: 10, taskName: 'Conduct code review for module D', taskPriority: 'Medium', taskStatus: 'In Progress'}
    ];
}