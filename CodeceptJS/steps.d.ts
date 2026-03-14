/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type vikunjaMainDemoPage = typeof import('./pages/vikunjaMainDemo.js');
type vikunjaRegisterPage = typeof import('./pages/vikunjaRegister.js');
type repetitiveActionsStep = typeof import('./steps/repetitiveActions.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, vikunjaMainDemoPage: vikunjaMainDemoPage, vikunjaRegisterPage: vikunjaRegisterPage, repetitiveActionsStep: repetitiveActionsStep }
  interface Methods extends Puppeteer, REST {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
