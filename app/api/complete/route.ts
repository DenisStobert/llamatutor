// app/api/complete/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Parse the incoming request body
    const body = await req.json();
    
    // Make the request to the external API (Together API)
    const response = await fetch('https://api.together.ai/v1/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include any authentication headers, if necessary
        Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`, // Make sure to set this in your .env file
      },
      body: JSON.stringify(body), // Forward the incoming request body to the external API
    });

    // Check if the response from the external API is successful
    if (!response.ok) {
      throw new Error('Failed to fetch data from Together API');
    }

    // Get the data from the external API response
    const data = await response.json();
    
    // Return the data from the external API as the response to the client
    return NextResponse.json(data);
  } catch (error: unknown) {
    // Narrow the type of error to 'Error' and safely access the message
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      // Handle unexpected error types
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}
