const proxy = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    proxy("/user/**", {
      target:
        "http://kaamaayabeanstalk-env.eba-3rtpwci7.ap-south-1.elasticbeanstalk.com",
    })
  );
};
