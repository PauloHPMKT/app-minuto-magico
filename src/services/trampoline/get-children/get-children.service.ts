import type { ApiConnection } from "../../http/api";
import type { GetChildren } from "../protocols/get-children";

export class GetChildrenService implements GetChildren {
  constructor(private readonly api: ApiConnection) {}

  async get(): Promise<void> {
    const data = await this.api.get();
    const children = await data.json();

    console.log('GetChildrenService', children);
    return children;
  }
}
