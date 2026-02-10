let assert = require("assert");
let fs = require("fs");
const FormData = require("form-data");
const form = new FormData();
let Ajv = require("ajv");
const swagger = "https://petstore.swagger.io/v2/";
const rabbit = {
  name: "Jasper",
  photoUrls: [
    "https://img.freepik.com/free-photo/furry-cute-rabbit-isolated_78492-3950.jpg",
  ],
};
const booksSource = "https://api.itbook.store/1.0/search";
const bookPage = "";
const bookQuery = "quality";
const postmanEcho = "https://postman-echo.com/";
const httpBin = "https://httpbin.org";
const postman = {
  name: rabbit.name,
  email: "test@example.com",
  password: "password",
};
const authToken = { Authorization: "Basic cG9zdG1hbjpwYXNzd29yZA==" };
const sourceNasa = "https://api.nasa.gov/";
const nasaKey = "xkQWv4DmUYsNdCh52vwFYhnfVhuJfZdkEKgFhrl3";
const credential = Buffer.from("postman:password");
const authTokenBasic64 = {
  Authorization: "Basic " + credential.toString("base64"),
};

Feature("CodeceptJS API Suite Examples");

Scenario("Get request to IT book store with query in URL", async ({ I }) => {
  let response = await I.sendGetRequest(
    booksSource + `/${bookQuery}/${bookPage}`,
  );
  assert.equal(response.status, 200);
  assert.equal(response.data.total, 350);
});

Scenario("Get request with auth header token", async ({ I }) => {
  let response = await I.sendGetRequest(postmanEcho + "basic-auth", authToken);
  assert.equal(response.status, 200);
  assert.equal(response.data.authenticated, true);
});

Scenario(
  "Get request with credential data and Basic 64 encoding auth",
  async ({ I }) => {
    let response = await I.sendGetRequest(
      postmanEcho + "basic-auth",
      authTokenBasic64,
    );
    assert.equal(response.status, 200);
    assert.equal(response.data.authenticated, true);
    assert.equal(
      response.config.headers.Authorization,
      authTokenBasic64.Authorization,
    );
  },
);

Scenario("Post request verify create pet", async ({ I }) => {
  let response = await I.sendPostRequest(swagger + "pet", rabbit);
  if (response.status === 200) {
    assert.equal(response.data.name, rabbit.name);
  } else {
    assert.equal(response.status, 403);
  }
});

Scenario("Post request verify creating user with form data", async ({ I }) => {
  for (const key in postman) {
    form.append(key, postman[key]);
  }

  let response = await I.sendPostRequest(postmanEcho + "post", form, {
    "content-Type": "multipart/form-data",
  });

  assert.equal(response.status, 200);

  for (const key in postman) {
    assert.equal(response.data.form[key], postman[key]);
  }
});
// socket hang up
// этот сценарий работает только с флагом only, так как нет очереди открытых сокетов от предыдущих тестов
Scenario.skip(
  "Post request verify creating user with form data and fs photo",
  async ({ I }) => {
    for (const key in postman) {
      form.append(key, postman[key]);
    }

    form.append("attachment", fs.createReadStream("./img/Bear.jpg"));

    let response = await I.sendPostRequest(httpBin + "/post", form, {
      "content-Type": "multipart/form-data",
    });

    assert.equal(response.status, 200);

    for (const key in postman) {
      assert.equal(response.data.form[key], postman[key]);
    }

    assert(response.data.files.attachment.indexOf("data:image/jpeg;") !== -1);
  },
);

Scenario(
  "Sets cookie(s) as provided by the query string and redirects to cookie list.",
  async ({ I }) => {
    const cookies = { name: "theHighTower", value: "theRedBird" };
    let response = await I.sendGetRequest(
      httpBin + `/cookies/set?${cookies.name}=${cookies.value}`,
    );
    assert.equal(response.status, 302);
    assert.equal(response.headers.location, "/cookies");
    assert.equal(
      response.headers["set-cookie"][0].includes(
        `${cookies.name}=${cookies.value}`,
      ),
      true,
    );
  },
);

Scenario("check If-Modified-Since or If-None-Match header", async ({ I }) => {
  let response = await I.sendGetRequest(httpBin + "/cache", {
    "If-Modified-Since": "friday, 31 december 2000",
    "If-None-Match": "778855",
  });
  if (
    response.config.headers["If-Modified-Since"] ||
    response.config.headers["If-None-Match"]
  ) {
    assert.equal(response.status, 304);
  } else {
    assert.equal(response.status, 200);
  }
});
Scenario("validate json response with schema", async ({ I }) => {
  const ajv = new Ajv({
    strict: true,
    strictSchema: true,
    strictNumbers: true,
    strictTypes: true,
    strictTuples: true,
    strictRequired: true,
    $data: true,
    logger: console,
    allErrors: true,
    verbose: true,
  });
  const schema = {
    type: "object",
    properties: {
      // проверем тип поля объекта
      status: { type: "integer", minimum: 100, maximum: 600 },
      title: { type: "string" },
    },
    // проверяем наличие дополнительных / обязательных полей
    additionalProperties: true,
    required: ["status"],
  };
  let response = await I.sendGetRequest(
    sourceNasa + `planetary/apod?api_key=${nasaKey}`,
  );
  const validate = ajv.validate(schema, response);
  console.log(ajv.errors);
  assert.deepEqual(validate, true);
  assert.equal([200, 403].includes(response.status), true);
});
