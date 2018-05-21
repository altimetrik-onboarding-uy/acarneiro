({
	loadStatuses: function(component) {
		const api = component.get('c.getPostStates');

		api.setCallback(this, response => {
			const state = response.getState();

			if (state === 'SUCCESS') {
				const options = response.getReturnValue();
				component.set('v.options', options);
			}
		});

		$A.enqueueAction(api);
	},
	loadContacts: function(component) {
		const api = component.get('c.getContacts');

		api.setCallback(this, response => {
			const state = response.getState();

			if (state === 'SUCCESS') {
				const options = response.getReturnValue();
				component.set('v.contacts', options);
			}
		});

		$A.enqueueAction(api);
	},
	savePost: function(component, event) {
		const api = component.get('c.savePost');

		const post = JSON.parse(JSON.stringify(component.get('v.post')));

		api.setParam('post', post);

		api.setCallback(this, response => {
			const state = response.getstate();
			console.log('Yeah');

			if (state === 'SUCCESS') {
				const post = response.getReturnValue();
				component.set('v.post', post);
			}

		});

		$A.enqueueAction(api);
	}
})