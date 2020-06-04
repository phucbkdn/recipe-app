import suppertest from 'supertest';
import chai from 'chai';
import app from '../index';

global.app = app;
global.request = suppertest(app);
global.expect = chai.expect;
