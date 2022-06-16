const expect = require('expect');
const _ = require('lodash');
const request = require('supertest');
const UserToken = require('../../../../model/userToken');
const { HEADER, ERROR } = require('./../../../../util/constant');
const commonSeed = require('./../../../seed/common.seed');

module.exports = (app, routePrefix) => {

    describe(`POST/${routePrefix}/user/login`, () => {

        it('should login with correct credentials', (done) => {

            let newToken;

            // This timeout is set not to get the same token
            setTimeout(() => {

                request(app)
                    .post(`/${routePrefix}/user/login`)
                    .send({
                        email: commonSeed.users[0].email,
                        password: commonSeed.users[0].passwordPlain
                    })
                    .expect(200)
                    .expect(res => {
                        expect(res.body.token).toBeTruthy();
                        newToken = res.body.token;
                    })
                    .end((err) => {
                        if (err) return done(err);

                        // Find new token
                        UserToken.findOne({ token: newToken })
                            .then(ut => {
                                expect(ut).toBeTruthy();
                                done();
                            })
                            .catch((e) => done(e));

                    });

            }, 1000);

        });

        it('should not login if no user found with this email', (done) => {

            request(app)
                .post(`/${routePrefix}/user/login`)
                .send({
                    email: 'dummy@gmail.com',
                    password: 'password0'
                })
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(ERROR.USER_NOT_FOUND.code);
                })
                .end(done);

        });

        it('should not login if email is correct but password is incorrect', (done) => {

            request(app)
                .post(`/${routePrefix}/user/login`)
                .send({
                    email: commonSeed.users[0].email,
                    password: 'wrongpassword1'
                })
                .expect(400)
                .expect(res => {
                    expect(res.body.code).toBe(ERROR.INCORRECT_CREDENTIALS.code);
                })
                .end(done);

        });

    });
}