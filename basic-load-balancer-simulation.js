// Challenge: Simulate a load balancer by creating a collection of servers that can process requests of unknown duration, with each new request being forwarded to the server with the least active requests.


class Server {
    constructor(capacity) {
        this.capacity = capacity;
        this.currentLoad = 0;
        this.requests = [];
    }

    addRequest(request) {
        if (this.currentLoad + request.load <= this.capacity) {
            this.currentLoad += request.load;
            this.requests.push(request);
            setTimeout(() => this.completeRequest(request), request.duration);
            return true;
        }
        return false;
    }

    completeRequest(request) {
        this.currentLoad -= request.load;
        this.requests = this.requests.filter(req => req !== request);
    }
}

class Request {
    constructor(load, duration) {
        this.load = load;
        this.duration = duration;
    }
}

class LoadBalancer {
    constructor() {
        this.servers = [];
    }

    addServer(server) {
        this.servers.push(server);
    }

    receiveRequest(request) {
        const leastConnectionServer = this.servers.reduce((acc, server) => {
            return (acc.requests.length < server.requests.length) ? acc : server;
        });
    
        if (!leastConnectionServer.addRequest(request)) {
            console.log("All servers are at full capacity!");
        }
    }

    status() {
        return this.servers.map((server, index) => ({
            serverIndex: index,
            currentLoad: server.currentLoad,
            activeRequests: server.requests.length
        }));
    }
}
