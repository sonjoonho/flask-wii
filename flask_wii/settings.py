class Config(object):
    DEBUG = False
    TESTING = False


class DevelopmentConfig(Config):
    ENV = "development"
    DEBUG = True
    TESTING = True
    SECRET_KEY = "super secret"


class ProductionConfig(Config):
    ENV = "production"
    TESTING = False
    # Changed in production
    SECRET_KEY = "really super secret"



