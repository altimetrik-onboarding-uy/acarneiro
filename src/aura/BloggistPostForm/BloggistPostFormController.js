({
	initialize: function(component, event, helper) {
		helper.loadStatuses(component);
		helper.loadContacts(component);
	},
	onTagsUpdated : function(component, event, helper) {

		const post = JSON.parse(JSON.stringify(component.get('v.post')));

		const tags = event.getParam('tags');

		post.Tags__c = tags.join(',');

		component.set('v.post', post);
	},

	onSaveClicked: function(component, event, helper) {
		const valid = component.find('postform').reduce((validSoFar, input) => {

			input.showHelpMessageIfInvalid();

			return validSoFar && input.get('v.validity').valid;
		}, true);

		if ( ! valid) return;

		helper.savePost(component);
	}
})