### Leetcode 2127 (Hard): Maximum Employees to Be Invited to a Meeting [Practice](https://leetcode.com/problems/maximum-employees-to-be-invited-to-a-meeting)

### Description  
Given a company with \( n \) employees (numbered from \( 0 \) to \( n-1 \)), each has a single favorite coworker (not themselves). An employee will only attend a meeting if they can sit next to their favorite at the (circular) table. The goal is to select the largest possible group so that everyone’s favorite is sitting directly beside them (clockwise or counterclockwise). Return the size of this maximum group.

### Examples  

**Example 1:**  
Input: `favorite = [2,2,1,2]`  
Output: `3`  
*Explanation:* Employees 0, 1, and 2 can be arranged in a circle (e.g. [0,2,1]), so everyone sits next to their favorite.

**Example 2:**  
Input: `favorite = [1,2,0]`  
Output: `3`  
*Explanation:* This is a simple cycle (0→1→2→0), so all three can join.

**Example 3:**  
Input: `favorite = [3,0,1,4,1]`  
Output: `4`  
*Explanation:* Employees 0→3, 3→4, and 4→1 form a chain ending with 1, whose favorite (0) is in the chain. There are overlapping structures, so not all can be included, but up to four can.

### Thought Process (as if you’re the interviewee)  
- **Initial brute force:**  
  Try all subsets/groups and seating orders. For each, verify if every employee’s favorite is adjacent in the arrangement.  
  This is infeasible due to exponential number of possibilities (up to 10⁵ employees).

- **Graph Approach:**  
  - Each employee points to their favorite → Directed graph.
  - Valid arrangements correspond to cycles: in a cycle, everyone can have their favorite beside them.
  - But because the table is round, a simple directed cycle allows this. Also, if a chain leads into a mutually-favorite pair (length 2 cycle), those chains can be appended for a longer group.

- **Optimizing:**  
  1. **Find all simple cycles:** Length ≥ 3 cycles can seat everyone in the cycle.
  2. **Handle "2-cycles":** For pairs who are each other’s favorites, we can also append the longest incoming chains (without overlap) to both sides, maximizing group size.
  3. **Answer = max(largest cycle size, sum of all 2-cycle extensions).**

- **Final approach:**  
  Use DFS to:
  - Find all cycles and their lengths,
  - Track the longest chains ending at 2-cycles,
  - Aggregate results for the answer.

### Corner cases to consider  
- All favorite[] entries point to one person.
- Multiple disconnected cycles.
- Several 2-cycles with long, non-overlapping chains.
- Only two employees.
- Very long chains with only one cycle at the end.
- Cycles with chains pointing into them.
- Employees without any incoming edges.

### Solution

```python
def maximumInvitations(favorite):
    n = len(favorite)
    # Calculate indegrees for topological ordering
    indegree = [0] * n
    for i in range(n):
        indegree[favorite[i]] += 1

    # Record the longest chain ending at each node
    chain_len = [0] * n
    queue = []
    for i in range(n):
        if indegree[i] == 0:
            queue.append(i)

    # Remove nodes not in cycles; record chain lengths
    while queue:
        u = queue.pop()
        v = favorite[u]
        chain_len[v] = max(chain_len[v], chain_len[u] + 1)
        indegree[v] -= 1
        if indegree[v] == 0:
            queue.append(v)

    visited = [False] * n
    max_cycle = 0
    sum_pair_chains = 0
    for i in range(n):
        if indegree[i] > 0 and not visited[i]:
            # Detect cycle
            cur, count = i, 0
            # To mark the whole cycle
            while not visited[cur]:
                visited[cur] = True
                cur = favorite[cur]
                count += 1
            if count == 2:
                # For 2-cycles, sum the two attached chains
                a, b = i, favorite[i]
                total_chain = chain_len[a] + chain_len[b] + 2
                sum_pair_chains += total_chain
            else:
                # For cycles length ≥ 3, update max_cycle
                max_cycle = max(max_cycle, count)
    return max(max_cycle, sum_pair_chains)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each node is processed only a constant number of times (when removing chains, and when finding cycles).

- **Space Complexity:** O(n)  
  Used for indegree array, visited flags, chain lengths, and the queue.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose the favorite graph could have multiple favorites per person.  
  *Hint: How does the structure of cycles and chains change with outdegree > 1?*

- What if you needed to enumerate the actual seating arrangement?  
  *Hint: Track the path and nodes included in max solution while traversing.*

- How would the solution change if employees could sit at a rectangular table instead of a round table?  
  *Hint: Now only endpoints are adjacent; cycles need special handling.*

### Summary
This problem uses advanced **graph theory and DFS/topological sorting** to reduce the solution to cycle and chain detection. The core pattern is "detecting cycles in directed graphs, and maximizing the sum of non-overlapping structures". This is a reusable technique in scheduling, seating, and dependency resolution problems where constraints have a cyclic or chain-based nature.


### Flashcard
Model as directed graph where each employee points to favorite; valid arrangements are cycles, so find all cycles and calculate maximum total arrangement size respecting adjacency constraints.

### Tags
Depth-First Search(#depth-first-search), Graph(#graph), Topological Sort(#topological-sort)

### Similar Problems
- Redundant Connection(redundant-connection) (Medium)
- Parallel Courses III(parallel-courses-iii) (Hard)
- Process Restricted Friend Requests(process-restricted-friend-requests) (Hard)