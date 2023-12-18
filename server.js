        const express = require('express');
        const bodyParser = require('body-parser');
        const sql = require('mssql');
        const cors = require('cors');
        
        



        const server = express();
        server.use(cors());

        
        

        const PORT = 4000;

        
        server.use(bodyParser.json());
        

        //Configuração do Banco de Dados Sql Server

        const dbConfig = {
            server: "localhost",
            user: 'Siac',
            password: '212121',
            database: 'Siac-Duca',
            options:{
                trustServerCertificate: true,
                trustedConnection: false

            }      
            
        }
        


        server.post('/login', async(req,res)=>{

            //Autenticação no banco de dados 

            try{
                
                //conectar ao banco de dados
                await sql.connect(dbConfig);


                console.log('recebido pedido de login: ',req.body);
                const {cpf, senha} = req.body;


                //executar uma consulta sql
                const comando = await sql.query`SELECT * FROM Cliente WHERE cpf = ${cpf} AND senha = ${senha}`;
                
                //verificar se o usuário foi encontrado
                if(comando.recordset.length>0){
                    console.log('login bem sucedido!');
                    res.status(200).json({message: "login sucedido"})
                    return comando.recordset;
                    

                }
                else{
                    res.status(401).json({message:'Credenciais inválidas'});
                }
                }
                
            catch(error){
                console.error(error);
                res.status(500).json({message:'Erro interno do servidor'});
            }

            finally{
                await sql.close();
            }
        });


            




        server.listen(PORT, ()=>{
            console.log(`Servidor iniciado em http://localhost:${PORT}`);
        });

    
