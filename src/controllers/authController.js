const express = require('express');

const User = require('./../models/user');
const Cliente = require('./../models/cliente');
const Prestador = require('./../models/prestador');

const router = express.Router();

    // SERVIÇOS DE USUÁRIO

    router.post("/register",async (req,res) => {
        try {
            const {email} = req.body;
                if(await User.findOne({email})){
                    res.status(400).send({error:'E-mail Já cadastrado'});
                }

            const user = await User.create(req.body);
            
            // user.password = undefined;

            return res.send(user);
        } 
        catch (err) {
            return res.status(400).send({err:'Registration Error'});   
        }
    });

    //Get users
    router.get('/users', function(req, res) {
       var users = {};
       users = User.find().then(users => {
           res.send(users);
       })
    });

    //Delete user
    router.delete("/user", function(req,res){
        console.log(req);
        user = User.findOneAndDelete(req.params.email, function(err){
            if(err) return next(err);
            res.send('Deletado com sucesso');
        })
    });
    //FIM SERVIÇOS DE USUARIO



    // SERVIÇOS RELATIVOS AO CLIENTE
    
    router.post("/cadastroCliente", async (req,res) => {
        try {
            const cliente = await Cliente.create(req.body);
            return res.send(cliente);    
        } 
        catch (err) {
            return res.status(400).send({err:'Registration Error'});   
        }
    });

    //Get clientes
    router.get('/clientes', function(req, res) {
        var clientes = {};
        clientes = Cliente.find().then(clientes => {
            res.send(clientes);
        })
     });
 
     //Delete cliente
     router.delete("/cliente", function(req,res){
         console.log(req);
         var cliente;
         cliente = Cliente.findOneAndDelete(req.params.email, function(err){
             if(err) return next(err);
             res.send('Deletado com sucesso');
         })
     });


    //FIM SERVIÇOS DO CLIENTE



    // SERVIÇOS RELATIVOS AO PRESTADOR
    
    router.post("/cadastroPrestador", async (req,res) => {
        try {
            const prestador = await Prestador.create(req.body);
            return res.send(prestador);
        } 
        catch (err) {
            return res.status(400).send({err});   
        }
    });

    //Get prestadores
    router.get('/Prestadores', function(req, res) {
        var prestadores = {};
        prestadores = Prestador.find().then(prestadores => {
            res.send(prestadores);
        })
     });
 
     //Delete prestadores
     router.delete("/PrestadoresDeletar", function(req,res){
         console.log(req);
         var prestador;
         prestador = Prestador.findOneAndDelete(req.params.email, function(err){
             if(err) return next(err);
             res.send('Deletado com sucesso');
         })
     });

     //Listar prestadores onde e-mail é igual ao cadastrado
     router.get("/prestadoresByEmail", function(req,res){
         
        Prestador.find({emailUsuario:req.body.email}).then(
            prestadores => {
                console.log(req.params.email)
                res.send(prestadores);
            }
        )
    });

     //Listar prestadores onde e-mail é igual ao cadastrado
     router.post("/prestadoresById", function(req,res){
        console.log(req.body);
        Prestador.findById(req.body.id).then(
            prestador => {
                res.send(prestador);
            }
        )
    });

     //FIM SERVIÇOS PRESTADOR


     //teste dialogflow

    router.post("/searchforcolaborators", async(req,res)=>{
        try{
            Prestador.find({profissional:req.body.queryResult.parameters.colaborador}).then(
                prestadores => {
                    //console.log(req.params.email)
                    res.send(prestadores);
                }
            )
        }
        catch(err){
            return res.status(400).send({err});   
        }
        
    });

    router.put("/prestadorUrl", async(req,res)=>{
        Prestador.findByIdAndUpdate(req.body._id, {UrlPerfil: req.body.UrlPerfil}, function (err, product) {
            res.send('Prestador udpated.');
        });
    });


module.exports = app => app.use('/auth', router);