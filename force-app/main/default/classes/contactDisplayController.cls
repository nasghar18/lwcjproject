public class contactDisplayController {
    
    @AuraEnabled(cacheable=true)
    public static Contact pullContact(id contactId){
        try {
            return [SELECT FirstName, LastName, Phone, Department, Title, Birthdate, Email
                    FROM Contact WHERE Id =: contactId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
