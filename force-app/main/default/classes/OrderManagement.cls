// ApexRest class for managing Orders
@RestResource(urlMapping='/order/for-account')
global with sharing class OrderManagement {

    // dummy class for POSTing opportunity
    global class RecvOpportunity {

        global String StageName;                    // name of opportunity's stage
        global String AccountID;                    // id of parent account
        global Map<String, Decimal> ProductList;    // key = Product ID | value = Quantity

    }

    // get opportunities for specified account
    @httpGet
    global static List<Opportunity> getOpportunities () {
        Map<String, String> paramsMap = RestContext.request.params;
        String accountID = paramsMap.get('accid');                          
        String opportunityID = paramsMap.get('oppid');
        String notClosed = paramsMap.get('not-closed');

        List<Opportunity> orderToReturn = new List<Opportunity>();          
        
        // check for account id
        if (accountID != null) {

            // check for opportunity id
            if (opportunityID == null) {
            
                // check if opportunity should be empty
                if (notClosed == 'true') {
                    orderToReturn = [SELECT Name, CloseDate, StageName, Amount 
                                        FROM Opportunity 
                                        WHERE accountID = :accountID
                                        AND StageName != 'Closed Won'
                                        AND StageName != 'Closed Lost'];
                } else {
                    orderToReturn = [SELECT Name, CloseDate, StageName, Amount 
                                        FROM Opportunity 
                                        WHERE accountID = :accountID];
                }
                
            } else {
                orderToReturn = [SELECT Name, CloseDate, StageName, Amount 
                                    FROM Opportunity 
                                    WHERE Id = :opportunityID];
            }
        }

        return orderToReturn;
    }

    // post new opportunity for account
    @httpPost
    global static Opportunity addOpportunity (RecvOpportunity recvOpportunity) {

        // account to add opportunity for
        Account forAccount = [SELECT Id, Name FROM Account WHERE Id=:recvOpportunity.AccountID];

        // new opportunity
        Opportunity newOpportunity = new Opportunity(
            Name = forAccount.Name,
            StageName = recvOpportunity.StageName,
            CloseDate = System.today().addMonths(2),
            AccountId = forAccount.Id
        );

        // save new opportunity
        insert newOpportunity;

        // get pricebook entries for products to add
        Pricebook2 stdPriceBook = [SELECT Id FROM Pricebook2 WHERE IsStandard=true];        // get standard price book id
        List<PricebookEntry> forPriceBookEntries = new List<PricebookEntry> ();
        forPriceBookEntries = [SELECT Id, UnitPrice, Product2Id FROM PriceBookEntry         // get unit price & product id
                                WHERE Product2Id IN :recvOpportunity.ProductList.keySet()   // for all products received
                                AND Pricebook2Id = :stdPriceBook.Id];                       // for standard price book

        // new opportunity line items for products
        for (PricebookEntry thisPricebookEntry : forPriceBookEntries) {
            OpportunityLineItem thisOppLineItem = new OpportunityLineItem (
                OpportunityId = newOpportunity.Id,
                PricebookEntryID = thisPricebookEntry.Id,
                UnitPrice = thisPricebookEntry.UnitPrice,
                Quantity = recvOpportunity.ProductList.get(String.valueOf(thisPricebookEntry.Product2Id))
            );

            // save each opportunity line items
            insert thisOppLineItem; 
        }

        return newOpportunity;
    }

}