import { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";
import axiosServer from '@/packages/helpers/src/libs/axiosServer';

import utils from "@/packages/helpers/src/utils";
import { URLResource } from "@/packages/types/src/utils.type";
import { SigninSchema } from "@/packages/helpers/src/validations/auth.validate";

const url = `/auth/${URLResource.SIGNIN}`;

export async function POST(req: NextRequest) {
  try {
    const { backendClient } = await axiosServer();
    const requestBody = await req.json();
    const validatedRequestBody = SigninSchema.parse(requestBody);
    if (!utils.isObject(validatedRequestBody))
      throw utils.customError("Invalid object request body", 401);
    const result = (await backendClient.post(
      url,
      validatedRequestBody
    )) as unknown as AxiosResponse;
    return NextResponse.json(result.data);
  } catch (err: unknown) {
    return NextResponse.json(utils.formatError(err));
  }
}
