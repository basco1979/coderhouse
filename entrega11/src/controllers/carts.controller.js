import CartManagerDB from '../dao/cartManagerDB.js'

const cartManager = new CartManagerDB()

export const postCart = async (req, res) => {
    const cart = req.body;
    try{
        const result = await cartManager.addCart(cart);
        res.send(result);
    }
    catch(err){
        console.log("Error al agregar el carrito");
    }
}

export const getCartById = async (req, res) => {
  const cid = req.params.cid
  const cart = await cartManager.getCartById(cid)
  if (cart) {
    if(cart.products.length < 1){
      res.send({message : "Carrito Vacío"})
    }
    else{
      res.send({cart})}
    }
  else res.status(404).send({ error: 'Carrito no encontrado' })
}

export const postProductInCart = async(req, res) => {
  const { cid } = req.params
  const { pid } = req.params
  try{
        const result = await cartManager.addProductToCart(cid, pid)

        res.send(result);
    }
    catch(err){
        console.log("Error al agregar el producto");
    }
}

export const deleteProductInCart = async(req, res) => {
  const { cid , pid} = req.params
  const cart = await cartManager.getCartById(cid)
  
  let index = cart.products.find((item) => item.id === pid)
  if(index){
    cart.products.pull(index)
    await cart.save()
    .then(()=>{res.status(200).send('Eliminado correctamente')})
    .catch((err)=>{console.log(err)})
  }else{
    res.send({message:"No existe el ID"})
  }  
}

export const putCart = async(req, res) => {
  //no entiendo bien que hace esto
  const { cid} = req.params
  const  newCart  = req.body
 try {
  await cartManager.updateCart(cid, newCart)
    res.json({ message : "Carrito actualizado"})
 } catch (error) {
        console.log("Error al actualizar el producto");  
 } 
}

export const putProductInCart = async(req, res) => {
  const { cid , pid} = req.params
  const cart = await cartManager.getCartById(cid)
  let index;
  for (let i=0 ;i<cart.products.length;i++){
    if (cart.products[i].id == pid) {index = i;}
    }
 cart.products[index].quantity = req.body.quantity
 try {
  await cartManager.updateCart(cid, cart)
    res.json(cart.products[index])
 } catch (error) {
        console.log("Error al actualizar el producto");  
 }
}

export const deleteCart = async(req, res) => {
  const { cid } = req.params
  const cart = await cartManager.getCartById(cid)
  cart.products = []
try {
  await cartManager.updateCart(cid, cart)
    res.json(cart.products)
 } catch (error) {
        console.log("Error al vaciar el carrito");  
 }
}