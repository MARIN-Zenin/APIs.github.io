const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/pokemon/:name", async (req, res) => {
  const pokemonName = req.params.name;

  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const response = await axios.get(url);
    const pokemon = response.data;

    // Transformando os dados da resposta em JSON
    const pokemonData = {
      name: pokemon.name,
      height: pokemon.height / 10, // Convertendo para metros
      weight: pokemon.weight / 10, // Convertendo para kg
      abilities: pokemon.abilities.map((hab) => hab.ability.name).join(", "),
      types: pokemon.types.map((type) => type.type.name).join(", "),
      image: pokemon.sprites.front_default, // URL da imagem do Pokémon
    };

    // Retorna os dados em JSON
    res.json(pokemonData);
  } catch (error) {
    console.error(error); // Opcional: log do erro para ajudar na depuração
    res.status(500).json({ error: "Erro ao buscar dados do Pokémon. Tente novamente mais tarde!" });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
