### Leetcode 2518 (Hard): Number of Great Partitions [Practice](https://leetcode.com/problems/number-of-great-partitions)

### Description  
Given an array `nums` of positive integers and an integer `k`, partition the array into two **groups** such that every element belongs to exactly one group, and the sum in each group is at least `k`. Two partitions are considered **distinct** if, for any index i, placing `nums[i]` in a different group results in a different partition.  
Return the **number of distinct great partitions** modulo 10⁹+7.  
Note: If the total sum of `nums` is less than 2 × k, it is impossible to create such groups.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4]`, `k = 4`  
Output: `6`  
*Explanation: The great partitions are: ([1,2,3], [4]), ([1,3], [2,4]), ([1,4], [2,3]), ([2,3], [1,4]), ([2,4], [1,3]), ([4], [1,2,3]).  
Each group sum ≥ 4. Switching groups for any item creates a new partition.*

**Example 2:**  
Input: `nums = [3,3,3]`, `k = 4`  
Output: `0`  
*Explanation: No matter how you partition the elements, at least one group will have a sum < 4. It’s impossible to have a great partition.*

**Example 3:**  
Input: `nums = [6,6]`, `k = 2`  
Output: `2`  
*Explanation: Only two possible partitions: (,) and (,). Both are distinct and valid as both groups sum to ≥ 2.*

### Thought Process (as if you’re the interviewee)  
- **Starting brute force:**  
  - List all 2ⁿ ways to split the array into two groups. For each, check if both sums ≥ k. This is exponential and infeasible for n up to 1000.
- **Observation:**  
  - If total sum < 2 × k, no partition works (both groups can’t reach sum ≥ k).
- **Symmetry:**  
  - Since order of groups does not matter, every partition is counted twice (A,B) and (B,A).
- **Key Reduction:**  
  - **Count all partitions** (every element can be in A or B: 2ⁿ possibilities).
  - **Subtract "bad" partitions:** Where at least one group has sum < k.
  - **Inclusion-exclusion:**  
      - S = sum(nums)
      - Let’s count number of partitions where group A sum < k. For each valid "bad" group, subset sum DP counts the number of subsets with sum < k.
      - But “bad” on both sides is double-counted: subsets where both group A and its complement both sum < k are those where sum < k on both sides ⇒ sum < 2k. If S ≥ 2k, these overlaps never occur, because sum(A) + sum(B) = S.
  - **Formula:**  
      - total = 2ⁿ  
      - bad = 2 × (number of subsets with sum < k)  
      - good = total - bad
      - But, since we want number of ways to assign **groups**, and both sides are symmetric, and both groups can't be "bad" at the same time if S ≥ 2k.
  - **Implementation:**  
      - Use DP to find number of subsets with sum < k. Let that be cnt.
      - result = 2ⁿ - 2 × cnt, return result % mod

### Corner cases to consider  
- nums is empty
- n = 1, and nums ≥ k (should return 0, as second group is empty, sum < k)
- k = 0 (always possible unless nums empty)
- All nums[i] < k (less likely to get good partitions)
- sum(nums) = 2 × k (tightest case)
- All elements exactly k or more

### Solution

```python
MOD = 10**9 + 7

def count_great_partitions(nums, k):
    n = len(nums)
    total_sum = sum(nums)
    if total_sum < 2 * k:
        return 0

    # dp[i]: Number of subsets with sum = i
    dp = [0] * k
    dp[0] = 1  # empty subset

    for num in nums:
        # Traverse backward to not reuse elements
        for s in range(k - 1, num - 1, -1):
            dp[s] = (dp[s] + dp[s - num]) % MOD

    # cnt = total number of subsets with sum < k
    cnt = sum(dp) % MOD

    # Total splits: 2^n
    total = pow(2, n, MOD)
    # Remove bad partitions: any group A with sum < k, or group B (complement) sum < k
    res = (total - 2 * cnt) % MOD
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k)  
  As for each number, we update all sums < k.
- **Space Complexity:** O(k)  
  Only need 1D DP up to k.

### Potential follow-up questions (as if you’re the interviewer)  

- What if k is much larger than sum(nums)?  
  *Hint: If sum(nums) < 2×k, there can never be a valid partition. Just return 0 immediately.*

- Can you generalize to more than two groups?  
  *Hint: Think about how subset sum DP generalizes, and how inclusion-exclusion principle might adapt.*

- What if you need to enumerate all the great partitions, not just count them?  
  *Hint: Consider backtracking with pruning for small cases; enumeration is infeasible for large n.*

### Summary
This problem is a strong example of **inclusion-exclusion** and **subset sum DP**, a dynamic programming pattern useful when you need to count or build up combinations with sum constraints. This approach avoids the exponential brute-force by exploiting symmetry and the ability to count “bad” cases efficiently. Subset sum DP is broadly applicable in knapsack-style problems or any situation needing "number of ways to pick subsets with sum ≤ X."

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Palindrome Partitioning II(palindrome-partitioning-ii) (Hard)
- Partition Equal Subset Sum(partition-equal-subset-sum) (Medium)
- Find the Punishment Number of an Integer(find-the-punishment-number-of-an-integer) (Medium)
- Count Partitions With Max-Min Difference at Most K(count-partitions-with-max-min-difference-at-most-k) (Medium)