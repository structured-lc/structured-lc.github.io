### Leetcode 964 (Hard): Least Operators to Express Number [Practice](https://leetcode.com/problems/least-operators-to-express-number)

### Description  
Given two integers, **x** and **target**, find the *least number of mathematical operators* (among +, -, \*, /) needed to express the target number starting from x. Each use of x can only appear by itself (e.g., you cannot use parenthesis to group) and expressions strictly follow arithmetic precedence (multiplication/division before addition/subtraction). You may use each operator any number of times, and division results are rational numbers. The goal: write target using x, with the *fewest operators possible*.

Example:  
If x = 3, target = 19, you want to write an expression involving 3 (like 3\*3\*3 + 3 + 3/3) that equals 19, using as few operators as possible.

### Examples  

**Example 1:**  
Input: `x = 3, target = 19`  
Output: `5`  
*Explanation: 19 = 3\*3\*3 + 3 + 3/3 ⇒ "3\*3\*3 + 3 + 3/3" uses five operators (\*, \*, +, +, /).*

**Example 2:**  
Input: `x = 5, target = 501`  
Output: `8`  
*Explanation: One valid construction: 5\*5\*5\*5 + 5\*5 + 5/5 = 625 + 25 + 1 = 651. But that's too big, so adjust using subtraction or fewer powers. The minimum number found is 8.*

**Example 3:**  
Input: `x = 100, target = 100000000`  
Output: `3`  
*Explanation: 100\*100\*100\*100 = 100^{4} = 100000000. Three multiplications.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all possible combinations and operator placements to build target from x. This is not feasible due to the massive number of possibilities, especially since no parentheses are allowed and numbers can get very large.

- **Pattern observation:**  
  Notice that you can construct any integer using x's powers:  
  - e.g., for target=19 and x=3, 19 can be approximated by 3³=27, then adjust via additions/subtractions of lower powers or divisions.

- **Optimal substructure and recursion:**  
  For each target:
  - Either build up to target using x^{k} and then add/subtract the difference (target - x^{k})
  - Or get as close as possible using x^{k-1}, and then fill the remaining difference
  - For each choice, the number of operators is k (for exponentiations), plus recursively solve for the remainder.

- **Dynamic programming/memoization:**  
  Use memoization to avoid repeated computation for the same sub-targets.

- **Key insight:**  
  Recognizing you have two ways at each power: use more x to bridge the gap, or use fewer and then fill via recursive decomposition.    
  Base case: when target < x, decide whether to add together multiple x (target times), or use x/(x - target). Choose the smaller.

### Corner cases to consider  
- target < x  
- target == x  
- x = 1  
- x = 2, target is a power of 2  
- x very large, target very small  
- Division required (target not divisible by x)  
- Using many subtractions to achieve the target  
- x or target is 0 (invalid per constraints)  

### Solution

```python
from functools import cache

def leastOpsExpressTarget(x: int, target: int) -> int:
    # Memoization for subproblems
    @cache
    def dfs(target):
        if target == 0:
            return 0
        if target < x:
            # Either use x - x - ... - x = target (target times, uses target operators)
            # or (x/(x - target)), then subtract
            return min(target * 2 - 1, (x - target) * 2)
        # Find highest power of x less than or equal target
        k = 0
        cur = 1
        while cur * x <= target:
            cur *= x
            k += 1
        res = dfs(target - cur) + k       # Add: need k multiplications to build x^k, then plus for reminder
        # Try going one power higher (overshoot, then subtract back)
        if cur * x - target < target:
            res = min(res, dfs(cur * x - target) + k + 1) # +1 for subtraction
        return res
    return dfs(target)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(logₓ(target)), since each recursive call reduces the problem by at least a factor of x, and at each level there are a constant number of options to explore.
- **Space Complexity:**  
  O(logₓ(target)), due to the recursion stack and memoization table, each holding at most one entry per recursion level.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the algorithm if parentheses were allowed?  
  *Hint: You could bracket sub-expressions and use operator precedence freely.*

- What if exponentiation (^) was allowed as an operator?  
  *Hint: You could build the target in fewer steps by going directly to powers and reducing the count of multiplications.*

- How would this change if only addition and subtraction were allowed?  
  *Hint: Could you still reach every target efficiently, or are there new limits? Try to find optimizations via digit/decomposition.*

### Summary
This problem uses **recursive decomposition with memoization**, exploiting the mathematical structure of expression building from repeated multiplications, additions, and subtractions—classic "DP on integers" with state compression. The key pattern is exploring two choices for each power: close or overshoot, and recursively refining the answer. This approach is applicable in problems involving interval decompositions, integer DP, or optimal cost-minimization where choices build on subproblems.