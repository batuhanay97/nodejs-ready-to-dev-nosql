module.exports = {

    AVAILABLE_VERSIONS: ['v1'], // Available REST service versions

    ENVIRONMENT: {
        TEST: 'test',
        DEVELOPMENT: 'development',
        PRODUCTION: 'production'
    },

    LANGUAGES : ['en', 'tr'],

    DEFAULT_LANGUAGE : 'tr',

    TIMEOUT: {
        REQUEST: 10 * 1000, // in miliseconds
    },

    COUNTRIES: {
        TURKEY: {
            name: 'Türkiye',
            code: 'tr'
        }
    },

    CONSTANT: {
        HASH_SALT: 10
    },

    EXPIRATION: {
        JWT_TOKEN: 60 * 60, // in seconds
        TOKEN_IN_DATABASE: 1, // in days
    },

    // Response headers
    HEADER: {
        AUTHENTICATION: 'x-auth',
        LANGUAGE: 'x-lang'
    },

    RESPONSE_STATUS: {
        FAIL: 'Fail',
        SUCCESS: 'Success',
        AUTHENTICATION_FAILED: 'Authentication fail'
    },

    RESPONSE_TYPE: {
        FILE: 'File'
    },

    LIMIT: {
        MIN_PASSWORD_CHAR_COUNT: 6,
        MAX_PASSWORD_CHAR_COUNT: 32
    },

    PAGINATION: {},

    USER_TYPE: {
        USER: 0,
        CMS_USER: 1,
        CMS_ADMIN: 2,
    },

    // Errors
    ERROR: {

        AUTHENTICATION_FAILED: {
            code: 1000,
            message :{
                tr: 'Lüften sisteme giriş yapın',
                en: 'Please login to the system'
            }
        },
        USER_ALREADY_EXIST: {
            code: 1001,
            message :{
                tr: 'Bu email zaten kayıtlı',
                en: 'This email already sign'
            }
        },
        NAME_MISSING: {
            code: 1002,
            message :{
                tr: 'İsim eksik',
                en: 'Name not exists'
            }
        },
        SURNAME_MISSING: {
            code: 1003,
            message :{
                tr: 'Soyisim eksik',
                en: 'Surname not exists'
            }
        },
        BADLY_FORMATTED_EMAIL: {
            code: 1004,
            message :{
                tr: 'E-posta adresi doğru yazılmamış',
                en: 'E-mail is badly formated'
            }
        },
        INVALID_PASSWORD: {
            code: 1005,
            message :{
                tr: 'Geçerli bir şifre değil',
                en: 'Password is badly formated'
            }
        },
        PHONE_MISSING: {
            code: 1006,
            message :{
                tr: 'Telefon numarası eksik',
                en: 'Phone not exist'
            }
        },
        USERNAME_MISSING: {
            code: 1007,
            message :{
                tr: 'Telefon numarası eksik',
                en: 'Phone not exist'
            }
        },
        IMAGE_TOO_LARGE: {
            code: 1008,
            message: {
                tr: 'Lütfen daha küçük bir boyutta resim yükleyin',
                en: 'Please upload a smaller image in size'
            }
        },
        INCORRECT_FIELD_NAME: {
            code: 1009,
            message: {
                tr: 'Hatalı alan adı',
                en: 'Incorrect field name'
            }
        },
        USER_NOT_FOUND: {
            code: 1010,
            message: {
                tr: 'Bu e-posta ile kayıtlı kullanıcı bulunamadı',
                en: 'Could not found user with that email'
            }
        },
        INCORRECT_CREDENTIALS: {
            code: 1011,
            message: {
                tr: 'E-posta veya şifre yanlış',
                en: 'Email or password is incorrect'
            }
        },
        UNKNOWN: {
            code: 3000,
            message: {
                tr: 'Bilinmeyen bir hata',
                en: 'Unknown error'
            }
        },
        INTERNAL_SERVER_ERROR: {
            code: 4000,
            message: {
                tr: 'Sunucu hatası',
                en: 'Internal server error'
            }
        }
    }
}