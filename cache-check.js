const https = require('https');

https.get('https://www.acezen.in', (res) => {
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
        // Find all JS chunk URLs
        const scripts = [...data.matchAll(/src="([^"]+\.js)"/g)].map(m => m[1]);
        console.log("Found JS chunks:", scripts.length);

        let checked = 0;
        scripts.forEach(src => {
            const url = src.startsWith('http') ? src : `https://www.acezen.in${src.startsWith('/') ? '' : '/'}${src}`;
            https.get(url, (resJs) => {
                let jsData = '';
                resJs.on('data', c => { jsData += c; });
                resJs.on('end', () => {
                    checked++;
                    if (jsData.includes('maskImageTemplate')) {
                        console.log("✅ FOUND 'maskImageTemplate' IN BUNDLE:", url);
                    }
                    if (jsData.includes('useMotionTemplate`radial-gradient(')) {
                        if (jsData.includes('maskImageTemplate')) {
                            // already flagged
                        } else {
                            console.log("❌ OLD CODE DETECTED IN BUNDLE (Missing maskImageTemplate):", url);
                        }
                    }
                    if (checked === scripts.length) console.log("Done checking all chunks.");
                });
            }).on('error', () => { checked++; });
        });
    });
});
