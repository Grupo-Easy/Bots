const puppeteer = require("puppeteer");
const settings = require("./settings-Uber.json");
const readline = require("readline-sync");

(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("https://drivers.uber.com");
  await readline.question("Press");
  const cookies = await page.cookies();
  console.log(cookies);
})();
