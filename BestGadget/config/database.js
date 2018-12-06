if(process.env.NODE_ENV === 'production'){
    module.exports = {mongoURI:
        'mongodb://swagath:test123@ds149742.mlab.com:49742/buygadgets-prod'}
}
    else{
        module.exports = {mongoURI: 'mongodb://localhost/buygadgetsapp'}
    }
    
