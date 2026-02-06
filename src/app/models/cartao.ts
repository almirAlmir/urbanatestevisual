export interface Cartao {
  id?: number;
  numeroCartao?: string;
  nome: string;
  usuarioId: number;
  tipo: 'COMUM' | 'ESTUDANTE' | 'TRABALHADOR';
  status?: boolean;
}