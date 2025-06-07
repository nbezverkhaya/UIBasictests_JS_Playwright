const {test, expect, request} = require('@playwright/test');

const loginPayLoad = {userEmail: "75vkfjcf@gmail.com",userPassword: "Test123321!"};
const orderPayLoad = {orders:[{country:"Honduras",productOrderedId:"67a8df1ac0d3e6622a297ccb"}]};
let token;
let orderId;

// test.beforeEach( () => {});

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    // 1. Login
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
                                                {data: loginPayLoad});
    //200,201,202 ...
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log('Token:', token);

    // 2. Create an order
    const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
    {
        data: orderPayLoad,
        headers:{
            'Authorization' :token,
            'Content-Type' : 'application/json'
                }
    });

    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderId = orderResponseJson.orders[0];

});

test.only('Place an order', async ({page}) =>
{   
    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client');

    const ordersButton = page.locator('.btn.btn-custom').nth(1);
    await ordersButton.click();

    await page.locator('tbody').waitFor();
    const rows = page.locator('tbody tr');

    for (let i = 0; i < await rows.count(); ++i)
    {
        const rowOderId = await rows.nth(i).locator('th').textContent();
        // console.log(rowOderId);
        
        if (orderId.includes(rowOderId))
        {
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }  

    const orderIdDetails = await page.locator('.col-text').textContent();
    await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    // await page.pause();

})