({
	initialize : function(component, event, helper) {
		helper.getAllPosts(component);
	},
	editPost: function(component, event, helper) {
		console.log('Click');
		const postid = event.target.getAttribute('data-postid');

		const ev = $A.get('e.c:StartEditingPostEvent');

		ev.setParam('postid', postid);
		ev.fire();
	}
})