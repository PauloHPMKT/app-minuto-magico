import type { Child } from "../../../types/child";
import type { CreateChildFetchHttp } from "../../data/protocols/create-child-fetch-http";
import type { AddChild } from "../protocols/add-child";

export class AddChildService implements AddChild {
  constructor(private readonly api: CreateChildFetchHttp) {}

  async add(childData: Child.ToCreate): Promise<any> {
    const convertedChild = {
      ...childData,
      totalMinutes: Number(childData.totalMinutes),
    }
    const data = await this.api.post(convertedChild);
    return data;
  }
}
