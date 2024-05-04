export interface IUseCase {
  execute(payload: any): Promise<any>;
}
