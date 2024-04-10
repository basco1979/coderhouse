import { productsService } from '../dao/repositories/index.js'
import { productModel } from '../dao/models/product.model.js'
import CustomErrors from '../services/errors/CustomError.js'
import { generateSingleIdError, invalidParam } from '../services/errors/info.js'
import ErrorEnum from '../services/errors/error.enum.js'

//Get products by filter(limit, page, sort, query)
export const getProducts = async (req, res) => {
  let listado = []
  let { limit, page, sort, query } = req.query
  if (limit || page || sort || query) {
    if (sort === undefined && query === undefined) {
      listado = await productModel.paginate(
        {},
        {
          limit: limit ? limit : 10,
          page: page ? page : 1,
        }
      )
      return res.json({
        status: 'success',
        payload: listado.docs,
        totalPages: listado.totalPages,
        prevPage: listado.prevPage,
        nextPage: listado.nextPage,
        page: listado.page,
        hasPrevPage: listado.hasPrevPage,
        hasNextPage: listado.hasNextPage,
        prevLink: listado.hasPrevPage
          ? `http://localhost:8080/products?page=${listado.prevPage}`
          : null,
        nextLink: listado.hasNextPage
          ? `http://localhost:8080/products?page=${listado.nextPage}`
          : null,
      })
    }
    if (sort === undefined && query !== undefined) {
      //http://localhost:8080/api/products?query=category:Cat
      let aux = query.split(':')
      aux[0] = aux[0].replace('{', '')
      aux[1] = aux[1].replace('}', '')
      let filter = { [aux[0]]: aux[1] }
      listado = await productModel.paginate(filter ? filter : {}, {
        limit: limit ? limit : 10,
        page: page ? page : 1,
        sort: sort ? sort : null,
      })
      return res.json({
        status: 'success',
        payload: listado.docs,
        totalPages: listado.totalPages,
        prevPage: listado.prevPage,
        nextPage: listado.nextPage,
        page: listado.page,
        hasPrevPage: listado.hasPrevPage,
        hasNextPage: listado.hasNextPage,
        prevLink: listado.hasPrevPage
          ? `http://localhost:8080/products?page=${listado.prevPage}`
          : null,
        nextLink: listado.hasNextPage
          ? `http://localhost:8080/products?page=${listado.nextPage}`
          : null,
      })
    }
    if (query === undefined && sort !== undefined) {
      var aux = sort.split(':')
      aux[0] = aux[0].replace('{', '')
      aux[1] = aux[1].replace('}', '')
      sort = { [aux[0]]: aux[1] }

      listado = await productModel.paginate(
        {},
        {
          limit: limit ? limit : 10,
          page: page ? page : 1,
          sort: sort ? sort : null,
        }
      )
      return res.json({
        status: 'success',
        payload: listado.docs,
        totalPages: listado.totalPages,
        prevPage: listado.prevPage,
        nextPage: listado.nextPage,
        page: listado.page,
        hasPrevPage: listado.hasPrevPage,
        hasNextPage: listado.hasNextPage,
        prevLink: listado.hasPrevPage
          ? `http://localhost:8080/products?page=${listado.prevPage}`
          : null,
        nextLink: listado.hasNextPage
          ? `http://localhost:8080/products?page=${listado.nextPage}`
          : null,
      })
    }
    //localhost:8080/api/products?query=category:Cat&sort=code:desc&limit=2&page=2
    if (sort !== undefined && query !== undefined) {
      var aux = sort.split(':')
      aux[0] = aux[0].replace('{', '')
      aux[1] = aux[1].replace('}', '')
      sort = { [aux[0]]: aux[1] }
      var aux2 = query.split(':')
      aux2[0] = aux2[0].replace('{', '')
      aux2[1] = aux2[1].replace('}', '')
      let filter = { [aux2[0]]: aux2[1] }

      listado = await productModel.paginate(filter, {
        limit: limit ? limit : 10,
        page: page ? page : 1,
        sort: sort ? sort : null,
      })
      res.json({
        status: 'success',
        payload: listado.docs,
        totalPages: listado.totalPages,
        prevPage: listado.prevPage,
        nextPage: listado.nextPage,
        page: listado.page,
        hasPrevPage: listado.hasPrevPage,
        hasNextPage: listado.hasNextPage,
        prevLink: listado.hasPrevPage
          ? `http://localhost:8080/products?page=${listado.prevPage}`
          : null,
        nextLink: listado.hasNextPage
          ? `http://localhost:8080/products?page=${listado.nextPage}`
          : null,
      })
    }
  } else {
    listado = await productModel.paginate({}, {})
    res.json({
      status: 'success',
      payload: listado.docs,
      totalPages: listado.totalPages,
      prevPage: listado.prevPage,
      nextPage: listado.nextPage,
      page: listado.page,
      hasPrevPage: listado.hasPrevPage,
      hasNextPage: listado.hasNextPage,
      prevLink: listado.hasPrevPage
        ? `http://localhost:8080/products?page=${listado.prevPage}`
        : null,
      nextLink: listado.hasNextPage
        ? `http://localhost:8080/products?page=${listado.nextPage}`
        : null,
    })
  }
}

//Get product by id
export const getProductById = async (req, res) => {
  const pid = req.params.pid
  if(pid.length !==24){
    CustomErrors.createError({
      name: 'invalid param',
          cause: invalidParam(pid),
          message: 'Id must be a 24 character length',
          code: ErrorEnum.INVALID_PARAM,
    })
    req.logger.error(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} - Id must be a 24 character length`)
  }
  try {
    const product = await productsService.getProductById(pid)
    if (product) res.send(product)
    else {
   CustomErrors.createError({
          name: 'find product failed',
          cause: generateSingleIdError(id),
          message: 'Id does not exists',
          code: ErrorEnum.ID_NOT_FOUND,
        })
        req.logger.error(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} - Id does not exists`)    
    }
  
  } catch (error) {
    req.logger.error(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} - Error to get product`)  
  }
}

//Create new Product
export const createProduct = async (req, res) => {
  const product = req.body
  product.owner = req.user.email ? req.user.email : "admin"
  try {
    const productCode = await productsService.getProductByCode(product.code)
    if(!productCode){
    const result = await productsService.createProduct(product)
    if(product.owner ===  "admin"){
    return res.redirect('/api/session/admin')
    }
    else{
      return res.redirect('/products')
    }
    }
    else{
    req.logger.error(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} - Error to create product - Code exists`)
    return res.status(500).json({message:"This product code already exist."})
    }
  } catch (err) {
    req.logger.error(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} - Error to create product`)  
    return res.status(500).json({message:"Internal server error."})
  }
}

//Update a existing Product
export const updateProduct = async (req, res) => {
  const productId = req.params.pid
  const product = await productModel.findOne({ _id: productId})
  const newProduct = req.body
  try {
   if(req.user.role === 'admin' || product.owner === req.user.email){
    const result = await productsService.updateProduct(productId, newProduct)
    res.send(result)
    }
    else{
      res.send({message: "Unauthorized to update this product"})
    }
  } catch (err) {
    req.logger.error(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} - Error to update product`)  
  }
}

//Delete a Product by Id
export const deleteProduct = async (req, res) => {
  const productToDelete = req.params.pid
  const product = await productModel.findOne({ _id: req.params.pid})

  try {
    if(req.user.role === 'admin' || product.owner === req.user.email){
    const result = await productsService.deleteProduct(productToDelete)
    res.send(result)
    }
    else{
      res.send({message: "Unauthorized to update this product"})
    }
  } catch (err) {
    req.logger.error(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} - Error to delete product`)  
  }
}
