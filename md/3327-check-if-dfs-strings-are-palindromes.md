### Leetcode 3327 (Hard): Check if DFS Strings Are Palindromes [Practice](https://leetcode.com/problems/check-if-dfs-strings-are-palindromes)

### Description  
Given a rooted tree with n nodes, each node has a lowercase English letter associated with it. For every node i, perform a DFS traversal starting from i that visits all the nodes in its subtree in preorder. Concatenate the letters of each node in the order visited to form a string dfsStr. For each node, determine if its corresponding dfsStr is a palindrome (reads the same forwards and backwards). Return a boolean array answer such that answer[i] is True if dfsStr for node i is a palindrome, otherwise False.  

### Examples  

**Example 1:**  
Input: `parent = [-1,0,0,1,1,2], s = "abccba"`  
Output: `[True,False,False,True,True,True]`  
Explanation:  
Tree:
```
      0
    /   \
   1     2
  / \     \
 3   4     5
```
Letters: [a, b, c, c, b, a]  
- Node 0: dfsStr = "abccba" (palindrome)  
- Node 1: dfsStr = "bccb" (not palindrome)  
- Node 2: dfsStr = "ca" (not palindrome)  
- Node 3: dfsStr = "c" (palindrome)  
- Node 4: dfsStr = "b" (palindrome)  
- Node 5: dfsStr = "a" (palindrome)

**Example 2:**  
Input: `parent = [-1,0,1,2], s = "abba"`  
Output: `[False,True,False,True]`  
Explanation:  
Tree:
```
0
|
1
|
2
|
3
```
Letters: [a, b, b, a]  
- Node 0: dfsStr = "abba" (not palindrome)  
- Node 1: dfsStr = "bba" (not palindrome)  
- Node 2: dfsStr = "ba" (not palindrome)  
- Node 3: dfsStr = "a" (palindrome)

**Example 3:**  
Input: `parent = [-1,0,0], s = "aba"`  
Output: `[True,True,True]`  
Explanation:  
Tree:
```
  0
 / \
1   2
```
Letters: [a, b, a]  
- Node 0: dfsStr = "aba" (palindrome)  
- Node 1: dfsStr = "b" (palindrome)  
- Node 2: dfsStr = "a" (palindrome)

### Thought Process (as if you’re the interviewee)  
- Brute force: For each node i, do a DFS, gather the letters for its subtree in preorder, and check if the resulting string is a palindrome. This takes O(n²) time, since each DFS might visit O(n) nodes and there are n nodes.
- Optimization: Notice that the DFS preorder substring for each subtree corresponds to one continuous segment in the global preorder DFS of the tree. By recording entry and exit times (`in` and `out`), for each subtree rooted at i, its preorder string is substring DFS_STR[in[i]:out[i]+1].
- To check if a substring is a palindrome efficiently, use hashing techniques (rolling hash or prefix hash), so each check is O(1) after O(n) preprocessing.
- Build the global preorder DFS string and for each node, check if the substring corresponding to its subtree is a palindrome using prefix hashes.

### Corner cases to consider  
- The tree has only one node.
- All characters are the same.
- Each node’s subtree string is length 1.
- The tree is skewed (linear chain vs. balanced).
- Input s is empty or doesn't match number of nodes (invalid, but can be checked).

### Solution

```python
def checkPalindromeDFS(parent, s):
    n = len(parent)
    from collections import defaultdict

    # Build the tree
    tree = defaultdict(list)
    for i in range(1, n):
        tree[parent[i]].append(i)

    preorder = []
    in_time = [0] * n
    out_time = [0] * n

    # Preorder DFS to record the traversal and subtree segments
    def dfs(u):
        in_time[u] = len(preorder)
        preorder.append(u)
        for v in tree[u]:
            dfs(v)
        out_time[u] = len(preorder) - 1

    dfs(0)

    # Build the global DFS string
    dfs_str = [s[u] for u in preorder]

    # Compute prefix hashes for palindrome check
    MOD = 998244353
    BASE = 911

    n_str = len(dfs_str)
    pow_base = [1] * (n_str + 1)
    for i in range(1, n_str + 1):
        pow_base[i] = (pow_base[i - 1] * BASE) % MOD

    prefix_hash = [0] * (n_str + 1)
    for i in range(n_str):
        prefix_hash[i + 1] = (prefix_hash[i] * BASE + ord(dfs_str[i])) % MOD

    # Hash of the reversed string (for palindrome checking)
    rev_str = dfs_str[::-1]
    rev_prefix_hash = [0] * (n_str + 1)
    for i in range(n_str):
        rev_prefix_hash[i + 1] = (rev_prefix_hash[i] * BASE + ord(rev_str[i])) % MOD

    # Helper: get hash of dfs_str[l:r] (substring)
    def get_hash(l, r):
        return (prefix_hash[r] - prefix_hash[l] * pow_base[r - l]) % MOD

    def get_rev_hash(l, r):
        return (rev_prefix_hash[r] - rev_prefix_hash[l] * pow_base[r - l]) % MOD

    ans = [False] * n
    for u in range(n):
        l = in_time[u]
        r = out_time[u] + 1  # exclusive
        length = r - l
        # Compare the hash of substring to hash of its reverse
        # Map to reverse indices
        rev_l = n_str - r
        rev_r = n_str - l
        if get_hash(l, r) == get_rev_hash(rev_l, rev_r):
            ans[u] = True
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - DFS traversal and computing in/out times: O(n)
  - Building hashes for DFS_STR and its reverse: O(n)
  - For each node, palindrome check via two hash lookups and integer comparison: O(1) × n = O(n)
- **Space Complexity:** O(n)  
  - Data structures: tree (adjacency list), preorder list, in/out arrays: O(n)
  - Hash arrays and power bases: O(n)
  - Recursion stack for DFS: up to O(n) in worst case (skewed tree)

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree is not rooted at node 0, or can be rooted at any node?  
  *Hint: You may need to identify the root and handle multiple roots (forest) case.*

- How would you handle dynamic updates to the character string s (e.g., one node letter changes and you need to answer queries efficiently)?  
  *Hint: Segment trees or binary indexed trees with hash support.*

- Suppose you want to return the minimum number of changes needed to make each dfsStr a palindrome?  
  *Hint: For a substring, count mismatched character pairs or use two-pointers.*

### Summary
This problem is a classic application of "subtree as preorder interval" in tree algorithms, and substring palindrome check using rolling hash. The same hashing pattern can be used for handling other substring-equality or palindromic queries in trees, such as "find all unique subtree strings," or problems involving subtree string manipulations and queries.


### Flashcard
Record DFS entry/exit times for each node; preorder substring for subtree rooted at i corresponds to letters[entry[i]...exit[i]]; check palindrome using character frequency.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Tree(#tree), Depth-First Search(#depth-first-search), Hash Function(#hash-function)

### Similar Problems
