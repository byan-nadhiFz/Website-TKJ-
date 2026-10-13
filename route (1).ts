import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('file') || '';

  if (!filename) {
    return NextResponse.json({ error: 'Parameter file dibutuhkan' }, { status: 400 });
  }

  // Path Traversal Vulnerability
  const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

  try {
    const fileBuffer = fs.readFileSync(filePath);
    
    // Deteksi tipe file secara otomatis
    let contentType = 'text/plain';
    if (filename.endsWith('.json')) contentType = 'application/json';
    else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) contentType = 'image/jpeg';
    else if (filename.endsWith('.png')) contentType = 'image/png';

    return new NextResponse(fileBuffer, {
      headers: { 'Content-Type': contentType },
    });
  } catch (error) {
    return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 404 });
  }
}