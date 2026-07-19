public with sharing class ExploreCustomMetadata {
    public static Decimal getPricingParity(String regionName) {
        Decimal parityIndex = 0.0;
        
        // Fixed: Using Regions__c instead of Region__c
        List<Inventory_Pricing__mdt> parityRecords = [SELECT Id, DeveloperName, MasterLabel, 
                                                       Language, Label, Regions__c, Pricing_Parity__c 
                                                       FROM Inventory_Pricing__mdt 
                                                       WHERE Regions__c = :regionName];
        
        System.debug('Retrieved Pricing Parity Records: ' + parityRecords);
        
        if (!parityRecords.isEmpty()) {
            parityIndex = parityRecords[0].Pricing_Parity__c;
        }
        
        return parityIndex;
    }
}