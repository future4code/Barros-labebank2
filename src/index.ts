import { Usuario } from './types';
import express, {Request, Response} from "express"
import {usuarios} from './data'

import cors from 'cors'

const app = express()

app.use(express.json())

app.use(cors())

//teste

app.get('/oi', (req, res) => {
    res.send("ola")
})

//Criar Conta

app.post("/cadastro", (req:Request, res: Response) => {
    let errorCode = 400;
    let {nome, cpf, dataDeNascimento} = req.body
        
    try{
        if (!nome) {
            errorCode = 422
            throw new Error("Informe o seu nome.");
        }

        if (!cpf) {
            errorCode = 422
            throw new Error("Informe o número do seu CPF.");
        }
        if (!dataDeNascimento) {
            errorCode = 422
            throw new Error("Informe a sua data de nascimento no formato DD/MM/AAAA.");
        }
        
       const validandoCpf =  usuarios.find(usuario => usuario.cpf === cpf)
       
       if (validandoCpf) {
        errorCode = 422
        throw new Error("Cpf já existente.");
        }
        
        let hoje = new Date();
        let diaNascimento = dataDeNascimento.split("/")
        const ano = Number(diaNascimento[2])
        const mes = Number(diaNascimento[1])
        const dia = Number(diaNascimento[0])
        const anoAniversario = new Date(ano + 18, mes - 1, dia);
        
        if(anoAniversario > hoje){
            errorCode = 403
            throw new Error("É necessário ser maior de 18 anos");
        }        

        const novoUsuario = {
            nome,
            cpf,
            dataDeNascimento,
            saldo: 0,
            extrato: []
        }

        usuarios.push(novoUsuario)

        res.status(201).send(usuarios)
    }catch(e:any){
        res.status(errorCode).send(e.message)
    }
})

//pegar saldo

app.get("/usuarios/saldo", (req:Request, res:Response)=>{
    let {nome, cpf, saldo} = req.body
    let errorCode = 400
  
    try {
        if(!nome){
            errorCode = 401
            throw new Error("Usuário não cadastrado")
        }
        if(!cpf){
            errorCode = 401
            throw new Error("É necessário informar o CPF de um usuário cadastrado")
        }

        const balance = usuarios.find(usuario => usuario.saldo === saldo)
        
        res.status(200).send(balance)
        

    } catch (e:any){
        res.status(errorCode).send(e.message)
    }
})

// Adicionar saldo

app.patch("/usuarios/addsaldo", (req: Request, res: Response) => {
    let nome = req.headers.nome as string;
    let cpf = req.headers.cpf as string;
    let saldo = req.body.saldo;
    let errorCode = 400;
  
    try {
      if (!nome) {
        errorCode = 422;
        throw new Error("Informe o seu nome.");
      }
  
      if (!cpf) {
        errorCode = 422;
        throw new Error("Informe o número do seu CPF.");
      }
      if (!saldo) {
        errorCode = 422;
        throw new Error("Informe o valor a ser adicionado.");
      }
  
      const validandoUsuario = usuarios.find((usuario) => {
        if (
          usuario.nome.toLowerCase() === nome.toLowerCase() &&
          usuario.cpf === cpf
        ) {
          return usuarios;
        }
      });
  
      if (!validandoUsuario) {
        errorCode = 422;
        throw new Error("Usuário não encontrado.");
      }
  
      usuarios.forEach((item) => {
        if (item.nome.toLowerCase() === nome.toLowerCase() && item.cpf === cpf) {
          item.saldo = item.saldo + saldo;
        }
      });
  
        
      res.status(200).send(usuarios);
    } catch (e:any) {
      res.status(errorCode).send(e.message);
    }
  });


//Pagar Conta

app.post("/usuarios/pagamento", (req: Request, res: Response) => {
  let cpf = req.headers.cpf as string;
  let { valor, data, descricao } = req.body;
  let errorCode = 400;
  let validandoUsuario = usuarios.find((usuario) => usuario.cpf === cpf);
  const hoje = new Date();
  try {
    if (!cpf) {
      errorCode = 422;
      throw new Error("Informe o número do seu CPF.");
    }
    if (!valor) {
      errorCode = 422;
      throw new Error("é necessário informar o valor da conta.");
    }

    if (!descricao) {
      errorCode = 422;
      throw new Error(
        "é necessário informar a descricação da conta a ser paga."
      );
    }

    if (!validandoUsuario) {
      errorCode = 401;
      throw new Error("Usuário não encontrado.");
    }

    if (valor > validandoUsuario.saldo) {
      errorCode = 401;
      throw new Error("Saldo insuficiente.");
    }

    if (!data) {
      const dia = hoje.getDate();
      const mes = hoje.getMonth() + 1;
      const ano = hoje.getFullYear();
      data = `${dia}/${mes}/${ano}`;
    }

    let dataInformada = data.split("/");
    const ano1 = Number(dataInformada[2]);
    const mes1 = Number(dataInformada[1]);
    const dia1 = Number(dataInformada[0]);
    const conferindoData = new Date(
      ano1,
      mes1 - 1,
      dia1,
      new Date().getHours() + 1,
      new Date().getMinutes(),
      new Date().getSeconds()
    );

    if (conferindoData < hoje) {
      errorCode = 401;
      throw new Error(
        "Não é possível realizar pagamentos em uma data anterior ao dia de hoje."
      );
    }

    validandoUsuario.extrato.push({
      valor,
      data,
      descricao
    });

    res.status(200).send(validandoUsuario);
  } catch (e:any) {
    res.status(errorCode).send(e.message);
  }
});

//Server
app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003");
});