import puppeteer from 'puppeteer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { imageUrl } = req.body;

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        });

        const page = await browser.newPage();

        await page.setContent(`
      <html>
        <body>
          <canvas id="canvas"></canvas>
          <script>
            async function convertImage() {
              const canvas = document.getElementById('canvas');
              const ctx = canvas.getContext('2d');
              
              const img = new Image();
              img.crossOrigin = 'anonymous';
              
              return new Promise((resolve) => {
                img.onload = () => {
                  canvas.width = img.width;
                  canvas.height = img.height;
                  ctx.drawImage(img, 0, 0);
                  resolve(canvas.toDataURL('image/png'));
                };
                img.src = '${imageUrl}';
              });
            }
          </script>
        </body>
      </html>
    `);

        const pngData = await page.evaluate(() => convertImage());

        await browser.close();

        const base64Data = pngData.replace(/^data:image\/png;base64,/, '');

        res.status(200).json({
            success: true,
            pngBase64: base64Data
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}