### Leetcode 1477 (Medium): Find Two Non-overlapping Sub-arrays Each With Target Sum [Practice](https://leetcode.com/problems/find-two-non-overlapping-sub-arrays-each-with-target-sum)

### Description  
Given an array of integers and a target sum, find two non-overlapping subarrays each summing to target. Return the minimum total length of these two subarrays, or -1 if not possible.

### Examples  
**Example 1:**  
Input: `arr = [3,2,2,4,3], target = 3`  
Output: `2`  
*Explanation: [3] at index 0, [3] at index 4; total length = 1 + 1 = 2*

**Example 2:**  
Input: `arr = [7,3,4,7], target = 7`  
Output: `2`  
*Explanation:  at index 0,  at index 3; total length = 1 + 1 = 2*

**Example 3:**  
Input: `arr = [4,3,2,6,2,3,4], target = 6`  
Output: `-1`  
*Explanation: Only one subarray with sum 6 exists.*

### Thought Process (as if you’re the interviewee)  
The naive approach: try every possible subarray, and pair any two non-overlapping subarrays with target sum — O(n³), not feasible.

To optimize, use prefix sums to locate all subarrays matching target sum. For each prefix, keep track of the best (shortest) subarray that ends before current position using an auxiliary array. When finding a candidate subarray ending at j with sum = target, see if any prior subarray that ends before i forms a valid non-overlapping pair. Track minimum total length.

Use a hashmap (`sum2idx`) to help for quick sum lookups.

### Corner cases to consider  
- Multiple overlapping subarrays — must not overlap
- Only one valid subarray — answer is -1
- All numbers same, target possible
- Longest array but only short subarrays

### Solution

```python
def minSumOfLengths(arr, target):
    import sys
    n = len(arr)
    INF = sys.maxsize
    # left[i]: min length of sum=target subarray ending at or before i
    left = [INF]*n
    curr_sum = 0
    sum2idx = {0: -1}
    min_len = INF
    res = INF
    # Forward pass for left min lens
    for i in range(n):
        curr_sum += arr[i]
        if (curr_sum - target) in sum2idx:
            prev = sum2idx[curr_sum - target]
            seg_len = i - prev
            min_len = min(min_len, seg_len)
            left[i] = min_len
        else:
            left[i] = left[i-1] if i>0 else INF
        sum2idx[curr_sum] = i
    # Backward pass for right min lens, combine
    curr_sum = 0
    sum2idx = {0: n}
    min_len = INF
    right = [INF]*n
    for i in range(n-1,-1,-1):
        curr_sum += arr[i]
        if (curr_sum - target) in sum2idx:
            prev = sum2idx[curr_sum - target]
            seg_len = prev - i
            min_len = min(min_len, seg_len)
            right[i] = min_len
        else:
            right[i] = right[i+1] if i+1<n else INF
        sum2idx[curr_sum] = i
    # Find min sum of non-overlapping
    ans = INF
    for i in range(n-1):
        if left[i]!=INF and right[i+1]!=INF:
            ans = min(ans, left[i] + right[i+1])
    return -1 if ans == INF else ans
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), two passes plus prefix processing
- **Space Complexity:** O(n), auxiliary arrays

### Potential follow-up questions (as if you’re the interviewer)  
- What if you needed three (or k) non-overlapping subarrays?  
  *Hint: Extend the DP arrays, track best sum for more partitions.*
- Could you reconstruct the actual subarrays?  
  *Hint: Store indices during DP.*
- How to do it in-place (without extra arrays)?  
  *Hint: Not possible if you need to keep bests for both directions.*

### Summary
This problem is a good demonstration of prefix sum/hashmaps + dynamic programming (tracking min subarray lengths) for optimal partitioning and subarray analysis. Similar ideas appear in "max sum of k non-overlapping subarrays" and interval-dp interview questions.

### Tags
Array(#array), Hash Table(#hash-table), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming), Sliding Window(#sliding-window)

### Similar Problems
- Find Subarrays With Equal Sum(find-subarrays-with-equal-sum) (Easy)