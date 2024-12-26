import type { Child } from "../../../../types/child";

export interface AddChild {
  add(childData: Child.ToCreate): Promise<Child.Created>;
}
