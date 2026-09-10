const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/project-smhrd',
    createProxyMiddleware({
      target: process.env.REACT_APP_PROXY_URL || 'http://localhost:8070',
      changeOrigin: true,
    })
  );
};
