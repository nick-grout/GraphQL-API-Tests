import { strict as assert } from 'assert';
import { request } from 'graphql-request'

const ENDPOINT = 'https://api.graph.cool/simple/v1/swapi'

describe('All Persons Doc', function() {
    this.slow(300);
    this.timeout(3000);
    describe('Get Hair Color', function() {
        let tests = [
            {arg: 'Luke Skywalker', expected: 'BLONDE'},
            {arg: 'Chewbacca', expected: 'BROWN'},
        ]
        tests.forEach(function(test) {
            it(`correctly returns ${test.arg}'s hair color as ${test.expected}`, function(done) {
                const query = `
                    query PersonNameAndHairColor($name:String) {
                        allPersons: Person(name:$name) {
                            name
                            hairColor
                        }
                    }
                `
                request(ENDPOINT, query, {name: test.arg}).then(data => {
                    assert.equal(data.allPersons.hairColor[0], test.expected)
                    done();
                })
                .catch(err => done(err))
            });
        });
    });
    describe('Set Height', function() {
        it('can set the height', function(done) {
            const mutation = `
                mutation ChangePersonsHeight($id: ID!, $height:Int) {
                    updatePerson(id:$id, height:$height) {
                    height
                    }
                }
            `
            const variables = {
                'id':'cj0nv9p8yewci0130wjy4o5fa',
                'height': 20
            }
            request(ENDPOINT, mutation, variables).then(data => {
                console.log('request: ', JSON.stringify(data, undefined, 2));
                done();
            }).catch(err => {
                done(err);
            })
        })
    })
});