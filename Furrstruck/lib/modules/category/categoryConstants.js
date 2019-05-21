
http_codes = {
    created: 201,
    ok: 200,
    unAuthorized: 401,
    dataNotFound: 404,
    forbidden: 403,
    badRequest: 400,
}

types = {
    category: "category",
    subCategory: "subCategory"
}

messages = {
    nameNotEmpty: "Name Is Empty Or Invalid.",
    added: "Added Successfully",
    ok: "ok",
    updated: "Update Successfully",
    exist: "Already Existing",
    dataNotFound: "Data Not Found",
    permissionDenied: "Permission Denied",
    unAuthAccess: "Unauthorize Access",
    deleted: "Deleted Successfully",
    invalidId: "Invalid Id"
}

// =====================================================EXPORT ========================================================================  

module.exports = {
    http_codes,
    messages,
    types
}