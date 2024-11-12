import puppeteer from 'puppeteer';

export async function POST(req) {
    try {
        const data = await req.json();
        const { imageUrl } = data;

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

        return new Response(JSON.stringify({
            success: true,
            pngBase64: base64Data
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}