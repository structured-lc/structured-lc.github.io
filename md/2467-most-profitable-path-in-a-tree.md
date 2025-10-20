### Leetcode 2467 (Medium): Most Profitable Path in a Tree [Practice](https://leetcode.com/problems/most-profitable-path-in-a-tree)

### Description  
Given an undirected tree with n nodes labeled from 0 to n-1, where node 0 is the root, and edges define the tree structure. Each node i has an integer amount[i] associated with it (can be negative or positive).  
- Alice starts at node 0 and can move to any connected node per step, deciding the path herself.
- Bob starts at a given node and always moves toward the root (node 0), one step per unit time, following the unique path to it.

At each node:
- If Alice reaches before Bob, she collects the full amount.
- If both arrive at the same time, she collects half the amount (rounded down).
- If she arrives after Bob, she collects nothing.

Find the **maximum net income** Alice can obtain if she chooses an optimal root-to-leaf path in the tree.

### Examples  

**Example 1:**  
Input:  
edges = `[[0,1],[1,2],[1,3],[3,4]]`, bob = `4`, amount = `[5,10,-10,100,1]`  
Output: `116`  
*Explanation:*  
Bob goes from 4 → 3 → 1 → 0 in 3 steps.  
One optimal path for Alice: 0 → 1 → 3 → 4.  
- 0: Alice (t=0), Bob (t=3). Alice gets full: 5.
- 1: Alice (t=1), Bob (t=2). Alice gets full: 10.
- 3: Alice (t=2), Bob (t=1). Alice arrives after Bob, so: 0.
- 4: Alice (t=3), Bob (t=0). Alice arrives after Bob, so: 0.
Other leaves (2): Alice path net income: 5+10+(-10)=5.

**Example 2:**  
Input:  
edges = `[[0,1],[1,2],[1,3]]`, bob = `2`, amount = `[1,4,3,5]`  
Output: `10`  
*Explanation:*  
Bob goes from 2 → 1 → 0.  
Alice path 0 → 1 → 3:
- Node 0: Alice (0), Bob (2). Alice collects full: 1.
- Node 1: Alice (1), Bob (1). Same time: collect ⌊4/2⌋ = 2.
- Node 3: Alice (2), Bob (never). Full: 5.  
Total: 1 + 2 + 5 = 8.  
Other path 0 → 1 → 2: (ending at 2)  
- Node 2: Alice (2), Bob (0). Alice arrives after Bob, so: 0.  
Net is 1+2+0 = 3.  
But with only 0 → 1 → 3 path, max is 8, unless there's a typo in the amounts.

**Example 3:**  
Input:  
edges = `[[0,1],[0,2],[2,3],[2,4]]`, bob = `3`, amount = `[10,0,5,2,5]`  
Output: `15`  
*Explanation:*  
Bob goes from 3 → 2 → 0.  
Alice can go 0 → 2 → 4 for total 10+5+5=20 (if Bob never reaches node 4).  
If Alice goes 0 → 2 → 3:  
- Node 0: Alice (0), Bob (2). Alice gets 10.  
- Node 2: Alice (1), Bob (1). Half: ⌊5/2⌋=2.  
- Node 3: Alice (2), Bob (0). After Bob: 0.  
So 10+2+0=12.  
But best is 0 → 2 → 4: sum = 10+5+5=20.

### Thought Process (as if you’re the interviewee)  

