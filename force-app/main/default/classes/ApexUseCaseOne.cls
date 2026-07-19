public with sharing class ApexUseCaseOne {
    public static void executeUseCaseOne(String firstName, String lastName, String email) {
        List<Contact> conToInsert = new List<Contact>();

        Contact newContact = new Contact(
            FirstName = firstName,
            LastName = lastName,
            Email = email
        );
        conToInsert.add(newContact);
        System.debug('Contact to insert: ' + newContact);

        if(conToInsert.size() > 0){
            insert conToInsert;
        }
    }
}