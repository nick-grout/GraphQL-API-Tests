import pytest
import json
from graphqlclient import GraphQLClient


@pytest.fixture
def gql_client() -> GraphQLClient:
    client = GraphQLClient('https://api.graph.cool/simple/v1/swapi')
    # Add api token if needed
    # client.inject_token()
    return client


class TestGetHairColor:
    QUERY = """
        query PersonNameAndHairColor($name:String) {
            allPersons: Person(name:$name) {
                name
                hairColor
            }
        }
    """
    @staticmethod
    def test_lukes_hair(gql_client: GraphQLClient):
        """ Luke's hair color should be BROWN """
        data = gql_client.execute(query=TestGetHairColor.QUERY, variables={"name": "Luke Skywalker"})
        data = json.loads(data)
        assert data['data']['allPersons']['hairColor'][0] == 'BLONDE'
    
    @staticmethod
    def test_chewbaccas_hair(gql_client: GraphQLClient):
        """ Chewbacca's hair color should be BROWN """
        data = gql_client.execute(query=TestGetHairColor.QUERY, variables={"name": "Chewbacca"})
        data = json.loads(data)
        assert data['data']['allPersons']['hairColor'][0] == 'BROWN'
