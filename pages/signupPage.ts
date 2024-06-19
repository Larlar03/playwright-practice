import { Page } from '@playwright/test';

type UserDetails = {
	emailAddress: string;
	screenName: string;
	password: string;
	countryCode: string;
	realName: string;
};

export class SignUpPage {
	page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async fillOutForm(user: UserDetails): Promise<void> {
		await this.page.getByLabel('Email address').fill(user.emailAddress);
		await this.page.getByLabel('Screen name').fill(user.screenName);
		await this.page.getByLabel('Password').fill(user.password);
		await this.page
			.getByLabel('Where do you live?')
			.selectOption({ value: user.countryCode });
		await this.page.getByLabel('Real Name').fill(user.realName);
	}

	async submitForm() {}
}
