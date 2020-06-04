module.exports = app => {
  const { Recipes } = app.db.models;

  app.route('/recipes')
    .all(app.auth.authenticate())
    /**
     * @api {get} /recipes List the user's recipes
     * @apiGroup recipes
     * @apiHeader {String} Authorization Token of authentication user
     * @apiHeaderExample {json} Header
     *  {"Authorization": "JWT abc.xyz"}
     * @apiSuccess {Object[]} recipes recipes's list
     * @apiSuccess {Number} recipes.id recipes id
     * @apiSuccess {String} recipes.name recipes name
     * @apiSuccess {Number} recipes.price recipes price
     * @apiSuccess {Date} recipes.created_at Register's date
     * @apiSuccess {Date} recipes.updated_at Updated's date
     * @apiSuccess {Number} recipes.user_id Id do user_id
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 200 OK
     *  [{
     *    "id": 1,
     *    "name": "samsung",
     *    "price": 100,
     *    "updated_at": "2016-02-10T15:46:51.778Z",
     *    "created_at": "2016-02-10T15:46:51.778Z",
     *    "user_id": 2
     *  }]
     * @apiErrorExample {json} Find error
     *  HTTP/1.1 412 Precondition Failed
     */
    .get((req, res) => {
      // "/recipes": List recipes
      Recipes.findAll({
        where: { user_id: req.user.id },
      })
        .then(result => res.json(result))
        .catch(err => {
          res.status(412).json({ errors: err });
        });
    })

    /**
     * @api {post} /recipes Register a new product
     * @apiGroup recipes
     * @apiHeader {String} Authorization Token of authentication user
     * @apiHeaderExample {json} Header
     *  {"Authorization": "JWT abc.xyz"}
     * @apiParam {String} name Product name
     * @apiParam {Number} price Product price
     * @apiParamExample {json} Input
     *  {
     *    "name": "samsung",
     *    "price": 100
     *  }
     * @apiSuccess {Number} id Product id
     * @apiSuccess {String} name Product name
     * @apiSuccess {Number} price User price
     * @apiSuccess {Number} user_id User id
     * @apiSuccess {Data} updated_at Update's date
     * @apiSuccess {Data} created_at Register's date
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 200 OK
     *  {
     *    "id": 1,
     *    "name": "Samsung",
     *    "price": 100,
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:20:11.700Z",
     *    "user_id": 1,
     *  }
     * @apiErrorExample {json} Find error
     *  HTTP/1.1 412 Precondition Failed
     */
    .post((req, res) => {
      // "/recipes": add new product

      const { body } = req;
      body.user_id = req.user.id;
      console.log('req.user.id', body);
      Recipes.create(body)
        .then(result => res.json(result))
        .catch(err => {
          res.status(412).json({ errors: err });
        });
    });


  app.route('/recipes/:id')
    .all(app.auth.authenticate())
    /**
     * @api {get} /recipes/:id Get product
     * @apiGroup recipes
     * @apiHeader {String} Authorization Token of authentication user
     * @apiHeaderExample {json} Header
     *  {"Authorization": "JWT abc.xyz"}
     * @apiParam {id} id Product id
     * @apiSuccess {Number} id recipes id
     * @apiSuccess {String} name recipes name
     * @apiSuccess {Number} price recipes price
     * @apiSuccess {Date} created_at Register's date
     * @apiSuccess {Date} updated_at Update's date
     * @apiSuccess {Number} user_id Id do user_id
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 200 OK
     *  {
     *    "id": 1,
     *    "name": "samsung",
     *    "price": 100,
     *    "updated_at": "2016-02-10T15:46:51.778Z",
     *    "created_at": "2016-02-10T15:46:51.778Z",
     *    "user_id": 2
     *  }
     * @apiErrorExample {json} Find error
     *  HTTP/1.1 412 Precondition Failed
     */
    .get((req, res) => {
      // "recipes/id": get product by id
      Recipes.findOne({
        where: {
          id: req.params.id,
          user_id: req.user.id,
        },
      })
        .then(result => {
          if (result) {
            res.json(result);
          } else {
            res.sendStatus(404);
          }
        })
        .catch(err => {
          res.status(412).json({ errors: err });
        });
    })
    /**
     * @api {put} /recipes/:id Update product
     * @apiGroup recipes
     * @apiHeader {String} Authorization Token of authentication user
     * @apiHeaderExample {json} Header
     *  {"Authorization": "JWT abc.xyz"}
     * @apiParam {id} id Product id
     * @apiParam {String} name Product name
     * @apiParam {Number} price Product price
     * @apiParamExample {json} Input
     *  {
     *    "name": "Samsung",
     *    "price": 100
     *  }
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 204 No Content
     * @apiErrorExample {json} Find error
     *  HTTP/1.1 412 Precondition Failed
     */
    .put((req, res) => {
      // "recipes/id": update product by id
      Recipes.update(req.body, {
        where: {
          id: req.params.id,
          user_id: req.user.id,
        },
      })
        .then(result => res.sendStatus(204))
        .catch(err => {
          res.status(412).json({ errors: err });
        });
    })
    /**
     * @api {delete} /recipes/:id Remove product
     * @apiGroup recipes
     * @apiHeader {String} Authorization Token of authentication user
     * @apiHeaderExample {json} Header
     *  {"Authorization": "JWT abc.xyz"}
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 204 No Content
     * @apiErrorExample {json} Find error
     *  HTTP/1.1 412 Precondition Failed
     */
    .delete((req, res) => {
      // "recipes/id": delete product by id
      Recipes.destroy({
        where: {
          id: req.params.id,
          user_id: req.user.id,
        },
      })
        .then(result => res.sendStatus(204))
        .catch(err => {
          res.status(412).json({ errors: err });
        });
    });
};
