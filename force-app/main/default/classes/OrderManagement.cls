// ApexRest class for managing Orders
@RestResource(urlMapping='/order/for-account')
global with sharing class OrderManagement {

    global class RecvOpportunity {
        global String StageName;
        global String AccountID;
    }

    // get opportunities for specified account
    @httpGet
    global static List<Opportunity> getOpportunities () {
        Map<String, String> paramsMap = RestContext.request.params;
        String accountID = paramsMap.get('accid');                          
        String opportunityID = paramsMap.get('oppid');

        List<Opportunity> orderToReturn = new List<Opportunity>();          
        if (accountID != null) {                                            // check for account id
            orderToReturn = opportunityID == null ?                         // check for opportunity id
            [SELECT Name FROM Opportunity WHERE accountID=:accountID]:      // return all opportunities if no id
            [SELECT Name FROM Opportunity WHERE Id=:opportunityID];         // return opportunity by id
        }

        return orderToReturn;
    }

    // post new opportunity for account
    @httpPost
    global static Opportunity addOpportunity (RecvOpportunity recvOpportunity) {

        // // get account by id
        Account forAccount = [SELECT Id, Name FROM Account WHERE Id=:recvOpportunity.AccountID];

        // make a new opportunity
        Opportunity newOpportunity = new Opportunity();
        newOpportunity.Name = forAccount.Name;
        newOpportunity.StageName = recvOpportunity.StageName;
        newOpportunity.CloseDate = System.today().addMonths(2);
        newOpportunity.AccountId = forAccount.Id;

        // add to db
        insert newOpportunity;

        return newOpportunity;
    }

}
