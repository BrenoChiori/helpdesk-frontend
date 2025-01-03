import { Produtos } from "./produtos"

export class Pedidos {
    id?:            any
    dataPedido:     string
    dataEntrega:    string
    status:         string
    valorTotal:     number
    listaProdutos:  Produtos[]
}