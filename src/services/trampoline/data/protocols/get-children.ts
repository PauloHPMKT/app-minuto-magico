import type { Child } from "../../../../types/child";

export interface GetChildren {
  get(): Promise<Child.Created[]>;
}
