export namespace Child {
  export interface ToCreate {
    name: string;
    totalMinutes: string;
  }

  export interface Created {
    id: string;
    name: string;
    totalMinutes: number;
    timer?: string;
    entryTime: string;
    createdAt: string;
    exitTime: string | null;
    updatedAt: string | null;
  }
}
