({
	initialize : function(component, event, helper) {
		helper.loadPost(component);

		let lastvalue = '';

		const callb = () => {
			const content = component.get('v.content');

			if (lastvalue != content) {
				helper.updatePost(component, content, false);
			}
			lastvalue = content;
			setTimeout(callb, 3000);
		};

		setTimeout(callb, 3000);
	},

	savePost: function(component, event, helper) {
		const content = component.get('v.content');

		helper.updatePost(component, content);
	}
})