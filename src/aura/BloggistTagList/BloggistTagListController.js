({
	removeTag: function(component, event, helper) {
		const tagid = event.target.getAttribute('data-tagid');

		const ev = component.getEvent('onTagDeleted');

		ev.setParam('tagid', tagid);

		ev.fire();
	}
})