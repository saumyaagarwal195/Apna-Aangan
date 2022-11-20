const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAuthorisation, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/",verifyToken, async (req,res)=>{
    const newCart = new Cart(req.body);
    try{
        const savedCart = await newCart.save();
        return res.status(200).json(savedCart);
    }catch(err){
        return res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyTokenAuthorisation, async (req, res) => {  
    try{
        const updatedCart = await Cart.findByIdAndUpdate(
           req.params.id, 
           {
             $set: req.body
           }, 
           {new: true}
        );
        return res.status(200).json(updatedCart);
    }catch(err){
        return res.status(500).json(err);
    }   
});

//DELETE

router.delete("/:id", verifyTokenAuthorisation, async (req, res) =>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        return res.status(200).json("Cart has been deleted");
    }catch(err){
        return res.status(500).json(err);
    }
});

//GET User Cart
router.get("/find/:userid", verifyTokenAuthorisation, async (req, res) =>{
    try{
        const cart = await Cart.findOne({userId: req.params.userId});
        
        res.status(200).json(cart);
    }catch(err){
        return res.status(500).json(err);
    }
});

//GET ALL 
router.get("/", verifyTokenAndAdmin, async(req, res)=> {
    try{
    const carts = await Cart.find();
    return res.send(200).json(carts);
    }catch(err){
        return res.status(500).json(err);
    }
});


module.exports = router;