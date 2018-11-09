const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var mysql = require('mysql');
var ent = require('./entidades');

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
app.route('/api/entidades*').get((req, res) => {
      
      var url = req.originalUrl.split("/");
      console.log(url);
      ent.getAllEntidades(req,res,con);
});

app.route('/api/entidades/:nome').get((req, res) => {
  const requestedEntidadeNome = req.params['nome'];
  con.query('SELECT '+
            'e.nome_entidade as nome,e.cod_entidade as codigo '+
            'FROM  '+
            'conjuntos_entidade ce '+
            'INNER JOIN '+
            'entidades e ON ce.id = e.id_Conjuntos_Entidade '+
            'WHERE '+
            'ce.nome_conjuntos_entidade = "'+ requestedEntidadeNome+'";', function (err, data) {
          if (err) throw err;
        res.send({Entidades: data});
  });
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