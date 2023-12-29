import { config } from "@/shared/config";

export const api = {
  // log(method: string, url: string) {
  //   const from = isSSR ? "server " : "client ";
  //   const date = new Date();
  //   const str = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}: ${from}${method}: ${
  //     config.apiUrl
  //   }/${url}`;
  //
  //   process.env.NODE_ENV === "development"
  //     ? console.log(str)
  //     : isSSR && console.log(str);
  // },
  async get(url: string) {
    try {
      // this.log("get", url);
      const res = await fetch(`${config.apiUrl}/${url}`, {
        headers: { "x-api-key": config.apiKey ?? "" },
      });
      if (res.ok) {
        return await res.json();
      } else {
        return Promise.reject(
          `${url}${res.statusText && `: ${res.statusText}`}`
        );
      }
    } catch (error) {
      throw new Error(`Request: ${error}`);
    }
  },
  async post(url: string, body: Record<string, unknown>) {
    // this.log("post", url);
    try {
      const res = await fetch(`${config.apiUrl}/${url}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": config.apiKey ?? "",
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (res.ok) {
        return json;
      } else {
        return Promise.reject(json);
      }
    } catch (error) {
      throw new Error(`Request: ${error}`);
    }
  },
};

export const fetchWithTimeout = (
  url: string,
  options?: RequestInit | undefined,
  timeout = 7000
) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), timeout)
    ),
  ]);
};
