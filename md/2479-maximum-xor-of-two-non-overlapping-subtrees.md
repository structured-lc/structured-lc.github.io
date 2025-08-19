### Leetcode 2479 (Hard): Maximum XOR of Two Non-Overlapping Subtrees [Practice](https://leetcode.com/problems/maximum-xor-of-two-non-overlapping-subtrees)

### Description  
You are given a rooted tree with n nodes, each node having a value. The tree is described with an edge list and a list of node values.  
Pick any two **non-overlapping subtrees** (meaning the sets of nodes in those subtrees share no node) and compute their scores as the XOR (⊕) of their subtree sums.  
Return the **maximum possible XOR of subtree sums** you can obtain by picking any two non-overlapping subtrees. If there are no such possible subtrees, return 0.

A **subtree** of a node is the node and all its descendants.  
The two picked subtrees cannot share any node.

### Examples  

**Example 1:**  
Input: `n = 6, edges = [[0,1],[0,2],[1,3],[1,4],[2,5]], values = [2,8,3,6,2,5]`  
Output: `24`  
Explanation:  
The tree structure is:
```
      0
     / \
    1   2
   / \   \
  3   4   5
```
List representation: [2,8,3,6,2,5]  
- Subtree rooted at node 1: sum = 8+6+2 = 16  
- Subtree rooted at node 2: sum = 3+5 = 8  
- 16 ⊕ 8 = 24 (maximum possible)


**Example 2:**  
Input: `n = 3, edges = [[0,1],[1,2]], values = [4,6,1]`  
Output: `0`  
Explanation:  
Tree:
```
  0
  |
  1
  |
  2
```
[4,6,1]  
It's not possible to pick two non-overlapping subtrees, so the answer is 0.

**Example 3:**  
Input: `n = 5, edges = [[0,1],[0,2],[1,3],[1,4]], values = [1,2,4,5,6]`  
Output: `13`  
Explanation:  
Tree:
```
    0
   / \
  1   2
 / \
3   4
```
Possible subtree sums:  
- Subtree rooted at 3: 5  
- Subtree rooted at 4: 6  
5 ⊕ 6 = 3  
- Subtree rooted at 1: 2+5+6=13  
- Subtree rooted at 2: 4  
13 ⊕ 4 = 9  
=> Maximum is 13

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  - For every pair of nodes, compute the sum in each subtree, check if the subtrees overlap (which could be checked via ancestor-descendant relations), and if not, calculate XOR.
  - This is O(n²) in both time and possibly space, which will TLE for n up to 5×10⁴.

- **Observations:**  
  - Subtree overlap implies ancestor/descendant—that is, one selected root cannot be in the subtree of the other.
  - For efficient overlap checks, subtree traversal counts or timestamping (Euler Tour) can be used.

- **Optimized Approach:**  
  - **Step 1:** Do a DFS to compute the sum of all subtrees.  
  - **Step 2:** As you finish DFS traversal from leaves up, for each node, you can treat all subtree sums from its descendants as “locked”—they cannot be paired with their ancestors (would overlap).  
  - **Step 3:** To maximize XOR, maintain a Trie (binary prefix tree) of the subtree sums encountered *outside* the current subtree, so as you process the tree, you have the sums from other subtrees to try pairing for maximum XOR with the current subtree sum.
  - For each node, query the Trie with its subtree sum to find the sum which gives the highest XOR.
  - Use subtree time intervals or hashes to prevent seeing sums in the same branch.

- **Trade-offs:**  
  - Trie gives O(log MAX_VAL) lookup/insert; overall O(n log MAX_VAL) time, acceptable given n ≤ 5×10⁴ and value up to 10⁹.
  - Needs two DFS passes: one for subtree sum, another for maximizing XOR.

- **For code:**
  - Perform first DFS to record subtree sum for every node.
  - Second DFS: 
    - Enter subtree, don't consider its sums in running Trie;  
    - For children, process recursively, then insert their subtree sums into Trie.
    - For each child, try all subtree sums in its subtree against all sums outside (maintained by Trie).

### Corner cases to consider  
- When the tree is just a straight line (worst-case depth).
- Tree is a star (root with n-1 leaves).
- All values are the same, or all values are large/distinct.
- No non-overlapping subtree pairs are possible (very small trees: n=2 or 3).

### Solution

```python
class TrieNode:
    def __init__(self):
        self.children = [None, None]

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, x):
        node = self.root
        for b in range(30, -1, -1):
            k = (x >> b) & 1
            if not node.children[k]:
                node.children[k] = TrieNode()
            node = node.children[k]

    def query(self, x):
        node = self.root
        ans = 0
        for b in range(30, -1, -1):
            k = (x >> b) & 1
            if node.children[1-k]:
                ans |= (1<<b)
                node = node.children[1-k]
            elif node.children[k]:
                node = node.children[k]
            else:
                break
        return ans

def maximumXorSubtree(n, edges, values):
    from collections import defaultdict

    # Build undirected graph
    tree = defaultdict(list)
    for u, v in edges:
        tree[u].append(v)
        tree[v].append(u)

    # Calculate subtree sums
    subsum = [0]*n
    def dfs_sum(u, parent):
        s = values[u]
        for v in tree[u]:
            if v == parent:
                continue
            s += dfs_sum(v, u)
        subsum[u] = s
        return s

    dfs_sum(0, -1)

    # Trie for the xor
    result = 0
    trie = Trie()

    def dfs(u, parent):
        nonlocal result
        # For each child subtree, process separately
        for v in tree[u]:
            if v == parent:
                continue

            # remove v's subtree sums temporarily; 
            # process all nodes in v's subtree and try to maximize xor with Trie
            def collect_subtree(x, p, arr):
                arr.append(subsum[x])
                for y in tree[x]:
                    if y != p:
                        collect_subtree(y, x, arr)
            
            arr = []
            collect_subtree(v, u, arr)
            for sumval in arr:
                candidate = trie.query(sumval)
                result = max(result, candidate ^ sumval)

            dfs(v, u)

            # After processing, insert v's subtree sums into Trie, so later sibling subtrees can use them
            for sumval in arr:
                trie.insert(sumval)

    dfs(0, -1)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log MAX\_VAL), where n is the number of nodes (DFS traversals) and each Trie operation (insert/search) is O(log MAX\_VAL) for value bits (up to 30 bits).
- **Space Complexity:** O(n) for subtree sums, and O(n × log MAX\_VAL) for Trie nodes (in practice, Trie is sparse, so actually much less).

### Potential follow-up questions (as if you’re the interviewer)  

- If each node's value can be negative, how would your solution change?  
  *Hint: Consider signed representation in the Trie or offsets.*

- What if you are allowed to select any k (not just 2) non-overlapping subtrees?  
  *Hint: Dynamic Programming over subtrees?*

- Can you find the actual pairs of subtrees that achieve the maximum xor, and not just the value?  
  *Hint: Track the subtree root indices along with values in the Trie or during traversal.*

### Summary
This problem is a **classic combination of tree DFS and Trie (binary prefix tree) optimization for bitwise problems**. The pattern—use of subtree aggregation combined with Trie “rolling accumulation” for maximum XOR—is useful in various tree xor/maximization, bitwise, or path sum problems.  
Similar techniques are widely reused in “maximum xor” queries in arrays, prefix-xor subarray problems, and dynamic programming over trees.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Graph(#graph), Trie(#trie)

### Similar Problems
