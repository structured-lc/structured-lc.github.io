### Leetcode 3326 (Medium): Minimum Division Operations to Make Array Non Decreasing [Practice](https://leetcode.com/problems/minimum-division-operations-to-make-array-non-decreasing)

### Description  
Given an array of integers `nums`, you can repeatedly perform the following operation: select any element and divide it by its greatest proper divisor (any divisor less than itself and greater than 0). The task is to find the **minimum number of such operations** needed to make the array **non-decreasing** (i.e., for every i, nums[i] ≤ nums[i+1]). If it's impossible, return -1.

### Examples  

**Example 1:**  
Input: `nums = [25,7]`  
Output: `1`  
*Explanation: 25 is greater than 7, so we operate on 25. Its greatest proper divisor is 5 → 25 ÷ 5 = 5. The array becomes [5,7] which is non-decreasing. Only 1 operation needed.*

**Example 2:**  
Input: `nums = [7,7,6]`  
Output: `-1`  
*Explanation: The last element 6 < 7. Any operation on 7 will produce a value ≤ 1 or 7/7 (not allowed) and can't result in a value between 6 and 7. It's impossible to make this array non-decreasing.*

**Example 3:**  
Input: `nums = [1,1,1,1]`  
Output: `0`  
*Explanation: The array is already non-decreasing. No operations required.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try every possible sequence of allowed operations—obviously not feasible for n up to 1e5.

- **Key insight:**  
  The only way to reduce a number is by dividing it by its largest proper divisor. Doing this repeatedly makes the number smaller and smaller (eventually to 1).  
  Since we want the **minimum operations**, process the array **from right to left**:  
  - For each i (from n-2 to 0), if nums[i] > nums[i+1], try to reduce nums[i] just below or equal to nums[i+1] by repeated operations.  
  - At each step, try to minimize the number in **fewest divisions**.  
  - If cannot make nums[i] ≤ nums[i+1] (before reducing to 1), return -1.

- **Greedy + Simulation:**  
  For every failing case (nums[i] > nums[i+1]), simulate dividing nums[i] by its largest proper divisor until nums[i] ≤ nums[i+1].  
  For fast computation, once nums[i] is repeatedly divided, keep track of the current value and number of steps.  
  If nums[i] cannot be reduced further without going below 1 (or can't reach required value), it’s impossible.

### Corner cases to consider  
- Array of length 1  
- All elements are equal  
- All elements already non-decreasing  
- Some element is 1 (1 has no proper divisors, cannot be reduced)  
- Impossible case (can't reduce enough, even after all operations)  
- Large numbers (need to compute divisors efficiently)

### Solution

```python
def min_operations(nums):
    # Helper to get the greatest proper divisor of x
    def greatest_proper_divisor(x):
        for d in range(x // 2, 0, -1):
            if x % d == 0:
                return d
        return 1  # Only for x == 1

    n = len(nums)
    ans = 0
    # Process from right to left, so after each step, nums[i+1] is fixed.
    for i in range(n - 2, -1, -1):
        original = nums[i]
        cnt = 0
        # Keep reducing nums[i] as long as it is greater than nums[i+1]
        while nums[i] > nums[i + 1]:
            # If number is 1, cannot proceed
            if nums[i] == 1:
                return -1
            gpd = greatest_proper_divisor(nums[i])
            nums[i] //= gpd
            cnt += 1
        ans += cnt
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k), where k is the number of divisions needed per element in worst case (can be up to log₍₂₎nums[i] for large numbers), so practically O(n log N) (N = max element).
- **Space Complexity:** O(1) extra (not counting input array, as we work in-place).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large numbers, say up to 10¹⁸?  
  *Hint: Optimize greatest proper divisor logic by using prime factorization or precomputing divisors where possible.*

- What if only a fixed number K of total operations are allowed?  
  *Hint: Greedy strategies—make biggest reductions soonest, possibly with priority queues.*

- Can you output the sequence of operations as well, not just the count?  
  *Hint: Store (index, old value, new value) for each operation performed.*

### Summary
This problem uses a **greedy reverse simulation**: for each element, repeatedly divide it by its largest proper divisor until the array is non-decreasing. This pattern—greedy backtracking from right to left, fixing target values one by one—is common in array monotonicity transformation problems. Efficient divisor-finding and careful simulation are key and can be extended to other questions where elements must be reduced by allowed operations under order constraints.

### Tags
Array(#array), Math(#math), Greedy(#greedy), Number Theory(#number-theory)

### Similar Problems
- Smallest Value After Replacing With Sum of Prime Factors(smallest-value-after-replacing-with-sum-of-prime-factors) (Medium)