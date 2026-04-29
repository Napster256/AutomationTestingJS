const Helper = require('@codeceptjs/helper');


class ScrollFooter extends Helper {
  _init() {
    console.log("ScrollFooter helper инициализирован");
  }
  // before/after hooks
  /**
   * @protected
   */
  _before() {
    // remove if not used
  }

  /**
   * @protected
   */
  _after() {
    // remove if not used
  }
  async scrollFooter() {
    const { Puppeteer } = this.helpers;
    await Puppeteer.scrollPageToBottom();
  }
  // add custom methods here
  // If you need to access other helpers
  // use: this.helpers['helperName']

}

module.exports = ScrollFooter;
