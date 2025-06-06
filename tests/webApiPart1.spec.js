const {test, expect, request} = require('@playwright/test');

// test.beforeEach( () => {});

const loginPayLoad = {
    userEmail: "75vkfjcf@gmail.com",
    userPassword: "Test123321!"
};

let token;
let myEmail = loginPayLoad.userEmail;

test.beforeAll( async() =>
{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {data: loginPayLoad});
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log('Token:', token);
});

test('Login with token', async ({page}) =>
{
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    const productName = 'ZARA COAT 3';
    page.goto('https://rahulshettyacademy.com/client/');
    await page.locator(".card-body b").first().waitFor();
    const products = page.locator(".card-body b");
    const titles = await products.allTextContents();
    console.log(titles);
    const count = await products.count();
    const productCards = page.locator(".card-body");

    for(let i = 0; i <count; ++i)
    {
    if (await productCards.nth(i).locator('b').textContent() === productName)
    {
        await productCards.nth(i).locator('text="Add To Cart"').click();
        break;
    }
    }
    const allCartButtons = page.locator('.fa.fa-shopping-cart');
    await allCartButtons.first().click();

    const allProductsInCart = page.locator('.cartSection');
    await allProductsInCart.first().waitFor();

    const bool = await page.locator(`h3:has-text("${productName}")`).isVisible();
    expect(bool).toBeTruthy();

    const checkoutButton = page.locator('.btn.btn-primary').last();
    await checkoutButton.click();

    const countryInput = page.locator('input[placeholder="Select Country"]');
    await countryInput.pressSequentially('ukr');

    const countriesDropdown = page.locator('.ta-results');
    await countriesDropdown.waitFor();


    const options = countriesDropdown.locator('button');
    const optionsCount = await options.count();

    for (let i = 0; i < optionsCount; ++i) {
        const countryText = await options.nth(i).textContent();
        if (countryText.trim() === "Ukraine") {
            await options.nth(i).click();
            break;
        }
    }

    const userFieldLabel = page.locator('.user__name label');
    const userFieldInput = page.locator('.user__name input').first();
    expect(userFieldLabel).toHaveText(myEmail);
    await userFieldInput.fill(myEmail);
    const placeOrder = page.locator('.action__submit');
    await placeOrder.click();

    const orderConfirmation = page.locator('.hero-primary');
    await expect(orderConfirmation).toHaveText("Thankyou for the order.");
    // await expect(orderConfirmation).toContainText("Thankyou for the order.");
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    // console.log(orderId);
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
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    // await page.pause();

});