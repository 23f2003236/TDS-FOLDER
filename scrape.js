const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [16,17,18,19,20,21,22,23,24,25];
  let grandTotal = 0;

  for (let seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    await page.waitForSelector("table");

    const sum = await page.evaluate(() => {
      let total = 0;
      document.querySelectorAll("table td").forEach(td => {
        const value = parseFloat(td.innerText);
        if (!isNaN(value)) total += value;
      });
      return total;
    });

    console.log(`Seed ${seed} sum: ${sum}`);
    grandTotal += sum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();
