import { strict as assert } from 'assert';
import axios from 'axios';

const ENDPOINT = 'https://api.graph.cool/simple/v1/swapi'
const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

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
                axios({
                    method: 'POST',
                    url: ENDPOINT,
                    headers: HEADERS,
                    data: {
                        query,
                        variables: {name: test.arg}
                    },
                }).then(res => {
                    assert.ok(!('errors' in res.data), `errors found in response: ${JSON.stringify(res.data['errors'])}`);
                    assert.equal(res.data['data']['allPersons']['hairColor'][0], test.expected)
                    done();
                })
                .catch(err => done(err))
            });
        });
    });
});