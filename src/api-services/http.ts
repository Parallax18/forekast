import { toast } from "sonner";

type HttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DEL";

async function FETCH<T>({
  method,
  url,
}: {
  method: HttpMethods;
  url: string;
  body?: unknown;
}): Promise<T> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    toast("Event has not been created");
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return (await response.json()) as T;
}

export class HttpClient {
  static async get<T>({
    url,
    params,
  }: {
    url: string;
    params?: unknown;
  }): Promise<T> {
    let queryString = "";
    if (params) {
      queryString =
        "?" + new URLSearchParams(params as Record<string, string>).toString();
    }
    console.log(params, queryString);
    return FETCH<T>({ method: "GET", url: `${url}${queryString}` });
  }

  static async post<T>({
    url,
    body,
  }: {
    url: string;
    body: unknown;
  }): Promise<T> {
    return FETCH<T>({ method: "POST", url, body: JSON.stringify(body) });
  }

  static async put<T>({
    url,
    body,
  }: {
    url: string;
    body: unknown;
  }): Promise<T> {
    return FETCH<T>({ method: "PUT", url, body: JSON.stringify(body) });
  }

  static async patch<T>({
    url,
    body,
  }: {
    url: string;
    body: unknown;
  }): Promise<T> {
    return FETCH<T>({ method: "PATCH", url, body: JSON.stringify(body) });
  }

  static async delete<T>({ url }: { url: string }): Promise<T> {
    return FETCH<T>({ method: "DEL", url });
  }
}
