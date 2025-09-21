### Leetcode 3681 (Hard): Maximum XOR of Subsequences [Practice](https://leetcode.com/problems/maximum-xor-of-subsequences)

### Description  
Given an array of non-negative integers, select any two (possibly empty) **disjoint** subsequences and maximize the bitwise XOR of their sums. That is, you want to find two **disjoint** subsequences (they may be empty or full), compute their sums, then compute the XOR of those two sums, and maximize this value over all such possible choices.

"Disjoint" means no array position can be chosen for both subsequences. The sums are the sum of the selected elements in each subsequence (can be 0 if empty).

### Examples  

**Example 1:**  
Input: `[1,2,3]`  
Output: `3`  
Explanation:  
Choose subsequence₁ = `[2]` (sum = 2), subsequence₂ = `[1]` (sum = 1).  
The XOR is 2 ⊕ 1 = 3. This is the maximal possible result.

**Example 2:**  
Input: `[2,8,5]`  
Output: `15`  
Explanation:  
Choose subsequence₁ = `[8]` (sum = 8), subsequence₂ = `[7]` (sum = 7 from subsequence `[2,5]`).  
The XOR is 8 ⊕ 7 = 15.

**Example 3:**  
Input: `[0,0,0]`  
Output: `0`  
Explanation:  
All possible subsequence sums are 0; thus, the maximum XOR is 0.

### Thought Process (as if you’re the interviewee)  
The brute-force approach would be to generate all pairs of disjoint subsequences, compute their sums, and track the maximum XOR of these sums. With n elements, the number of possible pairs is too large (exponential), making this infeasible for large n.

Noticing that each subsequence sum can be formed by choosing a subset of indices, and any two disjoint subsets partition the array, we realize that the set of possible subsequence sums is the set of all subset sums.

So:
- First, compute all possible subset sums as a set `A`.
- The problem reduces to: find max(a ⊕ b) for a, b in A.

But this is still O(N²) if we just check every pair.

To optimize, we can use a **trie** (prefix tree) for the set of subset sums:
- Compute all subset sums.
- For each sum `a` in A, insert it into the trie.
- For each sum `a`, query the trie for sum `b` that maximizes `a ⊕ b`.
- Since A can be of size up to 2ⁿ, for n ≤ 20~22 this is manageable.

Thus, the best approach is:
- Generate all subset sums (using set).
- For each sum, maximize its XOR using a trie built from the set.

#### Why this optimization?
Using a trie lets us avoid O(2ⁿ)² pair checking; each query is O(1) in sum of bits (max 32-40 bits). This "maximum XOR pair" via Trie is a common coding pattern.  
  
### Corner cases to consider  
- Empty array: Max XOR is 0.
- All elements are zero: Max XOR is 0.
- Only one element: Max XOR is 0 (empty vs. whole or both empty).
- All elements the same: Make sure result comes from disjoint subsequences.
- Large numbers: Ensure XOR handles up to 32 bits.

### Solution

```python
class TrieNode:
    def __init__(self):
        self.children = {}

class Solution:
    def maxXorSubsequences(self, nums):
        # Compute all possible subset sums (order doesn't matter)
        subset_sums = set([0])
        for num in nums:
            # For each current sum, create a new sum including num
            new_sums = set()
            for s in subset_sums:
                new_sums.add(s + num)
            subset_sums |= new_sums

        # Build trie for all subset sums
        trie = TrieNode()
        def insert(num):
            node = trie
            for k in reversed(range(40)):  # use up to 40 bits for larger sums
                b = (num >> k) & 1
                if b not in node.children:
                    node.children[b] = TrieNode()
                node = node.children[b]

        def query(num):
            node = trie
            xor_sum = 0
            for k in reversed(range(40)):
                b = (num >> k) & 1
                # Try to go to the opposite bit to maximize xor
                if 1 - b in node.children:
                    xor_sum |= (1 << k)
                    node = node.children[1 - b]
                else:
                    node = node.children.get(b, node)
            return xor_sum

        # Insert all subset sums to trie
        for s in subset_sums:
            insert(s)
        # For each sum, find max xor with any sum from all subset sums
        max_xor = 0
        for s in subset_sums:
            max_xor = max(max_xor, query(s))
        return max_xor
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(2ⁿ × B), where B is the number of bits to represent max sum (≈40), for subset sum gen, trie insert, and query.
  - For n ≤ 20, feasible in practice.
- **Space Complexity:**  
  - O(2ⁿ) for set of subset sums and trie nodes.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you have size constraints on the two subsequences?  
  *Hint: Track the counts associated with each sum, or filter valid pairs based on length.*

- Can this be extended to three disjoint subsequences?  
  *Hint: Generalize to k-way partitions, might require more advanced DP.*

- What if some elements are negative?  
  *Hint: Subset sum set will still work, but sum range widens. Adjust trie accordingly.*

### Summary
The approach leverages the classic "subset sum generation + maximum XOR pair via Trie," a notable pattern for XOR maximum problems. This pattern is broadly useful in problems where you need to maximize XOR for any two values from a set, especially when set elements are constructed from subset/partition processes.

### Tags

### Similar Problems
