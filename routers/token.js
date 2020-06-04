import jwt from 'jwt-simple';

module.exports = app => {
  const { config } = app.libs;
  const { Users } = app.db.models;

  /**
   * @api {post} /token Authentication Token
   * @apiGroup Credentials
   * @apiParam {String} email User email
   * @apiParam {String} password User password
   * @apiParamExample {json} Input
   *  {
   *    "email": "join@gmail.com",
   *    "password": "12345678",
   *  }
   * @apiSuccess {String} token Token of authencaticated user
   * @apiSuccessExample {json} Success
   *  HTTP/1.1 200 OK
   *  {token: abc.xyz}
   * @apiErrorExample {json} Authencaticated erroe
   *   HTTP/1.1 401 Anauthorized
   */
  app.post('/token', (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      Users.findOne({ where: { email } })
        .then(user => {
          if (Users.isPassword(user.password, password)) {
            const payload = { id: user.id };
            delete user.password
            res.json({
              token: jwt.encode(payload, config.jwtSecret),
              user,
            });
          } else {
            res.sendStatus(401);
          }
        })
        .catch(error => {
          res.sendStatus(401);
        });
    } else {
      res.sendStatus(401);
    }
  });
};
