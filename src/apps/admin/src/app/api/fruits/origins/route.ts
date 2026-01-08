import axios, { AxiosResponse } from "axios";
import utils from "@/packages/helpers/src/utils";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const result = (await axios.get(
      "https://cdn.jsdelivr.net/npm/world-countries@latest/dist/countries.json"
    )) as AxiosResponse;
    return NextResponse.json(result.data);
  } catch (err: unknown) {
    return NextResponse.json(utils.formatError(err));
  }
}

export const dynamic = 'force-dynamic';
