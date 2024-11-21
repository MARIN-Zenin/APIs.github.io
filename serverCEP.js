const express = require("express"); //responsavel por criar a porta 3000
const axios = require("axios"); //está pegando os dados de outra PI (CEP e pokemon)  
const cors = require("cors"); //liga o serve com o html 

const app = express(); // Corrigido para instanciar o Express corretamente 
const PORT = 5000;

app.use(cors());

app.get("/endereco/:cep", async (req, res) => { //criando uma rota 
  const cep = req.params.cep; //pegando o cep que o usuario colocar 

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`); //Joga dentro de uma variavel o link da PI com o cep que o usuario colocou 

    if (response.data.erro) { 
      return res.status(404).json({ error: "CEP não encontrado" }); //se o link da PI não conseguir ser encontrado retorna um erro 
    }
//se não ocorrer erro vai para a linha 20 
    res.json(response.data); //joga dentro de um arquivo json as informações do CEP
  } catch (error) { 
    res.status(500).json({ error: "Erro ao buscar endereço" }); //se o try não conseguir ser executado uma mensagem de erro aparece 
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
