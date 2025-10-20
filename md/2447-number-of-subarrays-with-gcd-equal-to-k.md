### Leetcode 2447 (Medium): Number of Subarrays With GCD Equal to K [Practice](https://leetcode.com/problems/number-of-subarrays-with-gcd-equal-to-k)

### Description  
You are given an integer array **nums** and an integer **k**.  
Your task is to **count the number of subarrays** (contiguous segments) of **nums** such that the greatest common divisor (GCD) of every element in the subarray is exactly **k**.

For example, if nums = [6, 3, 9, 12] and k = 3:
- The subarrays where the GCD is exactly 3 are: [3], , [3, 9], [9, 12], etc.


### Examples  

**Example 1:**  
Input: `nums = [2,4,6,3,9], k = 3`  
Output: `3`  
*Explanation: The subarrays , [3], and [3,9] all have GCD 3.*

**Example 2:**  
Input: `nums = [3,3,3,3], k = 3`  
Output: `10`  
*Explanation: Every subarray, including all the single elements and their combinations, has GCD 3. There are 10 subarrays in total.*

**Example 3:**  
Input: `nums = [2,4,6,8], k = 2`  
Output: `7`  
*Explanation: The subarrays [2], [4], , [6,8], , [2,4], [4,6] all have GCD 2 (or multiples where GCD reduces to 2 as they expand).*

### Thought Process (as if you’re the interviewee)  
First, consider a brute-force approach:  
- For every possible subarray, compute its GCD and check if it equals k.
- There are O(n²) subarrays so this would be O(n² × subarray_length) if not optimized.
- Improvement:  
  - For each subarray starting at index i, instead of recalculating GCD for every extension, update the GCD incrementally as you expand the subarray to the right.
  - If at any point the current GCD drops below k or is not divisible by k, break early – extending further won’t improve GCD back to k.
- This is acceptable since n is up to 1000 (as per usual LeetCode input size assumptions).
- Using the Euclidean method, GCD computation is fast.
- This is a classic **"sliding interval with on-the-fly aggregate"** pattern: for each start index, extend right, updating aggregate (GCD) as you move and process only valid aggregates.

### Corner cases to consider  
- Empty array → should return 0.
- k ≤ 0 or k not dividing any nums[i] → should return 0.
- nums contains 1 element; if nums==k, answer is 1, else 0.
- All elements equal to k → maximal number of subarrays: n(n+1)/2.
- Elements are all multiples of k but not equal to k → check that the subarrays’ GCD reduces to k.
- Negative numbers (problem constraints usually restrict to positive).  
- Very large numbers in nums (be sure GCD is efficient and robust).

### Solution

```python
def subarrayGCD(nums, k):
    def gcd(a, b):
        # Euclidean algorithm for gcd
        while b:
            a, b = b, a % b
        return a

    n = len(nums)
    count = 0

    # Try every subarray's starting index
    for i in range(n):
        curr_gcd = nums[i]
        for j in range(i, n):
            curr_gcd = gcd(curr_gcd, nums[j])
            if curr_gcd == k:
                count += 1
            # If the gcd becomes less than k or not divisible by k, break early
            if curr_gcd < k or curr_gcd % k != 0:
                break
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² \* log(max(nums)))
  - Outer and inner loops over n elements make O(n²) subarrays.
  - Each GCD computation is O(log(max(nums))) (Euclidean algorithm).
- **Space Complexity:** O(1) extra space.
  - No extra structures apart from counters and a temp var; operates in-place.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array size is very large (n > 10⁵)?  
  *Hint: Can you preprocess ranges for GCD efficiently or use advanced data structures (like a segment tree/block decomposition)?*

- Can we count subarrays where GCD is a multiple of k?  
  *Hint: How would the counting logic and break condition change?*

- What if the problem asks for GCD ≥ k or < k for all subarrays?  
  *Hint: What would you change in the early-out condition?*

### Summary
This problem uses the **two-pointer nested loop** technique, updating GCD on the fly as the subarray expands. The main trick is using the **Euclidean algorithm** for GCD and early termination when the GCD cannot meet the criteria. This pattern is common in subarray problems requiring dynamic aggregates (sum, min, GCD, LCM, etc.), and mastering it helps in a wide range of interval challenges.


### Flashcard
For each starting index, incrementally compute GCD while extending right. Break early if GCD drops below k or isn't divisible by k.

### Tags
Array(#array), Math(#math), Number Theory(#number-theory)

### Similar Problems
- Find Greatest Common Divisor of Array(find-greatest-common-divisor-of-array) (Easy)
- Number of Subarrays With LCM Equal to K(number-of-subarrays-with-lcm-equal-to-k) (Medium)