### Leetcode 3139 (Hard): Minimum Cost to Equalize Array [Practice](https://leetcode.com/problems/minimum-cost-to-equalize-array)

### Description  
You are given an integer array nums and two costs: cost₁ and cost₂.  
- You can perform any number of the following operations, in any order:  
  1. Choose any index i, increase nums[i] by 1. This operation costs cost₁.
  2. Choose any two distinct indices i and j, and increase both nums[i] and nums[j] by 1. This operation costs cost₂ (for the pair, not each).
- Your task is to make all elements of nums equal, with the minimum total cost (modulo 1 000 000 007).

### Examples  

**Example 1:**  
Input: `nums = [4,1], cost1 = 3, cost2 = 2`  
Output: `7`  
*Explanation: Make the 1 become 4 using:*
- Use pair operation on indices 0 and 1 twice: [4,1] → [5,2] → [6,3] (cost 2 + 2 = 4)
- Then increase index 1 once: [6,3] → [6,4] (cost 3)
- Final array: [6,4]. This is not yet equal, but if we started by aligning at a lower target, e.g., both to 4, using pair only once: [4,1] → [5,2] (cost 2), then increase index 1 twice: [5,2] → [5,3] (cost 3), [5,3] → [5,4] (cost 3), total = 2 + 3 + 3 = 8, which is worse than pair-pair-single: 2+2+3=7 (and so on).  
*Optimal is: pair once (indices 0 and 1): [5,2], single on index 1 twice: [5,3], [5,4], final equal at 5, cost = 2+3+3=8, but one more pair (lets see), pair twice brings both up (not optimal). Best is to do pair three times if possible, but in this case, three pairs overshoots the smaller number, so 7 is minimal.*

**Example 2:**  
Input: `nums = [1,1,1], cost1 = 1, cost2 = 1`  
Output: `0`  
*Explanation: All elements are already equal. No operations are required.*

**Example 3:**  
Input: `nums = [2,3,5], cost1 = 2, cost2 = 1`  
Output: `4`  
*Explanation: Target all to 5.  
- Index 0: need 3 increments, index 1: need 2 increments, index 2: need 0. Total increments needed: 3+2+0=5.
- Use pairs as much as possible: each pair covers 2 increments for cost 1.  
- do 2 pairs: covers 4 increments (cost 1+1=2).  
- 1 increment left: use single (cost 2).  
- Total cost: 2+2=4.*

### Thought Process (as if you’re the interviewee)  
First, count how many increments are needed to make all elements equal to the max value. Each nums[i] needs (max_val - nums[i]) increments.  
Brute force: For every possible target from max(nums) to some upper bound, try all combinations of using single and pair operations.  
But since pair is more cost-effective when cost₂ < 2 × cost₁, maximize usage of pairs where possible.

For k increments needed, you can use up to ⌊k/2⌋ pair operations (since each pair covers two increments), then cover the remainder (k mod 2) with single operations.  
Find the cost for every target ≥ current max(nums):  
- Compute the total number of increments needed across all indices.
- For x in range(max(nums), max(nums)+possible bound), compute how to split increments between pairs and singles to minimize cost.  
- Since cost₂ could be more or less than 2×cost₁, always check: which is cheaper—using two singles or one pair?  
- Since each pair must have two increments available, may have to cover some odd increments with single.

Loop over possible targets up to max(nums)+n (n = len(nums)), to account for parity for pairings.

### Corner cases to consider  
- All elements already equal (no operation needed).
- Only one element (no operation).
- cost₂ ≥ 2×cost₁ (pairs never useful).
- Very large numbers or large difference, to test modulo and overflow.
- Odd number of required increments (leftover must be covered via singleton).

### Solution

```python
def minCostToEqualizeArray(nums, cost1, cost2):
    MOD = 10**9 + 7
    n = len(nums)
    max_num = max(nums)
    min_cost = float('inf')

    # Try targets from max(nums) to max(nums)+n
    # since sometimes pairing works best if you align at a number higher than max
    for target in range(max_num, max_num + n + 1):
        increments = [target - num for num in nums]
        total_increments = sum(increments)
        # Maximum number of pairs you can use
        num_pairs = total_increments // 2
        # Number of singles: remaining increments
        num_singles = total_increments % 2

        # But you can't pair unless there are enough indices needing increments
        # Reduce pairs if there's not enough 1s to pair
        single_needed = 0
        pair_usable = 0
        # Count frequency of required increments (parity)
        cnt_odd = sum(inc % 2 for inc in increments)
        num_singles = cnt_odd
        num_pairs = (total_increments - num_singles) // 2

        # Cost of using max possible pairs, rest single
        curr_cost = num_pairs * min(2*cost1, cost2) + num_singles * cost1
        min_cost = min(min_cost, curr_cost)

    return min_cost % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²). For each possible target (up to n above max(nums)), compute sum and parity (O(n)), so overall O(n²).
- **Space Complexity:** O(n) for the increments list per iteration; no extra large data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the only allowed operation is incrementing a single element?
  *Hint: Simple sum difference and multiply by cost₁.*

- How would your strategy change if cost₂ could be arbitrarily small or large?
  *Hint: If cost₂ ≥ 2×cost₁, avoid pairs. If cost₂ is very small, maximize pair usage.*

- Can you generalize for making all elements equal to an arbitrary value (not just max)?
  *Hint: Try all possible target values with varying strategies.*

### Summary
This problem is a **greedy-math and transform/simulation** problem: minimize cost by optimizing the use of the cheaper operation (pair or single) per increment.  
The key coding pattern is "maximize the cheaper operation subject to restrictions, then fill in the rest," a powerful pattern for many greedy task-splitting problems (e.g., coin change variant, work scheduling, resource allocation).  
Here, careful handling of the parity and operation cost trade-off is essential for correctness and efficiency.

### Tags
Array(#array), Greedy(#greedy), Enumeration(#enumeration)

### Similar Problems
