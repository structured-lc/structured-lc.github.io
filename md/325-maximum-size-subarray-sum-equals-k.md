### Leetcode 325 (Medium): Maximum Size Subarray Sum Equals k [Practice](https://leetcode.com/problems/maximum-size-subarray-sum-equals-k)

### Description  
Given an array of integers `nums` (which may include positive, negative, or zero values) and an integer `k`, the task is to find the length of the longest contiguous subarray whose sum equals exactly `k`. If no such subarray is found, return 0.  
You should only consider subarrays—i.e., consecutive elements of the array.

### Examples  

**Example 1:**  
Input: `nums = [1, -1, 5, -2, 3]`, `k = 3`  
Output: `4`  
*Explanation: The subarray `[1, -1, 5, -2]` sums to 3. Its length is 4, which is the maximum possible.*

**Example 2:**  
Input: `nums = [-2, -1, 2, 1]`, `k = 1`  
Output: `2`  
*Explanation: The subarray `[-1, 2]` sums to 1, as does the subarray `[2, -1]`.*

**Example 3:**  
Input: `nums = [1, 2, 3]`, `k = 6`  
Output: `3`  
*Explanation: The entire array `[1, 2, 3]` sums to 6, so the result is the array's length, 3.*

### Thought Process (as if you’re the interviewee)  
First, I’d start by noting that the brute-force approach here is to check all possible subarrays:  
- For each starting index, for every ending index ≥ start, compute the sum and check if it equals k.
- This has O(n²) time complexity, which is impractical for larger arrays.

To optimize, I’d look for a pattern or use prefix sums.  
- For subarrays, the sum from index `i` to `j` can be calculated as prefix_sum[j] - prefix_sum[i-1].
- I want to know if there’s a previous prefix sum such that prefix_sum[j] - prefix_sum[i-1] = k ⇒ prefix_sum[i-1] = prefix_sum[j] - k.
- If I keep a hashmap that records the *first index* where each prefix sum occurs, as I walk through the array, whenever I see (current_sum - k) in the hashmap at index idx, the subarray (idx, j] sums to k.
- I track the maximum such subarray length by checking (j - idx).

This allows each element to be processed in O(1) time, resulting in O(n) overall.

### Corner cases to consider  
- Empty array (`[]`)
- No subarray sums to `k`
- All elements are equal to `k`
- Negative numbers leading to the same prefix sum at multiple points
- k is zero
- Subarray at the beginning or end
- Array with a single element equal/not equal to `k`
- Multiple possible subarrays with sum=k, prioritize the *maximum* length

### Solution

```python
def maxSubArrayLen(nums, k):
    # Hashmap to record first occurrence of each prefix sum: sum_value -> index
    sums = {0: -1}  # sum 0 at index -1 (before array starts)
    curr_sum = 0
    max_len = 0
    
    for i, num in enumerate(nums):
        curr_sum += num
        
        # If current prefix sum - k has been seen before,
        # subarray between prev_idx+1 and i sums to k
        if (curr_sum - k) in sums:
            length = i - sums[curr_sum - k]
            if length > max_len:
                max_len = length
        
        # Only record the first occurrence of this prefix sum
        if curr_sum not in sums:
            sums[curr_sum] = i
            
    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - Each element is visited once, and all hashmap operations are O(1).
- **Space Complexity:** O(n)
  - In the worst case, each prefix sum is unique, and we store each in the hashmap.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return the subarray itself, not just its length?  
  *Hint: Store the starting index(s) using an extra variable or map, reconstruct at the end.*

- How would the solution change if the array contained only positive numbers?  
  *Hint: In that case, you could use a sliding window approach as subarrays can only increase in sum as you expand the window.*

- Could you do it in constant space if all numbers are positive?  
  *Hint: Yes, using the sliding window technique, because the prefix sum will always increase.*

### Summary
This is a classic **prefix sum + hashmap** problem. The key insight is recognizing that we can identify subarrays with sum=k by tracking previous sums and their earliest occurrences. The coding pattern is very common—it's similar to the two-sum pattern or longest subarray with sum <= k. This is also widely applicable to problems involving contiguous range queries, especially when the target can be formed by the difference between two prefix sums.


### Flashcard
Use a hash map to store earliest prefix sums; for each index, check if (current sum - k) was seen before to find the longest subarray with sum k in O(n) time.

### Tags
Array(#array), Hash Table(#hash-table), Prefix Sum(#prefix-sum)

### Similar Problems
- Minimum Size Subarray Sum(minimum-size-subarray-sum) (Medium)
- Range Sum Query - Immutable(range-sum-query-immutable) (Easy)
- Contiguous Array(contiguous-array) (Medium)
- Subarray Product Less Than K(subarray-product-less-than-k) (Medium)
- Maximum Beauty of an Array After Applying Operation(maximum-beauty-of-an-array-after-applying-operation) (Medium)
- Shortest Subarray With OR at Least K II(shortest-subarray-with-or-at-least-k-ii) (Medium)