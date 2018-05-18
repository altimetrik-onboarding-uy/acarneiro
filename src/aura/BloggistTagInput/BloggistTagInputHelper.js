({
	emitNewTagList: function(component, tags) {
        const event = component.getEvent('onTagsUpdated');

        event.setParam('tags', tags);

        event.fire();
    }
})