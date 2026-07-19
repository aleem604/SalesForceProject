public class ContactSearchController {
    public String searchKey { get; set; }
    public List<Contact> contacts { get; set; }
    
    public ContactSearchController() {
        searchKey = '';
        contacts = new List<Contact>();
    }
    
    public void searchContacts() {
        String key = '%' + searchKey + '%';
        System.debug('Search Key: ' + key);
        contacts = [SELECT Id, FirstName, LastName, Email, Phone 
                    FROM Contact 
                    WHERE FirstName LIKE :key 
                    OR LastName LIKE :key 
                    OR Email LIKE :key];
        System.debug('Contacts Found: ' + contacts);
    }
}