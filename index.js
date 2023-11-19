const path = require('path')
const express = require('express');
const methodOverride = require ('method-override')
const { default: mongoose } = require('mongoose');
const app = express();


// step 2 models 
const Product = require('./models/product')


// import mongoose   from 'mongoose'; 
mongoose.connect('mongodb://127.0.0.1/db_shop').then((result)=>{
    console.log('connect to database MongoDB')
}).catch((err)=>{
    console.log
})

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

// mengambil data dari body request 
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.get('/', (req,res)=>{
    res.send('hello word')
})


// tambahan selanjutanya step 3 
app.get('/products', async (req,res)=>{
    const {category} = req.query
    if(category){
    const products = await Product.find({category})
    res.render('products/index',{products,category})
    }else{
    const products = await Product.find({})
    res.render('products/index',{products,category:'All'})
    }
})


app.get('/products/create',(req,res)=>{
    res.render('products/create')
})

app.post('/products',async(req,res)=>{
    const product = new  Product(req.body)
    await product.save()
    res.redirect(`/products/${product._id}`)
})

app.get('/products/:id', async(req,res)=>{
    const {id} = req.params
    const product = await Product.findById(id)
    res.render('products/show', {product})
})

// masuk ke menu update
app.get('/products/:id/edit', async(req,res)=>{
    const {id} = req.params
    const product = await Product.findById(id)
    res.render('products/edit', {product})
})

// update lanjutan
app.put('/products/:id',async(req,res)=>{
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators:true})
    res.redirect(`/products/${product._id}`)
})

// delete
app.delete('/products/:id',async(req,res)=>{
    const {id} = req.params
    await Product.findByIdAndDelete(id)
    res.redirect('/products')
})
app.listen(3000,() =>{
    console.log('shop app listening on http://127.0.0.1:3000')
})
