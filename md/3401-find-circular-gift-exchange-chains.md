### Leetcode 3401 (Hard): Find Circular Gift Exchange Chains [Practice](https://leetcode.com/problems/find-circular-gift-exchange-chains)

### Description  
Given a table representing Secret Santa gift exchanges among employees (`giver_id`, `receiver_id`, `gift_value`), the goal is to identify all *circular* gift exchange chains.
A circular chain is a group of employees passing gifts in such a way that, starting from one employee and following the exchanges, you return back to the starting person, with each employee in the group appearing exactly once in the cycle.  
For each distinct circular chain, report the chain’s length and total gift value. Return all unique chains, ordered by decreasing chain length and, for chains of equal length, by decreasing total gift value.

### Examples  

**Example 1:**  
Input:
```
| giver_id | receiver_id | gift_value |
|----------|-------------|------------|
|   1      |      2      |     20     |
|   2      |      3      |     30     |
|   3      |      1      |     40     |
|   4      |      5      |     25     |
|   5      |      4      |     35     |
```
Output:
```
| chain_id | chain_length | total_gift_value |
|----------|--------------|------------------|
|     1    |      3       |        90        |
|     2    |      2       |        60        |
```
Explanation.  
- Employees 1→2→3→1 form a cycle of length 3 with total value 20+30+40=90.  
- Employees 4→5→4 form a cycle of length 2 with total value 25+35=60.  
Chains are listed in order of chain_length (descending), breaking ties with total_gift_value.

**Example 2:**  
Input:
```
| giver_id | receiver_id | gift_value |
|----------|-------------|------------|
|   1      |      1      |     10     |
```
Output:
```
| chain_id | chain_length | total_gift_value |
|----------|--------------|------------------|
|     1    |      1       |       10         |
```
Explanation.  
A self-cycle: employee 1 gives to themselves. Length is 1 and total value is 10.

**Example 3:**  
Input:
```
| giver_id | receiver_id | gift_value |
|----------|-------------|------------|
|   1      |      2      |     10     |
|   2      |      1      |     20     |
|   3      |      3      |     30     |
```
Output:
```
| chain_id | chain_length | total_gift_value |
|----------|--------------|------------------|
|     1    |      2       |       30         |
|     2    |      1       |       30         |
```
Explanation.  
- Employees 1↔2 (both ways) form a cycle of length 2 with total value 10+20=30.
- Employee 3 self-cycle gives chain_length 1 and total value 30.  
Ranked by length, then value (tie here).

### Thought Process (as if you’re the interviewee)  
- This problem is about **finding cycles** in a directed graph, where each node has exactly one outgoing edge.
- Brute-force: For each employee, follow the gift chain until you revisit a node (cycle) or visit all without repeating. Mark cycles.
- We must avoid duplicates: one cycle can be found starting from any node in it. To avoid overcounting, use a visited set.
- Build directed graph: Each `giver_id` has one outgoing edge to `receiver_id`.
- For each unvisited node, follow its `receiver_id` chain until you either
    - return to the starting employee (cycle found), or
    - reach an already-visited node (skip, already processed).
- For each unique cycle found, compute length and sum of gift values.
- Store cycles seen, prevent repeats.
- Finally, sort cycles by length (descending), then by total value.

**Trade-offs:**  
- Given that each employee gives only one gift, chains are simple cycles or single links.
- Efficient solution visits each node at most once, giving O(n) time.

### Corner cases to consider  
- Only one person (self cycle).
- Fully disjoint cycles.
- Many chains of equal length and value.
- Chains with only one node.
- Input is empty (no data).

### Solution

```python
def find_circular_gift_exchange_chains(secret_santa):
    """
    secret_santa: List of tuples (giver_id, receiver_id, gift_value)
    Returns: List of dictionaries with keys: chain_id, chain_length, total_gift_value
    """
    # Build graph: maps giver -> (receiver, gift_value)
    graph = {}
    for giver, receiver, value in secret_santa:
        graph[giver] = (receiver, value)

    visited = set()
    cycles = []

    # For each employee (giver), attempt to trace the cycle starting from them
    for giver in graph:
        if giver in visited:
            continue

        current = giver
        path = []
        path_set = set()

        # Trace the chain, detect cycles
        while current not in path_set and current in graph:
            path.append((current, graph[current][0], graph[current][1]))
            path_set.add(current)
            # Move to next person in the gift chain
            current = graph[current][0]

        # If current forms cycle starting from giver
        if current == giver:
            # Only count cycles that match starting from this node
            # Gather nodes involved in this cycle
            chain_nodes = set()
            chain_value = 0
            for node, rec, val in path:
                chain_nodes.add(node)
                chain_value += val
                if rec == giver:
                    break
            cycles.append((len(chain_nodes), chain_value))
            visited.update(chain_nodes)

    # Remove duplicate chains (length, sum), build result with chain ids
    unique_cycles = list(set(cycles))
    # Sort: descending length, then descending total value
    unique_cycles.sort(key=lambda x: (-x[0], -x[1]))

    # Format for output as required
    result = []
    for idx, (clen, cval) in enumerate(unique_cycles, 1):
        result.append({
            'chain_id': idx,
            'chain_length': clen,
            'total_gift_value': cval
        })

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of employees. Each node is visited at most once because we track completed cycles.
- **Space Complexity:** O(n), for storing the graph, visited set, and paths (cycles).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case if each employee could give gifts to more than one person?  
  *Hint: Now, cycles can appear in more places; consider DFS cycle detection.*

- What if you needed to output the full list of participants in each chain?  
  *Hint: Track the actual path for each detected cycle.*

- Could you handle millions of employees efficiently?  
  *Hint: Since each node has only one out-edge, this scales efficiently. For multiple edges, more advanced cycle detection may be needed.*

### Summary
This problem leverages the **cycle detection in directed graphs**, taking advantage of the "one out-edge per node" property.  
The solution uses a visited set and per-node traversal to identify unique cycles efficiently.  
Patterns here are applicable to problems like "Find all cycles in a functional graph," or "Group users by invitation cycles," seen commonly in social networks and gift circle analyses.