import { test, expect } from '@playwright/test';

// store in .env e.g url etc ()
//  end to end
test.describe.only('Registration Journey', () => {
	test('user can register', async ({ page }) => {
		// assert on the homepage
		// click the login link
		// click the join link
		// fill out the form
		// check captcha
		//  click join link
		// assert confirmation page/message
		await page.goto('https://www.artrabbit.com');
		await page.getByRole('link', { name: 'Toggle Log in' }).click();
		await page.getByRole('link', { name: 'Join Artrabbit' }).click();

		await page.pause();
	});

	// test('user can login', async ({page}) => {

	// })
});
