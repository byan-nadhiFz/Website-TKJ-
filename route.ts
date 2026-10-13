import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ reply: '⚠️ GROQ_API_KEY belum dikonfigurasi di .env.local' });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content:
              'Kamu adalah AI Cyber Assistant di LABSiber XI TKJ 3. Berikan petunjuk (hint) edukatif tentang konsep SQL Injection tanpa memberikan payload langsung.',
          },
          { role: 'user', content: message },
        ],
      }),
    });

    const data = await response.json();
    const replyText = data.choices?.[0]?.message?.content || 'Tidak ada balasan dari AI.';
    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    return NextResponse.json({ reply: `Server Error: ${error.message}` });
  }
}