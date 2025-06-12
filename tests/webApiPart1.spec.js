const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');

const loginPayLoad = {userEmail: "75vkfjcf@gmail.com",userPassword: "Test123321!"};
const orderPayLoad = {orders:[{country:"Honduras",productOrderedId:"67a8df1ac0d3e6622a297ccb"}]};
let response;

test.beforeAll(async()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
})

test('Place an order', async ({page}) =>

{   
    page.addInitScript(value =>
    {
    window.localStorage.setItem('token',value);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client');

    const ordersButton = page.locator('.btn.btn-custom').nth(1);
    await ordersButton.click();

    await page.locator('tbody').waitFor();
    const rows = page.locator('tbody tr');

    for (let i = 0; i < await rows.count(); ++i)
    {
        const rowOderId = await rows.nth(i).locator('th').textContent();
        // console.log(rowOderId);
        
        if (response.orderId.includes(rowOderId))
        {
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }  

    const orderIdDetails = await page.locator('.col-text').textContent();
    await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

    // await page.pause();

})