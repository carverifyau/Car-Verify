import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'DEPLOYMENT TEST SUCCESS',
    time: new Date().toISOString(),
    commit: '7488421',
    message: 'This endpoint was created to test if deployments are working',
    test_number: Math.random()
  })
}

export async function POST() {
  return NextResponse.json({
    status: 'POST DEPLOYMENT TEST SUCCESS',
    time: new Date().toISOString(),
    commit: '7488421',
    message: 'This POST endpoint tests if new deployments are working'
  })
}