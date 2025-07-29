### Leetcode 1938 (Hard): Maximum Genetic Difference Query [Practice](https://leetcode.com/problems/maximum-genetic-difference-query)

### Description  
Given a rooted tree with n nodes labeled from 0 to n-1, each node's label is its unique genetic value. The parent of each node is given (with one root node having parent -1). You're also given several queries, each as [node, val]. For each query, return the maximum possible XOR between val and any node's value on the path from the queried node up to the root (including the node itself).  

### Examples  

**Example 1:**  
Input:  
`parents = [-1,0,1,1], queries = [[0,2],[3,2],[2,5]]`  
Output:  
`[2,3,7]`  
Explanation:  
- For [0,2]: only path is node 0, 2 XOR 0 = 2.  
- For [3,2]: path is 3→1→0, check XOR(2,3)=1, XOR(2,1)=3, XOR(2,0)=2; maximum is 3.  
- For [2,5]: path is 2→1→0, check XOR(5,2)=7, XOR(5,1)=4, XOR(5,0)=5; maximum is 7.

**Example 2:**  
Input:  
`parents = [-1,0,0,1,1,2], queries = [[5,3],[3,4],[2,6]]`  
Output:  
`[7,7,6]`  
Explanation:  
For each query, consider all ancestors (including self), and compute all XOR possibilities.

**Example 3:**  
Input:  
`parents = [-1,0,1], queries = [[2,1],[0,3]]`  
Output:  
`[2,3]`  
Explanation:  
For [2,1]: path is 2→1→0, XOR(1,2)=3, XOR(1,1)=0, XOR(1,0)=1; max is 3.

### Thought Process (as if you’re the interviewee)  
Let's clarify what's being asked: for each query, we need the max XOR of the query `val` with any ancestor (including itself) of the node.

**Brute-force idea:**  
- For each query, walk up from node to root, XOR val with each ancestor's label, record max.
- Time: O(q × h), where h is average height—can be O(nq) in worst case.

**Optimization:**  
- Since there are lots of queries, we can process them in batches.
- Note that all XORs are with node labels (0..n-1).
- We can represent all labels in the ancestor path at a node efficiently, using a Trie (prefix tree) for fast max-XOR queries.
- Perform a DFS over the tree from root.
  - At each node, insert the node’s value into the Trie.
  - For each query at the node, find the maximum XOR in O(bitlength), as Trie supports this efficiently.
  - After finishing the subtree, remove the node’s value from the Trie (backtracking).

**Why Trie works:**  
- Trie supports O(log(max label)) max-XOR queries and dynamic insert/delete, which is necessary because each node’s path to root is dynamic as we DFS.

Trade-offs:  
- Trie per path is memory efficient versus storing all ancestor sets per node.
- DFS with Trie update supports answering all queries in O((n+q)×logU), U is maximum node label.

### Corner cases to consider  
- Tree with only the root (one node).
- Queries on nodes with few or no ancestors.
- Multiple queries for the same node.
- Nodes with single child (degenerate tree).
- All queries are for leaves, all for root.
- Very large node values (up to 10⁵).
- Multiple queries for the same [node, val] pair.

### Solution

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.count = 0

class Trie:
    def __init__(self):
        self.root = TrieNode()
        self.L = 18  # Since node labels ≤ 1e5, need up to 17 bits (2¹⁷ > 1e5)

    def insert(self, num):
        node = self.root
        for i in range(self.L, -1, -1):
            bit = (num >> i) & 1
            if bit not in node.children:
                node.children[bit] = TrieNode()
            node = node.children[bit]
            node.count += 1

    def remove(self, num):
        node = self.root
        for i in range(self.L, -1, -1):
            bit = (num >> i) & 1
            node = node.children[bit]
            node.count -= 1

    def max_xor(self, num):
        node = self.root
        res = 0
        for i in range(self.L, -1, -1):
            bit = (num >> i) & 1
            toggled = 1 - bit
            if toggled in node.children and node.children[toggled].count > 0:
                res |= (1 << i)
                node = node.children[toggled]
            else:
                node = node.children.get(bit, node)
        return res

def maximumGeneticDifference(parents, queries):
    from collections import defaultdict

    n = len(parents)
    tree = [[] for _ in range(n)]
    root = -1
    for i, p in enumerate(parents):
        if p == -1:
            root = i
        else:
            tree[p].append(i)

    # Group queries by node for local processing
    node_queries = defaultdict(list)
    for idx, (node, val) in enumerate(queries):
        node_queries[node].append((val, idx))

    ans = [0] * len(queries)
    trie = Trie()

    def dfs(u):
        trie.insert(u)
        for val, idx in node_queries[u]:
            ans[idx] = trie.max_xor(val)
        for v in tree[u]:
            dfs(v)
        trie.remove(u)

    dfs(root)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((n + q) × log U),  
  - n DFS insertions/removals, each log U steps (U = largest value, ≤ 1e5)
  - q queries, each log U steps in Trie.
- **Space Complexity:** O(n × log U)  
  - Trie keeps at most O(log U × path depth) nodes at any time; overall Trie and tree take O(n × log U).

### Potential follow-up questions (as if you’re the interviewer)  

- What would you do if node values are not unique, or not in [0, n-1]?  
  *Hint: The Trie still works, as long as you have bounded maximum value. Uniqueness is not a requirement—only bit representation range matters.*

- What if you need to query minimum XOR instead?  
  *Hint: Modify your Trie query method to prefer the same bit over toggling it.*

- How would you handle a stream of dynamic updates (inserts/removes of nodes or queries)?  
  *Hint: Consider persistent tries for full historical support, or use dynamic balanced BSTs for online updates—trade-offs between time and space.*

### Summary
This problem is an advanced combination of tree traversal with efficient range queries using a bitwise Trie. The key pattern is **offline batch query processing with path-dependent state**, a recurring technique in hard tree/XOR problems. This approach generalizes to many other "max over ancestor path" queries where the operation can be efficiently supported by a Trie or segment tree, especially for bit and XOR aggregations.