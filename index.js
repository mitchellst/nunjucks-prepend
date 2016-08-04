/** 
  * A nunjucks template tag for building out URLs.
  *
  * Example Useage:
  * ```
  * <link rel="stylesheet" href="{{ "/css/combinedStyles.css" | prepend(site.baseurl, site.domain) }}" />
  * ```
  * Arguments are the strings you'd want to prepend. There is one good way to screw this up, and it goes like this:
  * ```
  * site.basedir = /creditcards/
  * parentPath = /myCategory/
  * // in template
  * {{ "myPage.html" | prepend(parentPath, site.basedir ) }}
  * ```
  * That will resolve to`"/myCategory/myPage.html"`, leaving off basedir. For the desired functionality, you'd 
  * need to change parentPath to `"myCategory/"`, which would resolve `"/creditcards/myCategory/myPage.html"`.
  *
  * @module ConfigInit/nunjucksSetup/prepend
  **/

const url = require('url');

module.exports = prepend;

/**
 * @param {String} templateURL - the value chained to filter from the template.
 * @param {String} prependers - string or multiple arguments of strings to prepend. If using multiple,
 * start with the string you want closest to the filtered value.
 */
function prepend(templateURL, ...prependers) {

  let endUrl = '';
  if(templateURL.length > 0){
    endUrl = templateURL[0] == '/' ? templateURL.slice(1) : templateURL;
  }
  // we iterate backwards through the prependers. From template writer's perspective, it makes sense
  // to prepend baseURL, then prepend the domain. We'll first resolve our URL to the baseURL, then resolve
  // that whole string to the domain.

  for (let prep of prependers) {
    prep = prep[prep.length  - 1] == '/' ? prep : prep + '/';
    endUrl = url.resolve(prep, endUrl);
  }
  return endUrl;
}