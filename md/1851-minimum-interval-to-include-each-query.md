### Leetcode 1851 (Hard): Minimum Interval to Include Each Query [Practice](https://leetcode.com/problems/minimum-interval-to-include-each-query)

### Description  
We are given a list of intervals, each represented as [left, right], and a list of queries. For each query, we need to find the size of the smallest interval that contains that query value. The size is calculated as (right - left + 1). If no interval contains the query, return -1 for that query. The result should be an array of answers in the order of the original queries.

### Examples  

**Example 1:**  
Input: `intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]`  
Output: `[3,3,1,4]`  
*Explanation:*
- Query 2: Both [1,4] and [2,4] include 2, their sizes are 4, 3 respectively. The smallest is 3.
- Query 3: Both [1,4] and [2,4], and [3,6] include 3; their sizes are 4, 3, and 4. The smallest is 3.
- Query 4: All intervals include 4 ([1,4],[2,4],[3,6],[4,4]), sizes are 4, 3, 4, and 1; smallest is 1.
- Query 5: Only [3,6] includes 5, size is 4.

**Example 2:**  
Input: `intervals = [[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]`  
Output: `[2,-1,4,6]`  
*Explanation:*
- Query 2: Intervals [2,3],[2,5],[1,8] include 2, sizes are 2,4,8. Smallest is 2.
- Query 19: No interval contains 19, so -1.
- Query 5: Intervals [2,5],[1,8] include 5, sizes are 4 and 8. Smallest is 4.
- Query 22: Only [20,25] contains 22, size is 6.

**Example 3:**  
Input: `intervals = [[3,10],[5,8]], queries = [4,5,8,9]`  
Output: `[8,4,4,8]`  
*Explanation:*
- Query 4: Only [3,10], size 8.
- Query 5: Both [3,10],[5,8], sizes 8 and 4. Smallest is 4.
- Query 8: Both [3,10],[5,8], sizes 8 and 4. Smallest is 4.
- Query 9: Only [3,10], size 8.

### Thought Process (as if you’re the interviewee)  
First, brute-force would be: for each query, check all intervals and pick the covering one with the smallest length. This is too slow: for up to 10⁵ queries and 10⁵ intervals, O(q * n) is not feasible.

Instead, optimize with sorting and an efficient online interval search:
- Sort intervals by their left endpoint.
- Sort queries, but keep track of original indices.
- For each query (in increasing order), use a min-heap (priority queue) of active intervals that can cover the query:
    - As you move through queries, insert intervals where left ≤ query, and maintain in the heap by their size (right - left + 1).
    - Remove intervals from the heap whose right < query.
    - The top of the heap, if any, is the smallest interval covering the current query.

This uses a sweep-line/min-heap pattern, efficiently maintaining valid intervals for each query.

### Corner cases to consider  
- Intervals and queries are empty (should return empty result).
- Intervals that do not overlap any query.
- Queries with no covering interval (should return -1).
- Intervals that just touch the query at a single point (left or right endpoint).
- Multiple intervals of the same size containing the query.
- Intervals or queries with maximum possible bounds (to check integer overflow or performance).

### Solution

```python
import heapq

def minInterval(intervals, queries):
    # Annotate queries with their original indices
    sorted_queries = sorted([(q, i) for i, q in enumerate(queries)])
    # Sort intervals by left endpoint
    intervals.sort()
    result = [-1] * len(queries)
    min_heap = []
    idx = 0
    n = len(intervals)
    
    # For each query, add all intervals that start before or at the query
    for q_val, q_idx in sorted_queries:
        while idx < n and intervals[idx][0] <= q_val:
            left, right = intervals[idx]
            # Heap by interval size, store right endpoint
            heapq.heappush(min_heap, (right - left + 1, right, left))
            idx += 1
        # Remove heap intervals whose right endpoint is less than the query
        while min_heap and min_heap[0][1] < q_val:
            heapq.heappop(min_heap)
        # Top of heap has the minimal interval covering query
        if min_heap:
            result[q_idx] = min_heap[0][0]
        # else, result remains -1

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log n + q log q + (n + q) log n)  
  - Sorting intervals: O(n log n), sorting queries: O(q log q)
  - Each interval is pushed once (O(n log n)), each query checks/cleans heap (O(q log n))

- **Space Complexity:**  
  O(n + q)  
  - For the heap (stores at most n intervals), and result list of length q.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if queries arrive online (as a stream)?
  *Hint: Cannot batch-sort queries; may need self-balancing search tree or segment tree.*

- What if we want to return the actual interval, not just its size?
  *Hint: Store interval's indices in the heap, not just size.*

- Can we process multiple queries that fall within the same interval more efficiently?
  *Hint: Use range queries or bucket intervals for batch processing.*

### Summary
This problem is a classic **sweep line + min-heap** interval covering problem, where we leverage sorting, a priority queue, and processing events in order to efficiently track relevant covering intervals per query. This coding pattern is common for interval scheduling, minimum range covering, and offline query answering in problems with large search space. It can be generalized to many other scenarios involving ranges and point queries.