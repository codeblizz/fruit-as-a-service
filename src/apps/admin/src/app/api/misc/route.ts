import { AxiosResponse } from "axios";
import { type NextRequest, NextResponse } from "next/server";

import utils from "@/packages/helpers/src/utils";
import { URLResource } from "@/packages/types/src/utils.type";
import axiosServer from "@/packages/helpers/src/libs/axiosServer";

const url = `/api/v1/auth/${URLResource.F_SERVICE}`;

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { backendClient } = await axiosServer();
    if (!utils.isObject(requestBody))
      throw utils.customError("Invalid Params", 401);
    const result = (await backendClient.post(
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
    const { backendClient } = await axiosServer();
    if (!utils.isObject(requestBody))
      throw utils.customError("Invalid Params", 401);
    const result = (await backendClient.get(
      url,
      requestBody
    )) as AxiosResponse;
    return NextResponse.json({ ...result.data, statusCode: result.status });
  } catch (err: unknown) {
    return NextResponse.json(utils.formatError(err));
  }
}
