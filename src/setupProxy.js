const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(proxy('/user/**', 
        { target: 'http://kaamayalb-670475734.ap-south-1.elb.amazonaws.com' }
    ));
};