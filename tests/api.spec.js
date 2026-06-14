import { test, expect } from "@playwright/test";

//Использован .serial, т.к. последующие тесты зависят от результатов предыдущих и должны выполняться последовательно.
//В реальном проекте тесты лучше делать независимыми, чтобы они могли работать параллельно. 
test.describe.serial("API-тесты для Restful-booker", () => {
  const baseURL = "https://restful-booker.herokuapp.com";

  //Тестовые данные и переменные вынесены наверх, для увеличения читаемости и упрощения поддержки
  const credentials = {
    username: "admin",
    password: "password123",
  };

  const bookingData = {
    firstname: "Jim",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2018-01-01",
      checkout: "2019-01-01",
    },
    additionalneeds: "Breakfast",
  };

  const newBookingData = {
    ...bookingData,
    firstname: "Earthworm Jim",
    totalprice: 1994,
  };

  let bookingId;
  let token;

  //Авторизация вынесена в beforeAll, так как она не относится к реализации методов PUT и DELETE.
  //Такой подход увеличит читаемость и упростит поддержку.

  test.beforeAll(async ({ request }) => {
    const response = await request.post(`${baseURL}/auth`, {
      data: credentials,
    });
    const responseBody = await response.json();
    token = responseBody.token;
  });

  //POST
  test("Бронирование", async ({ request }) => {
    const response = await request.post(`${baseURL}/booking`, {
      data: bookingData,
    });
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody.booking).toMatchObject(bookingData);

    bookingId = responseBody.bookingid;
  });

  //GET
  test("Получение данных о бронировании по ID", async ({ request }) => {
    const response = await request.get(`${baseURL}/booking/${bookingId}`);
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody).toMatchObject(bookingData);
  });

  //PUT
  test("Изменение бронирования", async ({ request }) => {
    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
      data: newBookingData,
    });

    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody).toMatchObject(newBookingData);
  });

  //DELETE
  test("Удаление бронирования", async ({ request }) => {
    const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    expect(response.status()).toBe(201);

    const deletedResponse = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(deletedResponse.status()).toBe(404);
  });
});
