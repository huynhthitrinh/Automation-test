Next steps to improve the test:
1. move all locators used in the test into a separate file(s), according to the Page Object pattern (https://playwright.dev/docs/pom)
2. redo the authorization step following the core concept introduced by the playwright team (https://playwright.dev/docs/auth)

**recommendations:**
- copied code for typescript should be pasted in the typescript file =)) (.ts)
- don't use xpath where css locators can be used + use ui attributes specifically added for e2e tests (data-test-id)
- there is no need to make screenshots in the current test, it's enough to add
the parameter "screenshot: 'only-on-failure'" in playwright.config.js (so screenshots 
 will be added automatically when test fails)
- don't leave console.log() in the code if it's unneccessary
- each test logic bloch should be finished with the corresponding assertion(s)
- it's better to avoid waits in seconds (.wait(3000))
- such conditions:


    if (await page.getByText('order overview').isVisible())
        console.log("go to Hogashop");
    else
        console.log("don't go to Hogashop!");

don't make sense. It's better to replace it with:

    await expect(page.locator('[data-test-id="widget-last-order-time"]')).toBeVisible()

test should fail or pass

- it's better to keep README.md in the project with the info how to run tests
