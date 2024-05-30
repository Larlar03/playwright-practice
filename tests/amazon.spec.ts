import { test, expect } from '@playwright/test';

test.only('has title', async ({ page }) => {
	await page.goto('https://amazon.co.uk');
	// await page.pause();
	await page.getByPlaceholder('Search Amazon.co.uk').fill('rainbow');
	await page.getByRole('button', { name: 'Go' }).click();

	await expect(page.locator('#search')).toContainText(
		'Personalised Wooden Wall Art for Children'
	);
});
