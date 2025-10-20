### Leetcode 743 (Medium): Network Delay Time [Practice](https://leetcode.com/problems/network-delay-time)

### Description  
We are given a network represented by a **directed**, weighted graph. Each node is labeled from 1 to n. The graph's edges are given as a list of times, where each entry `(u, v, w)` means it takes w units of time for a signal to travel from node u to node v. You are also given a starting node k. The signal starts at node k and travels through the network following the edges' times. 

Your task is:
- Compute the **minimum time** needed for all nodes to receive the signal.
- If **any node cannot be reached**, return -1.

This is essentially finding the **longest shortest path** from the starting node k to all other nodes.

### Examples  

**Example 1:**  
Input: `times=[[2,1,1],[2,3,1],[3,4,1]], n=4, k=2`  
Output: `2`  
Explanation:  
Signal starts from node 2:
- 2 → 1 (1 unit), 2 → 3 (1 unit)
- 3 → 4 (1+1=2 units)
So, the furthest node reached is node 4 at 2 units. All nodes are reachable.

**Example 2:**  
Input: `times=[[1,2,1]], n=2, k=1`  
Output: `1`  
Explanation:  
Signal starts from node 1:
- 1 → 2 (1 unit)
All nodes receive the signal in 1 unit of time.

**Example 3:**  
Input: `times=[[1,2,1]], n=2, k=2`  
Output: `-1`  
Explanation:  
Signal starts from node 2:
- Node 1 cannot be reached at all from node 2.


### Thought Process (as if you’re the interviewee)  
First, we need to find, for all nodes, the **shortest time** it takes for a signal from node k to reach them (i.e., the shortest path from node k). If every node has a known shortest path from k, then the answer is the **maximum among these path lengths**, since that's when the last node receives the signal. If any node is unreachable from k, we return -1.

A brute-force way would be to use BFS if all weights are equal; however, as the weights vary, **Dijkstra's algorithm** is more appropriate. We will use:
- A **min-heap (priority queue)** to always process the next closest node.
- A **distance map** to store the minimum known delay to every node.
- Once we reach all nodes, take the **max value** from the delay map as our answer.

If after processing, any node still does *not* have a delay (ie, never reached), return -1.

Other approaches such as Bellman-Ford could be used, but Dijkstra is faster with positive weights like here.

### Corner cases to consider  
- Only one node (n=1): should return 0 if k=1.
- Disconnected graph: some nodes unreachable → return -1.
- Multiple edges between a pair: must consider only the smallest weight.
- Self-loops: an edge from a node to itself should be ignored.
- Large n, large edge list: algorithm must scale well.
- Cycles in the graph.

### Solution

```python
import heapq

def networkDelayTime(times, n, k):
    # Build graph as adjacency list
    graph = {i: [] for i in range(1, n+1)}
    for u, v, w in times:
        graph[u].append((v, w))
    
    # Min-heap: (delay, node)
    heap = [(0, k)]
    # Dictionary: stores shortest distance known so far
    dist = {}

    while heap:
        time, node = heapq.heappop(heap)
        if node in dist:
            continue  # Already finalized; skip
        dist[node] = time
        for nei, t in graph[node]:
            if nei not in dist:
                heapq.heappush(heap, (time + t, nei))

    # If all n nodes are reached, return the maximal arrival time
    if len(dist) == n:
        return max(dist.values())
    # Otherwise, at least one node is unreachable
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(E × log N), where E is edges and N is nodes. Every edge may be pushed onto the heap once, and heap operations are log N.
- **Space Complexity:** O(N + E), where N for the distance & graph dictionaries, and E for the graph adjacency list and heap.

### Potential follow-up questions (as if you’re the interviewer)  

- What if some edge weights are negative?
  *Hint: What fundamental algorithm supports negative weights in single-source shortest path problems?*
- How to return the actual path, not just the time?
  *Hint: Keep a parent pointer for each node as you build your distance map.*
- How would you handle a dynamically changing network (edges being added/removed in real time)?
  *Hint: Look into incremental shortest path algorithms, or re-running Dijkstra as needed.*

### Summary
This problem is a classic application of **Dijkstra’s algorithm** (graph traversal with positive weights and a source node). The pattern applies to many network communication and optimal route problems, such as computing **single-source shortest path**.  
Variants include returning unreachable status, reconstructing paths, or adapting for dynamic graphs. This solution demonstrates efficient graph modeling, heap usage, and detection of unreachable nodes.


### Flashcard
Use Dijkstra's algorithm from node k to find shortest path to all nodes; answer is maximum of all shortest paths (or -1 if any unreachable).

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Graph(#graph), Heap (Priority Queue)(#heap-priority-queue), Shortest Path(#shortest-path)

### Similar Problems
- The Time When the Network Becomes Idle(the-time-when-the-network-becomes-idle) (Medium)
- Second Minimum Time to Reach Destination(second-minimum-time-to-reach-destination) (Hard)