import * as allTypes from "./types";


export const usuarios: allTypes.Usuario[] = [
  {
    nome: "Kayo Céshar",
    cpf: "06502502545",
    dataDeNascimento: "15/04/1995",
    saldo: 12000,
    extrato: [
      { valor: 59, data: "09/11/2022", descricao: "Almoço" },
      { valor: 109, data: "02/10/2022", descricao: "Academia" },
      { valor: 60, data: "09/10/2022", descricao: "Chocolate" }
    ]
  },
  {
    nome: "Felipe Alcântara",
    cpf: "02102536987",
    dataDeNascimento: "09/10/1994",
    saldo: 7000,
    extrato: [
      { valor: 150, data: "07/11/2022", descricao: "Tênis" },
      { valor: 120, data: "22/10/2022", descricao: "Roupas" },
      { valor: 75, data: "19/10/2022", descricao: "Restaurante" }
    ]
  },
  {
    nome: "Gabriel Suela",
    cpf: "40427869805",
    dataDeNascimento: "13/09/1995",
    saldo: 9000,
    extrato: [
      { valor: 159, data: "11/11/2022", descricao: "Headset" },
      { valor: 309, data: "25/10/2022", descricao: "Hotel" },
      { valor: 60, data: "17/10/2022", descricao: "Jantar" }
    ]
  }
];