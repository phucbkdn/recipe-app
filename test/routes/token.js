describe('Routers: Token', () => {
  const { Users } = app.db.models;
  describe('POST /token', () => {
    beforeEach(done => {
      Users.destroy({ where: {}})
        .then(() => Users.create({
          name: 'Join',
          email: 'join@gmail.com',
          password: '12345678',
        }))
        .then(() => done());
    });
    describe('status 200', () => {
      it('return authenticated user token', done => {
        request.post('/token')
          .send({
            email: 'join@gmail.com',
            password: '12345678',
          })
          .expect(200)
          .end((err, res) => {
            console.log('res.body',res)
            // expect(res.body).to.include.keys('token');
            done(err);
          });
      });
    });
    describe('status 401', () => {
      it('throws error when password is incorrect', done => {
        request.post('/token')
          .send({
            email: 'join@gmail.com',
            password: 'WRONG_PASSWORD',
          })
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
      it('throws error when email is incorrect', done => {
        request.post('/token')
          .send({
            email: 'wrong@gmail.com',
            password: '12345678',
          })
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
      it('throws error when email and password are blank', done => {
        request.post('/token')
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
    });
  });
});
