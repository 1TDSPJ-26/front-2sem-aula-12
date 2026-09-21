export type TipoProduto = {
    id: number;
    nome: string;
    preco: number,
    estoque: number
};

export type DadosProduto = Omit<TipoProduto, "id">;