module.exports = {
    ifCond: function (v1, v2, options) {
        if (JSON.stringify(v1) === JSON.stringify(v2)) {
            return options.fn(this);
        }
        return options.inverse(this);
    }
}
