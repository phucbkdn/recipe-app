import cluster from 'cluster';
import os from 'os';

const CPUS = os.cpus();
if (cluster.isMaster) {
  CPUS.forEach(() => cluster.fork());
  cluster.on('listening', worked => {
    console.log('Cluster %d connected', worked.process.pid);
  });

  cluster.on('disconnect', worked => {
    console.log('Cluster %d disconnected', worked.process.pid);
  });

  cluster.on('exit', worked => {
    console.log('Cluster %d is dead', worked.process.pid);
    cluster.fork();
  });
} else {
  require('./index.js');
}
