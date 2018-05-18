({
	navigationItemChanged : function(component, event, helper) {
		console.log(`Navigation item changed to: ${event.getParam('item')}`);
		component.set('v.item', event.getParam('item'));
	}
})