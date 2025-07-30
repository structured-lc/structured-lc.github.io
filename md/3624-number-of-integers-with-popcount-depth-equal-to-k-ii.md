### Leetcode 3624 (Hard): Number of Integers With Popcount-Depth Equal to K II [Practice](https://leetcode.com/problems/number-of-integers-with-popcount-depth-equal-to-k-ii)

### Description  
Given an integer array `nums` (1-based) and a list of queries. There are two types of queries:
- **Type 1:** `[1, L, R, K]`, asking *how many indices* \( j \) with \( L \leq j \leq R \) such that the **popcount-depth** of `nums[j]` is \( K \).
- **Type 2:** `[2, X, V]`, meaning "update"—*set* `nums[X] = V`.

**Popcount Depth:** For a number \( n \), repeatedly replace \( n \) with the *popcount* (number of ones in its binary representation) until \( n = 1 \). The number of steps needed is the **popcount depth**.

Example:  
- For `n = 7` (0b111):  
  1. 7 → popcount(7) = 3  
  2. 3 → popcount(3) = 2  
  3. 2 → popcount(2) = 1  
  So, popcount-depth of 7 is 3.

You must answer all queries efficiently.

### Examples  

**Example 1:**  
Input: `nums = [5, 7, 9], queries = [[1,1,3,2], [2,2,1], [1,1,3,1]]`  
Output: `[1,2]`  
Explanation:  
- Query 1: `nums = [5,7,9]`. popcount-depth: 5 → 2 → 1 (**depth=2**), 7 → 3 → 2 → 1 (**depth=3**), 9 → 2 → 1 (**depth=2**). Only nums[1]=5 and nums[3]=9 have depth 2. So answer=2.  
- Query 2: Update nums[2]=1 ⇒ nums = [5,1,9].  
- Query 3: Now popcount-depth: 5→2→1 (**2**), 1 (**0**), 9→2→1 (**2**). Only nums[1]=5 and nums[3]=9 have depth=2. So answer=2.

**Example 2:**  
Input: `nums = [15, 2, 7, 8], queries = [[1,1,2,3], [1,3,4,1], [2,1,4], [1,1,4,2]]`  
Output: `[1,2,2]`  
Explanation:  
- 15: popcounts 15→4→1 (**2 steps**), 2: 2→1 (**1 step**), so in [1,2], only 15 has depth 2 (if K=2).  
- Next query looks for depth=1 in [3,4]: 7→3→2→1 (**3**), 8→1 (**1**), so only 8, answer=1.  
- After update: nums=[4,2,7,8]; 4→1 (**1**), [1,4] depths are [1,1,3,1]. So depth=2 not found, answer=0.

**Example 3:**  
Input: `nums = [3, 7, 8], queries = [[1,1,3,3], [2,3,4], [1,2,3,1]]`  
Output: `[1,2]`  
Explanation:  
- First, popcount-depth for nums=[3,7,8]: 3→2→1 (**2**), 7→3→2→1 (**3**), 8→1 (**1**). For [1,3] and K=3, only nums[2]=7, answer=1.  
- Update: nums=[3,7,4].  
- Now, popcount-depth: 3→2→1 (**2**), 7→3→2→1 (**3**), 4→1 (**1**). [2,3], K=1: only nums[3]=4, answer=1.

### Thought Process (as if you're the interviewee)  

1. **Brute-force:**  
   - For each query, iterate through the range [L,R], compute popcount-depth for each number, count those with depth=K.
   - This is too slow for large numbers of queries or large arrays, as each query could be \( O(n \log V) \).

2. **Preprocessing/Optimization:**  
   - Since popcount-depth can be precomputed for all 32-bit integers, we can cache/populate depth for all possible values.
   - To support efficient range queries and point updates, use a **segment tree or Binary Indexed Tree (Fenwick Tree)** for each possible depth \( d \).
   - For each index, store the current depth of `nums[i]`. For each possible depth, create a Fenwick Tree/array to count frequency within a range.
   - On update, remove the count of old depth for that index, update to new value, add count to new depth.

3. **Why this works / trade-off:**  
   - Lookup is fast (log n) per query.
   - Handles both update and range count efficiently.
   - Precompute popcount-depth for all \( V \leq 10^6 \) or up to input constraint.

### Corner cases to consider  
- Updates that set a value to the same value (should not double-count).
- All numbers start with depth=0 (if some value is 1).
- Type 1 query with no matching depth (answer should be 0).
- Single element ranges \( L=R \).
- All queries are type 2, or all are type 1.
- Large ranges or frequent updates.

### Solution

```python
# Precompute popcount-depth for all numbers up to max_val
def calc_popcount_depth(x, memo):
    if x == 1:
        return 0
    if x in memo:
        return memo[x]
    count = bin(x).count('1')
    depth = 1 + calc_popcount_depth(count, memo)
    memo[x] = depth
    return depth

class FenwickTree:
    # 1-based Fenwick Tree
    def __init__(self, size):
        self.n = size
        self.tree = [0] * (self.n + 2)

    def update(self, idx, delta):
        while idx <= self.n:
            self.tree[idx] += delta
            idx += idx & -idx

    def query(self, idx):
        res = 0
        while idx > 0:
            res += self.tree[idx]
            idx -= idx & -idx
        return res

    def range_query(self, l, r):
        return self.query(r) - self.query(l - 1)

def number_of_integers_with_popcount_depth_equal_to_k(nums, queries):
    n = len(nums)
    # Precompute max popcount depth
    MAX_NUM = max(nums + [v for q in queries if q[0]==2 for v in [q[2]]])
    memo = {}
    popdepth = [0] * (MAX_NUM + 2)
    for i in range(1, MAX_NUM+2):
        popdepth[i] = calc_popcount_depth(i, memo)

    # Find maximal depth possible for space allocation
    max_depth = max(popdepth)

    # For each possible depth, initialize a Fenwick Tree
    depth_trees = [FenwickTree(n) for _ in range(max_depth + 2)]
    # tracks current depth at each pos
    current_depth = [0] * n

    for idx, num in enumerate(nums):
        d = popdepth[num]
        current_depth[idx] = d
        depth_trees[d].update(idx+1, 1)

    res = []
    for q in queries:
        if q[0] == 1:
            _, L, R, K = q
            ans = depth_trees[K].range_query(L, R)
            res.append(ans)
        else:
            _, X, V = q
            X -= 1  # Make zero-based
            old_depth = current_depth[X]
            depth_trees[old_depth].update(X+1, -1)
            new_depth = popdepth[V]
            depth_trees[new_depth].update(X+1, 1)
            current_depth[X] = new_depth
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Preprocessing: \(O(N + M + U)\), where \(N\) is len(nums), \(M\) is the highest number that appears.
  - Each query: \(O(\log n)\) due to Fenwick Tree queries.
  - For Q queries: \(O(Q \log n)\).
- **Space Complexity:**  
  - \(O(N \cdot D)\), where \(D\) is the number of unique popcount-depths (usually small, ≤10).
  - Extra \(O(M)\) for popcount-depth table.

### Follow-up questions  
- How would you support "range update" (set many values to V) efficiently?  
- Is it possible to solve it with O(1) query (offline)? What if only type 1 queries are allowed?  
- What is the maximum possible popcount-depth for 32-bit numbers?  
- How would you adapt this if `nums` can change size (insert/delete)?