module.exports = app => {
  const { Users } = app.db.models;

  app.route('/user')
    .all(app.auth.authenticate())
    /**
     * @api {get} /user Return the authenticated user's data
     * @apiGroup User
     * @apiHeader {String} Authorization Token of authentication user
     * @apiHeaderExample {json} Header
     *  {"Authorization": "JWT abc.xyz"}
     * @apiSuccess {Number} id User id
     * @apiSuccess {String} name User name
     * @apiSuccess {String} email User email
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 200 OK
     *  {
     *    "id": 1,
     *    "name": "join",
     *    "email": "join@gmail.com",
     *  }
     * @apiErrorExample {json} Find error
     *  HTTP/1.1 412 Precondition Failed
     */
    .get((req, res) => {
      Users.findById(req.user.id, {
        // attributes: ['id', 'name', 'email'],
      })
        .then(result => res.json(result))
        .catch(err => {
          res.status(412).json({ errors: err });
        });
    })
    /**
     * @api {delete} /user Delete an authenticated user
     * @apiGroup User
     * @apiHeader {String} Authorization Token of authentication user
     * @apiHeaderExample {json} Header
     *  {"Authorization": "JWT abc.xyz"}
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 204 No Content
     * @apiErrorExample {json} Find error
     *  HTTP/1.1 412 Precondition Failed
     */
    .delete((req, res) => {
      Users.destroy({ where: req.user.id })
        .then(result => res.sendStatus(204))
        .catch(err => {
          res.status(412).json({ errors: err });
        });
    });

  /**
   * @api {post} /user Register a new user
   * @apiGroup User
   * @apiParam {String} name User name
   * @apiParam {String} email User email
   * @apiParam {String} password User password
   * @apiParamExample {json} Input
   *  {
   *    "name": "join",
   *    "email": "join@gmail.com",
   *    "password": "12345"
   *  }
   * @apiSuccess {Number} id User id
   * @apiSuccess {String} name User name
   * @apiSuccess {String} email User email
   * @apiSuccess {String} password User encrypted password
   * @apiSuccess {Data} updated_at Update's date
   * @apiSuccess {Data} created_at Register's date
   * @apiSuccessExample {json} Success
   *  HTTP/1.1 200 OK
   *  {
   *    "id": 1,
   *    "name": "join",
   *    "email": "join@gmail.com",
   *    "updated_at": "2016-02-10T15:20:11.700Z",
   *    "created_at": "2016-02-10T15:20:11.700Z",
   *  }
   * @apiErrorExample {json} Find error
   *  HTTP/1.1 412 Precondition Failed
   */
  app.post('/users', (req, res) => {
    Users.create(req.body)
      .then(result => res.json(result))
      .catch(err => {
        res.status(412).json({ errors: err });
      });
  });
};
