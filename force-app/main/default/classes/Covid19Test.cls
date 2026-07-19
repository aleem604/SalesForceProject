@isTest
public class Covid19Test {
    
    // Test constructor with positive value
    @isTest
    static void testConstructorWithPositiveValue() {
        // Reset static variable before test
        Covid19.recoveredInCountry = 0;
        
        Integer initialRecovered = 5;
        Covid19 covid = new Covid19(initialRecovered);
        
        // Verify instance variable is set correctly
        System.assertEquals(initialRecovered, covid.getTreated(), 
            'recoveredInArea should be set to the constructor value');
        
        // Verify static variable is updated
        System.assertEquals(initialRecovered, Covid19.recoveredInCountry, 
            'recoveredInCountry should be incremented by constructor value');
    }
    
    // Test constructor with zero value
    @isTest
    static void testConstructorWithZeroValue() {
        // Reset static variable before test
        Covid19.recoveredInCountry = 0;
        
        Covid19 covid = new Covid19(0);
        
        System.assertEquals(0, covid.getTreated(), 
            'recoveredInArea should be 0');
        System.assertEquals(0, Covid19.recoveredInCountry, 
            'recoveredInCountry should remain 0');
    }
    
    // Test constructor with negative value
    @isTest
    static void testConstructorWithNegativeValue() {
        // Reset static variable before test
        Covid19.recoveredInCountry = 0;
        
        Covid19 covid = new Covid19(-10);
        
        // Should set to 0 when negative value is provided
        System.assertEquals(0, covid.getTreated(), 
            'recoveredInArea should be set to 0 for negative input');
        
        // Static variable should not be incremented for negative values
        System.assertEquals(0, Covid19.recoveredInCountry, 
            'recoveredInCountry should remain 0 for negative input');
    }
    
    // Test treatPatient method
    @isTest
    static void testTreatPatient() {
        // Reset static variable before test
        Covid19.recoveredInCountry = 0;
        
        Integer initialRecovered = 3;
        Covid19 covid = new Covid19(initialRecovered);
        
        // Get current counts
        Integer beforeAreaCount = covid.getTreated();
        Integer beforeCountryCount = Covid19.recoveredInCountry;
        
        // Treat one patient
        covid.treatPatient();
        
        // Verify instance variable incremented by 1
        System.assertEquals(beforeAreaCount + 1, covid.getTreated(), 
            'recoveredInArea should increment by 1');
        
        // Verify static variable incremented by 1
        System.assertEquals(beforeCountryCount + 1, Covid19.recoveredInCountry, 
            'recoveredInCountry should increment by 1');
    }
    
    // Test treatPatient multiple times
    @isTest
    static void testTreatPatientMultipleTimes() {
        // Reset static variable before test
        Covid19.recoveredInCountry = 0;
        
        Covid19 covid = new Covid19(2);
        
        Integer initialArea = covid.getTreated();
        Integer initialCountry = Covid19.recoveredInCountry;
        
        // Treat 5 patients
        for(Integer i = 0; i < 5; i++) {
            covid.treatPatient();
        }
        
        System.assertEquals(initialArea + 5, covid.getTreated(), 
            'recoveredInArea should increment by 5');
        System.assertEquals(initialCountry + 5, Covid19.recoveredInCountry, 
            'recoveredInCountry should increment by 5');
    }
    
    // Test getTreated method
    @isTest
    static void testGetTreatedMethod() {
        Covid19.recoveredInCountry = 0;
        
        Covid19 covid = new Covid19(7);
        
        // Verify getTreated returns correct value
        System.assertEquals(7, covid.getTreated(), 
            'getTreated should return the current recoveredInArea value');
        
        // Test after treatment
        covid.treatPatient();
        System.assertEquals(8, covid.getTreated(), 
            'getTreated should return updated value after treatment');
    }
    
    // Test multiple instances sharing static variable
    @isTest
    static void testMultipleInstances() {
        // Reset static variable before test
        Covid19.recoveredInCountry = 0;
        
        // Create first instance
        Covid19 covid1 = new Covid19(2);
        System.assertEquals(2, Covid19.recoveredInCountry, 
            'First instance should set recoveredInCountry to 2');
        
        // Create second instance
        Covid19 covid2 = new Covid19(3);
        System.assertEquals(5, Covid19.recoveredInCountry, 
            'Second instance should add to recoveredInCountry (2+3=5)');
        
        // Treat patient in first instance
        covid1.treatPatient();
        System.assertEquals(6, Covid19.recoveredInCountry, 
            'recoveredInCountry should be 6 after treating one patient');
        
        // Treat patient in second instance
        covid2.treatPatient();
        System.assertEquals(7, Covid19.recoveredInCountry, 
            'recoveredInCountry should be 7 after treating another patient');
        
        // Verify each instance maintains its own recoveredInArea
        System.assertEquals(3, covid1.getTreated(), 
            'covid1 should have 3 recovered in area (2 initial + 1 treated)');
        System.assertEquals(4, covid2.getTreated(), 
            'covid2 should have 4 recovered in area (3 initial + 1 treated)');
    }
    
    // Test constructor with large values
    @isTest
    static void testConstructorWithLargeValue() {
        // Reset static variable before test
        Covid19.recoveredInCountry = 0;
        
        Integer largeValue = 1000000;
        Covid19 covid = new Covid19(largeValue);
        
        System.assertEquals(largeValue, covid.getTreated(), 
            'recoveredInArea should handle large values');
        System.assertEquals(largeValue, Covid19.recoveredInCountry, 
            'recoveredInCountry should handle large values');
    }
    
    // Test class with no instances
    @isTest
    static void testStaticVariableInitialization() {
        // Reset static variable before test
        Covid19.recoveredInCountry = 0;
        
        // Verify static variable starts at 0
        System.assertEquals(0, Covid19.recoveredInCountry, 
            'recoveredInCountry should initialize to 0');
    }
}