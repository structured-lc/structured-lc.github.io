### Leetcode 494 (Medium): Target Sum [Practice](https://leetcode.com/problems/target-sum)

### Description  
Given an array of non-negative integers `nums` and an integer `target`, you are to assign either a `'+'` or `'-'` sign to each element in `nums`. The goal is to find the **number of different ways** you can assign these signs so that the sum of the resulting expression equals `target`. For each element, you must use exactly one sign.

Think of it as: For each number, decide to add it or subtract it. Count all such combinations that achieve the target sum.

### Examples  

**Example 1:**  
Input: `nums = [1,1,1,1,1]`, `target = 3`  
Output: `5`  
*Explanation: There are 5 ways:  
- +1 +1 +1 +1 -1 = 3  
- +1 +1 +1 -1 +1 = 3  
- +1 +1 -1 +1 +1 = 3  
- +1 -1 +1 +1 +1 = 3  
- -1 +1 +1 +1 +1 = 3*

**Example 2:**  
Input: `nums = [1]`, `target = 1`  
Output: `1`  
*Explanation: Only one way: +1 = 1*

**Example 3:**  
Input: `nums = [1,2,7,9,981]`, `target = 1000000000`  
Output: `0`  
*Explanation: No combination of +/− can reach such a large target (sum too small).*

### Thought Process (as if you’re the interviewee)  
- Brute-force:  
  - Try out all possible assignments of `+` or `-` for each element.  
  - At each position, branch to "plus" and "minus" paths, adding/removing value from running sum.
  - Base case: Once you reach the end of nums, check if the sum equals target.
  - Time complexity: 2ⁿ (where n = len(nums)), since each number has two options.
- Optimization:
  - Many subproblems are reused with same (index, currentSum) => Use **memoization (top-down DP)** or **tabulation (bottom-up DP)**
  - State: (index, currentSum). Store result for each state to avoid redundant calculation.
  - At each step, recursively explore both adding and subtracting nums[i].
  - Final result is number of ways paths reach target sum.

### Corner cases to consider  
- Empty nums list: return 1 if target is 0 (one way: empty sum), else 0.
- target extremely large (outside possible range of sums): must return 0.
- nums contains zeroes: since +0/-0 are equivalent for the sum, but each is an independent choice, doubles the ways for each zero.
- One element in nums.

### Solution

```python
# Approach: Top-down DP (memoization)
# For each index, try both adding and subtracting the current number.
# Use a memo dict {(index, current_sum): number_of_ways}

def findTargetSumWays(nums, target):
    memo = {}
    
    def dfs(index, current_sum):
        # Base: End of array
        if index == len(nums):
            return 1 if current_sum == target else 0
        
        # Memoization
        state = (index, current_sum)
        if state in memo:
            return memo[state]
        
        # Either add or subtract nums[index]
        add = dfs(index + 1, current_sum + nums[index])
        subtract = dfs(index + 1, current_sum - nums[index])
        memo[state] = add + subtract
        return memo[state]
    
    return dfs(0, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × S)  
  - n = number of elements in nums  
  - S = sum of all numbers × 2 (range of possible sums from −total to +total)  
  - Each unique state (index, current_sum) is computed once due to memoization.
- **Space Complexity:** O(n × S)  
  - For memoization storage (potentially stores all index, sum pairs)  
  - O(n) recursion stack depth (one stack frame per number).

### Potential follow-up questions (as if you’re the interviewer)  

- What if nums contains negative numbers?  
  *Hint: How do negative numbers change the range of possible sums and your DP state?*

- Can you solve this with a bottom-up (iterative) dynamic programming approach?  
  *Hint: Consider building up a DP array for what sums are possible after each number.*

- What if you just want to know **if it's possible** to reach that sum, not the number of ways?  
  *Hint: Early termination possible, less memory, think subset sum check.*

### Summary
This problem uses the classic **"decision tree" with DP memoization** pattern, common in subset sum and partition problems. Brute-forcing all sign assignments leads to exponential time, but **recursion with memoization** reduces it to polynomial in input size and sum range. The same template extends to problems like Partition Equal Subset Sum, Coin Change, and Subset Sum Variations.


### Flashcard
Use DFS with memoization or DP; at each index, branch to plus/minus, count ways to reach target sum.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Backtracking(#backtracking)

### Similar Problems
- Expression Add Operators(expression-add-operators) (Hard)
- Ways to Express an Integer as Sum of Powers(ways-to-express-an-integer-as-sum-of-powers) (Medium)