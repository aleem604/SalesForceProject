public with sharing class ExploreCustomSetting {
    
    public static Decimal retrievePricing(){
        InventoryPricing__c inventoryDefaultPricing = InventoryPricing__c.getOrgDefaults();
        System.debug('Inventory Pricing: ' + inventoryDefaultPricing);

        InventoryPricing__c pricingIncance = InventoryPricing__c.getInstance(UserInfo.getUserId());
        System.debug('Inventory Pricing: ' + pricingIncance);

        InventoryPricing__c pricingUser = InventoryPricing__c.getValues(UserInfo.getUserId());
        System.debug('Inventory Pricing: ' + pricingUser);

        return pricingUser.Pricing__c; // Assuming there's a Pricing__c field
    } 
}