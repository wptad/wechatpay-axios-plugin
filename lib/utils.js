// Discussion on axios/axios#3032, the `utils` is not a public API of axios.
// Using directly may not works in that future release.
const utils = require('axios/lib/utils');
const { version: axiosVersion } = require('axios/package.json');
const { name: pkgName, version: pkgVersion } = require('../package.json');

// Self extends ...
utils.extend(utils, {
  /**
   * Similar to `isStandardBrowserEnv`, just check it's running in a Node environment
   *
   * @return {boolean} Ture on Node, otherwise false
   */
  isProcessEnv() {
    return typeof process !== 'undefined' && toString.call(process) === '[object process]';
  },

  /**
   * Determine if a value is a `form-data` node module
   *
   * @see https://github.com/axios/axios/issues/323
   * @see https://github.com/axios/axios/issues/3023
   *
   * @param {Object} val - To test value
   *
   * @returns {boolean} True if value is a `form-data` module, otherwise false
   */
  isProcessFormData(val) {
    // @see {@link https://github.com/TheNorthMemory/wechatpay-axios-plugin/issues/22}
    return this.isProcessEnv() && this.isObject(val) && toString.call(val) === '[object FormData]';
  },

  /**
   * Compose the `User-Agent` content
   *
   * @returns {string} - The `User-Agent` value
   */
  userAgent() {
    const { platform, arch, versions: { node: nodeVersion } } = process;

    return `${pkgName}/${pkgVersion} axios/${axiosVersion} node/${nodeVersion} ${platform}/${arch}`;
  },
});

module.exports = utils;
