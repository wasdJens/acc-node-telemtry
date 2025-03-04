# Commands

- Install NX globally `npm install --global nx@latest`
- Run `npm install` in the `/src` folder.
- Run `nx build acc-broadcasting-network-lib --watch` to run the library in watch mode
- Run `nx serve acc-testing-client` to run the testing client in watch mode

# Setup ACC

- Open Documents -> ACC -> config -> `broadcast.json` add the following:

```json
{
  "udpListenerPort": 9000,
  "connectionPassword": "asd",
  "commandPassword": "",
}
```

- Start a single player game and run the testinv client and library.
