### Leetcode 523 (Medium): Continuous Subarray Sum [Practice](https://leetcode.com/problems/continuous-subarray-sum)

### Description  
Given an array of integers `nums` and an integer `k`, determine whether there exists a **contiguous subarray** of length at least 2 such that the **sum** of its elements is a **multiple of k**. That means, the sum can be written as n × k for some integer n (including n = 0).  
Return `True` if any such subarray exists, else `False`.

### Examples  

**Example 1:**  
Input: `nums = [23, 2, 4, 6, 7]`, `k = 6`  
Output: `True`  
*Explanation: The subarray [2, 4] sums to 6, which is 1 × 6 (a multiple of k).*

**Example 2:**  
Input: `nums = [23, 2, 6, 4, 7]`, `k = 6`  
Output: `True`  
*Explanation: The entire array sums to 42 (23 + 2 + 6 + 4 + 7), which is 7 × 6.*

**Example 3:**  
Input: `nums = [1, 2, 3]`, `k = 5`  
Output: `False`  
*Explanation: No subarray of size ≥2 sums up to a multiple of 5.*

### Thought Process (as if you’re the interviewee)  
First, I'd clarify what counts as a multiple (including zero) and that subarrays must be of length ≥2.  
The **brute force** approach would check every subarray of size ≥2 and calculate the sum, checking if it's a multiple of k.  
This approach would take O(n²) time, which is too slow for n up to 10,000.

To **optimize**, I'll use the insight that  
- If sum(nums[i:j]) is a multiple of k, then (prefix_sum[j] - prefix_sum[i]) % k == 0.
- Rearranged: prefix_sum[j] % k == prefix_sum[i] % k.

So, I'll iterate through the array and track (prefix sum % k) values along with their earliest indices. If the same remainder occurs with at least one element in between (distance ≥2), a valid subarray exists.

I can use a dictionary to map remainder to the earliest index where it occurred. Start with {0: -1} to handle subarrays from the beginning.

### Corner cases to consider  
- k = 0 (must check sum == 0 subarrays, avoid divide-by-zero)
- Negative values or zeros in nums
- Consecutive elements, e.g. [0,0]
- Array shorter than 2 elements
- Large or small negative k  
- Multiple subarrays could exist

### Solution

```python
def checkSubarraySum(nums, k):
    # Dictionary to store modulus k of prefix sums and their earliest indexes
    remainder_index = {0: -1}  # start with prefix sum 0 at index -1
    prefix_sum = 0
    
    for i, num in enumerate(nums):
        prefix_sum += num
        if k != 0:
            remainder = prefix_sum % k
        else:
            remainder = prefix_sum  # if k==0, we want prefix_sum itself
        
        # Check if this remainder has occurred, and index difference ≥2
        if remainder in remainder_index:
            prev_index = remainder_index[remainder]
            if i - prev_index > 1:
                return True
        else:
            # store the first index we see this remainder
            remainder_index[remainder] = i
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we loop through the array once.
- **Space Complexity:** O(min(n, k)), as at most k different remainders are stored in the map (if k ≠ 0) or O(n) if k = 0 or small.

### Potential follow-up questions (as if you’re the interviewer)  

- What if negative numbers are allowed in nums?  
  *Hint: Does the approach depend on values or only on the sum's property?*

- How would you handle very large k or very small/negative k?  
  *Hint: Try using absolute value, or reduce all modulus operations to [0, abs(k))* range.*

- Can you output all starting and ending indices of such subarrays?  
  *Hint: You may need to store a list of indices for each remainder.*

### Summary
This problem uses the **Prefix Sum with Hash Map** pattern. By recognizing that equal prefix sum remainders modulo k indicate subarrays whose sum is a multiple of k, we reduce the search from O(n²) to O(n). This pattern appears in several subarray sum problems, especially with modular arithmetic or checks for subarrays with specific properties.