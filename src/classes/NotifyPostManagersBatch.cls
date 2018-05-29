global class NotifyPostManagersBatch implements Database.Batchable<sObject> {
	
	global Database.QueryLocator start(Database.BatchableContext BC) {
		return Database.getQueryLocator([SELECT Id, Name, Status__c, CreatedBy.Manager.Id, CreatedBy.Manager.Name, CreatedBy.Manager.Email FROM Post__c WHERE Status__c = 'Under Review']);
	}

   	global void execute(Database.BatchableContext BC, List<Post__c> scope) {
		   // key is the manager Id
		   Map<Id, List<Post__c>> postsToApprove = new Map<Id, List<Post__c>>();

		   for (Post__c post : scope) {
			   List<Post__c> toApprove = postsToApprove.get(post.CreatedBy.Manager.Id);

			   if (toApprove == null) {
				   toApprove = new List<Post__c>();
			   }
				toApprove.add(post);
				postsToApprove.put(post.CreatedBy.Manager.Id, toApprove);
		   }

		   for (List<Post__c> postGroups : postsToApprove.values()) {

		   }
	}
	
	global void finish(Database.BatchableContext BC) {
		DateTime dt = System.now();

		NotifyPostManagers sche = new NotifyPostManagers();

		System.schedule('Post Managers ' + dt, '0 0 0 * * ?', sche);
	}
	
}