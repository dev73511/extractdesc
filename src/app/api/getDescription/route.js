// app/api/extract/route.js

import { NextResponse } from "next/server";
const puppeteer = require("puppeteer");
const puppeteerCore = require("puppeteer-core");
const isDev = process.env.NODE_ENV === "development";

export async function POST(request) {
  let browser = null;

  try {
    if(isDev){
      browser = await puppeteer.launch({ headless: true });
    }else{
      browser = await puppeteerCore.connect({
        browserWSEndpoint: `wss://production-sfo.browserless.io/chromium?token=${process.env.BLESS_TOKEN}`,
      })
    }

    // Parse the request body
    const {data} = await request.json();
    const { url } = data
    // Simple validation
    if (!url || !url.includes("instagram.com")) {
      return NextResponse.json({ error: "Invalid or missing URL" }, { status: 400 });
    }

    // For now, we'll just return a mock caption.
    // const mockCaption = `Mock caption extracted from: ${url}`;
    // return NextResponse.json({ data: mockCaption }, { status: 200 });

    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });

    // Extract the post caption
    let caption = await page.evaluate(() => {
      const captionElement = document.querySelector("meta[property='og:description']");
      return captionElement ? captionElement.content : "No description found";
    });

    caption = caption?.replace(/^[\d\w,]+\s+likes,\s+[\d\w,]+\s+comments\s+-\s+.*?:\s*/i, '')?.replace(/^"+|"+$/g, '');  

    await browser.close();

    return NextResponse.json({ data: caption }, { status: 200 });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
