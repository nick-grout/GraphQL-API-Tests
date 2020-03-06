import pytest
import json
from graphqlclient import GraphQLClient


@pytest.fixture
def gql_client() -> GraphQLClient:
    client = GraphQLClient('https://api.graph.cool/simple/v1/swapi')
    # Add api token if needed
    # client.inject_token()
    return client


class TestAllPersons:
    @staticmethod
    def test_get_hair_color(gql_client: GraphQLClient):
        query = """
            query PersonNameAndHairColor($name:String) {
                allPersons: Person(name:$name) {
                    name
                    hairColor
                }
            }
        """
        data = gql_client.execute(query=query, variables={"name": "Luke Skywalker"})
        data = json.loads(data)
        # Expect
        # {'data': {'allPersons': {'name': 'Luke Skywalker', 'hairColor': ['BLONDE']}}}
        assert data['data']['allPersons']['hairColor'][0] == 'BLONDE'
