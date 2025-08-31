### Leetcode 698 (Medium): Partition to K Equal Sum Subsets [Practice](https://leetcode.com/problems/partition-to-k-equal-sum-subsets)

### Description  
Given an array of positive integers and an integer k, determine if it is possible to divide the array into k non-empty subsets such that the **sum of the elements in each subset is equal**.  
You must use every element exactly once, and the subsets must be disjoint except for their sums.

### Examples  

**Example 1:**  
Input: `nums = [4, 3, 2, 3, 5, 2, 1]`, `k = 4`  
Output: `True`  
*Explanation: The total sum is 20, and since 20/4 = 5, each subset must sum to 5. Possible partitions: [5], [1,4], [2,3], [2,3].*

**Example 2:**  
Input: `nums = [1, 2, 3, 4]`, `k = 3`  
Output: `False`  
*Explanation: The total sum is 10, which is not divisible by 3. Therefore, partitioning is impossible.*

**Example 3:**  
Input: `nums = [2, 2, 2, 2, 3, 4, 5]`, `k = 4`  
Output: `False`  
*Explanation: The total sum is 20, so each subset needs sum 5. But the largest number is 5, and there is only one 5, but the other numbers can only make four groups of 5 if possible. Trying all combinations shows that it's not achievable without repeating or missing elements.*

### Thought Process (as if you’re the interviewee)  
First, calculate the sum of the array. If the sum isn’t divisible by k, the answer is immediately False because the partition won’t be perfect.  
Set the **target subset sum** to total_sum // k.

1. **Brute-force:**  
Try to assign every number to one of the k subsets using backtracking, ensuring each subset sum remains ≤ target.  
This approach quickly becomes infeasible as n grows due to the exponential number of possibilities.

2. **Optimized Backtracking:**  
- Sort the array in descending order to put larger numbers first (which will fail faster if impossible).
- Use a recursive function to try to put each unused number into any subset that doesn’t exceed the target.
- Use a boolean array to record whether each number is used.
- If at any point a subset goes over the target value, backtrack.

3. **Bitmask DP:**  
If the input array is small (n ≤ 16), we can use DP with bitmasking, where each bit represents whether a value is placed.

**Chosen approach:**  
Optimized backtracking with subset sum pruning works well for this problem (since n ≤ 16). We prune by:
- Not trying subsets that have the same value as a previous attempt (to avoid repeated work).
- Aborting early if placing the current num cannot fit in any subset.

### Corner cases to consider  
- k = 1 (always true if nums is non-empty).
- k > len(nums) (not possible).
- nums contains single large element > target sum.
- All elements are equal.
- Array contains repeated elements.
- sum(nums) not divisible by k.

### Solution

```python
def canPartitionKSubsets(nums, k):
    n = len(nums)
    total = sum(nums)
    if k == 1:
        return True
    if n < k or total % k != 0:
        return False

    target = total // k
    nums.sort(reverse=True)
    # Early rejection: biggest item can't fit in target
    if nums[0] > target:
        return False

    used = [False] * n

    def backtrack(start, k, current_sum):
        if k == 1:
            # The last group must be valid if the rest succeeded
            return True
        if current_sum == target:
            # Start to fill the next bucket
            return backtrack(0, k - 1, 0)

        for i in range(start, n):
            if not used[i] and current_sum + nums[i] <= target:
                used[i] = True
                if backtrack(i + 1, k, current_sum + nums[i]):
                    return True
                used[i] = False
                # If this path didn’t work and we’re filling a new bucket,
                # then picking another element of the same number won’t help
                if current_sum == 0:
                    break
        return False

    return backtrack(0, k, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  *O(k × 2ⁿ)* in the worst-case. For each number, you try placing it in each subset, and you touch combinations via backtracking. Since n ≤ 16, this is manageable.
- **Space Complexity:**  
  *O(n)* for the used array and *O(n)* recursion stack (since we recurse at most n times).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array contains negative numbers?  
  *Hint: How do negative numbers affect subset sum calculations?*

- How would you return the actual subsets if a solution exists?  
  *Hint: Maintain a list of elements assigned to each subset during recursion.*

- Can this solution scale if nums has hundreds of elements?  
  *Hint: Discuss NP-completeness and the need for heuristics or approximation in very large cases.*

### Summary
This problem uses the classic **backtracking with pruning** pattern, focusing on the subset-sum/partitioning branch of problems. This method is effective when input size is small (n ≤ 16). Similar techniques are used in problems involving grouping, partitioning, and combinations with tight constraints.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Backtracking(#backtracking), Bit Manipulation(#bit-manipulation), Memoization(#memoization), Bitmask(#bitmask)

### Similar Problems
- Partition Equal Subset Sum(partition-equal-subset-sum) (Medium)
- Fair Distribution of Cookies(fair-distribution-of-cookies) (Medium)
- Maximum Number of Ways to Partition an Array(maximum-number-of-ways-to-partition-an-array) (Hard)
- Maximum Rows Covered by Columns(maximum-rows-covered-by-columns) (Medium)
- Maximum Product of Two Integers With No Common Bits(maximum-product-of-two-integers-with-no-common-bits) (Medium)