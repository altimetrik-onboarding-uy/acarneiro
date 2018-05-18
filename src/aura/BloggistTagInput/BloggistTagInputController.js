({
	onTagInputChanged : function(component, event, helper) {
		if (event.which == 13) { // ENTER KEY
			const tags = component.get('v.tags');

			const newTag = event.target.value.trim();

			event.target.value = "";

			if (newTag.length) {
				tags.push(newTag);
				console.log('Pushed '+newTag);
				component.set('v.tags', tags);
			}
		}
	},
	onTagDeleted: function(component, event, helper) {
		const tagid = event.getParam('tagid');

		const newTags = component.get('v.tags').filter((tag, tagidx) => tagidx != tagid);

		component.set('v.tags', newTags);
	}
})