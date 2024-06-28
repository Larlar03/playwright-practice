import { test, expect } from '@playwright/test';
import { Homepage } from '../pages/homepage';
import { user } from '../helpers/constants';

// store in .env e.g url etc ()
//  end to end
test.describe('Registration Journey', () => {
	test('user can register', async ({ page }) => {
		const homepage = new Homepage(page);

		await page.goto('/');
		const signUp = await homepage.goToSignUpPage();
		await signUp.fillOutForm(user);

		// TODO: check terms
		// const termsInput = page.locator('input#terms');
		// await termsInput.dispatchEvent('check', { force: true });
		// await page.pause();

		// check captcha
		const captchaBox = page.frameLocator('iframe[title="reCAPTCHA"]');

		try {
			captchaBox.locator('#recaptcha-anchor').waitFor({
				state: 'visible',
				timeout: 5000,
			});
			captchaBox.locator('#recaptcha-anchor').click();
			await page.pause();
		} catch {
			console.log('Cannot find captcha element');
		}

		// click join link
		// assert confirmation page/message
	});

	// test('user can login', async ({page}) => {

	// })
});
