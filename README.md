# Example of a GraphQL API testing framework

This repository contains two possible test frameworks, one in Python and the other in
Typescript (using Nodejs). They query an API to get details on star wars characters.

These tests use the GraphQL playground api, which can be found [here](https://api.graph.cool/simple/v1/swapi).

## Python

This implementation uses `pytest` and `graphqlclient`. To run the tests run:

```bash
cd python_implementation
pip3 install -r requirements.txt
pytest
```

## Nodejs

This implementation uses `Typescript`, `mocha`, and `axios`. To run the tests run:

```bash
cd node_implementation
npm install
npm test
```
