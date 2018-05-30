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
	},

	onEditorKeyUp: function(component, event, helper) {
		window.event = event;

		const textarea = event.target;

		if (event.ctrlKey) {
			const start = textarea.value.substr(0, event.target.selectionStart);
			let selected = textarea.value.substr(event.target.selectionStart, event.target.selectionEnd-event.target.selectionStart);
			const end = textarea.value.substr(event.target.selectionEnd);

			let sorround = (function() {
				switch (String.fromCharCode(event.which).toLowerCase()) { // This is done just for comodity
					case 'b': return '**';
					case 'i': return '*';
					case 'l': return event.shiftKey ? '```' : '`';
				}
				return '';
			})();

			// If the selected text is already sorrounded by the character (style) we want to add to the text
			if (selected.substr(0, sorround) == sorround && selected.substr(-sorround.length) == sorround) {
				// then do the opposite, remove those characters (style)
				console.log('Before', selected);
				selected = selected.substr(sorround.length, selected.length-sorround.length*2);
				console.log('After', 	selected);
				sorround = '';
			}
			// if there's no selected text then do not add unnecessary characters
			if (selected.length) textarea.value = start+sorround+selected+sorround+end;
		}

		component.set('v.content', textarea.value);
	}
})