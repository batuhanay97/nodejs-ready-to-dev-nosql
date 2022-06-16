const expect = require('expect');
const bcrypt = require('bcryptjs');
const { checkFields } = require('./../../util/helper');
const { ERROR } = require('./../../util/constant');

module.exports = () => {

    describe(`checkFields`, () => {

        it('should return fields if fields are correct', (done) => {

            let fieldResult = checkFields({
                name: ' Burak ',
                surname: ' iri   ',
                password: 'ab123457!',
                email: 'dummy@gmail.com',
                phone: '905324567896'
            });

            expect(fieldResult.name).toBe('Burak');
            expect(fieldResult.surname).toBe('iri');
            expect(fieldResult.plainPassword).toBe('ab123457!');
            expect(bcrypt.compareSync('ab123457!', fieldResult.password)).toBeTruthy();
            expect(fieldResult.email).toBe('dummy@gmail.com');
            expect(fieldResult.phone).toBe('905324567896');
            done();

        });

        it('should fail if name is empty', (done) => {

            let fieldResult = checkFields({
                name: ''
            });

            expect(fieldResult.error).toBe(ERROR.NAME_MISSING);
            done();

        });

        it('should fail if surname is empty', (done) => {

            let fieldResult = checkFields({
                surname: ''
            });

            expect(fieldResult.error).toBe(ERROR.SURNAME_MISSING);
            done();

        });

        it('should fail if email is badly formatted', (done) => {

            let fieldResult = checkFields({
                email: 'dummy-email'
            });

            expect(fieldResult.error).toBe(ERROR.BADLY_FORMATTED_EMAIL);
            done();

        });

        it('should fail password if no letter supplied', (done) => {

            const fieldResult = checkFields({
                password: '232123457!'
            });

            expect(fieldResult.error).toBe(ERROR.INVALID_PASSWORD);
            done();

        });

        it('should fail password if no digit supplied', (done) => {

            const fieldResult = checkFields({
                password: 'abcdefg!++'
            });

            expect(fieldResult.error).toBe(ERROR.INVALID_PASSWORD);
            done();

        });

        it('should fail password if password length is too short', (done) => {

            const fieldResult = checkFields({
                password: 'a1!'
            });

            expect(fieldResult.error).toBe(ERROR.INVALID_PASSWORD);
            done();

        });

        it('should fail password if password length is too long', (done) => {

            const fieldResult = checkFields({
                password: 'a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!a1!'
            });

            expect(fieldResult.error).toBe(ERROR.INVALID_PASSWORD);
            done();

        });

        it('should fail if phone is not a phone', (done) => {

            let fieldResult = checkFields({
                phone: '90123S'
            });

            expect(fieldResult.error).toBe(ERROR.PHONE_MISSING);
            done();

        });

    });

};
