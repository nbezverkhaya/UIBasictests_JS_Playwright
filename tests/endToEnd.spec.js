const {test} = require('@playwright/test');

test.only('Client app login', async ({page}) =>
{
    await page.goto('https://rahulshettyacademy.com/client/');

    const productName = 'ZARA COAT 3';
    const emeilField = page.locator("#userEmail");
    const paswordField = page.locator("#userPassword");
    const myemeil = "75vkfjcf@gmail.com";
    const mypassword = "Test123321!";
    const loginButton = page.locator("#login");

    await emeilField.fill(myemeil);
    await paswordField.fill(mypassword);
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

    const allProdictsInCart = page.locator('.cartSection');
    await allProdictsInCart.first().waitFor();
    const countAddedProducts = await allProdictsInCart.count();

    for(let i = 0; 1<countAddedProducts; ++i)
    {
        if(await allProdictsInCart.nth(i).locator('h3').textContent() === productName)
        {
            console.log(productName, "is added");
            break;
        }

    }

    await page.pause();

})