- **Brute-force/Initial idea:**  
  - For every possible root-to-leaf path, simulate the collection for Alice.  
  - For each node, determine if Bob will reach before, at the same time, or after, and decide Alice’s income by the rule. This requires tracking Bob’s arrival times for nodes (which only matters for nodes along Bob's path).

- **Optimization:**  
  - Instead of recomputing Bob’s travel time every time, precompute for each node the "arrival time" for Bob if he reaches that node at all (otherwise mark as not on Bob's path).
  - Use DFS:  
    - First, DFS from Bob’s starting node to root, record Bob’s first arrival time at each node on that path.
    - Next, DFS from root (Alice's start), keeping a time variable (the step), and compare with Bob’s time for each node.
    - For leaves (no further children), check income, and record the maximum.

- DFS is used, as we need to explore all root-to-leaf paths and make per-path decisions.

- **Why not BFS?**  
  - DFS fits naturally as we want to explore root-to-leaf paths, accumulating values per node.

- **Trade-offs:**  
  - Need O(n) preprocessing for Bob’s path and O(n) for DFS for Alice (since tree has n-1 edges), space O(n).

### Corner cases to consider  
- Single-node tree (Alice and Bob at root; split amount).
- Negative amounts.
- Bob's starting node is root (Alice and Bob start together).
- All positive/negative amounts.
- Multiple leaves/branches (ensure picks optimal).
- Alice and Bob arrive at a node at the same time (odd/even amounts: test floor division).
- Bob’s path does not overlap with some branches (Alice can get full amounts in non-Bob paths).

### Solution

```python
def mostProfitablePath(edges, bob, amount):
    from collections import defaultdict

    n = len(amount)
    tree = defaultdict(list)
    for u, v in edges:
        tree[u].append(v)
        tree[v].append(u)
    
    # Step 1: Find Bob's path to root and time to reach each node
    bob_time = [float('inf')] * n

    def dfs_bob(node, parent, time):
        if node == 0:
            bob_time[node] = time
            return True
        for nei in tree[node]:
            if nei == parent:
                continue
            if dfs_bob(nei, node, time+1):
                bob_time[node] = time
                return True
        return False

    dfs_bob(bob, -1, 0)

    # Step 2: DFS for Alice, collect net income along each root-to-leaf path
    max_profit = float('-inf')

    def dfs_alice(node, parent, time, curr_sum):
        gain = 0
        # Case 1: Bob never reaches this node
        if bob_time[node] == float('inf'):
            gain = amount[node]
        else:
            if time < bob_time[node]:
                gain = amount[node]
            elif time == bob_time[node]:
                gain = amount[node] // 2
            else:
                gain = 0
        is_leaf = True
        for nei in tree[node]:
            if nei != parent:
                is_leaf = False
                dfs_alice(nei, node, time+1, curr_sum + gain)
        if is_leaf:
            nonlocal max_profit
            max_profit = max(max_profit, curr_sum + gain)

    dfs_alice(0, -1, 0, 0)
    return max_profit
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Each node is visited at most twice (once for Bob, once for Alice), and all edges are traversed.
- **Space Complexity:** O(n)  
  - For tree representation, bob_time array, and recursion stack (depth ≤ n in worst case).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is very deep and might cause recursion stack overflow?  
  *Hint: Try iterative DFS/BFS or increase recursion depth limit as needed.*

- How would the solution change if Bob could take different (non-root) paths or was not constrained to move only toward root?  
  *Hint: Requires precomputing all possible Bob's paths and possibly dynamic programming.*

- Can we find how many different root-to-leaf paths give the optimal profit?  
  *Hint: After computing max profit, run another DFS to count all leaf paths achieving that sum.*

### Summary
This problem uses a **tree DFS with time tracking** and a precomputation for rival movement (Bob). The **"label times in tree DFS"** technique is a frequent pattern for problems where competitors/rivals are moving through a graph/tree. This is applicable to pursuit/evader, two-agent grid/tree-based problems, and is a good variant of root-to-leaf DFS with path-specific constraints.


### Flashcard
Precompute Bob's arrival times for all nodes; simulate Alice's path, adjusting income based on who arrives first at each node.

### Tags
Array(#array), Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Graph(#graph)

### Similar Problems
- Snakes and Ladders(snakes-and-ladders) (Medium)
- Time Taken to Mark All Nodes(time-taken-to-mark-all-nodes) (Hard)