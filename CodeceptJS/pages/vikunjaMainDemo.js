const { I } = inject();

module.exports = {
  buttonDemo:
    ".py-2.px-4.sm\\:group-hover\\:py-0.transition-all.flex.items-center",
  user: {
    profile: ".base-button.base-button--type-button.username-dropdown-trigger",
    logoutButton: ".base-button.base-button--type-button.dropdown-item",
  },
  wellcome() {
    I.amOnPage("https://vikunja.io/");
    I.see("Plan your projects with the elegance");
    I.click(this.buttonDemo);
  },
  logout() {
    for (const key of Object.keys(this.user)) {
      I.click(this.user[key]);
    }
  },
};
