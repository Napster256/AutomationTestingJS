const { I } = inject();
module.exports = {
  registerButton: "p.mbs-2 a[href='/register']",
  registerForm: {
    user: "#username",
    email: "#email",
    password: "#password",
  },
  Submit: "#register-submit",
  registerUser() {
    I.amOnPage("https://try.vikunja.io/login");
    I.click(this.registerButton);
    I.see("Создать аккаунт");
  },
  registerStatus(user, email, password) {
    this.registerUser();
    const filledFields = [
      { name: this.registerForm.user, value: user },
      { name: this.registerForm.email, value: email },
      { name: this.registerForm.password, value: password },
    ];
    filledFields.forEach(({ name, value }) => {
      I.fillField(name, value);
    });
    I.click(this.Submit);
  },
  // insert your locators and methods here
};
