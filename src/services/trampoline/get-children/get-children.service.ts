import type { Child } from "../../../types/child";
import type { GetChildrenFetchHttp } from "../../data/protocols/get-children-fetch-http";
import type { GetChildren } from "../protocols/get-children";

export class GetChildrenService implements GetChildren {
  constructor(private readonly fetchApi: GetChildrenFetchHttp) {}

  async get(): Promise<Child.Created[]> {
    const data = await this.fetchApi.get();
    return data;
  }
}
