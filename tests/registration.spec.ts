import { test, expect } from '@playwright/test';
import { Homepage } from '../pages/homepage';
import { SignUpPage } from '../pages/signupPage';
import { user } from '../helpers/constants';

// store in .env e.g url etc ()
//  end to end
test.describe('Registration Journey', () => {
	test('user can register', async ({ page }) => {
		const homepage = new Homepage(page);
		const signUp = new SignUpPage(page);

		await page.goto('/');
		await homepage.goToSignUpPage();
		await signUp.fillOutForm(user);

		// check captcha
		await page.locator('input#terms').dispatchEvent('click');
		await page.locator('.recaptcha-checkbox').dispatchEvent('click');
		await page.pause();
		// await page
		// 	.frameLocator('iframe[name="a-vxi5tddfqatg"]')
		// 	.getByLabel("I'm not a robot")
		// 	.dblclick();

		// click join link
		// assert confirmation page/message
	});

	// test('user can login', async ({page}) => {

	// })
});
