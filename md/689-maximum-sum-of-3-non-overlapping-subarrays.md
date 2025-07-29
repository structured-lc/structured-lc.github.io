### Leetcode 689 (Hard): Maximum Sum of 3 Non-Overlapping Subarrays [Practice](https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays)

### Description  
Given an integer array `nums` and an integer `k`, you are to find three **non-overlapping** subarrays of length `k` with the maximum total sum. Return the starting indices of these subarrays as a list of 3 integers in ascending order.  
If multiple answers exist, return the **lexicographically smallest** one (i.e., with the smallest first index, then second, etc.).

### Examples  

**Example 1:**  
Input: `nums = [1,2,1,2,6,7,5,1]`, `k = 2`  
Output: `[0,3,5]`  
Explanation:  
- Subarrays: [1,2] (indices 0–1), [2,6] (indices 3–4), [7,5] (indices 5–6); their sums are 3, 8, and 12.  
- Total sum: 3+8+12 = 23, which is the largest possible.
- Other options like [2,1] at index 1 would lead to a lexicographically larger answer.

**Example 2:**  
Input: `nums = [4,5,10,6,11,17,4,11,1,3]`, `k = 2`  
Output: `[2,4,7]`  
Explanation:  
- [10,6] (indices 2–3), [11,17] (indices 4–5), [11,1] (indices 7–8)
- Sums: 16, 28, 12; total = 56, which is maximal.

**Example 3:**  
Input: `nums = [1,2,1,2,1,2,1,2,1]`, `k = 2`  
Output: `[0,2,4]`  
Explanation:  
- Pick the very first three non-overlapping subarrays.
- All subarrays of length k sum to 3, but `[0,2,4]` is lexicographically smallest.

### Thought Process (as if you’re the interviewee)  
First, brute force would involve generating every triplet of non-overlapping subarrays of length `k` and finding their total sum. But this approach is prohibitively slow for large arrays, as it would be O(n³).

To optimize:
- Build an array of all the possible subarrays of length `k` (using prefix sums).
- For each possible middle subarray, try to find the best (max sum) left subarray before it and right subarray after it.
- Precompute, for each possible position, the index of the subarray with the maximal sum on the left and on the right (can be done in linear time).

Trade-offs:
- This approach leverages precomputation and allows you to pick maximal subarrays efficiently using O(n) time and space.
- It also ensures lexicographically minimal result because we always update ties in favor of earlier indices.

### Corner cases to consider  
- Array too short for 3 subarrays (i.e., n < 3×k) → should not occur by constraints, but handle defensively.
- All numbers are negative.
- Multiple optimal answers with same total; must return lexicographically smallest.
- k = 1 (single element subarrays).
- All values the same.

### Solution

```python
def maxSumOfThreeSubarrays(nums, k):
    n = len(nums)
    # 1. Build window_sums: window_sums[i] = sum of nums[i:i+k]
    window_sums = []
    window_sum = sum(nums[:k])
    window_sums.append(window_sum)
    for i in range(1, n - k + 1):
        window_sum += nums[i + k - 1] - nums[i - 1]
        window_sums.append(window_sum)
    m = len(window_sums)
    
    # 2. For each position, store best left index so far
    left = [0] * m
    max_idx = 0
    for i in range(m):
        if window_sums[i] > window_sums[max_idx]:
            max_idx = i
        left[i] = max_idx

    # 3. For each position, store best right index so far
    right = [0] * m
    max_idx = m - 1
    for i in reversed(range(m)):
        if window_sums[i] >= window_sums[max_idx]:
            max_idx = i
        right[i] = max_idx
        
    # 4. For every middle interval, find best left & right
    max_total = 0
    answer = [-1, -1, -1]
    for mid in range(k, m - k):
        l = left[mid - k]
        r = right[mid + k]
        total = window_sums[l] + window_sums[mid] + window_sums[r]
        if total > max_total:
            max_total = total
            answer = [l, mid, r]
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  - Calculating window sums is O(n).
  - Populating left and right bests is O(n).
  - Main loop is O(n).
- **Space Complexity:** O(n) for window_sums, left, and right arrays—storing per-index data.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of subarrays needed is variable (not always 3)?  
  *Hint: Think about how you would generalize the solution for T non-overlapping intervals.*

- Can you return the actual subarrays, not just their indices?  
  *Hint: Use the indices to slice the array accordingly after finding the answer.*

- What if subarrays can be of different lengths?  
  *Hint: The current "window sums" precomputation wouldn't work; more advanced DP needed.*

### Summary
This pattern is a classic optimization with *sliding window sum* and *precomputed prefix maxima/minima*, often seen in "maximum k subarray sum" problems.  
Precomputing the "best candidate so far on the left/right" is a useful technique for problems needing lexicographically minimal answers and globally optimal triplets/quads. Variations appear in maximum subarrays, range query, and certain scheduling/interval selection problems.