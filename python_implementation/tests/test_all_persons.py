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


class TestSetHeight:
    QUERY = """
        mutation ChangePersonsHeight($id: ID!, $height:Int) {
            updatePerson(id:$id, height:$height) {
                height
            }
        }
    """

    @staticmethod
    def test_set_lukes_height(gql_client: GraphQLClient):
        """ Test that we can set Luke's height """
        variables = {
            'id': 'cj0nv9p8yewci0130wjy4o5fa',
            'height': 20
        }
        data = gql_client.execute(query=TestSetHeight.QUERY, variables=variables)
        data = json.loads(data)
        assert 'errors' not in data, data['errors']
        assert data['data']['allPersons']['height'][0] == variables['height']

