import https from 'https';
import fs from 'fs';

module.exports = app => {
  if (process.env.NODE_ENV !== 'test') {
    const credentials = {
      key: fs.readFileSync('products.key', 'utf8'),
      cert: fs.readFileSync('products.cert', 'utf8'),
    };

    app.db.sequelize.sync().done(() => {
      https.createServer(credentials, app)
        .listen(app.get('port'), () => {
          console.log(`NTask API - Port ${app.get('port') || 3000}`);
        });
      app.listen(app.get('port'), () => {
        console.log(`NTask API - Port ${app.get('port')}`);
      });
    });
  }
};
