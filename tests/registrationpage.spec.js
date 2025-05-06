const {test} = require('@playwright/test');

test('Registration page', async ({page}) => {

await page.goto('https://rahulshettyacademy.com/client/');
const regButton = page.locator(".text-reset");
const emeilField = page.locator("#userEmail");
const paswordField = page.locator("#userPassword");
const firstnameField = page.locator('#firstName');
const lastnameField = page.locator('#lastName');
const phoneNum = page.locator("#userMobile");
const confirmPass = page.locator("#confirmPassword");
const checkbox = page.locator("input[type='checkbox']");
const myname = "Natnat";
const mylastname = "draft";
const myphone = "1234567890";
const myemeil = "tests7543@gmail.com";
const mypassword = "Test123321!";
const registrerButton = page.locator("#login");
const createdLogIn = page.locator(".btn.btn-primary");
const itemTitles = page.locator(".card-body b");

await regButton.click();
await firstnameField.fill(myname);
await lastnameField.fill(mylastname);
await emeilField.fill(myemeil);
await phoneNum.fill(myphone);
await paswordField.fill(mypassword);
await confirmPass.fill(mypassword);
await checkbox.check();
await registrerButton.click();
await createdLogIn.click();
await emeilField.fill(myemeil);
await paswordField.fill(mypassword);
await registrerButton.click();
// await page.waitForLoadState('networkidle');
await itemTitles.last().waitFor();
const titles = await itemTitles.allTextContents();

console.log(titles);

})