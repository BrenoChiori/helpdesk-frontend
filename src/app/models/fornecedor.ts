export interface Fornecedor {
    id?:                any
    nome:               string
    email:              string
    telefone:           string
    documento:          string
    tipoFornecedor:     string
    endereco: {
        rua:            string
        numero:         string
        complemento:    string
        bairro:         string
        cidade:         string
        estado:         string
        cep:            string
    }
    statusFornecedor:   string
    formadeEntrega:     string
}