import { AxiosResponse } from "axios";
import utils from "@/packages/helpers/src/utils";
import { type NextRequest, NextResponse } from "next/server";
import { URLResource } from "@/packages/types/src/utils.type";
import axiosServer from "@/packages/helpers/src/libs/axiosServer";
import { FruitSchema } from "@/packages/helpers/src/validations/fruits.validate";

const partURL = `/${URLResource.FRUITS}`;

export async function GET(req: NextRequest) {
  console.log("******** reached fruit GET api route ********");
  try {
    const { backendClient } = await axiosServer();
    const result = (await backendClient.get(
      partURL
    )) as unknown as AxiosResponse;
    return NextResponse.json(result.data);
  } catch (err: unknown) {
    return NextResponse.json(utils.formatError(err));
  }
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";

  if (!contentType.includes("multipart/form-data")) {
    return new Response(
      JSON.stringify({ 
        error: "Client Error", 
        message: `Expected multipart/form-data but received: ${contentType}. Check your frontend fetch call.` 
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    const { backendClient } = await axiosServer();
    const incomingFormData = await req.formData();
    const metadataStr = incomingFormData.get("metadata") as string;
    // Prepare backend payload for Java Spring Boot
    const backendFormData = new FormData();
    if (!metadataStr) {
      throw utils.customError("Metadata part is missing", 400);
    }

    const parsedData = JSON.parse(metadataStr);

    const validatedParsedData = FruitSchema.parse(parsedData);

    const jsonBlob = new Blob([JSON.stringify(validatedParsedData)], {
      type: "application/json",
    });

    backendFormData.append("request", jsonBlob, "request.json");

    // Handle the "images" part (List<MultipartFile>)
    const images = incomingFormData.getAll("images");

    if (images.length === 0) {
      throw utils.customError("No images found in the request", 401);
    }

    images.forEach((image) => {
      backendFormData.append("images", image);
    });

    const result = (await backendClient.post(partURL, backendFormData)) as unknown as AxiosResponse;
    return NextResponse.json(result.data);
  } catch (err: unknown) {
    return NextResponse.json(utils.formatError(err));
  }
}
