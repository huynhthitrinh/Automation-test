// @ts-check
const { test, expect } = require('@playwright/test'); //import các engine của các trình duyệt từ playwright chẳng hạn như chromium
const { fail } = require('assert');
// @ts-ignore
const { Console } = require('console');
const { get } = require('http');

test.beforeEach(async ({page}) => {
    
    await page.goto('https://www.proto-hogashop.ch/login/form');
    await page.locator("//input[@placeholder='User name']").fill("trinhUser");
    await page.locator("//input[@placeholder='Password']").fill("Trinhhuynh_123");
    await page.locator('//button[text()="Log in"]').click();
    await page.locator('//a[text()="trinhhuynh"]').click();

    });

test('Search Poduct', async ({page})=> {

    await page.waitForSelector('//*[@id="widgets"]/div[4]/div[1]/div[2]/div/div[1]/h4');
    await expect(page.locator('//*[@id="widgets"]/div[4]/div[1]/div[2]/div/div[1]/h4')).toBeVisible();
    if (await page.getByText('order overview').isVisible())
        console.log("go to Hogashop");
    else
        console.log("don't go to Hogashop!");
    
    await page.screenshot({ path: 'screenshot/GotoHomePage.png' });
     //go to catalogue page
     await page.locator('//span[text()="Product catalogue"]').click();
     //input search field
     const text = 'Bath';
     await page.locator('//input[@placeholder="Enter search string …"]').fill(text);
     //click search button 
     await page.locator("//button[text()='Search']").click();
     await page.waitForTimeout(3000)
     await page.screenshot({ path: 'screenshot/SearchResult.png' })
    // count number of element in search result list
    await page.waitForSelector('//tr[@data-row-type="product"]');
    const CountRow = await page.locator('//tr[@data-row-type="product"]').count();
   
    console.log('have', CountRow, 'element');
    
    // get text in search result and compare
    for (let count = 1; count <=  CountRow; count ++){
        await page.waitForSelector('//div[@data-test-id="description-container"]');
        const gettext = await page.locator('//tr[@data-row-type="product"]['+count+']//div[@data-test-id="description-container"]//a[@class="c-item-details__name"]').textContent();
        console.log(gettext)
        if (gettext?.includes(text))
            console.log("successfull");
        else
            console.log("fail");
        
    }
    
});
// test('Add product to basket', async ({page}) => {
//     await page.locator('//span[text()="Product catalogue"]').click();

//     });