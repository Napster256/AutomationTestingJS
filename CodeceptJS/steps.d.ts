/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type vikunjaMainDemoPage = typeof import('./pages/vikunjaMainDemo.js');
type vikunjaRegisterPage = typeof import('./pages/vikunjaRegister.js');
type repetitiveActionsStep = typeof import('./steps/repetitiveActions.js');
type ScrollFooter = import('./helpers/scrollFooter_helper.js');
type JiraTicket = import('./helpers/jiraTicket_helper.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, vikunjaMainDemoPage: vikunjaMainDemoPage, vikunjaRegisterPage: vikunjaRegisterPage, repetitiveActionsStep: repetitiveActionsStep }
  interface Methods extends Puppeteer, REST, ScrollFooter, JiraTicket {}
  interface I extends ReturnType<steps_file>, WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
