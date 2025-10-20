### Leetcode 1906 (Medium): Minimum Absolute Difference Queries [Practice](https://leetcode.com/problems/minimum-absolute-difference-queries)

### Description  
Given an integer array **nums** and multiple queries **queries**, each in form [l, r], return an array where each entry is the *minimum absolute difference* between any two different elements in the subarray nums[l..r].  
If all elements in the subarray are equal, return -1 for that query.

- For each query, only consider differences between different elements, i.e., ignore |x-x| = 0.
- A brute force approach checking each pair would be too slow for large input.

### Examples  

**Example 1:**  
Input: `nums = [1,3,4,8], queries = [[0,1],[1,2],[2,3]]`  
Output: `[2,1,4]`  
*Explanation:*
- Query [0,1] → subarray [1,3]; min |1-3| = 2.
- Query [1,2] → subarray [3,4]; min |3-4| = 1.
- Query [2,3] → subarray [4,8]; min |4-8| = 4.

**Example 2:**  
Input: `nums = [4,5,2,2,7,10], queries = [[2,3],[0,2],[0,5],[3,5]]`  
Output: `[-1,1,1,3]`  
*Explanation:*
- [2,3]: [2,2]. All equal → -1.
- [0,2]: [4,5,2]. Possible |4-5|=1, |4-2|=2, |5-2|=3. Min=1.
- [0,5]: [4,5,2,2,7,10]. Closest neighbors after sorting: 2,2,4,5,7,10 → min difference 0 (but identical, must skip), next best: |2-4|=2, |4-5|=1, so answer is 1.
- [3,5]: [2,7,10]. Possible |2-7|=5, |2-10|=8, |7-10|=3. Min=3.

**Example 3:**  
Input: `nums = [1,1,1,1], queries = [[0,3],[1,2]]`  
Output: `[-1,-1]`  
*Explanation:*
- All elements in query ranges are identical, so answer is -1.

### Thought Process (as if you’re the interviewee)  
- **Brute force:** For each query, extract the subarray and check all unique pairs (i,j), compute |nums[i] - nums[j]| if nums[i] ≠ nums[j], and take the minimum. However, this is O(q × n²) in the worst case, which will TLE for large input.
- **Optimization:**  
  - Since elements are in the fixed range [1,100] (problem guarantee), use a frequency array/prefix count for each possible value to quickly know what numbers occur in the queried range.
  - For each query, collect all the unique numbers present in nums[l..r]. (Use prefix counting for [1,100])
  - Sort the present values, compute adjacent differences (since those will be minimum since the numbers are sorted).
  - If there is only one unique value, answer is -1.
  - Else, the minimum difference of consecutive present values is the answer.
- **Trade-offs:**  
  - This approach is much faster, O(q × 100) since for each query we only process at most 100 numbers. Space use is minimal.

### Corner cases to consider  
- Query covers all same elements (e.g. [2,2,2]).
- Query size 1 (not enough to compare, so -1).
- Minimum difference is not between first/last, but in middle (so always sort the unique numbers).
- Large array, large number of queries (time limits).
- Negative numbers not possible (since nums ∈ [1,100]).

### Solution

```python
def minDifference(nums, queries):
    # Precompute prefix counts for each value in [1,100]
    n = len(nums)
    MAX_V = 100
    prefix = [[0] * (n + 1) for _ in range(MAX_V + 1)]
    
    for v in range(1, MAX_V + 1):
        for i in range(n):
            prefix[v][i+1] = prefix[v][i] + (1 if nums[i] == v else 0)

    ans = []
    for l, r in queries:
        present = []
        for v in range(1, MAX_V + 1):
            if prefix[v][r+1] - prefix[v][l] > 0:
                present.append(v)
        if len(present) < 2:
            ans.append(-1)
        else:
            min_diff = float('inf')
            for i in range(1, len(present)):
                min_diff = min(min_diff, present[i] - present[i-1])
            ans.append(min_diff)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(q × 100 + 100 × n)
  - Building prefix counts: O(100 × n)
  - For each query: up to 100 checks for present values (constant factor as 100 is fixed)
  - Sorting not needed since candidates are iterated in order 1..100.
- **Space Complexity:** O(100 × n) for prefix counts, plus O(1) extra per query.

### Potential follow-up questions (as if you’re the interviewer)  

- What if nums can be much larger (e.g., up to 10⁹)?  
  *Hint: Cannot use fixed-size prefix; need different structure, maybe segment tree with value compression.*

- How do you handle updates to nums between queries?  
  *Hint: Prefix array isn't sufficient. Consider segment tree structure.*

- Can this handle queries with high-frequency updates?  
  *Hint: Consider alternatives like Mo’s algorithm or advanced segment trees.*

### Summary
This problem uses the prefix sum/count pattern, boosted by a small value domain ([1,100]), enabling efficient per-query access to value frequency. The idea is also related to range queries with small value domains — a pattern appearing in frequency-counting, histogram range queries, and some advanced segment trees.


### Flashcard
For each query, use a frequency array to collect all unique values in the range, then find the minimum absolute difference between consecutive values.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
