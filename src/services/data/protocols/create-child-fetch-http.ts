export interface ChildToCreateDTO {
  name: string,
  totalMinutes: number
}

export interface CreateChildFetchHttp {
  post(child: ChildToCreateDTO): Promise<any>;
}
