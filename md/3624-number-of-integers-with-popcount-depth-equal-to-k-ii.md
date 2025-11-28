### Leetcode 3624 (Hard): Number of Integers With Popcount-Depth Equal to K II [Practice](https://leetcode.com/problems/number-of-integers-with-popcount-depth-equal-to-k-ii)

### Description  
Given an initial array of integers, you are asked to process two types of queries:
- Type 1: Given L, R, K, count how many elements in nums[L..R] have *popcount depth* equal to K.
- Type 2: Given index i and value x, update nums[i] = x.

*Popcount depth* is defined recursively:  
- For number x, its popcount depth is 1 if x == 1.  
- Otherwise, the popcount depth is 1 + popcount depth(popcount(x)), where popcount(x) is the number of 1s in binary representation of x.

You must support efficient queries and updates on nums.

### Examples  

**Example 1:**  
Input: `nums = [7, 3, 5], queries = [[1, 0, 2, 3], [2, 1, 1], [1, 0, 2, 2]]`  
Output: `[2, 1]`  
Explanation:  
- Query 1: [7, 3, 5]: popcount-depths: 7→3, 3→2, 5→3.  
  For L=0, R=2, K=3, two numbers (7, 5) have popcount-depth 3.  
- Query 2: Update index 1 to 1 → nums=[7,1,5]
- Query 3: Now [7,1,5]: popcount-depths: 7→3, 1→1, 5→3.  
  For L=0, R=2, K=2, only 1 (at index 1) has popcount-depth 2: zero, as 1 has depth 1.

**Example 2:**  
Input: `nums = , queries = [[1, 0, 0, 4], [2, 0, 3], [1, 0, 0, 2]]`  
Output: `[1, 0]`  
Explanation:  
- Query 1:  → popcount-depth: 15→4
- After update to 3: [3] → popcount-depth: 2
- Query 2: Ask for K=2, answer is 1.

**Example 3:**  
Input: `nums = [1, 2, 4, 8], queries = [[1, 1, 3, 2], [2, 2, 7], [1, 0, 3, 3]]`  
Output: `[3, 2]`  
Explanation:  
- popcount-depths: 1→1, 2→2, 4→2, 8→2. Query 1: from index 1 to 3, K=2 ⇒ three nums.
- Update index 2 to 7: now [1,2,7,8]: popcount-depths update.
- Query 2: K=3 from 0 to 3, count: [7,8] both get popcount-depth 3.

### Thought Process (as if you’re the interviewee)  
Let's break it down:
- **Naive idea:** For each type 1 query, scan nums from L to R, calculate popcount-depth for each number, then count K.
  - For type 2 update, just replace the value at i.
  - Complexity: O(NQ) in the worst case — not acceptable for large N, Q.

- **Observations:**
  - popcount-depth is *not* a simple property (can be up to O(log₂ n)).
  - The assignment is dynamic, so precomputing for just the initial array doesn't scale for updates.
  - For efficient range queries and updates, we want a structure like a Segment Tree or Binary Indexed Tree (Fenwick).
  - Since K is small (from problem constraints), **Segment Tree** of frequency counters for each popcount-depth value can work.

- **Approach:**
  - For each segment, maintain a counter for all possible popcount-depths (say up to 20 or 30 – can precompute limits).
  - Each segment tree node keeps a frequency array: freq[d] = count of numbers with popcount-depth=d, in this segment.
  - For update: when a value changes, update its popcount-depth in tree.
  - For query: sum the frequency for the desired K over the tree range.

- **Tradeoffs:**
  - Segment Tree with each node storing an array is O(N log N) space.
  - Each query/update is O(log N) for traversals and O(1) for fixed width freq array.

### Corner cases to consider  
- Single element arrays and full array queries.
- Multiple updates to the same index.
- All numbers being 1 (minimum popcount-depth).
- Large values for nums[i] needing correct popcount recursion.
- Multiple queries for the same range and K.
- K out of possible popcount-depth (e.g., no element has depth K).

### Solution

```python
def popcount_depth(x):
    # Precompute or cache this if needed in constraints
    depth = 0
    while x != 1:
        x = bin(x).count('1')
        depth += 1
    return depth + 1  # include final step when x == 1

class SegmentTree:
    # Each node holds a frequency array for each possible popcount-depth
    def __init__(self, arr, max_depth=8):
        # Choose max_depth based on constraints; here, e.g., 8 for safe
        self.n = len(arr)
        self.max_depth = max_depth
        self.size = 1
        while self.size < self.n: self.size <<= 1
        # freq[node][d] = frequency of popcount-depth == d at node
        self.freq = [ [0] * (self.max_depth + 1) for _ in range(self.size * 2) ]
        self.build(arr)
    
    def build(self, arr):
        for i in range(self.n):
            d = popcount_depth(arr[i])
            self.freq[self.size + i][d] = 1
        for i in range(self.size - 1, 0, -1):
            for d in range(self.max_depth + 1):
                self.freq[i][d] = self.freq[2*i][d] + self.freq[2*i+1][d]
    
    def update(self, idx, val):
        node = self.size + idx
        old_freq = self.freq[node]
        new_depth = popcount_depth(val)
        # Clear previous
        for d in range(self.max_depth + 1):
            self.freq[node][d] = 0
        self.freq[node][new_depth] = 1
        node >>= 1
        # Recompute up the tree
        while node:
            for d in range(self.max_depth + 1):
                self.freq[node][d] = self.freq[2*node][d] + self.freq[2*node+1][d]
            node >>= 1

    def query(self, l, r, k):
        # query [l, r] inclusive for count of depth == k
        l += self.size
        r += self.size
        res = 0
        while l <= r:
            if l % 2 == 1:
                res += self.freq[l][k]
                l += 1
            if r % 2 == 0:
                res += self.freq[r][k]
                r -= 1
            l >>= 1
            r >>= 1
        return res

def popcount_depth_ii(nums, queries):
    # Precompute or estimate max_depth possible for popcount-depth
    max_depth = 8  # works for most reasonable constraints
    tree = SegmentTree(nums, max_depth)
    result = []
    for q in queries:
        if q[0] == 1:
            _, l, r, k = q
            # Range query for depth=k in [l, r]
            result.append(tree.query(l, r, k))
        else:
            _, i, x = q
            tree.update(i, x)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Each query/update is O(log n × D) where D is the maximum possible popcount-depth (a small constant, e.g., 8).
  - Building the tree is O(n × D).
- **Space Complexity:**  
  - Segment tree stores O(n × D) frequency entries.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we had to support sum queries for ranges with popcount-depth ≤ K?  
  *Hint: Can you adjust the frequency prefix sum arrays?*  

- Could we do better if all numbers are small (e.g., ≤ 256)?  
  *Hint: Precompute popcount-depths for all possible values and use a compressed Segment Tree.*  

- If K is large (e.g., up to 64), how would the solution change?  
  *Hint: Consider sparse frequency arrays or only storing nonzero depths for each segment.*  

### Summary
This problem is a classic example of dynamic range queries with updates, applying the **segment tree with frequency buckets** pattern.  
It's a specialized version of the "range query with value condition" concept; the bucketed variant is applicable to other counting features or any "groupby" property that can be quickly recomputed, such as modulus, digit sums, or bit lengths.  
Key coding patterns: Segment Trees, value bucketing, and recomputation on update.


### Flashcard
For type 1 queries, scan range [L, R] and count numbers with popcount-depth = k; for type 2 updates, modify the array; optimize with segment trees or other range query structures if needed.

### Tags
Array(#array), Divide and Conquer(#divide-and-conquer), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree)

### Similar Problems
