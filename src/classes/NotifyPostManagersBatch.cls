global class NotifyPostManagersBatch implements Database.Batchable<sObject> {
	
	global Database.QueryLocator start(Database.BatchableContext BC) {
		return Database.getQueryLocator([SELECT Id, Name, Status__c, CreatedBy.Manager.Id, CreatedBy.Manager.Name, CreatedBy.Manager.Email FROM Post__c WHERE Status__c = 'Under Review']);
	}

   	global void execute(Database.BatchableContext BC, List<Post__c> scope) {
		// key is the manager Id, this is used to group posts by their correspondent approver
		Map<Id, List<Post__c>> postsToApprove = new Map<Id, List<Post__c>>();
		// iterate over each post
		for (Post__c post : scope) {
			// list of posts to be approved by this manager
			List<Post__c> toApprove = postsToApprove.get(post.CreatedBy.Manager.Id);
			//if there's no post list create one
			if (toApprove == null) {
				toApprove = new List<Post__c>();
			}
			// and add the current post to the list
			toApprove.add(post);
			// override the list of posts to approve by the manager
			postsToApprove.put(post.CreatedBy.Manager.Id, toApprove);
		}

		// iterate over all lists of posts (again, they are grouped by the same approver)
		for (List<Post__c> postGroups : postsToApprove.values()) {
			String managerName = postGroups[0].CreatedBy.Manager.Name;
			String managerEmail = postGroups[0].CreatedBy.Manager.Email;

			// <Create the mail body containing the names of the post to aprove>
			String body = 'Hello, ' + managerName + '.\n';
			body = body + 'This is a reminder you have the following posts to approve: ';

			List<String> postTitles = new List<String>();
			
			for (Post__c pos : postGroups) {
				postTitles.add('"'+pos.Name+'"');
			}
			body = body + String.join(postTitles, ', ')+'.\n';
			// </Create the mail body containing the names of the post to aprove>

			Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
			// Set recipients to two contact IDs.
			// Replace IDs with valid record IDs in your org.
			message.toAddresses = new String[] { managerEmail };
			message.subject = 'You have ('+postGroups.size()+') posts to approve';
			message.plainTextBody = body;
			Messaging.SingleEmailMessage[] messages = new List<Messaging.SingleEmailMessage> {message};
			Messaging.sendEmail(messages);
		}
	}
	
	global void finish(Database.BatchableContext BC) {
		DateTime dt = System.now();

		NotifyPostManagers sche = new NotifyPostManagers();

		System.schedule('Post Managers ' + dt, '0 0 0 * * ?', sche);
	}
	
}