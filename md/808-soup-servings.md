### Leetcode 808 (Medium): Soup Servings [Practice](https://leetcode.com/problems/soup-servings)

### Description  
Given two types of soup (A and B), each starting with n ml, there are four possible serving operations you can choose from at each step (each with equal probability):

- serve 100 ml from A and 0 ml from B  
- serve 75 ml from A and 25 ml from B  
- serve 50 ml from A and 50 ml from B  
- serve 25 ml from A and 75 ml from B  

You repeatedly perform these serving operations until at least one soup runs out.  
Your task: **Return the probability that soup A will be emptied first,** plus **half the probability that both soups are emptied at the same time.**  
Calculate this probability up to six decimal places.


### Examples  

**Example 1:**  
Input: `n = 50`  
Output: `0.625`  
*Explanation: After scaling down to units of 25ml, simulate all possible serving paths and their probabilities. You will find that the probability that soup A finishes before B (or both together, which is worth half) sums to 0.625.*

**Example 2:**  
Input: `n = 100`  
Output: `0.71875`  
*Explanation: Slightly larger n means more steps, but the probability is calculated recursively (and through memoization) using all possible serve paths. The value is 0.71875.*

**Example 3:**  
Input: `n = 660295675`  
Output: `1.0`  
*Explanation: For large n, the answer approaches 1 rapidly—the probability that A finishes first or both finish together basically becomes certain due to the statistical dominance of large numbers.*


### Thought Process (as if you’re the interviewee)  

First, simulate all possible serve sequences recursively. At every step, we branch into 4 options (serving operations), until at least one of A or B is non-positive (finished).  
Direct recursion is impractical for larger n due to exponential growth in states.

**Optimize:**  
- Soup is only served in multiples of 25ml, so we can scale down n by 25 and work with units instead of ml.  
- Use memoization to store answers by state (a, b) for subproblems, where a and b are soup amounts (in 25ml units).  
- For very large n (like n ≥ 5000), the probability gets so close to 1 we can just return 1.0. This is because with huge initial volume, both soups almost surely run out simultaneously or A is more likely to run out first.

**Base cases:**  
- If both A and B run out at the same time → return 0.5  
- If A runs out first (A ≤ 0, B > 0) → return 1  
- If B runs out first (A > 0, B ≤ 0) → return 0  
Recursively average the probabilities for each of the four serves.


### Corner cases to consider  
- n = 0 (or less): Both soups are already finished, should return 0.5  
- Cases where n < 25: A or B can be finished in one operation  
- Very large n (e.g., n ≥ 5000): can shortcut and return 1.0  
- Precision requirements: answer should be to six decimals


### Solution

```python
def soupServings(n: int) -> float:
    # For large n, the probability approaches 1 extremely rapidly
    if n >= 5000:
        return 1.0
    
    from functools import lru_cache
    
    # Scale down n to units of 25ml and round up
    N = (n + 24) // 25
    
    @lru_cache(maxsize=None)
    def dfs(a, b):
        # Base case: both soups empty at the same time
        if a <= 0 and b <= 0:
            return 0.5
        # A finishes first
        if a <= 0:
            return 1.0
        # B finishes first
        if b <= 0:
            return 0.0
        # Four operations, each with equal (0.25) probability
        return 0.25 * (
            dfs(a - 4, b) +
            dfs(a - 3, b - 1) +
            dfs(a - 2, b - 2) +
            dfs(a - 1, b - 3)
        )
    
    return dfs(N, N)
```


### Time and Space complexity Analysis  

- **Time Complexity:**  
  The number of subproblems is O(n^2), but n is reduced by scaling (n // 25). So it's about O((n/25)^2). For n ≥ 5000, we exit early.
- **Space Complexity:**  
  Primarily from memoization: O((n/25)^2) in the recursion cache. Recursion stack is O(n/25).


### Potential follow-up questions (as if you’re the interviewer)  

- What if there were more types of soups or more serving operations?  
  *Hint: Think about generalizing the DP dimensions.*

- What if serving probabilities were not uniform?  
  *Hint: Parameterize the probabilities and serving sizes.*

- How would you avoid recursion stack overflow for large n?  
  *Hint: Iterative DP or increasing the recursion limit.*


### Summary

This problem uses *recursive DP with memoization*, a common pattern when evaluating all possible paths with overlapping subproblems, especially when combined with scaling (to reduce the state space).  
Similar ideas appear in probability simulation, game theory DP, and problems involving probability trees or branching with optimal early cut-offs.