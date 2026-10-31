import { test, expect } from '../utils/fixtures';

test.describe('Test Case 8: Verify All Products and product detail page', () => {

    test('should display all products and product details', async ({ page }) => {

        await page.getByRole('link', {name: "Products"}).click();

        await expect(page).toHaveURL('/products');
        await expect(page.getByText('All Products')).toBeVisible();

        const products = page.locator('.features_items .product-image-wrapper');

        await expect(products.first()).toBeVisible();
        await expect(products).not.toHaveCount(0);

        const viewProductLink = page.getByRole('link', {name: "View Product"});
        await viewProductLink.first().click();
        
        await expect(page).toHaveURL('/product_details/1');

        //product detail: product name, category, price, availability, condition, brand
        const productInformation = page.locator('.product-information');

        const productName = productInformation.getByRole('heading', { name: 'Blue Top' });
        const productCategory = productInformation.getByText('Category: Women > Tops');
        const productPrice = productInformation.getByText('Rs. 500');
        const productAvalability = productInformation.getByText('Availability:');
        const productCondition = productInformation.getByText('Condition: New');
        const productBrand = productInformation.getByText('Brand: Polo');

        await expect(productName).toBeVisible();
        await expect(productCategory).toBeVisible();
        await expect(productPrice).toBeVisible();
        await expect(productAvalability).toBeVisible();
        await expect(productCondition).toBeVisible();
        await expect(productBrand).toBeVisible();


        
    });
});