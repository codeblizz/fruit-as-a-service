import { AxiosResponse } from "axios";
import utils from "@/packages/helpers/src/utils";
import { type NextRequest, NextResponse } from "next/server";
import { URLResource } from "@/packages/types/src/utils.type";
import axiosServer from "@/packages/helpers/src/libs/axiosServer";
import { FruitCategorySchema } from "@/packages/helpers/src/validations/fruits.validate";

const url = `/${URLResource.FRUITS}/${URLResource.FRUIT_CATEGORIES}`;

export async function GET(req: NextRequest) {
  console.log("******** reached fruit Category GET API route ********");
  try {
    const { backendClient } = await axiosServer();
    const result = (await backendClient.get(url)) as unknown as AxiosResponse;
    return NextResponse.json(result.data);
  } catch (err: unknown) {
    return NextResponse.json(utils.formatError(err));
  }
}

export async function PUT(req: NextRequest) {
  console.log("******** reached fruit Category PUT API route ********");
  try {
    const requestBody = await req.json();
    const { backendClient } = await axiosServer();
    const validatedRequestBody = FruitCategorySchema.parse(requestBody);
    const result = (await backendClient.get(`${url}/`)) as AxiosResponse;
    return NextResponse.json(result.data);
  } catch (err: unknown) {
    return NextResponse.json(utils.formatError(err));
  }
}

export async function DELETE(req: NextRequest) {
  console.log("******** reached fruit Category DELETE api route ********");
  try {
    const requestBody = await req.json();
    const { backendClient } = await axiosServer();
    const validatedRequestBody = FruitCategorySchema.parse(requestBody);
    const result = (await backendClient.get(`${url}/`)) as AxiosResponse;
    return NextResponse.json(result.data);
  } catch (err: unknown) {
    return NextResponse.json(utils.formatError(err));
  }
}
