import { AxiosResponse } from "axios";
import utils from "@/packages/helpers/src/utils";
import { type NextRequest, NextResponse } from "next/server";
import { URLResource } from "@/packages/types/src/utils.type";
import axiosServer from "@/packages/helpers/src/libs/axiosServer";
import { FruitSchema } from "@/packages/helpers/src/validations/fruits.validate";

const partURL = `/${URLResource.FRUITS}`;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Logic to fetch a single fruit by ID from your database
    // const fruit = await db.fruit.findUnique({ where: { id } });

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    return NextResponse.json({ 
      message: `Fetching details for fruit ${id}`,
      id: id,
      data: { name: "Example Fruit", color: "Example Color" } 
    });
    
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // Update logic...
  return NextResponse.json({ message: `Updated fruit ${id}` });
}

export async function DELETE(req: NextRequest,   { params }: { params: Promise<{ id: string }> }) {
  console.log("******** reached fruit api route base ********");
  try {
    const { id } = await params;
    const { backendClient } = await axiosServer();
    const result = (await backendClient.get(
      `${partURL}/${id}`
    )) as AxiosResponse;
    return NextResponse.json(result.data);
  } catch (err: unknown) {
    return NextResponse.json(utils.formatError(err));
  }
}
