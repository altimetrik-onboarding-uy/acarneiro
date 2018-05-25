({
	getAllPosts : function(component) {
		const api = component.get('c.getAllPosts');

		api.setCallback(this, response => {
			const state = response.getState();

			if (state === 'SUCCESS') {
				const posts = response.getReturnValue();
				component.set('v.posts', posts);
			}
		});

		$A.enqueueAction(api);
	}
})