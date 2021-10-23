const express = require('express');
const cors = require('cors');

const {Sequelize} = require ('./models');
const models =require('./models');

const app = express();
app.use(cors());
app.use(express.json());

let cliente=models.Cliente;
let itempedido= models.ItemPedido;
let pedido= models.Pedido;
let servico=models.Servico;
let produto=models.Produto;
let itemcompra=models.ItemCompra;
let compra=models.Compra;

// app.get('/', function(req,res){
//     res.send('Olá,mundo!')
// });

app.post('/produtos', async(req,res)=>{
    await produto.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: 'Produto adicionado ao carrinho!'
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Foi impossivel se conectar.'
        });
    });
});
app.get('/listaprodutos',async(req, res)=>{
    await produto.findAll({
        order: [['nome','ASC']]   
    }).then(function(produto){
        res.json({produto})
    });

});
app.put('/atualizaproduto',async(req,res)=>{
    await produto.update(req.body,{
        where: {id:req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Produto foi alterado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Erro na alteração do Produto"
        });
    });
});
app.get('/excluirproduto/:id', async(req, res)=>{
    await produto.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Produto excluído com sucesso."
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Erro: impossível excluir produto."
        });
    });
});

//itens

app.post('/itemcompras', async(req,res)=>{
    await itemcompra.create(
      req.body
    ).then(function(){
        return res.json({
            error: false,
            message: 'Item selecionado com sucesso!'
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Foi impossivel se conectar.'
        });
    });
});
app.get('/listaitenscompras',async(req, res)=>{
    await itemcompra.findAll({
       
        order: [['valor','ASC']]   
    }).then(function(itemcompra){
        res.json({itemcompra})
    });
});

app.put('/atualizaitemcompra',async(req,res)=>{
    await itemcompra.update(req.body,{
        where: {quantidade:req.body.quantidade,
                valor:req.body.valor}
    }).then(function(){
        return res.json({
            error: false,
            message: "Item de Compra foi alterado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Erro na alteração do Item de Compra"
        });
    });
});
app.get('/excluiritmc/:CompraId', async(req, res)=>{
    await itemcompra.destroy({
        where: {CompraId: req.params.CompraId}
    }).then(function(){
        return res.json({
            error: false,
            message: "Item Compra excluído com sucesso."
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Erro: impossível excluir Item Compra."
        });
    });
});

//compras

app.post('/compras', async(req,res)=>{
    await compra.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: 'Compra realizada com sucesso!'
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Foi impossivel se conectar.'
        });
    });
});
app.get('/listacompras',async(req, res)=>{
    await compra.findAll({
        order: [['data','ASC']]   
    }).then(function(compra){
        res.json({compra})
    });
});

app.get('/compras/:id', async(req,res)=>{
    await compra.findByPk(req.params.id,{include:[{all:true}]})
    .then(ped=>{
        return res.json({ped});
    })
});

app.put('/atualizacompra',async(req,res)=>{
    await compra.update(req.body,{
        where: {id:req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "A Compra foi alterado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Erro na alteração da Compra"
        });
    });
});
app.get('/excluircompra/:id', async(req, res)=>{
    await compra.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Compra excluído com sucesso."
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Erro: impossível excluir compra."
        });
    });
});

// serviços

app.post('/servicos', async(req,res)=>{
   
    await servico.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: 'Serviço criado com sucesso!'
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Foi impossivel se conectar.'
        });
    });
    
});

app.get('/listaservicos',async(req, res)=>{
    await servico.findAll({
        // raw: true ASC=> ascendente ou desc=> descendente
        order: [['nome','ASC']]   
    }).then(function(servicos){
        res.json({servicos})
    });
    });

app.put('/atualizaservico',async(req,res)=>{
    await servico.update(req.body,{
        where: {id:req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço foi alterado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Erro na alteração do Serviço"
        });
    });
});

app.get('/excluirservico/:id', async(req, res)=>{
    await servico.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço excluído com sucesso."
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Erro: impossível excluir serviço."
        });
    });
});


//clientes
app.post('/clientes',async(req,res)=>{
    await cliente.create(
       req.body     
    ).then(function(){
        return res.json({
            error: false,
            message:'Cliente criado com sucesso!'
        });
    }).catch(function(erro){
        return res.status (400).json({
            error: true,
            message: 'Foi impossivel se conectar'
        });
    });
    
});
app.get('/listaclientes',async(req,res)=>{
    await cliente.findAll({
        order:[['nascimento','ASC']]
    }).then(function(clientes){
        res.json({clientes})
    });
});
app.put('/atualizacliente',async(req,res)=>{
    await cliente.update(req.body,{
        where: {id:req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente foi alterado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Erro na alteração do Cliente"
        });
    });
});

app.get('/excluircliente/:id', async(req, res)=>{
    await cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente excluído com sucesso."
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Erro: impossível excluir cliente."
        });
    });
});

//pedidos

app.post('/pedidos',async(req,res)=>{
    await pedido.create(
      req.body
    ).then(function(){
        return res.json({
            error: false,
            message: 'Pedido criado com sucesso!'
        });
    }).catch(function(erro){
        return res.status (400).json({
            error: true,
            message:'Foi impossivel se conectar'
        })
    })
   
});
app.get('/listapedidos',async(req, res)=>{
    await pedido.findAll({
         order: [['data','ASC']]   
     }).then(function(pedidos){
        res.json({pedidos})
     });
});

