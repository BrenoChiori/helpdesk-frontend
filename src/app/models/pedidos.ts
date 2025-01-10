import { ProdutosPedidos } from "./produtosPedidos"
import { Status } from "./status"

export class Pedidos {
    id?:            any
    dataPedido?:    string
    dataEntrega:    string
    status:         Status
    valorTotal:     number
    listaProdutos:  ProdutosPedidos[]
}