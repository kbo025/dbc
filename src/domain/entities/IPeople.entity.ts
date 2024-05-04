export interface IPeopleEntity {
  id: number;
  cpf: string;
  email: string;
  name: string;
  phone: string;
}

export type IPeopleFilters = Partial<
  Omit<IPeopleEntity, 'id' | 'password' | 'phone'>
>;