app.put('/atualizapedido',async(req,res)=>{
    await pedido.update(req.body,{
        where: {id:req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Pedido foi alterado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Erro na alteração do Pedido"
        });
    });
});

app.get('/excluirpedido/:id', async(req, res)=>{
    await pedido.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Pedido excluído com sucesso."
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Erro: impossível excluir Pedido."
        });
    });
});

//itens pedidos
app.post('/itenspedido',async(req,res)=>{
    await itempedido.create(
        req.body    
    ).then(function(){
        return res.json({
            error: false,
            message: 'Item criado com sucesso!'
        });
    }).catch(function(erro){
        return res.status (400).json({
            error: true,
            message: 'Foi impossivel se conectar'
        })
    })
    
});

app.get('/listaitenspedidos',async(req,res)=>{
    await itempedido.findAll({
        order:[['valor','DESC']]
    }).then(function(itempedido){
        res.json({itempedido})
    })
});

app.put('/atualizintempedido',async(req,res)=>{
    await itempedido.update(req.body,{
        where: {
        quantidade: req.body.quantidade
        }
    }).then(function(){
        return res.json({
            error: false,
            message: "Item Pedido foi alterado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message:"Erro na alteração do Item Pedido"
        });
    });
});
app.get('/excluirintpedido/:PedidoId', async(req, res)=>{
    await itempedido.destroy({
        where: {PedidoId: req.params.PedidoId}
    }).then(function(){
        return res.json({
            error: false,
            message: "Item Pedido excluído com sucesso."
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Erro: impossível excluir Item Pedido."
        });
    });
});

let port= process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001');
});








//aula

// app.get('/servico/:id', async(req,res)=>{
//     await servico.findByPk(req.params.id)
//     .then(serv=>{
//         return res.json({
//             error: false,
//             serv
//         });
//     }).catch(function(erro){
//         return res.status(400).json({
//             error: true,
//             message: "Erro: não foi possivel conectar!"
//         })
//     });
// });
// app.get('/produto/:nome', async(req,res)=>{
//     await produto.findByPk(req.params.id)
//     .then(serv=>{
//         return res.json({
//             error: false,
//             serv
//         });
//     }).catch(function(erro){
//         return res.status(400).json({
//             error: true,
//             message: "Erro: não foi possivel conectar!"
//         })
//     });
// });

// app.put('/atualizaservico',async(req,res)=>{
//     await servico.update(req.body,{
//         where: {id:req.body.id}
//     }).then(function(){
//         return res.json({
//             error: false,
//             message: "Serviço foi alterado com sucesso!"
//         })
//     }).catch(function(erro){
//         return res.status(400).json({
//             error: true,
//             message:"Erro na alteração do serviço"
//         });
//     });
// });

// app.get('/pedidos/:id',async(req,res)=>{
//     await pedido.findByPk(req.params.id,{include:[{all: true}]})
//     .then(ped=>{
//         return res.json({ped});
//     })
// });


// app.get('/clientes', async(req, res)=>{
//     await cliente.findAll({include:[{all:true}]})
//     .then(cli=>{
//         return res.json({
//             error: false,
//             cli
//         })
//     })
// });



// exercicios
// app.get('/ofertaclientes',async(req,res)=>{
//     await cliente.count('id').then(function(clientes){
//         res.json({clientes});
//     });
// });
// app.get('/ofertapedidos',async(req,res)=>{
//     await itempedido.count('id').then(function(itempedidos){
//         res.json({itempedidos});
//     });
// });

// app.get('/ofertaservicos',async(req,res)=>{
//     await servico.count('id').then(function(servicos){
//         res.json({servicos});
//     });
// });

//para editar,atualizar

    // app.put('/pedidos/:id/editaritem', async(req,res)=>{
    //     const item = {
    //         quantidade: req.body.quantidade,
    //         valor: req.body.valor
    //     };
    
    //     if(!await pedido.findByPk(req.params.id)){
    //         return res.status(400).json({
    //             error: true,
    //             message: 'Pedido não foi encontrado.'
    //         });
    //     };
    //     if(!await servico.findByPk(req.body.ServicoId)){
    //         return res.status(400).json({
    //             error: true,
    //             message:'Serviço não foi encontrado.'
    //         });
    //     };
    //     await itempedido.update(item,{
    //         where: Sequelize.and({ServicoId: req.body.ServicoId},
    //             {PedidoId:req.params.id})
    //     }).then(function(itens){
    //         return res.json({
    //             error:false,
    //             message:'Pedido foi alterado com sucesso!',
    //             itens
    //         });
    //     }).catch(function(erro){
    //         return res.status(400).json({
    //             error: true,
    //             message:'Erro: não foi possivel alterar.'
    //         });
    //     });
    // });

    // app.put('/cliente/:id/pedido',async(req, res)=>{
    //     const ped = {
    //         data: req.body.data,
    //         ClienteId: req.params.id
    //     }
    
    //     if(!await cliente.findByPk(req.params.id)){
    //         return res.status(400).json({
    //             error: true,
    //             message: 'Cliente não existe.'
    //         });
    //     };
    
    //     await pedido.update(ped,{
    //         where: Sequelize.and({ClienteId: req.params.id},
    //             {id: req.body.id})
    //     }).then(pedidos=>{
    //         return res.json({
    //             error: false,
    //             messagem: 'Pedido alterado com sucesso.',
    //             pedidos
    //         });
    //     }).catch(erro=>{
    //         return res.status(400).json({
    //             error: true,
    //             message: "Erro: não foi possível alterar."
    //         });
    //     });
    // });