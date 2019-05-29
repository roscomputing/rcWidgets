const buttons = require('./components/buttons/index');
const shared = require('./shared/index');


module.exports = function (params) {
   shared.libraryInitialAction(params);

   return {
      buttons
   }
};