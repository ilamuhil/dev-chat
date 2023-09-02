import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  console.log(process.env.DB_CONNECT_URI)
  if (process.env.DB_CONNECT_URI === undefined) {
    throw new Error('DB_CONNECT_URI is not defined')
  } else {
    try {
      console.log('connected')
    } catch (err) {
      console.log('Mongoose connection failure', err)
    }
  }
  console.log(request.body)
  const responseBody = JSON.stringify(request.body)

  return new NextResponse(responseBody, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
