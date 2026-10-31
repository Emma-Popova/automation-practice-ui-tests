import { test, expect } from '../utils/fixtures';

test.describe('Test Case 9: Search Product', () => {

test('should search for a product by name', async ({ page }) => {

        await page.getByRole('link', {name: "Products"}).click();

        await expect(page).toHaveURL('/products');
        await expect(page.getByText('All Products')).toBeVisible();

        const searchTextbox = page.getByRole('textbox', {name: 'Search Product'});
        const searchButton = page.locator('#submit_search');

        await searchTextbox.fill('Frozen Tops For Kids');
        await searchButton.click();

        const searchedProduct = page.locator('.productinfo p');
        await expect(searchedProduct.first()).toHaveText('Frozen Tops For Kids');
      

    });

});

