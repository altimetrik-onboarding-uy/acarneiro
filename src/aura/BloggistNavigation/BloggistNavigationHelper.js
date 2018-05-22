({
	navigate : function(item) {
		const ev = $A.get('e.c:NavigationItemChanged');

		ev.setParam('item', item);
		ev.fire();

		localStorage.setItem('v.item', item);
	}
})