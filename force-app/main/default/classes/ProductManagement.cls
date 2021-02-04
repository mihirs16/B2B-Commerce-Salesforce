// ApexRest class for managing Products
@RestResource(urlMapping='/v1/product/')
global with sharing class ProductManagement {

    // // user-defined class for new Product
    // global class ThisProduct {

    //     // fields to set for Product
    //     public String Name;
    //     public Double Unit_Price;
    //     public Integer Total_Stock;

    //     // get product 
    //     public Product__c getProduct () {
    //         return new Product__c (
    //             Name = this.Name,
    //             Unit_Price__c = this.Unit_Price,
    //             Total_Stock__c = this.Total_Stock
    //         );
    //     }

    // }

    // get all or specified product(s)
    @httpGet    
    global static List<Product__c> getAllProducts () {
        Map<String, String> paramsMap = RestContext.request.params;
        String productID = paramsMap.get('id');

        List<Product__c> productsToReturn = new List<Product__c>();
        productsToReturn = productID == 'None' ? [SELECT Name from Product__c] : [SELECT Name from Product__c WHERE Id=:productID];

        return productsToReturn;
    }

    // // add new product(s)
    // @httpPost
    // global static List<Product__c> addNewProducts (List<ThisProduct> productList) {
    //     List<Product__c> newProducts = new List<Product__c>();

    //     for (ThisProduct product : productList) {
    //         newProducts.add(product.getProduct());
    //     }

    //     try {
    //         insert newProducts;
    //     } catch (DmlException exc) {
    //         System.debug(exc);   
    //     }
        
    //     return newProducts;        
    // }

}