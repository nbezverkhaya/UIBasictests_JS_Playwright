const {test} = require('@playwright/test');

test('Registration page', async ({page}) => {

const randomString = Math.random().toString(36).substring(2, 10);

await page.goto('https://rahulshettyacademy.com/client/');
const regButton = page.locator(".text-reset");
const emeilField = page.locator("#userEmail");
const paswordField = page.locator("#userPassword");
const firstnameField = page.locator('#firstName');
const lastnameField = page.locator('#lastName');
const phoneNum = page.locator("#userMobile");
const confirmPass = page.locator("#confirmPassword");
const checkbox = page.locator("input[type='checkbox']");
const myName = "Natnat";
const myLastname = "draft";
const myPhone = "1234567890";
const myEmeil = `${randomString}@gmail.com`;
console.log(myEmeil);
const myPassword = "Test123321!";
const registrerButton = page.locator("#login");
const createdLogIn = page.locator(".btn.btn-primary");
const itemTitles = page.locator(".card-body b");

await regButton.click();
await firstnameField.fill(myName);
await lastnameField.fill(myLastname);
await emeilField.fill(myEmeil);
await phoneNum.fill(myPhone);
await paswordField.fill(myPassword);
await confirmPass.fill(myPassword);
await checkbox.check();
await registrerButton.click();
await createdLogIn.click();
await emeilField.fill(myEmeil);
await paswordField.fill(myPassword);
await registrerButton.click();
// await page.waitForLoadState('networkidle');
await itemTitles.last().waitFor();
const titles = await itemTitles.allTextContents();

console.log(titles);

})