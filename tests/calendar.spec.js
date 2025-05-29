const {test, expect} = require('@playwright/test');

test.only('should select the correct date in calendar', async ({page}) =>
{
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedDateList = [monthNumber,date,year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();

    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(monthNumber-1).click();
    
    await page.locator("//abbr[text()='"+date+"']").click();
    // const allDays = page.locator('.react-calendar__month-view__days__day');
    // alternative 1
    // await allDays.getByText(date).click();
    // alternative 2
    // for(let i = 0; i < await allDays.count(); ++i)
    // {
    //     const dayCardText = await allDays.nth(i).textContent();
    //     if (dayCardText === date)
    //     {
    //         await allDays.nth(i).click();
    //         break;
    //     }
    // }
    const inputs = await page.locator(".react-date-picker__inputGroup input");
    const count = await inputs.count(); // 4
    for (let index = 1; index < count; ++index) // index = 1 Because the entire date '2027-06-15' is under the zero index
    {
        const value = await inputs.nth(index).getAttribute('value');
        console.log(`Index ${index - 1}:`, value, 'vs', expectedDateList[index - 1]);
        expect(value).toEqual(expectedDateList[index - 1]);
    }

    await page.pause();
})