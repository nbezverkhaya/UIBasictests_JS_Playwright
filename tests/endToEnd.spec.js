const {test, expect} = require('@playwright/test');

test.only('Client app login', async ({page}) =>
{
    await page.goto('https://rahulshettyacademy.com/client/');

    const productName = 'ZARA COAT 3';
    const emailField = page.locator("#userEmail");
    const passwordField = page.locator("#userPassword");
    const myEmail = "75vkfjcf@gmail.com";
    const mypassword = "Test123321!";
    const loginButton = page.locator("#login");

    await emailField.fill(myEmail);
    await passwordField.fill(mypassword);
    await loginButton.click();
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

    // the first way to find the added product in the cart:
    // const countAddedProducts = await allProductsInCart.count();
    // for(let i = 0; i<countAddedProducts; ++i)
    // {
    //     if(await allProductsInCart.nth(i).locator('h3').textContent() === productName)
    //     {
    //         console.log(productName, "is added");
    //         break;
    //     }
    // }
    // the second way to find the added product in the cart:
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
        
        if (orderId.includes(rowOderId));
        {
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }  

    const orderIdDetails = await page.locator('.col-text').textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    

    

    await page.pause();

})