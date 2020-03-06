# Example of a GraphQL API testing framework

This repository contains two example frameworks, one in Python and the other in
Typescript (using Nodejs).

Both of these frameworks have their benefits and drawbacks. 

## Python

This implementation uses `pytest` and `graphqlclient`. To run the tests run:

```bash
cd python_implementation
pip3 install -r requirements.txt
pytest
```

## Nodejs

This ipmlementation uses `Typescript`, `mocha`, and `axios`. To run the tests run:

```bash
cd node_implementation
npm install
npm test
```
