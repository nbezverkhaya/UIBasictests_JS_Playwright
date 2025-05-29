const {test, expect} = require('@playwright/test');

test('Client app login. Special locators', async ({page}) =>
{
    await page.goto('https://rahulshettyacademy.com/client/');

    const productName = 'ZARA COAT 3';
    const emailField = page.getByPlaceholder("email@example.com");
    const passwordField = page.getByPlaceholder("enter your passsword");
    const myEmail = "75vkfjcf@gmail.com";
    const mypassword = "Test123321!";
    const loginButton = page.getByRole("button", {name:"Login"});

    await emailField.fill(myEmail);
    await passwordField.fill(mypassword);
    await loginButton.click();

    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const card = page.locator(".card-body")
    await card.filter({hasText: productName}).getByRole('button', {name: 'Add to Cart'}).click();

    await page.getByRole('listitem').getByRole('button', {name: 'Cart'}).click();

    const allProductsInCart = page.locator('.cartSection');
    await allProductsInCart.first().waitFor();

    await expect(allProductsInCart.filter({hasText: productName})).toBeVisible();
    // await expect(page.getByText(productName)).toBeVisible();

    const checkoutButton = page.getByRole('button', {name: "Checkout"});
    await checkoutButton.click();

    const countryInput = page.getByPlaceholder("Select Country");
    await countryInput.pressSequentially('ukr');

    await page.getByRole('button',{name: 'Ukraine'}).click();


    const userFieldLabel = page.locator('.user__name label');
    const userFieldInput = page.locator('.user__name input').first();
    expect(userFieldLabel).toHaveText(myEmail);
    await userFieldInput.fill(myEmail);
    const placeOrder = page.getByText('PLACE ORDER');
    await placeOrder.click();

    await expect(page.getByText('Thankyou for the Order.')).toBeVisible();

    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    // console.log(orderId);
    const ordersButton = page.getByRole('button', {name: "ORDERS"});
    await ordersButton.click();

    await page.locator('tbody').waitFor();
    const rows = page.locator('tbody tr');

    for (let i = 0; i < await rows.count(); ++i)
    {
        const rowOderId = await rows.nth(i).locator('th').textContent();
        // console.log(rowOderId);
        if (orderId.includes(rowOderId))
        {
            await rows.nth(i).getByRole('button', {name: 'View'}).click();
            break;
        }
    }  

    const orderIdDetails = await page.locator('.col-text').textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
    console.log(orderIdDetails);


    // await page.pause();

})