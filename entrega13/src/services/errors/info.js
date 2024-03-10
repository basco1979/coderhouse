export const generateSingleIdError = (id) => {
    return `The id does not exists - ID: ${id}`;
}

export const generateProductErrorInfo = (product) => {
    return `One or more properties are incomplete or invalid
        title: needs to be a string, received ${typeof product.title}
        description: needs to be a string, received ${typeof product.description}
        code: needs to be a string, received ${typeof product.code}
        stock: needs to be a number, received ${typeof product.stock}
        status: needs to be a boolean, received ${typeof product.status}
        category: needs to be a string, received ${typeof product.category}
    `;
}

export const userNotFound = () => {
    return 'User not found';
}

export const productExceedsStock = () => {
    return "You're trying to add more quantity than product stocks"
}