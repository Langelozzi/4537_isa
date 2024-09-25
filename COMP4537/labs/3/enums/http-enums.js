const HTTPMethods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
}

const HTTPStatusCodes = {
    Ok: 200,
    NotFound: 404,
    InternalServerError: 500
}

module.exports = {
    HTTPMethods,
    HTTPStatusCodes
}