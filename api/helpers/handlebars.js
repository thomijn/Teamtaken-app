module.exports = {
    ifCond: function (v1, v2, options) {
        console.log(v1)
        if (v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    }
}
