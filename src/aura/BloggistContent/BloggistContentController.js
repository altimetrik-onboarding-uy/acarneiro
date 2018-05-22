({
	initialize: function(component, event, helper) {
		component.set('v.item', localStorage.getItem('v.item') || 'writers');
	},
	navigationItemChanged : function(component, event, helper) {
		helper.resetPost(component);
		helper.setNavigationItem(component, event.getParam('item'))
	},
	setEditingPost: function(component, event, helper) {
		helper.findPost(component, event.getParam('postid'));
	}
})