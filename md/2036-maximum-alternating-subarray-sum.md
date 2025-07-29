### Leetcode 2036 (Medium): Maximum Alternating Subarray Sum [Practice](https://leetcode.com/problems/maximum-alternating-subarray-sum)

### Description  
Given an integer array nums, the **alternating subarray sum** of a subarray [i, j] (i ≤ j) is defined as:  
nums[i] - nums[i+1] + nums[i+2] - nums[i+3] + ... (alternating + and - for subsequent elements).  
Find the maximum possible alternating subarray sum for any subarray of nums.  
The subarray must have at least one element.  

### Examples  

**Example 1:**  
Input: `nums = [3,-1,1,2]`  
Output: `5`  
*Explanation:  
Pick subarray [3,-1,1,2] (indices 0 to 3): 3 - (-1) + 1 - 2 = 3 + 1 + 1 - 2 = 3 + 1 + 1 - 2 = 5.*

**Example 2:**  
Input: `nums = [2,2,2,2]`  
Output: `2`  
*Explanation:  
Pick any subarray of length 1, e.g., [2]. 2 is the maximum possible sum since alternation subtracts the next element.*

**Example 3:**  
Input: `nums = [1,-2,3,-4,5,-6]`  
Output: `9`  
*Explanation:  
Pick subarray [3,-4,5,-6] (indices 2–5): 3 - (-4) + 5 - (-6) = 3 + 4 + 5 + 6 = 18.  
But check single/other subarrays:  
[1, -2, 3, -4, 5, -6]: 1 - (-2) + 3 - (-4) + 5 - (-6) = 1 + 2 + 3 + 4 + 5 + 6 = 21.  
But we must alternate, not always sum. The example shows the pattern you must compute properly—always alternate +, -, +, -.*

### Thought Process (as if you’re the interviewee)  
- First, a **brute-force approach** would be to consider every subarray, compute its alternating sum, and return the maximum. But this is O(n²), which is too slow for large n.
- The core insight is to view this as a **variation of maximum subarray sum**, except each term alternates its sign.
- For each position, keep track of two states:
  - The largest alternating sum ending at i with a `+` sign (start or an even index in the subarray).
  - The largest alternating sum ending at i with a `-` sign (odd index in the subarray).
- Use **dynamic programming**:  
  - Let even be max-sum ending at i with + sign.  
  - Let odd be max-sum ending at i with - sign.
- On each iteration, we either start new subarray or extend the previous one by alternately adding/subtracting.  
- This can be done in O(n) time and O(1) space by rolling the DP values as we scan the array.

### Corner cases to consider  
- Single element array (should just return that element, as there are no alternations).
- Arrays with all negative numbers.
- Arrays where the maximum comes from a middle subarray.
- Arrays with exact alternation: [1, -1, 1, -1].
- Very large/small numbers (overflow/underflow if careless).
- Subarrays of length one.

### Solution

```python
def maximumAlternatingSubarraySum(nums):
    # Initialize DP states:
    # even = max alternating sum ending at this idx where idx is even-length from subarray start (so start with '+')
    # odd = max alternating sum ending at this idx where idx is odd-length from subarray start (so starts with '-')
    max_sum = float('-inf')
    even = 0        # Max sum ending with even ("+")
    odd = float('-inf')   # Max sum ending with odd ("-")
    
    for num in nums:
        # At each step: 
        # If current is even (i.e., pick as start or after odd), then:
        new_even = max(odd, 0) + num   # Either extend from odd (alternate) or start new (+)
        new_odd = even - num           # Only can come from a previous even (alternate sign)
        even, odd = new_even, new_odd
        max_sum = max(max_sum, even, odd)
    return max_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of nums.  
  *Justification: One linear scan, constant-time operations per element.*
- **Space Complexity:** O(1).  
  *Justification: Only a fixed number of variables are needed (no auxiliary arrays, just rolling states).*

### Potential follow-up questions (as if you’re the interviewer)  

- What if you were only allowed to return the starting and ending indices of the subarray?
  *Hint: Save indices whenever updating the max; trace back.*

- How to modify if alternation starts with a `-` instead of a `+`?
  *Hint: Swap the initializations and logic of even/odd/signs.*

- How to generalize if the alternation cycle is longer than 2 (e.g., `+, -, *, /` repeatedly)?
  *Hint: Use an array of DP states, one for each cycle position.*

### Summary
This problem is a variation of the classic **Kadane’s Algorithm**, adapted to handle alternating addition and subtraction. The essence is to track two alternating DP states for each scan position, allowing the solution in O(n) time and O(1) space. This "alternating DP" or "state compression DP" is a useful pattern for many sign-alternating and parity-dependent subarray problems.