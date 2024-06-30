const { postComment, getComment, deleteComment, getHtml } = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: getHtml,
  },
  {
    method: 'POST',
    path: '/comment/',
    handler: postComment,
  },
  {
    method: 'GET',
    path: '/comment/',
    handler: getComment,
  },
  {
    method: 'DELETE',
    path: '/comment/',
    handler: deleteComment,
  },
];

module.exports = routes;
