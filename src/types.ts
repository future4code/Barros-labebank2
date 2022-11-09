export type Usuario = {
    nome: string,
    cpf: string,
    dataDeNascimento: string,
    saldo: number,
    extrato: Extrato[],
}

export type Extrato = {
    valor: number,
    data: string,
    descricao: string,
}