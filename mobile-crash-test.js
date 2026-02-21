const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.emulate(puppeteer.KnownDevices['iPhone 12 Pro']);

    try {
        const bust = Math.random().toString(36).substring(7);
        const url = `https://www.acezen.in/?cachebust=${bust}`;
        console.log("Navigating to:", url);
        const response = await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
        console.log("Navigation finished.");

        const pageText = await page.evaluate(() => document.body.innerText);

        if (pageText.includes("CRITICAL PRODUCTION CRASH") || pageText.includes("Next.js failed to render")) {
            console.log("================ NEW ERROR BOUNDARY DETECTED ================");
            console.log(pageText);
            console.log("=============================================================");
        } else if (pageText.includes("Application error: a client-side exception has occurred")) {
            console.log("OLD ERROR DETECTED: Vercel is still serving the old deployment or cache.");
        } else {
            console.log("SUCCESS: No crash detected at all!");
            console.log("First 100 chars:", pageText.substring(0, 100));
        }
    } catch (err) {
        console.error("Navigation error:", err);
    } finally {
        await browser.close();
    }
})();
