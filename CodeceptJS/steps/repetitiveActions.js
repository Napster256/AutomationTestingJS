const { vikunjaMainDemoPage, vikunjaRegisterPage } = inject();
module.exports = {
  registerUser(user, email, password) {
    vikunjaRegisterPage.registerStatus(user, email, password);
  },
  wellcome() {
    vikunjaMainDemoPage.wellcome();
  },
  logout() {
    vikunjaMainDemoPage.logout();
  }
  // insert your locators and methods here
};
