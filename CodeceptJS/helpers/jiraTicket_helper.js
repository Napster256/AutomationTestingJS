const Helper = require("@codeceptjs/helper");

class JiraTicket extends Helper {
  _init() {
    console.log("JiraTicket helper инициализирован");
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
  async addJiraTicket() {
    const { REST } = this.helpers;
    const issue = {
      fields: {
        project: {
          id: "10004",
        },
        summary: "create simple ticket",
        description: "simple ticket using REST API",
        issuetype: {
          id: "10000",
        },
      },
    };
    const headers = {authorization: "Basic ZGxvdmV4LnJ10k9kdjVnNlBsQkpqQWdrT1RZcEUzRUIzQg=="};
    const response = REST.sendPostRequest("https://dlove.atlassian.net", issue, headers);
  }
  // add custom methods here
  // If you need to access other helpers
  // use: this.helpers['helperName']
}

module.exports = JiraTicket;
