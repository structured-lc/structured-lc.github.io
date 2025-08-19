### Leetcode 303 (Easy): Range Sum Query - Immutable [Practice](https://leetcode.com/problems/range-sum-query-immutable)

### Description  
Given an array of integers, design a data structure that can efficiently answer multiple queries for the sum of the elements between two indices left and right (inclusive). Each query gives two indices, and you must quickly return the sum of the array elements between those indices. The array does not change after initialization.

### Examples  

**Example 1:**  
Input: `nums = [-2, 0, 3, -5, 2, -1]`, queries: `sumRange(0, 2)`  
Output: `1`  
*Explanation: The sum from index 0 to 2 is -2 + 0 + 3 = 1.*

**Example 2:**  
Input: `nums = [-2, 0, 3, -5, 2, -1]`, queries: `sumRange(2, 5)`  
Output: `-1`  
*Explanation: 3 + (-5) + 2 + (-1) = -1.*

**Example 3:**  
Input: `nums = [-2, 0, 3, -5, 2, -1]`, queries: `sumRange(0, 5)`  
Output: `-3`  
*Explanation: -2 + 0 + 3 + (-5) + 2 + (-1) = -3.*

### Thought Process (as if you’re the interviewee)  
The straightforward brute-force idea is, for each query, to iterate from left to right and sum all elements in that range. But with many queries, this would be too slow — O(n) per query.

To improve, I can preprocess the array into a **prefix sum array**. The prefix sum at index \(i\) contains the sum of all elements from the start up to (but not including) index \(i\). This allows any range sum from left to right to be calculated as prefixSum[right + 1] - prefixSum[left], which is O(1) time for each query after O(n) preprocessing. This is a common and efficient pattern for range sum queries on immutable arrays.

### Corner cases to consider  
- Empty array (queries should not be called, but handle gracefully if they are).
- left == right (sum of a single element).
- left and right at array bounds (start or end of array).
- All negative/positive or zero values.
- Very large/small values (potential for integer overflow, but not in Python).
- left > right (should not occur, but could clarify behavior).

### Solution

```python
class NumArray:
    def __init__(self, nums):
        # Compute prefix sums: prefix[i] = sum of nums[0] to nums[i-1]
        self.prefix = [0]
        for num in nums:
            self.prefix.append(self.prefix[-1] + num)

    def sumRange(self, left, right):
        # sum in range [left, right] = prefix[right + 1] - prefix[left]
        return self.prefix[right + 1] - self.prefix[left]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Initialization: O(n), where n is the length of the array (building the prefix sum).
  - Query: O(1) per sumRange query (computed with a simple subtraction).
- **Space Complexity:**  
  - O(n) extra space for the prefix sum array (n+1 elements).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array can be changed (updates allowed)?
  *Hint: Consider advanced data structures like Binary Indexed Tree or Segment Tree.*

- How would you handle very large arrays that don’t fit in memory?
  *Hint: Consider external memory algorithms or chunked prefix sums.*

- Can you extend this to a two-dimensional matrix (Range Sum Query 2D)?
  *Hint: Look at 2D prefix sums (integral image method).*

### Summary
This problem is a classic application of the **prefix sum** pattern, enabling efficient O(1) range sum queries after linear-time preprocessing. The approach is common and can be extended to mutable arrays with Segment Trees or Fenwick Trees, and adapted to multidimensional range sum problems. It’s an effective way of trading a bit of extra memory for drastic speedup in query performance for immutable data.

### Tags
Array(#array), Design(#design), Prefix Sum(#prefix-sum)

### Similar Problems
- Range Sum Query 2D - Immutable(range-sum-query-2d-immutable) (Medium)
- Range Sum Query - Mutable(range-sum-query-mutable) (Medium)
- Maximum Size Subarray Sum Equals k(maximum-size-subarray-sum-equals-k) (Medium)
- Sum of Variable Length Subarrays(sum-of-variable-length-subarrays) (Easy)