import { ProdutosPedidos } from "./produtosPedidos"

export interface Pedidos {
    id?:            any
    dataPedido:     string
    dataEntrega:    string
    status:         string
    valorTotal:     number
    // listaProdutos:  ProdutosPedidos[]
}