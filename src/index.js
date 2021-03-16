const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const porta = 3000;
app.set("port", porta);
const server = http.createServer(app);
server.listen(3000);

let id = 3;

let livros = [
  {
    id: 1,
    titulo: "Cronicas de Narnia",
    descricao: "Um livro de aventuras",
    edicao: "55",
    autor: "Roberto Nunes",
    isbn: "123456789",
  },

  {
    id: 2,
    titulo: "Harry Potter",
    descricao: "Muitas mágias e diversões",
    edicao: "13",
    autor: "Edward Cullen",
    isbn: "987654321",
  },
  {
    id: 3,
    titulo: "Diario de um Banana",
    descricao: "Comedias e perregues de um adolescente comum",
    edicao: "77",
    autor: "Jaime Kelly",
    isbn: "135791113",
  },
];

app.get("/livros", (req, res, next) => {
  res.status(302).json(livros);
});

app.post("/livros", (req, res, next) => {
  const livro = {
    id: (id += 1),
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    edicao: req.body.edicao,
    autor: req.body.autor,
    isbn: req.body.isbn,
  };

  livros.push(livro);
  res.status(201).json(livro);
});

app.put("/livros", (req, res, next) => {
  livros.forEach((livro) => {
    if (livro.id === req.body.id) {
      livro.titulo = req.body.titulo;
      livro.descricao = req.body.descricao;
      livro.edicao = req.body.edicao;
      livro.autor = req.body.autor;
      livro.isbn = req.body.isbn;
    }
  });

  res.status(202).end();
});

app.delete("/livros/:id", (req, res, next) => {
  const { id } = req.params;
  const livroIndex = livros.findIndex((livro) => livro.id == id);
  if (livroIndex >= 0) {
    livros.splice(livroIndex, 1);
    return res.status(200).json(livros);
  }
});
