// app/api/generate-pdf/route.ts

import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { generateResumeHTML } from '@/lib/pdf/templateRenderer';
import { getTemplateById } from '@/lib/templates/templateUtils';

export async function POST(request: NextRequest) {
  try {
    const { resume, templateId } = await request.json();

    // Validate input
    if (!resume || !templateId) {
      return NextResponse.json(
        { error: 'Resume data and template ID are required' },
        { status: 400 }
      );
    }

    // Get template
    const template = getTemplateById(templateId);
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // Generate HTML
    let html: string;
    try {
      html = generateResumeHTML(resume, template);
      console.log('HTML generated successfully for template:', templateId);
    } catch (htmlError) {
      console.error('HTML Generation Error:', htmlError);
      throw new Error(`Failed to generate HTML: ${htmlError instanceof Error ? htmlError.message : 'Unknown error'}`);
    }

    // Launch Puppeteer
    console.log('Launching Puppeteer browser...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      console.log('Creating new page...');
      const page = await browser.newPage();

      // Set content
      console.log('Setting HTML content...');
      await page.setContent(html, {
        waitUntil: 'networkidle0',
      });

      // Generate PDF
      console.log('Generating PDF...');
      const pdfBuffer = await page.pdf({
        format: 'Letter',
        printBackground: true,
        margin: {
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
        },
      });

      console.log('PDF generated successfully');
      await browser.close();

      // Create filename
      const filename = `${resume.title || 'Resume'}_${template.name.replace(/\s+/g, '_')}.pdf`;

      // Return PDF
      return new NextResponse(Buffer.from(pdfBuffer), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    } catch (puppeteerError) {
      await browser.close();
      throw puppeteerError;
    }
  } catch (error) {
    console.error('PDF Generation Error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });
    return NextResponse.json(
      {
        error: 'Failed to generate PDF',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}