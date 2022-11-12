var sticky = require('sticky-session'),
http = require('http'),
express = require('express'),
port = process.env.PORT || 80;
var app = express();
server = http.Server(app);
const path = require('path');
var mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'pug');
var con = mysql.createConnection({host: "127.0.0.1",user: "root",password: "",database: "concursoasesores"});
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    con.query("call getFecha()", function(err, result, fields){
        const mesActual = new Date().getMonth() + 1;
        const mesConcurso = new Date(result[0][0]["fecha"]).getMonth() + 1;
        const diaActual = new Date().getDate();
        const diaConcurso = new Date(result[0][0]["fecha"]).getDate();
        if(mesActual == mesConcurso && (diaConcurso - diaActual) > 3)
            res.render('index', { titulo: 'Inicio', fecha: `${diaConcurso}/${mesConcurso}/2022`});
        else
            res.render('competenciaCompleta', { titulo: 'Inicio', fecha: `${diaConcurso}/${mesConcurso}/2022`});

    })
    
  });
app.get('/registro', function(req, res) {
    con.query("call getFecha()", function(err, result, fields){
        const mesActual = new Date().getMonth() + 1;
        const mesConcurso = new Date(result[0][0]["fecha"]).getMonth()  + 1;
        const diaActual = new Date().getDate();
        const diaConcurso = new Date(result[0][0]["fecha"]).getDate();
        if(mesActual == mesConcurso && (diaConcurso - diaActual) > 3)
            res.render('registro', { titulo: 'Registro', fecha: `${diaConcurso}/${mesConcurso}/2022`});
        else
            res.redirect('/');
    })
  });
app.get('/podio', function(req, res) {
    con.query("call getFecha()", function(err, result, fields){
        const mesActual = new Date().getMonth();
        const mesConcurso = new Date(result[0][0]["fecha"]).getMonth();
        const diaActual = new Date().getDate();
        const diaConcurso = new Date(result[0][0]["fecha"]).getDate();
        if(mesActual == mesConcurso && (diaConcurso - diaActual) > 3)
            res.redirect('/');
        else
            res.render('podio', { titulo: 'Podio'});
    })
    
  });
app.get('/registros', function(req, res) {
    res.render('registros', { titulo: 'Registros'});
  });

app.post("/registrarParticipante", function(req, res){
    con.query("call contarParticipantes()", function(e, r, f){
        if(e){
            res.send({est: "0", men: "Algo ha salido mal."})
            res.end()
        }else{
            if(r[0][0]["count(*)"] < 25){
                con.query(`call buscarParticipantes(${req.body.cedula}, ${req.body.ccmsid})`, function(err, result, fields){
                    if(err){
                        res.send({est: "0", men: "Algo ha salido mal."})
                        res.end()
                    }else{
                        if(result[0][0]["cantEmpl"] > 0){
                            con.query(`call sumarIntento(${req.body.ccmsid})`);
                            res.send({est: "1", men: "Este usuario ya existe."})
                            res.end()
                        }else if(result[0][0]["cantPart"] > 0){
                            res.send({est: "5", men: "Esta cedula ya esta registrada."})
                            res.end()
                        }else{
                            con.query(`call buscarCargo(${req.body.ccmsid})`, function(err2, result2, fields2){
                                if(err2){
                                    res.send({est: "0", men: "Algo ha salido mal."})
                                    res.end()
                                }else{
                                    if(result2[0].length == 0){
                                        res.send({est: "2", men: "Este ID no fue encontrado."})
                                        res.end()
                                    }else{
                                        if(result2[0][0]["cargo"] == 1){
                                            console.log(`call registrarParticipante(${req.body.cedula}, "${req.body.nombre}", "${req.body.sexo}", ${req.body.edad}, "${req.body.ciudad}", ${req.body.ccmsid}, 0)`)
                                            con.query(`call registrarParticipante(${req.body.cedula}, "${req.body.nombre}", "${req.body.sexo}", ${req.body.edad}, "${req.body.ciudad}", ${req.body.ccmsid}, 0)`, function(err3, result3, fields3){
                                                if(err2){
                                                    res.send({est: "0", men: "Algo ha salido mal."})
                                                    res.end()
                                                }else{
                                                    res.send({est: "4", men: "Registro exitoso."})
                                                    res.end()
                                                }
                                            })
                                        }else{
                                            con.query(`call sumarIntento(${req.body.ccmsid})`);
                                            res.send({est: "2", men: "Lo sentimos, este concurso solo es para asesores."})
                                            res.end()
                                        }
                                    }
                                }
                            })
                        }
                    }
                })
            }else{
                res.send({est: "0", men: "Se agotaron los cupos para este concurso."})
            }
        }
    })
    
})
app.post("/tablaMentales", function(req, res){
    con.query("call getTablaMentales", function(err, result, fields){
        res.send(result)
        res.end()
    });
})
app.post("/getTotal", function(req, res){
    con.query("call getTotal", function(err, result, fields){
        res.send(result);
        res.end();
    })
})

// connnect to mongodb in nodejs?




sticky.listen(server,3000);