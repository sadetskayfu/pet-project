const BASE_URL = 'http://localhost:3000';

type ErrorData = {
  message?: string
  statusCode?: number
  error?: string
}

export class ApiError extends Error {
  readonly data: ErrorData

  constructor(data: ErrorData) {
    super(`Api error ${data.statusCode}: ${data.message}`);
    this.data = data
    this.name = 'ApiError'
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export const jsonApiInstance = async <T>(
  url: string,
  init?: RequestInit & { json?: unknown; formData?: FormData }
) => {

  let headers = init?.headers ?? {}

  if(init?.json) {
    headers = {
        ...headers,
        'Content-Type': 'application/json',
  }

    init.body = JSON.stringify(init.json)
  } else if (init?.formData) {
    init.body = init.formData
  }

  const result = await fetch(`${BASE_URL}${url}`, {
    ...init,
    headers,
    credentials: 'include'
  });

  if (!result.ok) {
    let errorData = {}

    try {
       errorData = await result.json()
       // eslint-disable-next-line
    }  catch(e) {}

    throw new ApiError(errorData);
  }

  const data = (await result.json()) as Promise<T>;

  return data;
};
