import { AxiosResponse } from "axios";
import { type NextRequest, NextResponse } from "next/server";

import utils from "@/packages/helpers/src/utils";
import { AsConstant } from "@/packages/types/src/utils.type";
import { createAxiosClients } from "@/packages/helpers/src/libs/axiosClients";

const url = `/api/v1/auth/${AsConstant.F_SERVICE}`;

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { nodeAxiosClient } = await createAxiosClients();
    if (!utils.isObject(requestBody))
      throw utils.customError("Invalid Params", 401);
    const result = (await nodeAxiosClient.post(
      url,
      requestBody
    )) as AxiosResponse;
    return NextResponse.json({ ...result.data, statusCode: result.status });
  } catch (err: unknown) {
    return NextResponse.json(utils.formatError(err));
  }
}

export async function GET(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { nodeAxiosClient } = await createAxiosClients();
    if (!utils.isObject(requestBody))
      throw utils.customError("Invalid Params", 401);
    const result = (await nodeAxiosClient.get(
      url,
      requestBody
    )) as AxiosResponse;
    return NextResponse.json({ ...result.data, statusCode: result.status });
  } catch (err: unknown) {
    return NextResponse.json(utils.formatError(err));
  }
}
