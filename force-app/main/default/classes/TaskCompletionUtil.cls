public with sharing class TaskCompletionUtil {

    private static final String SUCCESS = 'Success';
    private static final String FAILURE = 'Failure';
    private static final String COMPLETED = 'Completed';

    @InvocableMethod(
        label='Close Tasks per Account'
        description='Closes all open tasks related to the supplied accounts.'
    )
    public static List<String> closeTasksForAccount(List<Id> accountIds) {
        System.debug(
            LoggingLevel.INFO,
            'TaskCompletionUtil.closeTasksForAccount: accountIds=' + accountIds
        );
        if (accountIds == null || accountIds.isEmpty()) {
            return new List<String>();
        }

        try {
            List<Task> tasks = [
                SELECT Id
                FROM Task
                WHERE WhatId IN :accountIds
                AND IsClosed = false
            ];

            for (Task taskRecord : tasks) {
                taskRecord.Status = COMPLETED;
            }

            if (!tasks.isEmpty()) {
                update tasks;
            }

            return createResults(accountIds.size(), SUCCESS);
        } catch (Exception ex) {
            System.debug(
                LoggingLevel.ERROR,
                ex.getMessage() + '\n' + ex.getStackTraceString()
            );

            return createResults(accountIds.size(), FAILURE);
        }
    }

    private static List<String> createResults(
        Integer resultCount,
        String status
    ) {
        List<String> results = new List<String>();

        for (Integer index = 0; index < resultCount; index++) {
            results.add(status);
        }

        return results;
    }
}