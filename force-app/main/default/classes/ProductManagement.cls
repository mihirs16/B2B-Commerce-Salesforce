// ApexRest class for managing Products
@RestResource(urlMapping='/product/for-opp')
global with sharing class ProductManagement {

    // get all products for a specific opportunity
    @httpGet    
    global static List<OpportunityLineItem> getAllProductsForOpportunity () {
        Map<String, String> paramsMap = RestContext.request.params;
        String oppId = paramsMap.get('id');

        // get all opportunity line items for given id
        List<OpportunityLineItem> productsToReturn = new List<OpportunityLineItem>();
        productsToReturn = [SELECT ProductCode, ListPrice, UnitPrice, Quantity, TotalPrice 
                            FROM OpportunityLineItem 
                            WHERE OpportunityId = :oppId];

        return productsToReturn;
    }

    // add new product to existing opportunity (not closed)
    @httpPost
    global static OpportunityLineItem addNewProductToOpportunity (Map<String, Decimal> ProductRecvd) {
        Map<String, String> paramsMap = RestContext.request.params;
        String oppId = paramsMap.get('id');

        // received product to add
        Product2 productToAdd = new Product2 (
            Id = (new List<String> (ProductRecvd.keySet()))[0]
        );

        // get opportunity for given id
        Opportunity opportunityToAddTo = [SELECT Id FROM Opportunity WHERE Id = :oppId];

        // get pricebook entry for product
        Pricebook2 stdPriceBook = [SELECT Id FROM Pricebook2 WHERE IsStandard=true];
        PricebookEntry priceBookEntry = [SELECT Id, UnitPrice, Product2Id FROM PricebookEntry
                                            WHERE Product2Id = :productToAdd.Id
                                            AND Pricebook2Id = :stdPriceBook.Id];

        // new opportunity line item
        OpportunityLineItem newLineItem = new OpportunityLineItem(
            OpportunityId = oppId,
            PricebookEntryID = priceBookEntry.Id,
            UnitPrice = priceBookEntry.UnitPrice,
            Quantity = ProductRecvd.values()[0]
        );

        // save opportunity line item | add to opportunity
        insert newLineItem;

        return newLineItem;
    }
}