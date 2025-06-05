export class ApplicationError extends Error{

    constructor(message,code){
        console.log("Inside application");
        super(message);
        this.code=code;
    
    }
    
    
    
    }