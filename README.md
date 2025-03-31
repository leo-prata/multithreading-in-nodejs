# Cluster and Worker Threads in Node.js

This repository demonstrates two approaches to handle CPU-intensive operations in Node.js:  
- **Cluster Module:** Leverages multiple CPU cores with separate processes.  

- **Worker Threads:** Runs heavy tasks in parallel threads within the same process.

Both aim to improve Node.js app performance but suit different use cases.

###  Worker Threads  

- How It Works: Runs JavaScript in parallel threads, sharing memory with the main process (with limits). Ideal for specific CPU-intensive tasks.  

- Code: server.ts manages a worker pool; two-workers.ts performs heavy computation in a separate thread.  

- When to Use: Great for math/computational tasks, large data processing, or divisible workloads.

### Cluster Module

- How It Works: Creates multiple Node.js instances (one per CPU core), each with its own event loop and memory. The master process manages workers and balances load.  

- Code: master.js spawns workers per CPU; server.js runs an Express server with CPU-heavy routes handled by different workers.  

- When to Use: Best for traditional web apps, horizontal scaling of HTTP servers, or independent requests.

##  Performance Comparison: Single Process vs. Cluster

### Test Methodology

- **Tool:** loadtest  
- **Parameters:**  
  - **Total requests:** 1,200  
  - **Concurrent connections:** 400–800  
  - **Tested endpoint: /heavy** (CPU-intensive route)

### Results without Cluster (Single Process)

- **Total time:** 43.024 seconds  
- **Requests per second (rps):** 28  
- **Average latency:** 19,513.4 ms (~19.5 seconds)  
- **Errors:** 1,015 (84.6% of requests)  
- **Max latency:** 30,876 ms (~31 seconds)

### Results with Cluster

- **Total time:** 14.331 seconds (66.7% faster)  
- **Requests per second (rps):** 84 (3x higher)  
- **Average latency:** 2,086.6 ms (~2 seconds – 90% lower)  
- **Errors:** 965 (80.4% – slight reduction)  
- **Max latency:** 14,136 ms (~14 seconds – 54% lower)





