$ = require("jquery");
require("kendo-ui-core/js/kendo.dropdownlist.js");

require("kendo-ui-core/css/web/kendo.common.min.css");
require("kendo-ui-core/css/web/kendo.default.min.css");


module.exports = {
    init(sel) {
        $(sel).kendoDropDownList();
    }
};