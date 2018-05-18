({
	navigationItemChanged : function(component, event, helper) {
		const ev = $A.get('e.c:NavigationItemChanged');

		ev.setParam('item', event.getSource().get('v.name'));
		ev.fire();
	}
})