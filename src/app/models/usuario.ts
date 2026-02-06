export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
  tipo: 'ADMIN' | 'COMUM';
  cartoes?: any[];
}