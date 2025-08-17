### Leetcode 3636 (Hard): Threshold Majority Queries [Practice](https://leetcode.com/problems/threshold-majority-queries)

### Description  
Given an integer array **nums** of length n, and a 2D array **queries** where queries[i] = [lᵢ, rᵢ, thresholdᵢ], process each query for a given subarray nums[lᵢ..rᵢ] (inclusive) as follows:

- Find the element in the subarray that appears **at least thresholdᵢ times**.
- If multiple elements meet the threshold, choose the **smallest** one.
- If no element satisfies the condition, return **-1** for that query.

Return an array of answers, one for each query.

### Examples  

**Example 1:**  
Input:  
nums = [1, 1, 2, 2, 1, 1],  
queries = [[0, 5, 4], [0, 3, 2], [2, 3, 2]]  
Output:  
[1, 1, 2]  
*Explanation:*  
- Query [0,5,4]: Subarray is [1,1,2,2,1,1]. 1 appears 4 times, threshold=4, answer=1.  
- Query [0,3,2]: Subarray is [1,1,2,2]. 1 and 2 appear 2 times; choose smallest, answer=1.  
- Query [2,3,2]: Subarray is [2,2]. 2 appears 2 times, threshold=2, answer=2.

**Example 2:**  
Input:  
nums = [4, 5, 5, 4, 5],  
queries = [[0, 4, 3], [1, 3, 2], [0, 1, 1]]  
Output:  
[5, 4, 4]  
*Explanation:*  
- Query [0,4,3]: [4,5,5,4,5]; 5 appears 3 times (threshold met, answer=5).  
- Query [1,3,2]: [5,5,4]; both 5 and 4 appear ≥2 times, choose 4 (smallest).  
- Query [0,1,1]: [4,5]; both appear once, choose 4.

**Example 3:**  
Input:  
nums = [2, 2, 3, 3, 2, 2],  
queries = [[0, 5, 5], [2, 3, 1], [1, 4, 2]]  
Output:  
[-1, 3, 2]  
*Explanation:*  
- Query [0,5,5]: [2,2,3,3,2,2]; 2 appears 4 times, threshold=5 (not met), answer=-1.  
- Query [2,3,1]: [3,3]; 3 appears 2 times (≥1), answer=3.  
- Query [1,4,2]: [2,3,3,2]; 2 and 3 appear 2 times; choose 2.

### Thought Process (as if you’re the interviewee)  
1. **Brute Force Idea:**  
   - For each query, count the frequency of each number in the subarray.  
   - Scan the frequency map; pick smallest element with at least threshold occurrences.  
   - This takes O(n × m), where n is nums length, m is number of queries. Too slow for large constraints.

2. **Optimized Approach:**  
   - **Preprocessing:** Store positions of each unique number in a map.  
   - For each query, for each unique number, check how many positions fall in [lᵢ, rᵢ] using binary search.  
   - For rare numbers, this is efficient; for intervals with many unique numbers, still slow.

3. **Efficient Approach (MO’s Algorithm):**  
   - Use MO’s/Sqrt Decomposition to process queries in offline, sorted order with incremental window updates (add/remove numbers).  
   - Maintain a frequency map and use a structure (e.g., frequency buckets or heap) to retrieve the minimal number ≥ threshold quickly.  
   - Time: O(n√q) or better, depending on implementation.

**Trade-offs:**  
- MO's algorithm requires all queries upfront and is good for read-only arrays and static queries.  
- Sqrt decomposition/other data structures may be usable depending on frequency of the queries and array mutability.

### Corner cases to consider  
- Queries with threshold greater than subarray length should always return -1.  
- Subarrays with no repeated elements; threshold > 1 → -1.  
- Multiple elements have frequency ≥ threshold; return the smallest.  
- Empty queries or array (shouldn't happen per constraints, but validate).
- Threshold = 1 (just need to pick the smallest element in the subarray).

### Solution

```python
from collections import Counter

def thresholdMajority(nums, queries):
    result = []
    for l, r, threshold in queries:
        freq = Counter(nums[l:r+1])
        candidates = [num for num, count in freq.items() if count >= threshold]
        if candidates:
            result.append(min(candidates))
        else:
            result.append(-1)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × k), where m = number of queries, and k is the average subarray length (r - l + 1 per query). For large n, brute force may be too slow; optimal approaches using index mapping or MO's algorithm can achieve sub-linear per-query time.
- **Space Complexity:** O(k) per query for frequency map; additional space for structures used in optimal approaches. No recursion or stack usage.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you support updates (array mutation) efficiently?
  *Hint: Consider segment trees or advanced BIT/frequency tracking.*

- Can you answer queries online?
  *Hint: Think about balancing preprocessing with query latency. Structures that handle online queries, e.g., persistent segment tree.*

- What if the queries are heavily clustered (small windows, high overlap)?
  *Hint: Use caching, incremental/reusable frequency maps.*

### Summary
This problem demonstrates **range query frequency analysis**, with optimizations possible using **preprocessing (index mapping)** or **MO’s algorithm** (Sqrt decomposition). The pattern of efficiently querying frequency/range is widely applicable in subarray voting, majority, or distinct element queries in large immutable arrays. Similar approaches can be used for other problems involving window statistics, majority, or mode queries.