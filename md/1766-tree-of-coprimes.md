### Leetcode 1766 (Hard): Tree of Coprimes [Practice](https://leetcode.com/problems/tree-of-coprimes)

### Description  
Given a rooted tree with `n` nodes (`0` to `n-1`), and a `nums` array where `nums[i]` denotes the value at node `i`, find for each node `i` the index of its closest ancestor whose value is coprime with `nums[i]`, or `-1` if no such ancestor exists.  
The tree is defined by an edge list, and root is node `0`. "Ancestor" means any node on the simple path from `i` up to the root (excluding `i`). Two numbers are coprime if their greatest common divisor is `1`.


### Examples  

**Example 1:**  
Input:  
```
nums = [2,3,3,2], 
edges = [[0,1],[1,2],[1,3]]
```  
Output:  
```
[-1,0,0,1]
```  
*Explanation:*
- Node 0 has no ancestor, so -1.
- Node 1: ancestor 0 with value 2 (gcd(3,2)=1) ⇒ 0.
- Node 2: ancestors are [1,0]. gcd(3,3)>1 (not coprime), but gcd(3,2)=1 ⇒ 0.
- Node 3: ancestors are [1,0]. gcd(2,3)=1 ⇒ 1 (closest).

**Example 2:**  
Input:  
```
nums = [5,6,10,2,3,6,15],
edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]]
```  
Output:  
```
[-1,0,0,1,1,2,0]
```  
*Explanation:*
- Node 0 has no ancestor, so -1.
- Node 1: ancestor 0 with value 5 (gcd(6,5)=1) ⇒ 0.
- Node 2: ancestor 0 with value 5 (gcd(10,5)=5) (not coprime) ⇒ -1.
- Node 3: ancestors are [1,0]. gcd(2,6)=2, gcd(2,5)=1 ⇒ 1.
- Node 4: ancestors are [1,0]. gcd(3,6)=3, gcd(3,5)=1 ⇒ 1.
- Node 5: ancestors are [2,0]. gcd(6,10)=2, gcd(6,5)=1 ⇒ 2.
- Node 6: ancestors are [2,0]. gcd(15,10)=5, gcd(15,5)=5 ⇒ -1.

**Example 3:**  
Input:  
```
nums = [1], 
edges = []
```  
Output:  
```
[-1]
```  
*Explanation: Only one node, so no ancestor.*



### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each node, walk up to the root, checking at each ancestor if its value is coprime with the current node's value. Use gcd to check coprimality. This is O(n²) in worst case (for each node, up to O(n) checks).

- **Optimization:**
  - Notice all node values are bounded (1 ≤ nums[i] ≤ 50).
  - For each node, during DFS from root, maintain for every possible value (1..50) the current deepest ancestor with that value.
  - Precompute coprime lists for all 1..50.
  - At node i, for value v=nums[i], look at all nums[j] that are coprime with v and check the deepest of those in the ancestor record. Set answer to the node index at the greatest depth.
  - Recursively DFS the tree, updating and reverting ancestor mapping at entry/exit.
  - This avoids re-computation and ensures efficient lookup: O(n * max_value), where max_value=50.

- **Why this approach:**  
  - Scales to large n (≤ 10⁴).
  - Leverages value property (small range, precomputable coprime relations).
  - Cleanly fits tree traversal patterns (DFS with extra bookkeeping).



### Corner cases to consider  
- Tree with one node (no ancestor).
- Node values that are all the same.
- No ancestor coprime to a node (so output -1).
- Chain/tree is "deep" (e.g., skewed).
- All values coprime with each other (e.g., all are 1 or pairwise coprime).



### Solution

```python
from math import gcd
from collections import defaultdict

def getCoprimes(nums, edges):
    n = len(nums)
    tree = [[] for _ in range(n)]
    for u, v in edges:
        tree[u].append(v)
        tree[v].append(u)

    # Precompute coprime lists for 1..50
    coprime_with = [[] for _ in range(51)]
    for a in range(1, 51):
        for b in range(1, 51):
            if gcd(a, b) == 1:
                coprime_with[a].append(b)
    
    ans = [-1] * n

    # ancestor_map[value] = (node_index, depth)
    ancestor_map = dict()

    def dfs(node, parent, depth):
        nonlocal ans

        # Find the deepest ancestor with a value coprime to nums[node]
        max_depth = -1
        ancestor = -1
        for v in coprime_with[nums[node]]:
            if v in ancestor_map:
                anc_idx, anc_depth = ancestor_map[v]
                if anc_depth > max_depth:
                    ancestor = anc_idx
                    max_depth = anc_depth
        ans[node] = ancestor

        # Save original for backtracking
        prev = ancestor_map.get(nums[node], None)
        ancestor_map[nums[node]] = (node, depth)

        for nei in tree[node]:
            if nei != parent:
                dfs(nei, node, depth + 1)

        # Restore on exit (backtrack)
        if prev is not None:
            ancestor_map[nums[node]] = prev
        else:
            del ancestor_map[nums[node]]

    dfs(0, -1, 0)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × max_value), where max_value=50.  
  - Tree traversal is O(n).
  - For each node, for its value, we check `coprime_with[val]` list (≤ 50 iterations).
  - Precomputing coprimes: O(1) (since value is small and constant).
- **Space Complexity:**  
  - O(n + max_value) for adjacency list and ancestor map.
  - O(1) auxiliary space per call (call stack goes up to O(n) for deep trees).  
  - O(1) for coprime lookup table (since 51×51 is constant).



### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your solution if the nums array could be much larger, i.e., values up to 10⁹?
  *Hint: Coprime lookup tables wouldn't be feasible; you'd need to compute gcd on the fly.*

- What if you needed not just the closest, but *all* ancestors coprime to the current node?
  *Hint: Extend ancestor_map to a history or do a scan but may affect efficiency.*

- Can you solve this problem in constant extra space (excluding output) without recursion?
  *Hint: Iterative DFS or BFS, but ancestor tracking would still need storage equivalent to depth.*

### Summary
This problem is a classic example of **Tree DP with ancestor tracking** and uses **precomputation** based on value constraints.  
The main pattern is “*DFS with context or state passing*”—keeping track of auxiliary information about ancestors as we traverse. Similar ideas are useful in other “nearest ancestor” or “dynamic path property” problems on trees; for instance, finding the nearest node with a smaller value, or aggregating subtree statistics efficiently.


### Flashcard
During DFS, track the deepest ancestor for each value 1..50; for each node, check coprime ancestors in O(1) using precomputed lists.

### Tags
Array(#array), Math(#math), Tree(#tree), Depth-First Search(#depth-first-search), Number Theory(#number-theory)

### Similar Problems
