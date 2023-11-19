const { default: mongoose } = require('mongoose');
const Product = require('./models/product')

mongoose.connect('mongodb://127.0.0.1/db_shop').then((result)=>{
    console.log('connect to database MongoDB')
}).catch((err)=>{
    console.log
})



const seedProducts = [
    {
        name : "baju putih",
        brand: "adidaas",
        price: 750000,
        color: "blue",
        category:"Baju",
    },
    {
        name : "celana merah",
        brand: "adidaas",
        price: 7000,
        color: "blue",
        category:"Celana",
    },
    {
        name : "baju abu-abu",
        brand: "molto",
        price: 7500,
        color: "blue",
        category:"Baju",
    },
    {
        name : "tas",
        brand: "adidaas",
        price: 750000,
        color: "Green",
        category:"Aksesoris",
    }
]


Product.insertMany(seedProducts).then((result)=>{
    console.log(result)
}).catch((err)=>{
    console.log(err)
})