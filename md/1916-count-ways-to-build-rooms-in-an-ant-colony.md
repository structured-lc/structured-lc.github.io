### Leetcode 1916 (Hard): Count Ways to Build Rooms in an Ant Colony [Practice](https://leetcode.com/problems/count-ways-to-build-rooms-in-an-ant-colony)

### Description  
Given a *tree* structure representing an ant colony's rooms, where each room (except room 0) points to the room that must be completed before it can be built (its parent), determine **how many valid sequences** exist to build all the rooms, with the constraint that a room can only be built after its parent is built. Return this count modulo 10⁹+7.

- Input: `prevRoom` of length n, so rooms are labeled 0 to n-1. `prevRoom[i]` is the *parent* of room i (with `prevRoom = -1`).
- Output: Number of possible orders in which all rooms can be built, following the parent constraints.

### Examples  

**Example 1:**  
Input: `prevRoom = [-1,0,1]`  
Output: `1`  
*Explanation: Only possible order is 0 → 1 → 2.*

**Example 2:**  
Input: `prevRoom = [-1,0,0,1,2]`  
Output: `6`  
*Explanation: The dependencies are:*
```
      0
     / \
    1   2
   /
  3
 /
4
```
*Valid build orders (in terms of when each room can be built, always after parent):*
- 0,1,2,3,4
- 0,2,1,3,4
- 0,1,2,4,3
- 0,2,1,4,3
- 0,1,3,2,4
- 0,2,1,3,4

**Example 3:**  
Input: `prevRoom = [-1,0,0,2,2]`  
Output: `12`  
*Explanation:*
```
      0
     / \
    1   2
       / \
      3   4
```
*The subtree rooted at 2 has two children, which creates more interleaving orders.*

### Thought Process (as if you’re the interviewee)  
- Start by thinking of the **constraints as a tree** (parent, children).
- The task reduces to **counting the number of valid topological orderings** of the tree, with the rule that a parent must be built before its children.
- **Brute-force:** List all permutations and check validity– but this is infeasible for n up to 10⁵.
- **Optimizing:** Notice that for a parent with k independent subtrees (children), we can build their subtrees in any order, and interleave their construction respecting their own dependencies. Combine answers from subtrees with multinomial coefficients.
- The **key compositional formula** is:
  - For a node with child subtrees of sizes s₁, s₂, ..., sₖ:
    - Ways for the current node = (product of ways within each child subtree)
      × multinomial coefficient: (S!)/(s₁! × s₂! × ... × sₖ!)  
      where S = total size of all subtrees (sum of sᵢ).
- This is a classic **DP on trees** with combinatorics.

### Corner cases to consider  
- Array of length 1: no child, only one room, answer is 1.
- Chain-like tree (linked-list).
- Star (root has all other nodes as children).
- Multiple children under a single parent.
- Large inputs (test for performance; factorial overflows).

### Solution

```python
from collections import defaultdict

MOD = 10**9 + 7

def waysToBuildRooms(prevRoom):
    n = len(prevRoom)
    
    # Build tree (adjacency list)
    graph = defaultdict(list)
    for i, parent in enumerate(prevRoom):
        if parent != -1:
            graph[parent].append(i)
    
    # Precompute factorials and inverse factorials for multinomial coeffs
    fact = [1] * (n + 1)
    inv_fact = [1] * (n + 1)
    for i in range(1, n+1):
        fact[i] = (fact[i-1] * i) % MOD
    # Fermat inverse: x^(MOD-2) % MOD
    inv_fact[n] = pow(fact[n], MOD - 2, MOD)
    for i in range(n-1, -1, -1):
        inv_fact[i] = (inv_fact[i+1] * (i+1)) % MOD

    def dfs(node):
        total_size = 0
        total_ways = 1
        # For all children, combine results
        for child in graph[node]:
            child_ways, child_size = dfs(child)
            # Multiply number of ways (subtrees are independent except for parent order)
            total_ways = (total_ways * child_ways) % MOD
            # Multiply by "choose places for this child's subtree" out of total so far
            total_ways = (total_ways * inv_fact[child_size]) % MOD
            total_size += child_size
        # Now, multiply by all ways to permute positions of the children subtrees
        total_ways = (total_ways * fact[total_size]) % MOD
        return total_ways, total_size + 1

    ans, _ = dfs(0)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).
  
  - Each node is processed once in DFS.
  - Precomputing factorials is O(n).
  - All arithmetic is modulo and constant-time.

- **Space Complexity:** O(n).
  
  - For the graph, factorials, and recursion stack (max depth = height of tree).

### Potential follow-up questions (as if you’re the interviewer)  

- If each room could have multiple prerequisite rooms (i.e., input is a DAG, not a tree), how would you solve?
  *Hint: Topological sort, but counting all possible valid topological orderings in a DAG is much harder and can be #P-complete.*

- Suppose rooms can be built in parallel, and we count the number of valid parallel build schedules. How would you compute that?
  *Hint: Think of "minimum possible time", and counting schedule arrangements as levels of the tree.*

- What if we want to list actual valid build sequences for small n, not just count them?  
  *Hint: Backtracking / DFS with used set.*

### Summary
This problem exemplifies **tree DP with combinatorics**, a pattern found in many "number of ways" tree questions. The multinomial coefficient combines subtree arrangements, and the DP propagates solutions up the tree. Precomputing factorials and their inverses is a reusable trick for modular multinomial/binomial coefficients, common in advanced combinatorics problems. This pattern is seen in subtree reordering, counting valid tournaments, and various graph-permutation enumeration tasks.