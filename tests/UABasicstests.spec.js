
const { test, expect } = require('@playwright/test');

test('First Playwright test', async ({ page }) => {
    const userName = page.locator('#username');
    const passWord = page.locator("[type='password']");
    const signIn = page.locator("#signInBtn");
    const cardTitles =  page.locator(".card-body a");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    // type, fill
    await userName.fill('rahulshetty');
    await passWord.fill('learning');
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(2).textContent());
    const alltitles = await cardTitles.allTextContents();
    console.log(alltitles)
});

test.only('UIControls', async({ page }) => {
    const dropdown = page.locator("select.form-control");
    const signIn = page.locator("#signInBtn");
    const userName = page.locator('#username');
    const passWord = page.locator("[type='password']");
    const radioBtns = page.locator(".customradio");
    const popupBtnOk = page.locator("#okayBtn");
    const terms = page.locator('#terms');
    const blinkingText = page.locator('.blinkingText').first();

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    await userName.fill('rahulshetty');
    await passWord.fill('learning');
    await dropdown.selectOption("consult");
    await radioBtns.last().click();
    await popupBtnOk.click();
    // gives bul value
    console.log(await radioBtns.last().isChecked());
    await expect(radioBtns.last()).toBeChecked();
    await terms.click();
    // expect(terms).toBeChecked();
    // console.log(await terms.isChecked());
    await terms.uncheck();
    expect(await terms.isChecked()).toBeFalsy();
    await expect(blinkingText).toHaveClass('blinkingText');
    // await page.pause();
    await signIn.click();
})

test('Child windows handle', async({ browser }) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const blinkingText = page.locator('.blinkingText'); // 2 elements
    const userName = page.locator('#username');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    // const [newPage, newPage2] = await Promise.all([]);
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // listen for ant new page to open. Pending/rejected/fulfilled
        blinkingText.nth(0).click(), // new page is opened
    ]);
    const text = await newPage.locator('.red').textContent();
    const arrayText = text.split('@');
    const domain = arrayText[1].split(' ')[0];
    console.log(text);
    console.log(arrayText);
    console.log(domain);
    await userName.fill(domain);
    // await page.pause();
})