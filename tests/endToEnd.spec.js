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
    const countAddedProducts = await allProductsInCart.count();
    for(let i = 0; i<countAddedProducts; ++i)
    {
        if(await allProductsInCart.nth(i).locator('h3').textContent() === productName)
        {
            console.log(productName, "is added");
            break;
        }
    }
    // the second way to find the added product in the cart:
    // const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    // expect(bool).toBeTruthy();

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


    await page.pause();

})