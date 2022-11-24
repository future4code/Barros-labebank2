#  Projeto em grupo - LabeBank

## 📝Requisitos do Projeto

- 🎯 **Criar Conta**

      ✅ Criar uma conta;
      ✅ Deve ser possível consultar o saldo da conta; 
      ✅ Deve ser guardados, também, todos os gastos do usuário num array de extrato (possuindo o valor, a data e uma descrição);

- 🎯 **Pegar Saldo**

      ✅ O usuário deve conseguir verificar o saldo da sua conta, passando o seu nome e o seu CPF;

- 🎯 **Adicionar Saldo**

      ✅ O usuário deve conseguir adicionar saldo à sua conta, passando seu nome, o CPF e o valor que desejar;

- 🎯 **Pagar Conta**  

       ✅ Pagar Conta passando: 
           🚩 um valor; 
           🚩 uma descrição;
           🚩 ou uma data de pagamento;
           Obs: Caso a data nao seja informada, deve-se considerar que o pagamento para o mesmo dia;

- 🎯 **Transferencia Interna**  

       ✅ Para realizar esta transferência, o usuário deve informar:
          🚩 Seu nome;  
          🚩 O seu CPF;
          🚩 O nome do destinatário;
          🚩 O CPF do destinatário;
          🚩 O valor em si;

## 📝 Regras de Negócio do projeto

          ❌ Não pode ser criada conta para menores de 18 anos; ❌   
          ❌ Não podem existir dois usuários diferentes com o mesmo CPF;❌  
          ❌ Não pode agendar um pagamento para um dia que já passou ❌  
          ❌ Não pode tentar pagar uma conta cujo valor seja maior do que o seu saldo.❌
          ❌ Transferências não podem ser agendadas e devem respeitar o saldo do usuário remetente.❌