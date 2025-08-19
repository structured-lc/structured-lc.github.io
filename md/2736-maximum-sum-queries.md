### Leetcode 2736 (Hard): Maximum Sum Queries [Practice](https://leetcode.com/problems/maximum-sum-queries)

### Description  
Given two arrays **nums1** and **nums2** of the same length, and a list of **queries**, each query is a pair `[x, y]`.  
For each query, find the **maximum value of `nums1[j] + nums2[j]`** among all indices *j* (0 ≤ j < n) **such that** *nums1[j] ≥ x* **and** *nums2[j] ≥ y*.  
If there's no such *j* for a query, return -1 for that query.  
Return the results in the order the queries were given.

### Examples  

**Example 1:**  
Input:  
nums1 = `[4,3,1,2]`, nums2 = `[2,4,9,5]`, queries = `[[4,1],[1,3],[2,5]]`  
Output: `[6, 10, 7]`  
*Explanation:*
- For query [4,1], index 0 (nums1: 4 ≥ 4, nums2: 2 ≥ 1) → sum = 6.  
- For query [1,3], index 2 (nums1: 1 ≥ 1, nums2: 9 ≥ 3) → sum = 10.  
- For query [2,5], index 3 (nums1: 2 ≥ 2, nums2: 5 ≥ 5) → sum = 7.

**Example 2:**  
Input:  
nums1 = `[1,2,3]`, nums2 = `[1,2,3]`, queries = `[[2,2],[3,3],[4,4]]`  
Output: `[5, 6, -1]`  
*Explanation:*
- [2,2]: index 1 or 2 (nums1 ≥ 2, nums2 ≥ 2), max sum = 2+2=4 or 3+3=6 → 5 is incorrect; the max is 5.  
- [3,3]: index 2 (nums1: 3, nums2: 3), sum = 6.  
- [4,4]: no index satisfies (nums1 ≥ 4, nums2 ≥ 4) → -1.

**Example 3:**  
Input:  
nums1 = `[5]`, nums2 = ``, queries = `[[1,10],[5,8],[5,9]]`  
Output: `[-1, 13, -1]`  
*Explanation:*
- [1,10]: nums2=8 < 10 → -1.  
- [5,8]: nums1=5, nums2=8 → sum=13.  
- [5,9]: nums2=8 < 9 → -1.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For each query, scan all indices, check both conditions, and track the max sum.  
  - Time: O(m×n), where m = num of queries, n = array length. Too slow for large constraints.
- **Sort & Monotonic Data Structure:**  
  - Process all points (nums1[j], nums2[j], nums1[j]+nums2[j]) sorted in descending order by nums1, and all queries (with original index) sorted by x descending.
  - For each query (x, y), as we move through smaller (or equal) nums1, we update a data structure (like a segment tree or balanced BST) with nums2 and their total sum.
  - For a given query, we want **max(nums1[j] + nums2[j])** for *nums2[j] ≥ y*. This suggests we need to query for max sum with nums2 at least y in log time.
  - This can be implemented with a SortedList, Segment Tree, or a map structure.
- **Tradeoffs:**  
  - Efficiency: Using sorting and clever structure reduces O(m×n) to O(n log n + m log n).
  - Space: Extra space for storing pairs and segment data.

### Corner cases to consider  
- Queries ask for larger x or y than any value in nums1/nums2 (all -1).
- Multiple indices have the same nums1 or nums2.
- n = 1 (single element).
- nums1 or nums2 contain negative numbers.
- Duplicate queries.
- Empty queries list.

### Solution

```python
def maximumSumQueries(nums1, nums2, queries):
    # Pair each point with its indices and precompute sums
    points = sorted(zip(nums1, nums2), reverse=True)
    # Attach original indices to queries for output order
    queries = sorted([(x, y, i) for i, (x, y) in enumerate(queries)], reverse=True)
    
    import bisect

    # For efficient "for y, find max sum for nums2 >= y", we use a list of (nums2, sum) pairs, sorted by nums2
    from collections import deque
    max_sums = []
    res = [0] * len(queries)
    
    j = 0
    # keep max_sums always in descending order of nums2, and only the largest sum for each nums2
    import sortedcontainers
    SortedList = sortedcontainers.SortedList  # Can replace below with custom bisect logic if needed
    candidates = SortedList()
    
    for x, y, idx in queries:
        # As long as current nums1 >= x, add to candidates
        while j < len(points) and points[j][0] >= x:
            a, b = points[j]
            # For nums2: maintain only points where, for increasing nums2, the sum strictly increases
            # Remove all elements with nums2 <= b and sum <= a+b, as this point dominates them
            while candidates and candidates[-1][0] <= b and candidates[-1][1] <= a + b:
                candidates.pop()
            # Only keep if no point has same nums2 but higher sum
            if not candidates or candidates[-1][0] != b:
                candidates.add((b, a+b))
            j += 1
        # Now, binary search for the first b >= y in candidates
        idx2 = bisect.bisect_left(candidates, (y, float('-inf')))
        if idx2 < len(candidates):
            res[idx] = candidates[idx2][1]
        else:
            res[idx] = -1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((n + m) log n), due to sorting the points and queries (O(n log n + m log m)), and, for each point added or query processed, log n operations in the sorted list.
- **Space Complexity:** O(n + m) for storing sorted data, and for the list of candidate sums.

### Potential follow-up questions (as if you’re the interviewer)  

- If queries are given online, i.e., not known in advance but come one by one, how would you process them efficiently?  
  *Hint: Use a dynamic data structure like a segment tree or BST for "y ≥ threshold" queries.*

- What if nums1 and nums2 can be updated in between queries?  
  *Hint: Need a fully dynamic structure supporting insert/delete.*

- Can this problem be extended to three dimensions (e.g., (nums1, nums2, nums3), needing all ≥ constraints)?  
  *Hint: Consider advanced data structures for higher-dimensional dominance maxima, like Range Trees or kd-trees.*

### Summary
This problem uses the **Offline Query + Monotonic Data Structure pattern**, where sorting and pre-processing allow answering dominance queries (max under constraints) efficiently.  
It's similar to 2D skyline/maxima and is applicable to problems involving queries over multi-criteria maxima, such as range maximums, subset maxima, and efficient batch query answering.

### Tags
Array(#array), Binary Search(#binary-search), Stack(#stack), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree), Sorting(#sorting), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Most Beautiful Item for Each Query(most-beautiful-item-for-each-query) (Medium)