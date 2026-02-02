Feature('NPM packages list library store');

Scenario('Welcome to front page',  ({ I }) => {
  I.amOnPage('https://www.npmjs.com/');
  I.see('Build amazing things');
});
