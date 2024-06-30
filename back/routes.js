const { postComment, getComment, deleteComment } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/',
    handler: postComment,
  },
  {
    method: 'GET',
    path: '/',
    handler: getComment,
  },
  {
    method: 'POST',
    path: '/delete',
    handler: deleteComment,
  },
];

module.exports = routes;
