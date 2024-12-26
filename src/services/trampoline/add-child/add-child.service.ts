import type { ApiConnection } from "../../http/api";
import type { AddChild } from "../protocols/add-child";

export class AddChildService implements AddChild {
  constructor(private readonly api: ApiConnection) {}

  async add(childData: any): Promise<void> {
    const data = await this.api.post(childData);
    const child = await data.json();
    console.log('AddChildService');

    return child;
  }
}
