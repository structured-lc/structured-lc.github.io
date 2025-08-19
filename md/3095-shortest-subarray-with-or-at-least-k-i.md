### Leetcode 3095 (Easy): Shortest Subarray With OR at Least K I [Practice](https://leetcode.com/problems/shortest-subarray-with-or-at-least-k-i)

### Description  
Given an array of non-negative integers `nums` and an integer `k`, find the length of the shortest **non-empty** subarray whose bitwise **OR** is **at least** `k`.  
A subarray is "special" if OR of its elements is ≥ k. If there’s no such subarray, return -1.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3]`, `k = 2`  
Output: `1`  
Explanation: `[3]` has OR = 3 ≥ 2, so shortest length is 1.

**Example 2:**  
Input: `nums = [2,1,8]`, `k = 10`  
Output: `3`  
Explanation: `[2,1,8]` has OR = 2 | 1 | 8 = 11 ≥ 10, and no shorter subarray works.

**Example 3:**  
Input: `nums = [1,2]`, `k = 0`  
Output: `1`  
Explanation: Any element alone works since 0 ≤ any value; `[1]` or `[2]` is a valid subarray.

### Thought Process (as if you’re the interviewee)  
- The brute-force way is to try every possible subarray, compute the OR for each, and track the shortest length where OR ≥ k.  
  - This is O(n²): for each start index, extend to every possible end index.  
- However, since `nums[i]` ≤ 50 and `k` < 64, the range of possible OR values is limited.
- We can optimize by:
  - For every possible starting index, keep a running OR as we expand the subarray.
  - As soon as current OR ≥ k, update the shortest length.
  - Once OR covers (i.e. reaches max bit value possible), breaking early saves time.
- Given the constraints (max length 50), this is efficient enough.

### Corner cases to consider  
- Array of length 1 (must check if that element alone is enough).
- All zeros, k > 0 (no subarray possible: should return -1).
- All elements < k, but the OR of all elements could be ≥ k.
- k = 0 (any non-empty subarray is valid).
- Duplicates or all elements the same.

### Solution

```python
def shortest_subarray_with_or_at_least_k(nums, k):
    n = len(nums)
    min_length = float('inf')
    
    for i in range(n):
        curr_or = 0
        for j in range(i, n):
            curr_or |= nums[j]  # Update OR from i to j
            if curr_or >= k:
                min_length = min(min_length, j - i + 1)
                # No need to continue if we found the shortest possible subarray starting at i
                if min_length == 1:
                    return 1
                break  # Can break since further extension won't yield a shorter subarray
                
    return min_length if min_length != float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²). Outer loop runs n times, inner loop up to n times per start; each inner loop step is fast due to bitwise OR.
- **Space Complexity:** O(1), using only a few variables for tracking the result and current OR.

### Potential follow-up questions (as if you’re the interviewer)  

- What if nums had up to 10⁵ elements?
  *Hint: Could you use a sliding window or another approach to avoid O(n²)?*

- What if the operation was AND instead of OR?
  *Hint: With AND, subarrays can only get smaller, not larger, with each step.*

- What if you needed to find all such shortest subarrays, not just their length?
  *Hint: Store start/end indices when you find a matching subarray.*

### Summary
This problem applies the "expanding sliding window/brute-force with early stopping" pattern, exploiting bounded input constraints. It illustrates a common approach for "shortest subarray with condition" problems, especially when bitwise operations or monotonic properties are involved, and can be adapted where the operation (e.g. AND or XOR) preserves useful structure.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation), Sliding Window(#sliding-window)

### Similar Problems
- Minimum Size Subarray Sum(minimum-size-subarray-sum) (Medium)
- Shortest Subarray with Sum at Least K(shortest-subarray-with-sum-at-least-k) (Hard)