# acc-node-telemetry
Work in Progress - A personal project to create a nodejs wrapper for the acc telemetry data.

[Assetto Corsa Competizione](https://assettocorsa.gg/assetto-corsa-competizione/) is a racing game that offers a wide range of telemetry data that can be used for personal dashboards and lap time analystics. The ACC SDK only offers a sample implementation for c# at the moment. This project aims to provide a nodejs solution for:

- Connecting to the UDP Broadcast Server of ACC in a local network
- Provide the raw data in a format so other applications can be built on top of (Dashboards and so on)

There are some other javascript based implementations available at github:

- https://github.com/angel-git/acc-broadcast-node (A server and a frontend that displays current car data)
- https://github.com/simgarage/acc-node-wrapper (A typescript implementation of the ACC SDK)
- https://github.com/FynniX/acc-node-wrapper (A javascript implementation of the ACC SDK)

## Goals

- A typescript Library that handles all the communication with the ACC Network Traffic (Connection, Fetching all Data in real time etc.)
- Storage, logs and visualiation of the raw data in some kind so that dashboards and other websites can be built on top of it (I am thinking about a simple angular dashboard that allows to track lap times as a first use case)
