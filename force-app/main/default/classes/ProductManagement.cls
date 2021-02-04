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

}