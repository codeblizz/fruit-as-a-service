import { AxiosResponse } from "axios";
import utils from "@/packages/helpers/src/utils";
import { type NextRequest, NextResponse } from "next/server";
import { URLResource } from "@/packages/types/src/utils.type";
import axiosServer from "@/packages/helpers/src/libs/axiosServer";
import { FruitInventorySchema } from "@/packages/helpers/src/validations/fruits.validate";

const url = `/fruits/${URLResource.FRUIT_INVENTORY}`;

export async function GET(req: NextRequest) {
  console.log("******** reached fruit inventory api route ********");
  try {
    const { backendClient } = await axiosServer();
    const result = (await backendClient.get(url)) as unknown as AxiosResponse;
    return NextResponse.json(result.data);
  } catch (err: unknown) {
    return NextResponse.json(utils.formatError(err));
  }
}

export async function PUT(req: NextRequest) {
  console.log("******** reached fruit inventory api route ********");
  try {
    const requestBody = await req.json();
    const { backendClient } = await axiosServer();
    const validatedRequestBody = FruitInventorySchema.parse(requestBody);
    const result = (await backendClient.get(`${url}/`)) as AxiosResponse;
    return NextResponse.json(result.data);
  } catch (err: unknown) {
    return NextResponse.json(utils.formatError(err));
  }
}

export async function DELETE(req: NextRequest) {
  console.log("******** reached fruit inventory api route ********");
  try {
    const requestBody = await req.json();
    const { backendClient } = await axiosServer();
    const validatedRequestBody = FruitInventorySchema.parse(requestBody);
    const result = (await backendClient.get(`${url}/`)) as AxiosResponse;
    return NextResponse.json(result.data);
  } catch (err: unknown) {
    return NextResponse.json(utils.formatError(err));
  }
}
