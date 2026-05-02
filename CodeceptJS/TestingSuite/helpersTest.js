let assert = require("assert");
Feature("Helpers testing Suite");
Scenario("ScrollFooterHelper", ({ I }) => {
  I.amOnPage("https://github.com/gothinkster/realworld");
  I.scrollFooter();
  I.see("License");
});

Scenario("JiraTicketHelper", async ({ I }) => {
  let response = await I.sendGetRequest(`https://www.postman.com/`);
  I.addJiraTicket();
  assert.equal(response.status, 200);
});
