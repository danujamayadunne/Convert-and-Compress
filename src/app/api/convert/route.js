import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { imageUrl } = await req.json();

  try {
    // Launch Puppeteer browser instance
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Use a CORS proxy if needed
    const corsProxy = "https://cors-anywhere.herokuapp.com/";
    const imageUrlWithCors = corsProxy + imageUrl; // Only if necessary

    // Set the page content and load the image
    await page.setContent(`
      <html>
        <body>
          <canvas id="canvas" width="800" height="600"></canvas>
          <img id="img" src="${imageUrlWithCors}" style="display: none;" crossorigin="anonymous" />
        </body>
      </html>
    `);

    // Wait for the image to load
    await page.waitForSelector('#img');

    // Convert image to data URL and return as PNG
    const buffer = await page.evaluate(() => {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      const img = document.getElementById('img');

      if (img.complete && img.naturalWidth !== 0) {
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL('image/png');
      } else {
        throw new Error("Image failed to load or CORS issue.");
      }
    });

    const imageBuffer = Buffer.from(buffer.split(',')[1], 'base64');
    await browser.close();

    // Return the image as a response
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (error) {
    console.error(error);

    return new NextResponse(
      JSON.stringify({ error: 'Image conversion failed' }),
      { status: 500 }
    );
  }
}
