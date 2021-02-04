// ApexRest class for managing catalog
@RestResource(urlMapping='/catalog')
global with sharing class CatalogManagement {

    // // parameters and query for searching
    // global class SearchQuery {
    //     global String Query;
    //     global Decimal MinPrice;
    //     global Decimal MaxPrice;
    // }

    // get all products for catalog
    @httpGet
    global static List<Product2> getProducts () {
        Map<String, String> paramsMap = RestContext.request.params;
        String productID = paramsMap.get('prod-id');

        List<Product2> productList = new List<Product2> ();

        if (productID == null) {            

            // return all active products
            productList = [SELECT Id, Name, DisplayUrl, Family, Description, ProductCode
                            FROM Product2
                            WHERE IsActive = true];
        } else {

            // return specifiec product (if active)
            productList = [SELECT Id, Name, DisplayUrl, Family, Description, ProductCode
                            FROM Product2
                            WHERE IsActive = true
                            AND Id = :productID];
        }

        return productList;    
    }

    // // search catalog
    // @httpPost
    // global static List<Product2> searchProducts () {

    // }

}
