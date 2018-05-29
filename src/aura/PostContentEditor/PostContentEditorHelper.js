({
	loadPost : function(component) {
		const api = component.get('c.findPost');

		api.setParam('postid', component.get('v.recordId'));

		api.setCallback(this, response => {
			const state = response.getState();

			if (state === 'SUCCESS') {
				const post = response.getReturnValue();

				component.set('v.content', post.Content__c);
			}
		});

		$A.enqueueAction(api);
	},

	updatePost: function(component, content, updatecurrent) {
		const api = component.get('c.updatePost');

		api.setParam('post', {sobjectType: 'Post__c', Id: component.get('v.recordId'), Content__c: content});

		api.setCallback(this, response => {
			const state = response.getState();
			
			if (state === 'SUCCESS' && updatecurrent !== false) {
				const post = response.getReturnValue();

				component.set('v.content', post.Content__c);
			}
		});

		$A.enqueueAction(api);
	}
})