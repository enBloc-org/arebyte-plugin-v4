# Testing

## Testing Library

This codebase uses [jest](https://jestjs.io/docs/getting-started) for unit testing.

## Organisation

Testing of our endpoints is done on the CMS codebase but to test the behaviour all handlers manipulating data being passed to and received from these endpoints we create jest unit tests.

These should be organised as seen below:

> | src  
  |__ background  
  |____ messages  
  |______ handler.ts  
  |______ handler.test.ts

## Scripts

To run all tests

```bash
pnpm test
```
To run any tests associated with files changed since the last commit:

```bash
pnpm test:changed
```