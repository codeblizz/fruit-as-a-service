import { AxiosResponse } from "axios";
import utils from "@/packages/helpers/src/utils";
import { type NextRequest, NextResponse } from "next/server";
import { URLResource } from "@/packages/types/src/utils.type";
import axiosServer from "@/packages/helpers/src/libs/axiosServer";

const url = `/${URLResource.FRUITS}/${URLResource.FRUIT_CATEGORIES}`;

export async function GET(req: NextRequest) {
  try {
    const { backendClient } = await axiosServer();
    const result = (await backendClient.get(url)) as unknown as AxiosResponse;
    return NextResponse.json(result.data);
  } catch (err: unknown) {
    return NextResponse.json(utils.formatError(err));
  }
}
