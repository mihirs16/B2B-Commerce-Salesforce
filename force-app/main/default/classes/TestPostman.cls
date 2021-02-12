@RestResource(urlMapping = '/test')
global inherited sharing class TestPostman {
    
    @httpGet
    global static String testGet() {  
        System.debug('Postman connected.');

        CollaborationGroup cg = [SELECT Id FROM CollaborationGroup WHERE Id = '0F95g000000GtcwCAC'];
        FeedItem ft = new FeedItem();
        ft.Title = 'Apex Post Title';
        ft.Body = 'Apex Post Body';
        ft.parentId = cg.Id;

        insert ft;

        return 'Postman connected.';
    }
}
