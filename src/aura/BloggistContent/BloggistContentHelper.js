({
	resetPost: function(component) {
		const object =  {sobjectType: 'Post__c', Id: 0, Name: '', Content__c: '', Tags__c: '', WriterId__c: 0, Status__c: 0, User__c: 0};

		component.set('v.post', object);
	},
	findPost: function(component, postid) {
		const api = component.get('c.findPost');

		api.setParam('postid', postid);

		api.setCallback(this, response => {
			const state = response.getState();

			if (state === 'SUCCESS') { //  state = = = 'SUCCESS'
				const post = response.getReturnValue();

				component.set('v.post', post);
			}
 		});

		$A.enqueueAction(api);
	},
	setNavigationItem: function(component, item) {
		component.set('v.item', item);
		localStorage.setItem('v.item', item);
	}
})