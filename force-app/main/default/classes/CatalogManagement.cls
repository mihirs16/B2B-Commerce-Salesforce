// ApexRest class for managing catalog
@RestResource(urlMapping='/catalog')
global with sharing class CatalogManagement {

    // parameters and query for searching
    global class SearchQuery {
        global String QueryString;
        global Decimal MinPrice;
        global Decimal MaxPrice;
    }

    // get all products for catalog
    @httpGet
    global static List<SObject> getProducts () {
        Map<String, String> paramsMap = RestContext.request.params;
        String productID = paramsMap.get('prod-id');

        // List<Product2> productList = new List<Product2> ();

        if (productID == null) {            

            // return all active products
            return [SELECT Id, Name, DisplayUrl, Family, Description, ProductCode
                            FROM Product2
                            WHERE IsActive = true];
        } else {

            // return specified product (if active)
            Pricebook2 stdPriceBook = [SELECT Id FROM Pricebook2 WHERE IsStandard=true];
            return [SELECT PricebookEntry.Name, UnitPrice 
                            FROM PricebookEntry
                            WHERE Product2Id = :productID
                            AND Pricebook2Id = :stdPriceBook.Id];
        }

        // return productList;    
    }

    // search catalog
    @httpPost
    global static List<PricebookEntry> SearchProducts (SearchQuery Query) {

        // sosl query
        String searchString = Query.QueryString + '*';
        List<List<SObject>> searchResults = [FIND :searchString IN ALL FIELDS 
                                                RETURNING Product2 (Id, Name)];

        // get all product IDs 
        List<String> productTotalList = new List<String> ();
        for (SObject product : searchResults[0]) {
            productTotalList.add(product.Id);
        }

        // filter search results by soql
        Pricebook2 stdPriceBook = [SELECT Id FROM Pricebook2 WHERE IsStandard=true];
        List<PricebookEntry> filterResults = [SELECT PricebookEntry.Name, UnitPrice, Product2Id FROM PricebookEntry 
                                                WHERE Product2Id IN :productTotalList
                                                AND UnitPrice >= :Query.MinPrice
                                                AND UnitPrice <= :Query.MaxPrice
                                                AND Pricebook2Id = :stdPriceBook.Id];

        return filterResults;

    }

}

/* 
{
    "Query": {
        "QueryString": "SLA"
        "MinPrice": 4000,
        "MaxPrice": 70000
    }
}
*/