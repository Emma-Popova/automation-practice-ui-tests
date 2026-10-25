import { test, expect } from '../utils/fixtures';
import path from 'node:path';

test.describe('Test Case 6: Contact Us Form',()=> {
 
   test('Contact Us Form', async({page}) => {
       await page.getByRole('link', {name: ' Contact us'}).click();

       await expect(page.getByText('Get In Touch')).toBeVisible();
      
       //Contact form locators
   //    const inputName = page.getByRole('textbox', {name: 'Name'});
   //    const inputEmail = page.getByRole('textbox', {name: 'Email'});
   //    const inputSubject = page.getByRole('textbox', {name: 'Subject'});
   //    const inputMessage = page.getByRole('textbox',{name: 'Your Message Here'});
   //    const submitButton = page.getByRole('button',{name: 'Submit'});
      const inputName = page.locator('[data-qa="name"]');
      const inputEmail = page.locator('[data-qa="email"]');
      const inputSubject = page.locator('[data-qa="subject"]');
      const inputMessage = page.locator('[data-qa="message"]');
      const uploadFileInput = page.locator('input[type="file"]');
      const submitButton = page.locator('[data-qa="submit-button"]');
     

      const username = process.env.REGISTER_USERNAME;
      const email = process.env.TEST_EMAIL;

        if (!email) {
           throw new Error('TEST_EMAIL is not defined in the environment variables.');
       }
        if (!username) {
            throw new Error('REGISTER_USERNAME is not defined in the environment variables.');
       }

       await inputName.fill(username);
       await inputEmail.fill(email);
       await inputSubject.fill('A question about my order.');
       await inputMessage.fill('Are you expecting to receive a smaller size?');

       const filePath = path.resolve(__dirname, '../test-data/test-file.txt');
       await uploadFileInput.setInputFiles(filePath);

       await submitButton.click();

       const successMessage = page.getByText('We really appreciate your response to our website.');
       await expect(successMessage).toBeVisible();

       await page.getByRole('link', {name: 'Home'}).click();
       await expect(page).toHaveURL('/');

   })
});
