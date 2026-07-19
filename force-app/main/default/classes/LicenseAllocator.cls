public with sharing class LicenseAllocator {
    
    @AuraEnabled(cacheable=true)
    public static List<Profile> getProfileInfo() {
        try {
            // List<Profile> profiles = [SELECT Id, Name, UserLicense.Name FROM Profile WHERE UserLicense.Name = 'Salesforce'];
            List<Profile> profiles = [SELECT Id, Name, UserLicense.Name FROM Profile];
            System.debug('Profiles: ' + profiles);
            return profiles;
        } catch (Exception ex) {
            System.debug('Error occurred: ' + ex.getMessage());
            throw new AuraHandledException('An error occurred while retrieving profile information: ' + ex.getMessage());
        }
        
    }
    
}