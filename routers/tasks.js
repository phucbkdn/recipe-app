import { calculateLimitAndOffset, paginate } from 'paginate-info';
import Sequelize from 'sequelize';

module.exports = app => {
  const { Tasks } = app.db.models;

  app.route('/tasks')
    .all(app.auth.authenticate())
    /**
     * @api {get} /tasks List the user's tasks
     * @apiGroup Tasks
     * @apiHeader {String} Authorization Token of authentication user
     * @apiHeaderExample {json} Header
     *  {"Authorization": "JWT abc.xyz"}
     * @apiSuccess {Object[]} tasks Tasks's list
     * @apiSuccess {Number} tasks.id Tasks id
     * @apiSuccess {String} tasks.name Tasks name
     * @apiSuccess {Number} tasks.price Tasks price
     * @apiSuccess {Date} tasks.created_at Register's date
     * @apiSuccess {Date} tasks.updated_at Updated's date
     * @apiSuccess {Number} tasks.user_id Id do user_id
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
      // "/tasks": List Tasks
      const {
        query: { currentPage, pageSize }
      } = req;
      const { limit, offset } = calculateLimitAndOffset(currentPage, pageSize);
      Tasks.findAll({ limit, offset })
        .then(result => {
          const { rows, count } = result;
          const meta = paginate(currentPage, count, rows, pageSize);
          res.json({ meta, rows })
        })
        .catch(err => {
          res.status(412).json({ errors: err });
        });
    })

    /**
     * @api {post} /tasks Register a new product
     * @apiGroup Tasks
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
      // "/tasks": add new product

      const { body } = req;
      body.user_id = req.user.id;
      console.log('req.user.id', body);
      Tasks.create(body)
        .then(result => res.json(result))
        .catch(err => {
          res.status(412).json({ errors: err });
        });
    });


  app.route('/tasks/:id')
    .all(app.auth.authenticate())
    /**
     * @api {get} /tasks/:id Get product
     * @apiGroup tasks
     * @apiHeader {String} Authorization Token of authentication user
     * @apiHeaderExample {json} Header
     *  {"Authorization": "JWT abc.xyz"}
     * @apiParam {id} id Product id
     * @apiSuccess {Number} id tasks id
     * @apiSuccess {String} name tasks name
     * @apiSuccess {Number} price tasks price
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
      // "tasks/id": get product by id
      Tasks.findOne({
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
     * @api {put} /tasks/:id Update product
     * @apiGroup tasks
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
      // "tasks/id": update product by id
      Tasks.update(req.body, {
        where: {
          id: req.params.id,
          user_id: req.user.id,
        },
      })
        .then(result => res.status(204).json(result))
        .catch(err => {
          res.status(412).json({ errors: err });
        });
    })
    /**
     * @api {delete} /tasks/:id Remove product
     * @apiGroup tasks
     * @apiHeader {String} Authorization Token of authentication user
     * @apiHeaderExample {json} Header
     *  {"Authorization": "JWT abc.xyz"}
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 204 No Content
     * @apiErrorExample {json} Find error
     *  HTTP/1.1 412 Precondition Failed
     */
    .delete((req, res) => {
      // "tasks/id": delete product by id
      Tasks.destroy({
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
