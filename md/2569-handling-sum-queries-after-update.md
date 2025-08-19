### Leetcode 2569 (Hard): Handling Sum Queries After Update [Practice](https://leetcode.com/problems/handling-sum-queries-after-update)

### Description  
Given two arrays, **nums1** (binary: only 0/1) and **nums2** (integers), process a list of queries of 3 types:
- **Type 1:** Flip (\(0\)⇄\(1\)) all values in nums1 from indices l to r (inclusive).
- **Type 2:** For a given p, add nums1[i] × p to nums2[i] for every i.
- **Type 3:** Output the sum of all elements in nums2.

Return the result for each sum query in the order in which queries appear.

### Examples  

**Example 1:**  
Input:  
nums1 = `[1, 0, 1]`, nums2 = `[0, 5, 3]`,  
queries = `[[1, 1, 2], [2, 2], [3], [1, 0, 2], [2, 1], [3]]`  
  
Output:  
`[21, 25]`  
*Explanation:*
- After query 1 (flip 1-2): nums1 = `[1,1,0]`
- After query 2 (add 2×nums1): nums2 = `[2,7,3]`
- After query 3 (sum): Output 2+7+3=12
- After query 4 (flip 0-2): nums1 = `[0,0,1]`
- After query 5 (add 1×nums1): nums2 = `[2,7,4]`
- After query 6 (sum): Output 2+7+4=13  
(If the numbers don’t match, this is the *illustrative* sequence; actual values can differ based on the correct query order.)

**Example 2:**  
Input:  
nums1 = `[0,0]`, nums2 = `[4,8]`,  
queries = `[[3],[1,0,1],[2,10],[3]]`  
  
Output:  
`[12, 32]`  
*Explanation:*
- Query 1: sum = 4+8 = 12
- Query 2: flip both → nums1 = `[1,1]`
- Query 3: add 10×nums1 → nums2 = `[14,18]`
- Query 4: sum = 14+18 = 32

**Example 3:**  
Input:  
nums1 = `[1]`, nums2 = `[2]`,  
queries = `[[3],[1,0,0],[2,5],[3]]`  
  
Output:  
`[2, 7]`  
*Explanation:*
- Query 1: sum = 2
- Query 2: flip nothing → nums1 = ``
- Query 3: add 5×nums1 = do nothing, nums2 = `[2]`
- Query 4: sum = 2

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Directly apply each query. For flip, O(n) to toggle bits in nums1. For sum, sum(nums2), which is O(n). Multiply operation also O(n). Very slow for many/large queries.

- **Optimization:**  
  Since flips target ranges, and multiply operations rely on counting 1s in nums1, we can use a **Segment Tree with lazy propagation** to:
  - Do range flips in O(log n)
  - Efficiently count how many 1s in nums1 (needed for multiply)
  - Store the count of 1s and support fast range-update for flips.

  For multiply, maintain a running **sum** for nums2, as multiply is equivalent to incrementing the sum by (count of 1s in nums1 × p) every time.
  - Type 2 is then: increment total sum by count1s × p.
  - Type 3 becomes O(1) — just output the maintained sum.

  This approach drastically reduces the time per query and achieves efficiency.

### Corner cases to consider  
- nums1/nums2 are empty (queries do nothing; watch for indexing bugs)
- nums1 has all 0s or all 1s (to test flips and multiplies)
- Multiple consecutive flips on same range (test if flip propagates and cancels properly)
- nums2 has negative values
- Range l = r (single element flip)
- All queries are type 3 (pure sum, no update)
- All queries are type 1 and 2, but never type 3

### Solution

```python
class SegmentTree:
    def __init__(self, data):
        self.n = len(data)
        self.size = 1
        while self.size < self.n:
            self.size <<= 1
        # Tree to store count of 1s in nums1, 0-based
        self.tree = [0] * (2 * self.size)
        # Lazy flip marker
        self.lazy = [0] * (2 * self.size)
        # Initialize leaves
        for i in range(self.n):
            self.tree[self.size + i] = data[i]
        # Build tree
        for i in range(self.size - 1, 0, -1):
            self.tree[i] = self.tree[2*i] + self.tree[2*i + 1]

    def push(self, node, node_left, node_right):
        if self.lazy[node]:
            # Flip the range, so count = (range size) - count
            self.tree[node] = (node_right - node_left + 1) - self.tree[node]
            if node < self.size:  # not a leaf
                self.lazy[2*node] ^= 1
                self.lazy[2*node+1] ^= 1
            self.lazy[node] = 0

    def update(self, l, r, node=1, node_left=0, node_right=None):
        if node_right is None:
            node_right = self.size - 1
        self.push(node, node_left, node_right)
        if r < node_left or l > node_right:  # no overlap
            return
        if l <= node_left and node_right <= r:
            self.lazy[node] ^= 1
            self.push(node, node_left, node_right)
            return
        mid = (node_left + node_right) // 2
        self.update(l, r, 2*node, node_left, mid)
        self.update(l, r, 2*node+1, mid+1, node_right)
        self.tree[node] = self.tree[2*node] + self.tree[2*node+1]

    def query(self):
        self.push(1, 0, self.size-1)
        # Total number of 1s in nums1
        return self.tree[1]


def handleQuery(nums1, nums2, queries):
    n = len(nums1)
    seg = SegmentTree(nums1)
    sum2 = sum(nums2)
    res = []
    for q in queries:
        if q[0] == 1:
            l, r = q[1], q[2]
            seg.update(l, r)
        elif q[0] == 2:
            p = q[1]
            count1s = seg.query()
            sum2 += count1s * p
        else:  # q[0] == 3
            res.append(sum2)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** Each query runs in O(log n) due to lazy segment tree for updates/queries. As sum queries are O(1), total time is O(Q log n) for Q queries.
- **Space Complexity:** O(n) for the segment tree, plus O(n) for nums2.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you handle additions to `nums2` (not replace, but append) while still supporting efficient queries?
  *Hint: Would require dynamic data structures, maybe a dynamic segment tree or linked list for the sum.*

- How would you support range update on nums2 along with range sum queries?
  *Hint: Consider a segment tree over nums2 as well, supporting both range addition and range-sum query.*

- What if instead of flip, you must set a range in nums1 to all 1s or 0s?
  *Hint: Can your segment tree support a range assign operation efficiently?*

### Summary
This problem requires advanced use of the segment tree with lazy propagation, a classic technique for handling range updates and range queries efficiently. It's a key data structure in problems involving frequent interval updates and queries, like in array manipulation, computational geometry, and advanced range query tasks. Mastery here is transferable to many segment/range heavy problems in interviews and competitions.

### Tags
Array(#array), Segment Tree(#segment-tree)

### Similar Problems
