const { repetitiveActionsStep } = inject();
const { faker } = require('@faker-js/faker');
Feature("Vikunja to-do");
Scenario("welcome to the current issues page in demo", ({ I }) => {
  repetitiveActionsStep.wellcome();
  I.wait(8);
  I.see("Текущие задачи");
  repetitiveActionsStep.logout();
});

Scenario("Registration on the Vikunja", ({ I }) => {
  const person = faker.person.firstName();
  repetitiveActionsStep.registerUser(person, faker.internet.email(), faker.internet.password());
  I.see(`${person}!`);
});
