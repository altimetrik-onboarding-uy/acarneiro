({
	onTagsUpdated : function(component, event, helper) {

		const post = JSON.parse(JSON.stringify(component.get('v.post')));

		const tags = event.getParam('tags');

		post.Tags__c = tags.join(',');

		component.set('v.post', post);
	}
})