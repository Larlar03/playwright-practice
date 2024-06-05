import { test, expect } from '@playwright/test';
import formatDate from '../helpers/formatDate';

const location = 'Bristol';

// Positive tests
test('has title with location', async ({ page }) => {
	await page.goto('https://www.artrabbit.com/');
	await page.getByPlaceholder('type location').fill(location);
	await page.getByRole('button', { name: 'Go', exact: true }).click();
	await expect(page).toHaveTitle(
		`Contemporary art exhibitions and events near ${location}`
	);
});

test.only('displays todays date', async ({ page }) => {
	await page.goto('https://www.artrabbit.com/');
	await page.getByPlaceholder('type location').fill(location);
	await page.getByRole('button', { name: 'Go', exact: true }).click();
	const date = formatDate();

	await expect(page.getByText(`${date}`)).toBeVisible();
});
