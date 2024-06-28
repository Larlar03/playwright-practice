import { Page } from '@playwright/test';
import { SignUpPage } from './signupPage';
import { ResultsPage } from './resultsPage';

export class Homepage {
	page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async searchByTerm(term: string): Promise<ResultsPage> {
		await this.page.getByRole('link', { name: 'Toggle Search' }).click();
		await this.page.getByPlaceholder('Search here...').fill(term);
		await this.page.locator('.m_slideout-search-go').click();
		return new ResultsPage(this.page);
	}

	async searchByLocation(location: string): Promise<ResultsPage> {
		await this.page.getByPlaceholder('type location').fill(location);
		await this.page.getByRole('button', { name: 'Go', exact: true }).click();
		return new ResultsPage(this.page);
	}

	async goToLoginPage(): Promise<void> {
		await this.page.getByRole('link', { name: 'Toggle Log in' }).click();
	}

	async goToSignUpPage(): Promise<SignUpPage> {
		await this.page.getByRole('link', { name: 'Toggle Log in' }).click();
		await this.page.getByRole('link', { name: 'Join Artrabbit' }).click();
		return new SignUpPage(this.page);
	}
}
