// @ts-nocheck
import prismaclient from '@/services/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_id, company_id, comment, rating } = body;

    const newReview = await prismaclient.review.create({
      data: body
    });
    return NextResponse.json({
      success: true,
      message: 'Review added successfully',
      review: newReview,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Something went wrong while adding the review',
    }, { status: 500 });
  }
}
