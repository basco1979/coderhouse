import { productsService } from '../dao/repositories/index.js'
import { productModel } from '../dao/models/product.model.js'
import CustomErrors from '../services/errors/CustomError.js'
import { generateProductErrorInfo, generateSingleIdError, invalidParam } from '../services/errors/info.js'
import ErrorEnum from '../services/errors/error.enum.js'

export const getProducts = async (req, res) => {
  let listado = []
  let { limit, page, sort, query } = req.query
  if (limit || page || sort || query) {
    if (sort === undefined && query === undefined) {
      listado = await productsService.paginate(
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
    http: if (sort !== undefined && query !== undefined) {
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

export const getProductById = async (req, res) => {
  const pid = req.params.pid
  if(pid.length !==24){
    CustomErrors.createError({
      name: 'invalid param',
          cause: invalidParam(pid),
          message: 'Id must be a 24 character length',
          code: ErrorEnum.INVALID_PARAM,
    })
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
    }
  
  } catch (error) {
    console.error(error)
  }
}

export const createProduct = async (req, res) => {
  const product = req.body
  try {
    const result = await productsService.createProduct(product)
    res.status(201).send(result)
  } catch (err) {
    CustomErrors.createError({
      name: 'product creation failed',
      cause: generateProductErrorInfo(product),
      message: 'Error trying to create product',
      code: ErrorEnum.INVALID_TYPE_ERROR,
    })
  }
}

export const updateProduct = async (req, res) => {
  const productId = req.params.pid
  const product = req.body
  try {
    const result = await productsService.updateProduct(productId, product)
    res.send(result)
  } catch (err) {
    console.log('Error al actualizar el producto')
  }
}

export const deleteProduct = async (req, res) => {
  const product = req.params.pid
  try {
    const result = await productsService.deleteProduct(product)
    res.send(result)
  } catch (err) {
    console.log('error', err)
  }
}
