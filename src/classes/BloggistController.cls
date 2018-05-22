public with sharing	 class BloggistController {

	@AuraEnabled
	public static Post__c findPost(Id postid) {
		return [SELECT Id, Name, Content__c, WriterId__c, User__c, Tags__c FROM Post__c WHERE Id = :postid];
	}
	
	@AuraEnabled
	public static List<Map<String, String>> getPostStates() {

		List<Map<String, String>> states = new List<Map<String, String>>();

		Schema.DescribeFieldResult description = Post__c.Status__c.getDescribe();

		List<Schema.PicklistEntry> entries = description.getPicklistValues();

		for (Schema.PicklistEntry entry : entries) {
			Map<String, String> item = new Map<String, String>();

			item.put('label', entry.getLabel());
			item.put('value', entry.getValue());

			states.add(item);
		}


		return states;
	}

	@AuraEnabled
	public static Contact[] getContacts() {
		return [SELECT Id, Name FROM Contact];
	}

	@AuraEnabled
	public static Post__c savePost(Post__c post) {
		if (post.User__c == null) {
			post.User__c = UserInfo.getUserId();
		}

		upsert post;

		return post;
	}

	@AuraEnabled
	public static Post__c[] getAllPosts() {
		return [SELECT Id, Name, Status__c, WriterId__c, Tags__c, WriterId__r.Name, User__r.Name FROM Post__c];
	}

}