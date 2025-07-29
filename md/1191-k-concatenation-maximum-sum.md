### Leetcode 1191 (Medium): K-Concatenation Maximum Sum [Practice](https://leetcode.com/problems/k-concatenation-maximum-sum)

### Description  
Given an integer array `arr` and an integer `k`, create a new array by concatenating `arr` to itself `k` times. Find the maximum sum of a non-empty, contiguous subarray in this new `k`-concatenated array. The answer may be very large, so return it modulo 1,000,000,007.

For example, if `arr = [1, -2, 1]` and `k = 3`, the concatenated array would be `[1, -2, 1, 1, -2, 1, 1, -2, 1]`. The task is to find the largest possible subarray sum within this array.

### Examples  

**Example 1:**  
Input: `arr = [1,2], k = 3`  
Output: `9`  
*Explanation: Concatenated array: [1,2,1,2,1,2]. Max subarray sum is the entire array: 1+2+1+2+1+2 = 9.*

**Example 2:**  
Input: `arr = [1,-2,1], k = 5`  
Output: `2`  
*Explanation: Concatenated array: [1,-2,1,1,-2,1,1,-2,1,1,-2,1,1,-2,1]. The max subarray sum is 1, -2, 1 = 0, but better to take only [1] or [1, -2, 1], so maximum is 2 from [1, -2, 1, 1, -2, 1].*

**Example 3:**  
Input: `arr = [-1,-2], k = 7`  
Output: `0`  
*Explanation: The max sum for any non-empty subarray is 0 since all numbers are negative (empty subarray allowed).*

### Thought Process (as if you’re the interviewee)  
- Initial brute-force: Build the entire `k`-concatenated array, then run Kadane’s algorithm to get the maximum subarray sum. This is not feasible for large `k` or arrays.
- **Optimization:**  
  - For `k = 1`: Just run Kadane's on the original array.
  - For `k = 2`: Concatenate twice and run Kadane’s, as the best subarray may wrap from the end of the first copy into the start of the second.
  - For `k > 2`:  
    - Calculate the sum of `arr`.  
    - If the total sum is positive, take the best prefix sum from the first copy, the best suffix sum from the last copy, and add `(k-2) × totalSum` (all middle arrays).
    - If the total sum is not positive, maximum sum will be within the first two array copies.
- Use Kadane's algorithm for key subproblems:  
  - Maximum subarray sum in `arr`.
  - Maximum prefix sum (biggest sum starting at beginning of arr).
  - Maximum suffix sum (biggest sum ending at end of arr).  
- Always take modulo \(10^9 + 7\) for the answer.

### Corner cases to consider  
- Empty array (should return 0).
- All negative elements (best to take empty subarray, sum = 0).
- k = 1 (plain old max subarray problem).
- Array sum = 0 (adding more copies doesn't increase subarray sum).
- Array sum < 0 (best result is within the first two copies).
- Very large k (don't build actual array).
- Single element array.

### Solution

```python
def kConcatenationMaxSum(arr, k):
    MOD = 10**9 + 7

    def kadane(nums):
        max_sum = curr = 0
        for num in nums:
            curr = max(num, curr + num)
            max_sum = max(max_sum, curr)
        return max_sum

    arr_sum = sum(arr)
    max_kadane1 = kadane(arr)
    if k == 1:
        return max_kadane1 % MOD

    # Compute max subarray in two concatenations (covers cross-boundary case)
    max_kadane2 = kadane(arr * 2)

    if arr_sum > 0:
        result = max_kadane2 + (k - 2) * arr_sum
    else:
        result = max_kadane2

    return result % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - We run Kadane’s algorithm a constant number of times on `arr` and `arr*2`, leading to linear time in the size of the original array (not the constructed array).
- **Space Complexity:** O(1)  
  - Only a fixed number of integer variables, no dynamic arrays built regardless of k value.

### Potential follow-up questions (as if you’re the interviewer)  

- What if k is so large (e.g., 10⁹) that you can’t build even two concatenations?  
  *Hint: Can you accomplish all required computations just by iterating arr at most twice?*

- How would you handle the problem if the array sum could be extremely large (risk of overflow)?  
  *Hint: Use modulus at each computation step for safety.*

- If the problem changes so that an empty subarray isn’t allowed, how do you modify your solution?  
  *Hint: Let Kadane’s initialize at negative infinity and do not allow zero as a valid sum unless forced.*

### Summary
This problem is an application of dynamic programming using **Kadane’s algorithm** for max subarray sum. The optimization for large k relies on identifying when full concatenations contribute positively and using prefix/suffix computations for boundary-spanning subarrays. This pattern occurs in other problems asking for repeated arrays or circular max subarray sums.