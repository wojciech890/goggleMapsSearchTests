import { Locator, Page } from '@playwright/test';

export class GoogleComMapsPage {
	readonly page: Page;
	readonly headline: Locator;
	readonly directionSearchbox: Locator;
	readonly searchboxInput: Locator;

	constructor(page: Page) {
		this.page = page;
		this.headline = page.locator('.DUwDvf');
		this.directionSearchbox = page.locator('#directions-searchbox-1 input');
		this.searchboxInput = page.locator('#searchboxinput');
	}

	async goto({ languageCode = 'en' } = {}) {
		// forced 'en' page version in case of different browsers/locations setup
		// changing to different language could cause assertions and locators failures
		await this.page.goto(`https://www.google.com/maps?hl=${languageCode}`);
	}

	async enterLocationName(locationName: string) {
		await this.searchboxInput.fill(locationName);
	}

	async clickSearchButton() {
		await this.page.locator('#searchbox-searchbutton').click();
	}
	async clickConsentButton() {
		await this.page.getByRole('button', { name: 'Accept all' }).click();
	}
	async clickRestaurantsButton() {
		await this.page.getByRole('button', { name: 'Restaurants' }).click();
	}

	async clickDirectionsButton() {
		const reg = new RegExp('Directions');
		await this.page.getByRole('button', { name: reg }).click();
	}
}
