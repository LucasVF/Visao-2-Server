const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var mysql = require('mysql');

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};

const app = express();

app.use(cors(corsOptions));

app.listen(8000, () => {
  console.log('Server started!');
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ibict2017",
  database: "visaojhc" 
});


//GET
app.route('/api/entidades').get((req, res) => {
      con.query('SELECT  '+
              'e.nome_conjuntos_entidade as Nome '+
          'FROM '+
              'conjuntos_entidade e' , function (err, data) {
          if (err) throw err;
        res.send({Entidades: data});
  });
  // res.send({
  //   Entidades: [{ nome: 'Lucifer' }, { nome: 'Baphomet' }, { nome: 'Belial' }, { nome: 'Beelzebulb' }]
  // });
});

app.route('/api/entidades/:nome').get((req, res) => {
  const requestedEntidadeNome = req.params['nome'];
  res.send({ nome: requestedEntidadeNome });
});

//POST

app.use(bodyParser.json());
app.route('/api/entidades').post((req, res) => {
  res.send(201, req.body);
});
//UPDATE
app.route('/api/entidades/:nome').put((req, res) => {
  res.send(200, req.body);
});
//DELETE
app.route('/api/entidades/:nome').delete((req, res) => {
  res.sendStatus(204);
});