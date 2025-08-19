### Leetcode 3362 (Medium): Zero Array Transformation III [Practice](https://leetcode.com/problems/zero-array-transformation-iii)

### Description  
Given an integer array **nums** of length *n* and a 2D array **queries** where queries[i] = [lᵢ, rᵢ], each query allows you to decrement any nums[k] (where lᵢ ≤ k ≤ rᵢ) by at most 1 (for each index, you can choose to not decrement or decrement by 1).  
You may remove queries from the list. Find the **maximum number of queries you can remove** so that, using only the remaining queries, you can still transform nums into a **zero array** (every element is 0).  
Return that maximum number. If not possible, return -1.

### Examples  

**Example 1:**  
Input: `nums = [2,0,2]`, `queries = [[0,2],[0,2],[1,1]]`  
Output: `1`  
*Explanation:  
Remove queries[2] (`[1,1]`). With only `[0,2]` and `[0,2]` left,  
1️⃣ First `[0,2]`: Decrease nums and nums[2] by 1 → [1,0,1]  
2️⃣ Second `[0,2]`: Decrease nums and nums[2] by 1 → [0,0,0]  
Zero array achieved, so 1 query can be removed.*

**Example 2:**  
Input: `nums = [1,1,1]`, `queries = [[0,2],[0,2],[0,2]]`  
Output: `2`  
*Explanation:  
You can remove any two queries. The single remaining `[0,2]` lets you decrease all by 1 in one step: [1,1,1] → [0,0,0].*

**Example 3:**  
Input: `nums = [2,2,2]`, `queries = [[0,1],[1,2]]`  
Output: `-1`  
*Explanation:  
Impossible to make every element 0 with only the given queries, let alone by deleting any, so return -1.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Try every subset of queries by removing 0, 1, ..., q, and check if with those, it's possible to make nums a zero array. But that's exponential and not feasible for large inputs.

- **Observation:**  
  For each index i in nums, to zero out nums[i], the sum of the number of queries covering i must be **at least nums[i]**.  
  If we remove too many queries, for some index, the number of remaining queries covering it may become less than nums[i], making it impossible.  
  Therefore, for each element, we track "coverage": how many queries include index i. The minimum coverage across all indices must be at least nums[i].

- **Optimal solution:**  
  Count for each index i, the number of queries covering it (coverage).  
  To maximize the number of queries we can remove, we should remove queries that are not "essential" for achieving the zero array:  
  - Remove queries so that for each i, coverage drops (but never below nums[i]).  
  Since the amount by which we can reduce coverage at i is coverage[i] - nums[i], sum these "redundancies" across all indices:  
  - The maximum total number of queries that can be removed is the **minimum over all indices of (coverage[i] - nums[i])**, summed over the array (but making sure it's actually possible at all).
  
  But unlike the sum, actually the limit is: For each index i, at least nums[i] queries covering i are needed. Any queries above that, we may delete.

  So, for each query, if there's at least one index that needs all of its covering queries, we can't remove this query (otherwise, we'd be under-covered for that index). Thus, _critical queries_ are those that, if removed, would drop coverage below nums[i] for some i in their range.
  
  The minimal set of non-removable queries is thus the set covering all indices up to their demand.

  This can be formalized as a kind of interval set cover.

  A greedy approach applies:  
  - For each index, mark nums[i] queries that cover it as "cannot remove" (ideally, assign from queries that overlap less, or just any strategy that ensures per-index quota is met).
  - The rest are removable.

  **Implementation:**  
  - For each index, maintain a list of queries covering it (or for all indices, keep coverage counters).
  - For all queries, count how many are "needed" for some index.
  - Removing all other queries is possible.

### Corner cases to consider  
- Empty nums  
- nums containing zeroes (should check if queries are needed at all for such indices)  
- nums with large values (are queries sufficient?)  
- queries with overlapping or duplicate intervals  
- Removing all queries possible  
- It is impossible to achieve zero array (i.e., not enough total decrement operations)

### Solution

```python
def maxNumOfRemovableQueries(nums, queries):
    n = len(nums)
    q = len(queries)
    # Step 1: Calculate how many queries cover each index
    coverage = [0] * n
    for l, r in queries:
        coverage[l] += 1
        if r + 1 < n:
            coverage[r + 1] -= 1

    # Apply prefix sum to compute actual coverage at each index
    for i in range(1, n):
        coverage[i] += coverage[i - 1]

    # Step 2: For each index, we need at least nums[i] queries covering it
    for i in range(n):
        if coverage[i] < nums[i]:
            return -1  # Impossible

    # Step 3: For each index, the number of removable queries covering i is coverage[i] - nums[i]
    # Our removable budget is limited by the "tightest" constraint, so let's find, for each query,
    # Is it essential (if any index in its range is covered only exactly nums[i] times)

    # Array to note for each index, how many more removals possible there
    removable = [coverage[i] - nums[i] for i in range(n)]
    # For each query, check if it is essential
    is_essential = [False] * q

    for idx, (l, r) in enumerate(queries):
        # If for any i in [l, r], removable[i] == 0, this query is essential
        if any(removable[i] == 0 for i in range(l, r + 1)):
            is_essential[idx] = True

    # The removable queries are those which are not essential
    return is_essential.count(False)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + q \* L), where L is the average length of a query interval. Calculating prefix sum and removable array is O(n), and for each of the q queries, the worst case is O(n) if the interval spans the whole array. For the sample constraints, this is manageable.
- **Space Complexity:** O(n + q). Storage for coverage and removable for n, plus the is_essential array of size q.

### Potential follow-up questions (as if you’re the interviewer)  

- What if each query can decrement elements by more than 1?
  *Hint: Try expressing the problem as a max-flow or min-coverage with varying contribution per query.*

- Suppose instead of removing queries, you can select any k queries to use (not necessarily the original set)—how would you find the minimal set needed?
  *Hint: This becomes interval covering or greedy selection.*

- How would you solve it if the queries are streaming or come online, and removals must be decided in real time?
  *Hint: This leads to an online segment tree or Fenwick tree problem.*

### Summary
This approach is based on a greedy interval covering pattern, ensuring every index i is covered by at least nums[i] queries after removals. It generalizes well to problems where each index has a "demand" and operations can contribute to fulfilling it.  
The pattern is common in range coverage, interval scheduling, and certain greedy DP problems with coverage constraints.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Prefix Sum(#prefix-sum)

### Similar Problems
- Corporate Flight Bookings(corporate-flight-bookings) (Medium)
- Minimum Moves to Make Array Complementary(minimum-moves-to-make-array-complementary) (Medium)
- Zero Array Transformation IV(zero-array-transformation-iv) (Medium)