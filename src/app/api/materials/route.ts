import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Material from '@/models/Material';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// GET - Fetch materials
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    console.log('=== Materials GET: Starting ===');

    const { searchParams } = new URL(request.url);
    const teacherId = searchParams.get('teacherId');
    const subject = searchParams.get('subject');
    const classParam = searchParams.get('class');
    const search = searchParams.get('search');

    let query: any = {};

    if (teacherId) {
      query.teacherId = teacherId;
    }
    if (subject) {
      query.subject = subject;
    }
    if (classParam) {
      query.class = classParam;
    }
    if (search) {
      query.$text = { $search: search };
    }

    console.log('=== Materials GET: Query ===', query);

    const materials = await Material.find(query)
      .populate('teacherId', 'name email role')
      .sort({ uploadDate: -1 });

    console.log('=== Materials GET: Found ===', materials.length);

    return NextResponse.json({ success: true, data: materials });
  } catch (error: any) {
    console.error('=== Materials GET: Error ===', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Create material
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    console.log('=== Materials POST: Starting ===');

    // Get authenticated user from token
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };

    // Only teachers can upload materials
    if (decoded.role !== 'teacher') {
      return NextResponse.json({ error: 'Only teachers can upload materials' }, { status: 403 });
    }

    const body = await request.json();
    console.log('=== Materials POST: Body ===', body);

    // Add teacherId from authenticated user
    const materialData = {
      ...body,
      teacherId: decoded.userId,
    };

    const material = await Material.create(materialData);
    console.log('=== Materials POST: Created ===', material._id);

    const populatedMaterial = await Material.findById((material as any)._id)
      .populate('teacherId', 'name email role');

    return NextResponse.json({ success: true, data: populatedMaterial }, { status: 201 });
  } catch (error: any) {
    console.error('=== Materials POST: Error ===', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// PUT - Update material
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { id, action, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: 'Material ID is required' }, { status: 400 });
    }

    let material;

    if (action === 'incrementViews') {
      material = await Material.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true }
      );
    } else {
      material = await Material.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
    }

    if (!material) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: material });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE - Delete material
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Material ID is required' }, { status: 400 });
    }

    const material = await Material.findByIdAndDelete(id);

    if (!material) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
