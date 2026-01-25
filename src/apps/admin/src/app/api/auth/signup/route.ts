import type { AxiosResponse } from "axios";
import { type NextRequest, NextResponse } from "next/server";

import utils from "@/packages/helpers/src/utils";
import { URLResource } from "@/packages/types/src/utils.type";
import axiosServer from "@/packages/helpers/src/libs/axiosServer";
import { SignupSchema } from "@/packages/helpers/src/validations/auth.validate";

const url = `/auth/${URLResource.SIGNUP}`;

export async function POST(req: NextRequest) {
  try {
    const { backendClient } = await axiosServer();
    const requestBody = await req.json();
    const validatedRequestBody = SignupSchema.parse(requestBody);
    if (!utils.isObject(validatedRequestBody))
      throw utils.customError("Invalid object request body", 401);
    const result = (await backendClient.post(url, validatedRequestBody, {
      skipAuth: true,
    })) as unknown as AxiosResponse;
    return NextResponse.json(result.data);
  } catch (err: unknown) {
    return NextResponse.json(utils.formatError(err));
  }
}
