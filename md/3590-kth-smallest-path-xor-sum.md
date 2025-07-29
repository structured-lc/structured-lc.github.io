### Leetcode 3590 (Hard): Kth Smallest Path XOR Sum [Practice](https://leetcode.com/problems/kth-smallest-path-xor-sum)

### Description  
Given a tree rooted at node 0 with n nodes (nodes are 0-indexed). Each node i has an integer value val[i].  
For multiple queries of the form [u, k], return the kᵗʰ smallest **distinct** path XOR sum between node 0 (root) and all nodes in the subtree of node u (including u).  
The "path XOR sum" from root to node x is the XOR of all values along the path from root to that node.

### Examples  

**Example 1:**  
Input:  
tree: parent=[-1,0,0,1,1], val=[5,2,7,3,3]  
queries: `[[1,2], [0,3], [2,1]]`  
Output:  
`[1,2,7]`  
*Explanation:  
- Query [1,2]: Subtree of node 1 contains nodes [1,3,4].  
  Paths:  
    - root→1: 5⊕2=7  
    - root→1→3: 5⊕2⊕3=4  
    - root→1→4: 5⊕2⊕3=4 (duplicate, so only 4 and 7 are present)  
  Distinct XORs: [4,7], 2ⁿᵈ smallest is 7.  
- Query [0,3]: Subtree is all nodes, XORs: [5,7,12,4], sorted = [4,5,7,12], 3ʳᵈ smallest = 7  
- Query [2,1]: Subtree of 2 is [2], XOR = 5⊕7=2  
*

**Example 2:**  
Input:  
tree: parent=[-1,0,0,1], val=[6,3,1,4]  
queries: `[[0,1], [0,2], [0,3], [1,1]]`  
Output:  
`[1,3,7,3]`  
*Explanation:  
Calculate distinct XORs for each subtree.  
*

**Example 3:**  
Input:  
tree: parent=[-1,0,1], val=[1,2,3]  
queries: `[[2,1],[2,2]]`  
Output:  
`[0,-1]`  
*Explanation:  
Subtree of 2 is only node 2 (XOR from root is 1⊕2⊕3=0), only 1 value, 2ⁿᵈ smallest does not exist, so -1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For each query, generate all nodes in subtree u, compute their root-to-node XORs, collect the XORs in a set, sort, and select the kᵗʰ smallest. This is too slow (O(n² q)).
- **Optimization 1:**  
  Precompute for every node:  
  - The path XOR from root to itself using DFS.
  - The subtree nodes using child lists or Euler Tour.
- **Optimization 2:**  
  Use DFS to accumulate XORs for nodes and store subtree results efficiently --- e.g., "DSU on tree" (merge child sets for subtrees, always merging smaller into larger to make this O(n log n)).
- **For queries:**  
  - Attach queries to nodes.  
  - While traversing node u in post-order, maintain a sorted (or multiset) set of distinct XORs in its subtree, answer all queries at u.
- **Trade-off:**  
  - Storing complete sets for all subtrees could be memory-heavy if not handled carefully, but DSU-on-tree makes it efficient enough.

### Corner cases to consider  
- k larger than number of unique XORs in subtree ⇒ output -1  
- All node values same  
- Subtree is just a leaf  
- Duplicate XOR sums (multiple paths can yield same value)  
- Large k (=size of subtree) or k=1  
- Deep tree (worst case recursion and path length)

### Solution

```python
from collections import defaultdict

def kth_smallest_path_xor_sum(parent, val, queries):
    n = len(parent)
    # Build tree
    tree = [[] for _ in range(n)]
    for i in range(1, n):
        tree[parent[i]].append(i)

    # Prepare queries at each node: queries[node] = [(k, idx)]
    qlist = [[] for _ in range(n)]
    for idx, (u, k) in enumerate(queries):
        qlist[u].append((k, idx))
    
    # answer array
    ans = [-1] * len(queries)
    
    # Compute xor_from_root for each node
    xor_from_root = [0] * n
    def dfs_xor(u, curr_xor):
        xor_from_root[u] = curr_xor ^ val[u]
        for v in tree[u]:
            dfs_xor(v, xor_from_root[u])
    dfs_xor(0, 0)
    
    # DSU on tree: sets[u] holds distinct XORs in subtree of u
    def dfs(u):
        my_set = set()
        my_set.add(xor_from_root[u])
        big_child = -1
        max_size = 0
        # Find the child with largest subtree (small-to-large)
        for v in tree[u]:
            dfs(v)
        # Merge: iterate children and merge their sets to 'my_set'
        for v in tree[u]:
            child_set = sets[v]
            if len(child_set) > max_size:
                big_child = v
                max_size = len(child_set)
        if big_child != -1:
            my_set = sets[big_child]
        my_set.add(xor_from_root[u])
        # Merge other child sets (excluding big_child)
        for v in tree[u]:
            if v == big_child: continue
            my_set.update(sets[v])
        sets[u] = my_set
        # Answer queries at u
        my_list = sorted(my_set)
        for k, qidx in qlist[u]:
            if 1 <= k <= len(my_list):
                ans[qidx] = my_list[k-1]
            else:
                ans[qidx] = -1

    sets = [set() for _ in range(n)]
    dfs(0)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log n + q log n) —  
    - Each node’s subtree XOR set is merged only O(log n) times (by always merging smaller into larger, DSU-on-tree).
    - Each query operates on a sorted set/list of ≤ n elements, so query cost is small.
- **Space Complexity:**  
  O(n + q) —  
    - O(n) to track XOR values, O(q) for queries and answers, worst-case O(n) sets.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the node values or tree is extremely large, does this approach scale?
  *Hint: How can you make space/time more efficient for repeated or range queries?*

- How would you answer queries online (not given upfront), or if paths were between arbitrary pairs, not just from root?
  *Hint: Think on heavy-light decomposition, or dynamic segment trees for arbitrary paths.*

- What if the queries ask for the sum/count of all possible XORs less than a threshold instead of kᵗʰ smallest?
  *Hint: Can you use a Trie to answer "count of XORs ≤ threshold" efficiently?*

### Summary
This problem centers around the **DSU On Tree** technique ("small-to-large" merging of sets) combined with subtree DFS traversals.  
It’s often used for subtree queries where you need to aggregate or rank distinct values per subtree efficiently, and is a common technique for answering "kᵗʰ" or frequency-based queries in trees with many overlapping subproblems.  
Patterns: DSU on tree, subtree queries, XOR path, offline query bucketization.  
Variants can occur in histogram-based subtree problems, mergeable structures, and range query optimizations.