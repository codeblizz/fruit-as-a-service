import { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

import utils from "@/packages/helpers/src/utils";
import { URLResource } from "@/packages/types/src/utils.type";
import createAxiosClients from "@/packages/helpers/src/libs/axiosClients";

const url = `/api/v1/auth/${URLResource.SIGNIN}`;

export async function POST(req: NextRequest) {
  try {
    const { nodeAxiosClient } = createAxiosClients();
    const requestBody = await req.json();
    if (!utils.isObject(requestBody))
      throw utils.customError("Invalid Params", 401);
    const result = (await nodeAxiosClient.post(
      url,
      requestBody
    )) as unknown as AxiosResponse;
    return NextResponse.json({ message: "Sign In Successful", status: "Ok" });
    // return NextResponse.json({ ...result.data, statusCode: result.status });
  } catch (err: unknown) {
    return NextResponse.json(utils.formatError(err));
  }
}
