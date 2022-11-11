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

//Server
app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003");
});