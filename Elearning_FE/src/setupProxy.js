// src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080', // Địa chỉ của API server
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Xóa phần `/api` khỏi đường dẫn yêu cầu
      },
    })
  );
};
