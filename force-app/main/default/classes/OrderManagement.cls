// ApexRest class for managing Orders
@RestResource(urlMapping='/v1/order')
global with sharing class OrderManagement {

    // get specifiec or all order(s)
    @httpGet
    global static Opportunity getOrders () {
        Map<String, String> paramsMap = RestContext.request.params;
        String orderID = paramsMap.get('id');

        Opportunity orderToReturn = new Opportunity();
        orderToReturn = [SELECT Name FROM Opportunity WHERE Id=:orderID];

        return orderToReturn;
    }

}
