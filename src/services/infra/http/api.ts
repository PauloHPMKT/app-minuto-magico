import type { ChildToCreateDTO, CreateChildFetchHttp } from "../../data/protocols/create-child-fetch-http";
import type { GetChildrenFetchHttp } from "../../data/protocols/get-children-fetch-http";

export class ApiConnection implements GetChildrenFetchHttp, CreateChildFetchHttp {
  constructor(private readonly url: string) {}

  async get(): Promise<Response> {
    const data = await fetch(`${this.url}/children`);
    const response = await data.json();
    return response;
  }

  async post(child: ChildToCreateDTO): Promise<Response> {
    const data = await fetch(`${this.url}/children`, {
      method: 'POST',
      body: JSON.stringify(child),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await data.json();
    return response;
  }
}
