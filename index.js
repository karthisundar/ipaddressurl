const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require('cors')

app.use(cors());
app.use(express.json());

try{
    const db = mysql.createPool({
        user:"freedb_kkkkkkkaka",
        host:"sql.freedb.tech",
        password:"4XNq?e7v@@!gMrc",
        database:"freedb_kayalakka"
    })
    app.post(`/login/:Email/:password`,(req,res)=>{
    
    // db.query(`SELECT * FROM user_login ul where  ul.Email  = 'admin@gmail.com'  and ul.password_field  = 'Karthi@123'  and ul.user_type = 1`).then(result=>console.log("err",result))

    // const {Email,password}= req.body   

    const {Email,password} = req.params
    console.log('email',Email)                                                                                                                                                                                                                                                     

    db.query(`SELECT * FROM usermaster ul where  ul.email_address  = '${Email}'  and ul.password_new  = '${password}'`,(err,result)=>{
        if(err){
            console.log("hhhh",err)
        
            res.status(500).send({message:"error",errors:err})

        }else{
            res.send({message:"sucess",results:result,errors:err})
            console.log("result",result)
        }
    })
})

app.post(`/checkemail`,(req,res)=>{

    console.log('req.body',req.body)

    const {email_id} = req.body

    console.log('email',email_id)

    db.query(`select ul.email_address from usermaster ul where ul.email_address ='${email_id}' `,(err,result)=>{
        if(err){
            // res.send(500).send({message:'error',error:err})
            res.status(500).send({message:"error",errors:err})

        }else{
            console.log("result",result)
            res.send({message:"sucess",results:result,errors:err})


        }
    })
})

app.post(`/view_product`,function(req,res){
    
    // db.query(`SELECT * FROM user_login ul where  ul.Email  = 'admin@gmail.com'  and ul.password_field  = 'Karthi@123'  and ul.user_type = 1`).then(result=>console.log("err",result))

    // const {Email,password}= req.body                                                                                                                                                                                                                                                        

    db.query(`select * from product `,(err,result)=>{
        if(err){
            console.log("hhhh",err)
        
            res.status(500).send({message:"error",errors:err})

        }else{
            res.send({message:"sucess",results:result,errors:err})
            console.log("result",result)
        }
    })
})

app.post('/productdelete',function(req,res){
    const {id} = req.body

    console.log('id',id)

    db.query(`delete from product p where p.id  = ${id}`,(err,result)=>{
        if(err){
            console.log('err',err)
        }else{
            res.send({message:"sucess",results:result,errors:err})
            console.log("result",result)
        }
    })

    
})

app.post('/updateproduct',function(req,res){
    const {search_product} = req.body

    db.query(`select * from product p where p.product_code=${search_product}`,(err,result)=>{
        if(err){
            console.log('errr',err)
        }else{
            res.send({message:"sucess",results:result,errors:err})

            console.log('result',result)
        }
    })

    console.log('searcchhchchc',search_product)
})

app.post(`/product/:product_code/:product_title/:product_qty/:amount/:product_type/:firstname/:email/:mobile`,function(req,res){

    // const Email=req.body.email;

    // const  {loginuser} = req.body
    console.log('entererererererer')

    const {product_code,product_title,product_qty,amount,product_type,firstname,email,mobile} = req.params

    
    
    
    const count = 0
   
    const message = `product saved by${firstname,email}`

    // console.log('formdata.length',formdata.length)

        if(product_code!==''){
            console.log('ENTER OKOKOK')
  db.query(`insert into product (product_code,product_title,amount,quantity,count_new,product_type) values(?,?,?,?,?,?)`,[product_code,product_title,amount,product_qty,count,product_type],(err,result)=>{
            if(err){
                console.log("hhhh",err)
            
                res.status(500).send({message:"error",errors:err})
    
            }else{
                // res.send({message:"sucess"})
                res.status(200).send({message:'super'})
                // res.setHeader({message:'super'})
                console.log("result",result)
            }
        })
    
        db.query(`insert into auditlog (firstname,email,mobile,message) values(?,?,?,?)`,[firstname,email,mobile,message],(err,results)=>{
            if(err){
                // res.status(500).send({message:"error",errors:err})
    
            }else{
                console.log('resiult2nd',results)
            }
        })
        }else{
            // res.send({message:"sucess",results:result,errors:err})


        }
        // console.log('enter correct')
      
    

    // const query_data = `insert into product (product_code,product_title,amount,quantity) values(?,?,?,?)`,[product_code_1,product,amount,quantity],(err,result)

    
   
 
})

app.post('/checkproduct/:product_code',(req,res)=>{

    const {product_code} = req.params

    db.query(`select * from product p where p.product_code = ${product_code}`,(err,result)=>{
        if(err){
            res.status(500).send({message:"error",errors:err})

        }else{
            res.send({message:"sucess",results:result,errors:err})

        }
    })
})

app.post('/searchbill/:searchbill',(req,res)=>{


    const {searchbill} = req.params
    // console.log('ddddd',searchbill)

    db.query(`select * from userbill u where u.bill_no=${searchbill}`,(err,result)=>{
        if(err){
            res.status(500).send({message:"error",errors:err})

        }else{
            res.send({message:"sucess",results:result,errors:err})

        }
    })
})

// app.post(`/view_product`,(req,res)=>{
    
//     // db.query(`SELECT * FROM user_login ul where  ul.Email  = 'admin@gmail.com'  and ul.password_field  = 'Karthi@123'  and ul.user_type = 1`).then(result=>console.log("err",result))

//     // const {Email,password}= req.body                                                                                                                                                                                                                                                        

//     db.query(`select * from product   limit 2`,(err,result)=>{
//         if(err){
//             // console.log("hhhh",err)
        
//             res.status(500).send({message:"error",errors:err})

//         }else{
//             res.send({message:"sucess",results:result,errors:err})
//             // console.log("result",result)
//         }
//     })
// })

app.post('/signup',(req,res)=>{


    const {formdata} = req.body
    console.log('reqqqqq',formdata[0].Email)
    const first_name = formdata[0].firstname
    const lastname = formdata[0].lastname
    const email = formdata[0].Email
    const password = formdata[0].password
    const usertype = formdata[0].userType
    const mobilenumber = formdata[0].mobilenumber

    
    db.query(`insert into usermaster (first_name,last_name,email_address,password_new,user_typeid,mobilenumber) values(?,?,?,?,?,?)`,[first_name,lastname,email,password,usertype,mobilenumber],(err,result)=>{
        if(err){
            console.log("hhhh",err)
        
            res.status(500).send({message:"error",errors:err})

        }else{
            res.send({message:"sucess",results:result,errors:err})
            console.log("result",result)
        }
    })
    
    // db.query(`insert into usermaster (first_name,last_name,email_address,password_new,user_typeid) values[?,?,?,?,?]`,[formdata[0].firstname,formdata[0].lastname,formdata[0].email_id,formdata[0].password,formdata[0].userType],(err,result)=>{
    //     if(err){
    //         console.log('err',err)
    //     }else{
    //         console.log('result',result)
    //     }
    // })
})


///////search product

app.post('/searchproduct',(req,res)=>{
    console.log('wwwww',req.body)

    const {product_code} = req.body


    db.query(`select * from product p where p.product_code=${product_code}`,(err,result)=>{
        if(err){
            res.status(500).send({message:"error",errors:err})

        }else{
            console.log('result',result)
            res.send({message:"sucess",results:result,errors:err})


        }
    })

   
    
})

app.post('/qrsearch',(req,res)=>{
    console.log('wwwww',req.body)

    const {product_code} = req.body
    console.log(product_code)


    db.query(`select * from product p where p.product_code=${product_code}`,(err,result)=>{
        if(err){
            // res.status(500).send({message:"error",errors:err})

        }else{
            console.log('result',result)
            // res.send({message:"sucess",results:result,errors:err})


        }
    })

   
    
})

app.post('/updateproduct_search',(req,res)=>{
    const {formdata,loginuser} = req.body
    // console.log('formsss',formdata)

    const total_amount = formdata[0].total
    const quantity = formdata[0].quantity
    const product_code = formdata[0].product_code
    const product_type = formdata[0].product_type
    // console.log("total_amoun",total_amount)
    const firstname = loginuser.map(d=>d.first_name)
    const email = loginuser.map(d=>d.email_address)
    const mobile = loginuser.map(d=>d.mobilenumber)
    const message = `product updated by${firstname,email}` 


    db.query(`UPDATE  product as p SET p.amount = ${total_amount} , p.quantity  = ${quantity} p.product_type =${product_type} where p.product_code = ${product_code}`,(err,result)=>{
        if(err){
            console.log('err',err)
        }else{
            // console.log('result',result)
            res.send({message:"sucess",results:result,errors:err})

        }
    })


    db.query(`insert into auditlog (firstname,email,mobile,message) values(?,?,?,?)`,[firstname,email,mobile,message],(err,results)=>{
        if(err){
            res.status(500).send({message:"error",errors:err})

        }else{
            console.log('resiult2nd',results)
        }
    })
})

app.get('/billno',(req,res)=>{


    db.query(`select * from userbill order by id desc limit 1`,(err,result)=>{
        if(err){
            console.log('errrrr',err)
        }else{
            res.send({message:"sucess",results:result,errors:err})

        }
    })
})

app.post('/savebill',(req,res)=>{
    const {orginal,loginuser,Customer,mobiles,billno} = req.body

   const  product_code = orginal.map(e=>e.product_code)
   const product_title = orginal.map(r=>r.product_title)
   const amount =  orginal.map(i=>i.count_new)
   const net_qty  = orginal.map(u=>u.net_qty)
   const product_type = orginal.map(j=>j.product_type)

   const firstname = loginuser.map(d=>d.first_name)
    const email = loginuser.map(d=>d.email_address)
    const mobile = loginuser.map(d=>d.mobilenumber) 

    const mobile_number = mobile==null?'9874561230':mobile
    // const mobile =  '99876543210'
    const message = `Bill Saved by${firstname,email}` 


    console.log('mobile',mobile_number)

    // var bill_no = ''

    // const dd = 
    // console.log('newbill',dd)

    
   



    const new_billno =  parseInt(billno+1)


    // UPDATE  product as p SET p.amount = ${total_amount} , p.quantity  = ${quantity} where p.product_code = ${product_code}

    
   orginal.map((ele)=>{
        db.query(`update product p set p.quantity = ${ele.net_qty} where p.id = ${ele.id}`,(err,result)=>{
            if(err){
            res.status(500).send({message:"error",errors:err})
                
            }else{

            }
        })
    })
const orginalbill = billno==0?1:parseInt(billno+1)

      
      orginal.map((item)=>{
     db.query (`insert into userbill (product_code,product_title,amount,net_qty,product_type,bill_no,customername,mobilenumber) values('${item.product_code}','${item.product_title}','${item.amount}','${item.net_qty}','${item.product_type}','${orginalbill}','${Customer}','${mobile}')`,(err,result)=>{
        if(err){
            console.log('err',err)
        }else{
            // console.log('ress',result)
            // response += result
        }
     })

      })

    //   console.log('yyyy',yyyy)

    

      
        db.query(`insert into auditlog (firstname,email,mobile,message) values(?,?,?,?)`,[firstname,email,mobile_number,message],(err,result)=>{
            if(err){
                res.status(500).send({message:"error",errors:err})
    
            }else{
               res.send({message:"sucess",results:result,errors:err})

            }
        })

    
})

app.post(`/confromProduct/:editProduct`,(req,res)=>{

const {editProduct} = req.params


db.query(`select * from product p where p.product_code = ${editProduct} `,(err,result)=>{
    if(err){
        res.status(500).send({message:"error",errors:err})

    }else{
        res.send({message:"sucess",results:result,errors:err})

    }
})


})

app.post(`/showallproduct`,(req,res)=>{
    db.query('select * from product',(err,result)=>{
        if(err){
            res.status(500).send({message:"error",errors:err})

        }else{
            res.send({message:"sucess",results:result,errors:err})

        }
    })
})


// db.connect((err)=>{
//     err? console.log(err): console.log("connected")
// })


app.listen(7001,()=>{
    console.log("server running port 7001")
})
    console.log('connected')
}
catch(err){
    console.log(err)
}



// const db = mysql.createConnection({
//     user:"root",
//     host:"localhost",
//     password:"Karthi@123",
//     database:"Kayal_akka"
// })

