const buttons = require('./components/buttons/index');
const addvideo = require('./components/addvideo/index');
const shared = require('./shared/index');


module.exports = function (params) {
   shared.libraryInitialAction(params);

   return {
      getHtmlVideo: shared.getHtml,
      buttons,
      addvideo
   }
};