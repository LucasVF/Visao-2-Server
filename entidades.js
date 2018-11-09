module.exports = {
  getAllEntidades: function (req, res, con) {
	  con.query('SELECT  '+
	              'e.nome_conjuntos_entidade as nome '+
	          'FROM '+
	              'conjuntos_entidade e' , function (err, data) {
	          if (err) throw err;
	        res.send({Entidades: data});
	  });
	},
	getEntidades: function(req,res,con){
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
  	}
}