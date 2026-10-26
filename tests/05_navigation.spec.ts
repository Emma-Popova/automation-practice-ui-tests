import { test, expect } from '../utils/fixtures';

test.describe('Verify Test Cases Page', () => {
     test('', async({page}) => {

        await page.getByRole('button', {name: 'Test Cases'}).click();
        await expect(page).toHaveURL('/test_cases');
        await expect(page.getByRole('heading', { name: 'Test Cases', exact:true })).toBeVisible();


    });

     test('should open Test Case 1: Register User', async({page}) => {
        await page.getByRole('button', { name: 'Test Cases' }).click();
        await page.getByRole('link', { name: 'Test Case 1: Register User' }).click();
        const testCaseInstructions = page.locator('#collapse1');

        await expect(testCaseInstructions.getByText("1. Launch browser", { exact: true })).toBeVisible();
        await expect(testCaseInstructions.getByText("15. Click 'Continue' button", { exact: true })).toBeVisible();
        await expect(testCaseInstructions.getByText("17. Click 'Delete Account' button", { exact: true })).toBeVisible();
 
        await page.getByRole('link', { name: 'Test Case 1: Register User' }).click(); 
        await expect(testCaseInstructions.getByText('1. Launch browser', { exact: true })).not.toBeVisible();   

    });
       
     test('should open Test Case 2: Login User with correct email and password', async({page}) => {
        await page.getByRole('button', { name: 'Test Cases' }).click();
        await page.getByRole('link', { name: 'Test Case 2: Login User with correct email and password' }).click();
        const testCaseInstructions = page.locator('#collapse2');

        await expect(testCaseInstructions.getByText("3. Verify that home page is visible successfully", { exact: true })).toBeVisible();
        await expect(testCaseInstructions.getByText("7. Click 'login' button", { exact: true })).toBeVisible();
        await expect(testCaseInstructions.getByText("10. Verify that 'ACCOUNT DELETED!' is visible", { exact: true })).toBeVisible();

        await page.getByRole('link', { name: 'Test Case 2: Login User with correct email and password' }).click();
        await expect(testCaseInstructions.getByText("3. Verify that home page is visible successfully", { exact: true })).not.toBeVisible();   


    });

     test('should open Test Case 3: Login User with incorrect email and password', async({page}) => {
        await page.getByRole('button', { name: 'Test Cases' }).click();
        await page.getByRole('link', { name: 'Test Case 3: Login User with incorrect email and password' }).click();
        const testCaseInstructions = page.locator('#collapse3');

        await expect(testCaseInstructions.getByText("3. Verify that home page is visible successfully", { exact: true })).toBeVisible();
        await expect(testCaseInstructions.getByText("7. Click 'login' button", { exact: true })).toBeVisible();

        await page.getByRole('link', { name: 'Test Case 3: Login User with incorrect email and password' }).click();
        await expect(testCaseInstructions.getByText("7. Click 'login' button", { exact: true })).not.toBeVisible();

    });
         test('should open Test Case 9: Search Product', async({page}) => {
        await page.getByRole('button', { name: 'Test Cases' }).click();
        await page.getByRole('link', { name: 'Test Case 9: Search Product' }).click();
        const testCaseInstructions = page.locator('#collapse9');

        await expect(testCaseInstructions.getByText("4. Click on 'Products' button", { exact: true })).toBeVisible();
        await expect(testCaseInstructions.getByText("6. Enter product name in search input and click search button", { exact: true })).toBeVisible();
        await expect(testCaseInstructions.getByText("8. Verify all the products related to search are visible", { exact: true })).toBeVisible();

        await page.getByRole('link', { name: 'Test Case 9: Search Product' }).click();
        await expect(testCaseInstructions.getByText("8. Verify all the products related to search are visible", { exact: true })).not.toBeVisible();


    });
   
});

    
