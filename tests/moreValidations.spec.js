const {test, expect} = require('@playwright/test')

test('Popup validation', async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator('.displayed-class')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('.displayed-class')).toBeHidden();
})

test('Java popup validation', async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    page.on('dialog', dialog => dialog.accept()); //waits for a dialog box to appear. dialog.dismiss()
    await page.locator('#confirmbtn').click();
})

test('Hover and select', async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator('#mousehover').hover();
    await page.getByText('Top').click();
});

test('iframe validation', async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const framesPage = page.frameLocator('#courses-iframe');
    await framesPage.locator("li a[href*='lifetime-access']:visible").click(); // only visible element will be clicked
    const textCheck = await framesPage.locator('.text h2').textContent();
    console.log(textCheck.split(' ')[1]);

})