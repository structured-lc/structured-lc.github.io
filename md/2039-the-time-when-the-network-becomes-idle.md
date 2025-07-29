### Leetcode 2039 (Medium): The Time When the Network Becomes Idle [Practice](https://leetcode.com/problems/the-time-when-the-network-becomes-idle)

### Description  
Given an undirected network of n servers (labeled from 0 to n-1), where server 0 is the "master server" and the rest are "data servers", each edge represents a bi-directional wire, and you’re given the patience of each data server.

Every data server (i ≥ 1) sends a message to the master server at time 0. If they haven't received a reply after patience[i] seconds, they resend the message every patience[i] seconds until they get a reply. Replies are sent back by the master server immediately upon receiving the message and traverse the same path back. No more messages are sent after a server has received a reply.

The network becomes idle when there are no messages traveling on any wire.  
Return the earliest second (starting from which) the network becomes idle.

### Examples  

**Example 1:**  
Input:  
`edges=[[0,1],[1,2],[0,3]]`,  
`patience=[0,2,1,4]`  
Output: `7`  
Explanation:  
- Shortest round-trip times: 1 → 0 = 2, 2 → 1 → 0 = 4, 3 → 0 = 2.
- Server 1: sends at 0, resends at 2, reply comes at 3.
- Server 2: sends at 0, reply comes at 5.
- Server 3: sends at 0, resends at 4, reply comes at 3, but next send at 4 before reply at 6. 
- Last in-flight message: server 3's message sent at 4, receives reply at 7.
- Thus, network is idle at second 7.

**Example 2:**  
Input:  
`edges=[[0,1],[0,2],[1,2]]`,  
`patience=[0,10,10]`  
Output: `3`  
Explanation:  
- Both servers 1 and 2 have a single edge to server 0 (distance 1): round-trip = 2.
- At t=0, they send; reply returns at t=2.
- No resends are needed due to high patience. Network idle at 3.

**Example 3:**  
Input:  
`edges=[[0,1],[1,2],[2,3],[3,4]]`,  
`patience=[0,1,1,1,1]`  
Output: `9`  
Explanation:  
- Path lengths grow: round-trip for server 4 is 8.
- It keeps resending every 1 second; last message sent at 7, reply returns at 15.
- All other servers receive replies earlier.
- Network idle at 9 (revisit for accuracy with patience and path time).

### Thought Process (as if you’re the interviewee)  
- My first thought is to simulate the entire network, tracking all messages sent and received each second. But with up to 10⁵ nodes, that’s not feasible.
- What matters is, for each data server, the time their last reply returns. For each server:
  - Compute the shortest path length to the master (using BFS from node 0).
  - Round-trip time is 2 × path_length.
  - Each server resends every patience[i] seconds until the reply is back.
  - The last time a message is sent is: the nearest multiple of patience[i] before the reply would have arrived (if 2×dist is not a multiple of patience[i]).
  - So: last_sent = ((2×dist - 1) // patience[i]) × patience[i]
  - That message’s reply arrives at last_sent + 2×dist.
  - Take the max of these "last reply arrival" times for all data servers. Add 1 (since idleness starts at start of next second).
- Tradeoff: BFS for distances (O(V+E)), simple calculation for resends per server.

### Corner cases to consider  
- All patience values are very large: only one message ever sent.
- All patience values are 1: resends happen at every second.
- The network is a star (all directly connected to 0).
- All edges form a line.
- Very small patience, very long distance: many resends.
- Only 2 nodes (trivial case).

### Solution

```python
from collections import deque, defaultdict
from typing import List

class Solution:
    def networkBecomesIdle(self, edges: List[List[int]], patience: List[int]) -> int:
        # Build the adjacency list
        adj = defaultdict(list)
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        
        n = len(patience)
        # BFS to find shortest path to each node from server 0
        dist = [0] * n  # Distance (in hops) from master server
        visited = [False] * n
        queue = deque([(0, 0)])  # (node, distance)
        visited[0] = True
        while queue:
            node, d = queue.popleft()
            for nei in adj[node]:
                if not visited[nei]:
                    dist[nei] = d + 1
                    visited[nei] = True
                    queue.append((nei, d + 1))

        # For each data server, compute when its last reply returns
        max_idle = 0
        for i in range(1, n):
            round_trip = 2 * dist[i]
            if patience[i] >= round_trip:
                # Server sends only once
                last_reply = round_trip
            else:
                # Server resends every patience[i] seconds until reply is received
                last_sent = ((round_trip - 1) // patience[i]) * patience[i]
                last_reply = last_sent + round_trip
            max_idle = max(max_idle, last_reply)
        
        return max_idle + 1  # Network idle at the START of this second
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + E)  
  - BFS computes all distances in O(N + E).
  - Processing each server is O(N).
  - Total is efficient even for 10⁵ nodes.

- **Space Complexity:** O(N + E)  
  - Adjacency list: O(E)
  - Distances, visited arrays: O(N)

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle dynamic changes in edges or patience values?
  *Hint: Can you update shortest distances incrementally, or would you need to rerun BFS?*

- What if replies could be queued at the master and take variable time to process?
  *Hint: Consider modeling the queue and simulating server 0 as a processor.*

- If each edge has a different latency, how would you adapt the solution?
  *Hint: BFS would need to be replaced with Dijkstra’s algorithm for shortest path.*

### Summary
This problem is a classic multi-source message-passing simulation reduced by using shortest-path computation (BFS from a root in an unweighted graph), combined with periodic event calculation based on each server’s patience. The key pattern is "Shortest Path + Simulation Math," which often appears in network propagation, gossip protocol, and minimum time-to-inform problems. Knowing how to combine BFS for distances and mod math for resends is crucial for large-scale simulations.