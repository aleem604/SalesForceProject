public with sharing class ApexUseCaseThree {

    public static void sendAlertToCustomer(String emailAddress) {
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        String[] toAddresses = new String[] {emailAddress};
        mail.setToAddresses(toAddresses);
        mail.setSubject('Urgent: Take a look at your account');
        mail.setPlainTextBody('This is an important notification regarding your account. Please take necessary action.');
        
        try {
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
            System.debug('Email sent successfully to: ' + emailAddress);
        } catch (Exception e) {
            System.debug('Failed to send email: ' + e.getMessage());
        }
    }

}