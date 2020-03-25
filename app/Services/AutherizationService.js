const InvaildAccessException = use('App/Exceptions/InvaildAccessException');
const InvalidNotExistExcetion = use('App/Exceptions/InvalidNotExistException');

class AutherizationService{    
    verifyPermission(resouce, user){
        if(!resouce){
            throw new InvalidNotExistExcetion();
        }
        if(resouce.user_id !==user.id){
            throw new InvaildAccessException();
        }
    }
}

module.exports = new AutherizationService();