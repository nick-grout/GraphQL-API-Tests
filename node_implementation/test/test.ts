import { strict as assert } from 'assert';
import axios from 'axios';

const ENDPOINT = 'https://api.graph.cool/simple/v1/swapi'
const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

describe('All Persons Doc', () => {
    describe('Get Hair Color', () => {
        it ('Should return BLONDE for Luke Skywalker\'s hair color', (done) => {
            const query = `
                query PersonNameAndHairColor($name:String) {
                    allPersons: Person(name:$name) {
                        name
                        hairColor
                    }
                }
            `
            const variables = {
                name: 'Luke Skywalker'
            }
            axios({
                method: 'POST',
                url: ENDPOINT,
                headers: HEADERS,
                data: {
                    query,
                    variables
                },
            })
            .then(res => {
                assert.ok(!('errors' in res.data), `errors found in response: ${JSON.stringify(res.data['errors'])}`);
                assert.equal(res.data['data']['allPersons']['hairColor'][0], 'BLONDE')
                done();
            })
            .catch(err => done(err))
        });
    });
});