/**
 * Configuration object for static address-api site.
 *
 * Most of the time you will want to change the production url to 
 * the development instance you have running on your laptop.
 *
 *      url : 'http://dev-api.codeforkc.devel/'
 *      url : 'http://dev-api.codeforkc.org/',
 *
 * To keep Git from pushing up your local changes run the following command
 *
 *      git update-index --skip-worktree js/config.js
 *
 * Example:
 *
 */


var config = (function() {

    return {
       url : 'http://dev-api.codeforkc.org/',
    };

})();

