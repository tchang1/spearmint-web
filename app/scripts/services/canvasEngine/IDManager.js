canvasEngine.IDManager = {
    _ids: [],

    _s4: function() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    },

    _generate: function() {
        var me = this;
        return me._s4() + me._s4() + '-' + me._s4() + '-' + me._s4() + '-' +
            me._s4() + '-' + me._s4() + me._s4() + me._s4();
    },

    setID: function(object) {
        var me = this;
        var id;

        me._clearInvalidIDs();
        do {
            id = me._generate();
        } while (me._ids[id]);

        object.id = id;
        me._ids[id] = object;
    },

    _clearInvalidIDs: function() {
        var me = this;
        var idsToRemove = [];
        var id;
        for (id in me._ids) {
            if (me._ids.hasOwnProperty(id)) {
                if (!me._ids[id]) {
                    idsToRemove.push(id);
                }
            }
        }

        for (id in idsToRemove) {
            if (idsToRemove.hasOwnProperty(id)) {
                delete me._ids[id];
            }
        }
    }
}