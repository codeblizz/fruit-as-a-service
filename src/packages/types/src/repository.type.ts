export interface ClientMainRepositoryInterface {
  get(params: unknown): Promise<unknown>;
  post(params?: unknown): Promise<unknown>;
  delete(params?: unknown): Promise<unknown>;
  update(id: number | string, params?: unknown): Promise<unknown>;
}

export interface ServerMainRepositoryInterface {
  refreshToken(token: string): Promise<unknown>;
  get(token: string, params?: unknown): Promise<unknown>;
  post(payload: unknown, token: string): Promise<unknown>;
  delete(id: number | string, token: string): Promise<unknown>;
  update(
    id: number | string,
    payload: unknown,
    token: string
  ): Promise<unknown>;
}
