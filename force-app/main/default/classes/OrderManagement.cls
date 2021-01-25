// ApexRest class for managing Orders
@RestResource(urlMapping='/v1/order')
global with sharing class OrderManagement {

    // global class ThisOrder {

    //     public List<Product__c> Products;

    // }

    // get order by id
    @httpGet
    global static Order__c getOrders () {
        Map<String, String> paramsMap = RestContext.request.params;
        String orderID = paramsMap.get('id');

        Order__c orderToReturn = new Order__c();
        orderToReturn = [SELECT Name FROM Order__c WHERE Id=:orderID];

        return orderToReturn;
    }

    // // post new order
    // @httpPost
    // global static Order newOrder () {

    // }


}
