({
	rerender: function(component, helper) {

		const markdown = helper.markdown_instance();
		
		let content = component.get('v.content');

		if (markdown) {
			content = markdown.toHTML(content, 'Maruku');
		}

		component.set('v.parsed', content);
	}
})