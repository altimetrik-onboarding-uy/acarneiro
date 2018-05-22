({
	initialize: function(component, event, helper) {
		component.set('v.selectedItem', localStorage.getItem('v.item') || 'writers');
	},
	navigationItemChanged : function(component, event, helper) {
		const item = event.getSource().get('v.name');
		
		helper.navigate(item);
	},
	editPost: function(component, event, helper) {
		const postid = event.getParam('postid');

		helper.navigate('writers');
	}
})