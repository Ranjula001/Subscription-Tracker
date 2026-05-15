const errorMiddleware = (err, req, res, next) => {

    try{

        let error = { ...err };

        error.message = err.message;

        // Log to console for dev
        console.error(err);

        //mongoose bad ObjectId
        if (err.name === 'CastError') {
            const message = `Resource not found`;
            error = { message, statusCode: 404 }
        }

        //mongoose duplicate key
        if (err.code === 11000) {
            const message = 'Duplicate field value entered';
            error = { message, statusCode: 400 }
        }

        //mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error = { message, statusCode: 400 }
        }

    }catch(error){
        next(error);
    }

}

export default errorMiddleware;