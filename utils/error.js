function UserAuthException(message,status=401){
    this.status = status
    this.message = message
}


module.exports = {
    UserAuthException
}