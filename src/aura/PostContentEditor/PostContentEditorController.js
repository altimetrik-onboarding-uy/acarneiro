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
		const textarea = event.target;

		if (event.ctrlKey) {
			// get the text that's before the user selection
			const start = textarea.value.substr(0, event.target.selectionStart);
			// get the selected text
			let selected = textarea.value.substr(event.target.selectionStart, event.target.selectionEnd-event.target.selectionStart);
			// get the text that's after the user selection
			const end = textarea.value.substr(event.target.selectionEnd);

			let sorround = (function() {
				switch (String.fromCharCode(event.which).toLowerCase()) { // This is done just for comodity
					case 'b': return '**';
					case 'i': return '*';
					case 'l': return event.shiftKey ? '```' : '`';
				}
				return '';
			})();

			// Do this logic only if there's selected text and `sorround` is not empty (`sorround` not being empty means
			// that we want to add some style)
			if (sorround.length && selected.length) {
				// if the text we selected is already sorrounded by the characters we want to add
				if (selected.substr(0, sorround.length) == sorround && selected.substr(-sorround.length) == sorround) {
					// then do the opposite, remove those characters (remove the style)
					selected = selected.substr(sorround.length, selected.length-sorround.length*2);
					// and empty `sorround` variable so it will not affect in the following lines
					sorround = '';
				}

				textarea.value = start+sorround+selected+sorround+end;
			}
		}

		component.set('v.content', textarea.value);
	}
})