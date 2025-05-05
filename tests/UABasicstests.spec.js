
const { test, expect } = require('@playwright/test');

test('First Playwright test', async ({ page }) => {
    const userName = page.locator('#username')
    const passWord = page.locator("[type='password']")
    const signIn = page.locator("#signInBtn")
    const cardTitles =  page.locator(".card-body a")
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
