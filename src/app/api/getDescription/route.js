// app/api/extract/route.js

import { NextResponse } from "next/server";
const puppeteer = require("puppeteer");

export async function POST(request) {
  try {
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

    const browser = await puppeteer.launch({ headless: true });
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
