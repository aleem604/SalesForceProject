public with sharing class ApexUseCase4 {
    public static List<String> getContactEmails(String accountName) {
        List<Account> accounts = [SELECT AccountNumber FROM Account WHERE Name = :accountName LIMIT 1];
        if(accounts.isEmpty()) {
            System.debug('No account found with name: ' + accountName);
            return new List<String>();
        }

        Account account = accounts[0];
        List<Contact> contacts = [SELECT Email FROM Contact WHERE Account.AccountNumber = :account.AccountNumber];
        List<String> emailList = new List<String>();

        for(Contact con : contacts) {
            if(con.Email != null) {
                emailList.add(con.Email);
            }
        }

        return emailList;
    }
}