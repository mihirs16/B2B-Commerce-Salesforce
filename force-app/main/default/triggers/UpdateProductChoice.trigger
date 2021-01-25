// trigger for updating picklist values for new products
trigger UpdateProductChoice on Product__c (after insert) {

    // for each trigger
    for (Product__c newProduct : Trigger.new) {
        
        System.debug(newProduct.Name + ' has been added!');
        
    }

}