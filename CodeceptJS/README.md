# CodeceptJS Tests

## Описание
CodeceptJS — это фреймворк для end-to-end тестирования (UI и API).
Работает поверх Puppeteer, Playwright, WebDriver или Appium.

## Запуск тестов

1. подключение библиотек к файлам тестов через `require` не смотря на то, что проект функционирует на свежай версии с поддержкой **ES-модулей**, потому - что при инициализации проекта `codecept.conf` содержал `require` вместо `import` и из коробки у CodeceptJS не настроен `babel.config`. Запуск отдельных тестов осуществляется флагом `only` в файле тестов.
2. установка:
  ```
  npm install
  npm run codeceptjs
  ```
3. инициализация:
  ```
  npx create-codeceptjs .
  npx codeceptjs init
  ```
4. обновление типов IntelliSense CodeceptJS `I` object `steps.d.ts`
  ```
  npx codeceptjs def
  ```