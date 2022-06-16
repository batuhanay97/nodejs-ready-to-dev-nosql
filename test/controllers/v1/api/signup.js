const expect = require('expect');
const _ = require('lodash');
const request = require('supertest');
const uuidv4 = require('uuid/v4');
const { HEADER, ERROR, USER_TYPE, CREATION_TYPE } = require('./../../../../util/constant');
const commonSeed = require('./../../../seed/common.seed');
const User = require('../../../../model/user');

module.exports = (app, routePrefix) => {

    describe(`POST/${routePrefix}/user/signup`, () => {

        it('should signup user ', (done) => {

            request(app)
                .post(`/${routePrefix}/user/signup`)
                .send({
                    name: 'dummy name',
                    surname: 'dummy surname',
                    password: 'dummypasword1',
                    email: 'dummy@gmail.com',
                    username: 'dummy username'
                })
                .expect(200)
                .end(err => {
                    if (err) return done(err);

                    User.findOne({
                        name: 'dummy name',
                        surname: 'dummy surname',
                        email: 'dummy@gmail.com',
                        username: 'dummy username'
                    })
                    .then(user => {
                        expect(user).toBeTruthy();
                        done();
                    })
                    .catch(err => done(err));
                })

        });

        it('should not signup user if user email exist ', (done) => {

            request(app)
                .post(`/${routePrefix}/user/signup`)
                .send({
                    name: 'dummy name',
                    surname: 'dummy surname',
                    password: 'dummypasword1',
                    email: commonSeed.users[0].email,
                    username: 'dummy username'
                })
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(ERROR.USER_ALREADY_EXIST.code);
                })
                .end(done)

        });

    });

};