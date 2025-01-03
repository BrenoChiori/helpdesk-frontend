import { Fornecedor } from "./fornecedor"
import { Pedidos } from "./pedidos"
import { Produtos } from "./produtos"

export interface ProdutosPedidos {
    id?: any
    produto: Produtos
    quantidade: number
    fornecedor: Fornecedor
    pedidos: Pedidos
    valor: number
}