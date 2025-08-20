class ApiError extends Error{

    constructor(
        statusCode,
        message="SOMETHING WENT WRONG",
        error= [],
        stack=""
    ){
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.data = null
        this.success = false
        this.error = error

        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this,
                this.constructor
            )
        }
    }
}
export default ApiError;