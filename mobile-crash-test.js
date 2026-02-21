const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.emulate(puppeteer.KnownDevices['iPhone 12 Pro']);

    console.log("Navigating to localhost:3000...");

    try {
        const response = await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
        console.log("Navigation finished. HTTP Status:", response?.status());

        // Scrape for the Next.js error overlay
        await page.waitForFunction(() => !!document.querySelector('nextjs-portal'), { timeout: 10000 }).catch(() => { });

        const portal = await page.$('nextjs-portal');
        if (portal) {
            console.log("DETECTED NEXT.JS ERROR PORTAL.");
            // Next.js injects a shadow DOM for the error overlay. We need to query inside it.
            const errorText = await page.evaluate(() => {
                const portalNode = document.querySelector('nextjs-portal');
                if (portalNode && portalNode.shadowRoot) {
                    return portalNode.shadowRoot.textContent;
                }
                return portalNode ? portalNode.textContent : "No text found";
            });
            console.log("================ ERROR OVERLAY TEXT ================");
            console.log(errorText);
            console.log("====================================================");
        } else {
            console.log("No Next.js error portal detected.");
        }
    } catch (err) {
        console.error("Navigation error:", err);
    } finally {
        await browser.close();
    }
})();
