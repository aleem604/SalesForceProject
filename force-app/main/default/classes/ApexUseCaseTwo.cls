public with sharing class ApexUseCaseTwo {
    
    public static Decimal calculateInterest(Decimal principal, Decimal interest, Integer timeInYears) {
        if(principal != null) {
            Decimal interestAmount = (principal * interest * timeInYears) / 100;
            System.debug('Calculated Interest: ' + interestAmount);
            return interestAmount;
        }else{
            return 0;
        }
    }
}