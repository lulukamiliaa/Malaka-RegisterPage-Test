const { test, expect } = require('@playwright/test');

test.describe('Register Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://dashboard.melaka.app/register');
      });
      
    //    TC 1: Positive Test Case -> Register Successfully 
    test('User can register successfully', async ({page}) =>{

        // Fill in the registration form
        await page.getByTestId('register__text-field__name').fill('user4');
        await page.getByTestId('register__text-field__phone-number').fill('89567554123');
        await page.getByTestId('register__text-field__business-name').fill('de house');

        // Select the business type radio button
        await page.getByTestId('register__radio-button__distributor').check();


        await page.getByTestId('register__text-field__email').fill('user4@gmail.com');
        await page.getByTestId('register__text-field__password').fill('TestUser123');
        await page.getByTestId('register__text-field__confirm-password').fill('TestUser123');

        // klik checkbox 
        await page.getByTestId('register__checkbox__tnc').check();
        await page.getByTestId('register__button__sign-up').click();
        
        //verify next page
        await expect(page).toHaveURL('https://dashboard.melaka.app/account-activation');
    })

    // // TC 2 : Registered user attempts to register again
    // test('Registered user cannot register again with the same credentials', async({page}) =>{
    // })

    // TC 3 : Register button is disabled if terms and condition is not checked
    test('User cannot click register button without checking terms and condition', async({page}) =>{
        
        const registerButton = await page.getByTestId('register__button__sign-up');
        await expect(registerButton).toBeDisabled();

    })
    // TC 4 : Positive Test Case -> Successfully redirected to Login Page after clicking Masuk
    test(' User successfully redirected to Login Page if clicking Masuk', async({page}) =>{
        await page.click("a[class='text-button']");
        await expect(page).toHaveURL('https://dashboard.melaka.app/login');
    })

    // TC 5 : empty Input Form -> Nama 
    test('Verify error validation for empty name input form', async({page}) =>{
        
        await page.getByTestId('register__text-field__name').click();
        await page.click('body');
        
        //verify 
        const errorMessage = await page.getByTestId('register__text-field__name__error');
        const errorText = await errorMessage.textContent();
        await expect(errorText).toBe('Wajib diisi.');
    })

    // TC 6 : empty Input Form -> Nomor Telepon
    test('Verify error validation for empty telephone number input form', async({page}) =>{
        await page.getByTestId('register__text-field__phone-number').click();
        await page.click('body');
        
        //verify 
        const errorMessage = await page.getByTestId('register__text-field__phone-number__error');
        const errorText = await errorMessage.textContent();
        await expect(errorText).toBe('Wajib diisi. Nomor telepon tidak boleh kurang dari 10 atau lebih dari 12 karakter.');
    })

    // TC 7 : empty Input Form -> Nama Bisnis
    test('Verify error validation for empty business name input form', async({page}) =>{
        await page.getByTestId('register__text-field__business-name').click();
        await page.click('body');
        
        //verify 
        const errorMessage = await page.getByTestId('register__text-field__business-name__error');
        const errorText = await errorMessage.textContent();
        await expect(errorText).toBe('Wajib diisi.');
    })

    // TC 8 : empty Input Form -> Email
    test('Verify error validation for empty email input form', async({page}) =>{
        await page.getByTestId('register__text-field__email').click();
        await page.click('body');
        
        //verify 
        const errorMessage = await page.getByTestId('register__text-field__email__error');
        const errorText = await errorMessage.textContent();
        await expect(errorText).toBe('Wajib diisi.');
    })

    // TC 9 : empty Input Form -> Kata Sandi
    test('Verify error validation for empty password input form', async({page}) =>{
        await page.getByTestId('register__text-field__password').click();
        await page.click('body');
        
        //verify 
        const errorMessage = await page.getByTestId('register__text-field__password__error');
        const errorText = await errorMessage.textContent();
        await expect(errorText).toBe('Wajib diisi.');
    })

    // TC 10 : Invalid name format (nama kurang dari 5 karakter)
    test('Verify error validation for invalid name format', async({page}) =>{
        await page.getByTestId('register__text-field__name').fill('us');
        await page.click('body');
        
        //verify 
        const errorMessage = await page.getByTestId('register__text-field__name__error');
        const errorText = await errorMessage.textContent();
        await expect(errorText).toBe('Wajib diisi, min. 5 karakter.');
    })

    // TC 11 : Invalid telephone number format (jumlah angka kurang dari 10 atau lebih dari 12)
    test('Verify error validation for invalid telephone number format', async({page}) =>{
        await page.getByTestId('register__text-field__phone-number').fill('13570');
        await page.click('body');
        
        //verify 
        const errorMessage = await page.getByTestId('register__text-field__phone-number__error');
        const errorText = await errorMessage.textContent();
        await expect(errorText).toBe('Wajib diisi. Nomor telepon tidak boleh kurang dari 10 atau lebih dari 12 karakter.');
    })

    // TC 12 : Invalid business name format (kurang dari 5 karakter)
    test(' User input less than 5 characters business name', async({page}) =>{
        await page.getByTestId('register__text-field__business-name').fill('de');
        await page.click('body');
        
        //verify 
        const errorMessage = await page.getByTestId('register__text-field__business-name__error');
        const errorText = await errorMessage.textContent();
        await expect(errorText).toBe('Wajib diisi, nama bisnis tidak boleh kurang dari 5 karakter.');
        
    })

    // TC 13 : Invalid business name format (menggunakan karakter selain titik, koma, strip)
    test('user input business name using semicolon, dash, or hyphen', async({page}) =>{
        await page.getByTestId('register__text-field__business-name').fill('de@#$%');
        await page.click('body');
        
        //verify 
        const errorMessage = await page.getByTestId('register__text-field__business-name__error');
        const errorText = await errorMessage.textContent();
        await expect(errorText).toBe('Tidak dapat menggunakan karakter spesial selain titik (.) koma (,) strip (-)');
        
    })

    // // TC 14 : Verify text below "Distributor" business type
    // test('', async({page}) =>{
        
    // })

    // // TC 15 : Verify text below "Toko Retail" business type
    // test('', async({page}) =>{
        
    // })

    // // TC 16 : Verify text below "Brand" business type
    // test('', async({page}) =>{
        
    // })

    // // TC 17 : Verify text below "Penjual Online" business type
    // test('', async({page}) =>{
        
    // })

    // TC 18 : Invalid email format
    test(' User input invalid email format', async({page}) =>{
        await page.getByTestId('register__text-field__email').fill('user4@.com');
        await page.click('body');
        
        //verify 
        const errorMessage = await page.getByTestId('register__text-field__email__error');
        const errorText = await errorMessage.textContent();
        await expect(errorText).toBe('Harap isi dengan format yang benar.');
        
    })

    // TC 19 : Invalid password format (kurang dari 8 karakter)
    test('User input less than 8 characters password', async({page}) =>{
        await page.getByTestId('register__text-field__password').fill('Tes');
        await page.click('body');
        
        //verify 
        const errorMessage = await page.getByTestId('register__text-field__password__error');
        const errorText = await errorMessage.textContent();
        await expect(errorText).toBe('Min. 8 karakter, harus kombinasi dari huruf dan angka.');

    })

    // TC 20 : Invalid password format (hanya terdiri dari huruf/angka)
    test(' User only input alphabetical password', async({page}) =>{
        await page.getByTestId('register__text-field__password').fill('Testnewuser');
        await page.click('body');
        
        //verify 
        const errorMessage = await page.getByTestId('register__text-field__password__error');
        const errorText = await errorMessage.textContent();
        await expect(errorText).toBe('Min. 8 karakter, harus kombinasi dari huruf dan angka.');
    })

    // TC 21 : Confirmation Password doesn't match with password
    test(' Verify error validation for mismatched confirmation password', async({page}) =>{
        await page.getByTestId('register__text-field__password').fill('Testnewuser123');
        await page.getByTestId('register__text-field__confirm-password').fill('TestUser123');
        await page.click('body');
        
        //verify 
        const errorMessage = await page.getByTestId('register__text-field__confirm-password__error');
        const errorText = await errorMessage.textContent();
        await expect(errorText).toBe('Belum sesuai dengan kata sandi.');
    })

    // TC 22 : Empty Confirmation password (isi dahulu password)
    test('Verify error Validation for empty Confirmation password', async({page}) =>{
        
        await page.fill('input[data-testid="register__text-field__password"]', 'Testnewuser123');
        await page.getByTestId('register__text-field__confirm-password').click();
        await page.click('body');
        
        //verify 
        const errorMessage = await page.getByTestId('register__text-field__confirm-password__error');
        const errorText = await errorMessage.textContent();
        await expect(errorText).toBe('Wajib diisi.');
    })
    
})
