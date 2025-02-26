import {expect, test} from '@playwright/test'; //import các engine của các trình duyệt từ playwright chẳng hạn như chromium

test.beforeEach(async ({page}) => {

    await page.goto('https://www.proto-hogashop.ch/login/form');
    await page.locator('#login').fill("trinhUser");
    await page.locator('#password').fill("Trinhhuynh_123");
    await page.locator('button', {hasText: 'Log in'}).click();
    await page.locator('[data-test-id="departments-table-dep-name"]', {hasText: 'trinhhuynh'}).click();
    await expect(page.locator('[data-test-id="widget-last-order-time"]')).toBeVisible();

});

test('Search product', async ({page}) => {
    const testData = {productName: 'Bath'};
    //go to catalogue page
    await page.locator('[data-ga-label="product_search"]').click();
    await page.waitForSelector('[data-test-id="list-of-products"]');
    //input search field
    await page.locator('[name="search-input"]').fill(testData.productName);
    //click search button
    const foundProductsCountResponsePromise = page.waitForResponse(`**/available-products/count?*${testData.productName}?*`);
    await page.locator('[data-test-id="run-search"]').click();
    const foundProductsCountResponse = await foundProductsCountResponsePromise;
    await expect(foundProductsCountResponse.status()).toBe(200)
    // count number of element in search result list
    await page.waitForSelector('[data-test-id^="product_"]');
    await expect(page.locator('[data-test-id^="product_"]')).toHaveCount(2);

    (await (page.locator('[data-test-id^="product_"]').locator('[data-test-id="product-name"]').allInnerTexts())).forEach(productName => {
        expect(productName).toContain(testData.productName)
    })
});