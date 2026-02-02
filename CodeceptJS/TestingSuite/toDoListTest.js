const tasks = require("./toDoListTasks.json");

Feature("Functional testing of the task list");

Before(({ I }) => {
  I.amOnPage("https://todomvc.com/examples/emberjs/todomvc/dist/");
  I.see("todos");
});

Scenario("Adding one specific task", ({ I }) => {
  I.fillField("input.new-todo", "Become rich");
  I.pressKey("Enter");
});

tasks.forEach((task) => {
  Scenario(`Adding a task: ${task}`, ({ I }) => {
    I.fillField("input.new-todo", task);
    I.pressKey("Enter");
  });
});

After(({ I }) => {
  I.click("input.toggle");
  I.click("button.clear-completed");
});
