import {test, expect} from '@playwright/test';

test('Playwright Special Locators', async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    // this also works with click()
    await page.getByLabel('Employed').check();
    await page.getByLabel('Gender').selectOption('Female');

    await page.getByPlaceholder('Password').fill('123321');

    await page.getByRole('button', {name: 'Submit'}).click();

    await page.getByText('The Form has been submitted successfully!.').isVisible();

    await page.getByRole('link', {name: 'shop'}).click();

    await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole('button').click();
    



    await page.pause();
})