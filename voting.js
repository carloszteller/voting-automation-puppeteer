const csv = require('csv-parser');
const fs = require('fs');
const puppeteer = require('puppeteer');

const voters = [];

fs.createReadStream('people-100.csv')
.on('error', error => {
    console.error(error);
})
.pipe(csv())
.on('data', data => {
    const voter = {
        firstName: data['First Name'],
        lastName: data['Last Name'],
        email: data['Email']
    }

    voters.push(voter);
});

const closeDelay = milliseconds => {
    return new Promise(r => {
        setTimeout(r, milliseconds);
    });
}

const vote = async (voter) => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto('https://www.some-voting-page.com');

    let gsBtn = await page.waitForSelector('button[data-id="23"]');
    await gsBtn.click();

    let firstNameInput = await page.waitForSelector('#custom_2_first');
    await firstNameInput.type(voter.firstName);

    let lastNameInput = await page.waitForSelector('#custom_2_last');
    await lastNameInput.type(voter.lastName);

    let emailInput = await page.waitForSelector('#email_id');
    await emailInput.type(voter.email);
	
    let enterBtn = await page.waitForSelector('#actionbutton');
    await enterBtn.click();

    await closeDelay(1000);

	await browser.close();
}

let i = 0;
let interval = setInterval(() => {
    vote(voters[i]);

    if((i + 1) == voters.length) clearInterval(interval);
    i++;
}, 5000);