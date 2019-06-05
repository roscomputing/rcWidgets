const shared = require('./shared/index');
const buttons = require('./components/buttons/index');
const addvideo = require('./components/addvideo/index');
const autocomplete = require('./components/autocomplete/index');
const calendar = require('./components/calendar/index');
const city = require('./components/city/index');
const field = require('./components/field/index');
const filepreview = require('./components/filepreview/index');
const form = require('./components/form/index');
const select = require('./components/select/index');
const tooltip = require('./components/tooltip/index');
const tree = require('./components/tree/index');
const treebuttons = require('./components/treebuttons/index');
const upload = require('./components/upload/index');
const users = require('./components/users/index');

module.exports = function (params) {
   shared.libraryInitialAction(params);

   tooltip(params);

   return {
      getHtmlVideo: shared.getHtml,
      buttons,
      addvideo,
      autocomplete,
      calendar,
      city,
      field,
      filepreview,
      form,
      select,
      tree,
      treebuttons,
      upload,
      users
   }
};