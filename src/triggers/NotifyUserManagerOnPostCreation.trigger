
trigger NotifyUserManagerOnPostCreation on Post__c (before update, before insert) {

    User[] users = [SELECT Id, Name, ManagerId FROM User WHERE Id=:UserInfo.getUserId() LIMIT 1];

    User logged = users[0];

    for (Post__c post : Trigger.new) {
        if (post.Status__c == 'Published' || post.Status__c == 'Ready') {
            
        }
    }

}