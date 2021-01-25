// class to manage picklist values
public with sharing class ManagePicklist {

    // attributes for managing picklists
    private String ObjectName;
    private String PicklistName;
    private String PicklistLabel;

    // initialize object and field values
    public ManagePicklist(String _ObjectName, String _PicklistName, String _PicklistLabel) {
        ObjectName = _ObjectName;
        PicklistName = _PicklistName;
        PicklistLabel = _PicklistLabel;
    }

    // method to create a metadata service
    public MetadataService.MetadataPort createService() {
        MetadataService.MetadataPort service = new MetadataService.MetadataPort();
		service.SessionHeader = new MetadataService.SessionHeader_element();
		service.SessionHeader.sessionId = UserInfo.getSessionId();
		return service;	        
    }

    // add value to picklist
    // public addToPicklist(String valueToAdd) {
    //     MetadataService.MetadataPort = createService();
    //     MetadataService.CustomField customField = new MetadataService.CustomField();
    //     customField.fullName = ObjectName + '.' + PicklistName;
    //     customField.label = PicklistLabel;
    // }

}
