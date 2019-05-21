const STATUS_CODE = {
    ERROR: 0,
    SUCCESS: 1
};

const STATUS = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
    DELETE: "DELETE"
}
const ACCOUNT_LEVEL = {
    ADMIN: 1,
    NORMAL_USER: 0
};

const DB_MODEL_REF = {
    CATEGORY: "category",
    PRODUCT: "product",
    PRODUCTINFO: "productInfo",
    VERSION: "Version",
    ORDER: "order"
};

const MESSAGES = {
    intrnlSrvrErr: "Please try after some time.",
    inValidBody: "Invalid body"
};

module.exports = {
    STATUS,
    STATUS_CODE,
    ACCOUNT_LEVEL,
    DB_MODEL_REF,
    MESSAGES
}