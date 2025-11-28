### Leetcode 3725 (Hard): Count Ways to Choose Coprime Integers from Rows [Practice](https://leetcode.com/problems/count-ways-to-choose-coprime-integers-from-rows)

### Description
You are given an m × n matrix of positive integers. Your task is to count the number of ways to select exactly one integer from each row such that the GCD (Greatest Common Divisor) of all selected integers equals 1. Two selections are different if they differ in at least one chosen element's position or value.

The key insight is that since all matrix values are at most 150, there are only a limited number of possible GCD values (1 to 150), making dynamic programming feasible.

### Examples

**Example 1:**  
Input: `[[2,1,3],[4,2],[3]]`  
Output: `4`  
*Explanation: The valid selections are: (2,4,3), (2,2,3), (1,4,3), (1,2,3). For each, the GCD of all three numbers is 1.*

**Example 2:**  
Input: `[[2,2],[1,3]]`  
Output: `4`  
*Explanation: The valid selections are: (2,1), (2,3), (2,1), (2,3). All pairs have GCD = 1.*

**Example 3:**  
Input: `[[3,6],[6]]`  
Output: `0`  
*Explanation: No matter which elements we choose (3 or 6 from row 0, and 6 from row 1), the GCD is always 3, never 1.*

### Thought Process (as if you're the interviewee)

**Brute Force Approach:**
The naive solution would be to generate all possible selections by choosing one element from each row and computing their GCD. This would be O(n^m) where n is the maximum row size, which is far too slow.

**Optimized Approach:**
I notice that:
1. All values are ≤ 150, so there are at most 150 distinct GCD values
2. An important property of GCD: gcd(a, b) ≤ min(a, b), and GCD decreases (or stays the same) as we process more numbers
3. We can use DP where the state is: "At row i, with GCD so far equal to g, how many ways can we achieve this?"

**Strategy:**
- Use DP with state: `dp[i][g]` = number of ways to select elements from rows 0 to i such that their GCD equals g
- For each row, iterate through all possible GCD values (1 to 150) and all elements in the current row
- For each element, compute the new GCD with previous GCDs and update the count
- Answer is `dp[n-1][1]`

**Why this works:**
Since GCD decreases as we include more numbers, we only need to track up to 150 values. The number of distinct GCD values reachable is limited, making the solution efficient.

### Corner cases to consider
- Single row matrix: The answer is 1 only if the single row has at least one element equal to 1; otherwise it's 0
- All elements are coprime (like all 1s): Many combinations work
- All elements share a common factor > 1: Answer is 0
- Large GCD values that can only become 1 with specific numbers: Must correctly compute GCD transitions
- Row with many duplicate values: Still count each position separately

### Solution

```python
def countCoprime(mat):
    MOD = 10**9 + 7
    m, n = len(mat), len(mat[0])
    
    # Helper function to compute GCD
    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a
    
    # dp[g] = number of ways to achieve GCD = g using elements from rows processed so far
    # We use 151 because GCD values range from 1 to 150
    dp = [0] * 151
    
    # Process first row: each element is its own GCD
    for num in mat[0]:
        dp[num] += 1
    
    # Process remaining rows
    for row_idx in range(1, m):
        new_dp = [0] * 151
        
        # For each element in current row
        for num in mat[row_idx]:
            # For each possible GCD value from previous rows
            for prev_gcd in range(1, 151):
                if dp[prev_gcd] > 0:
                    # Compute new GCD when combining with current number
                    new_gcd = gcd(prev_gcd, num)
                    # Add the count of ways to achieve this new GCD
                    new_dp[new_gcd] = (new_dp[new_gcd] + dp[prev_gcd]) % MOD
            
            # Also consider starting fresh with just the current number
            # (only possible on first row, but for clarity in transitions)
            new_dp[num] = (new_dp[num] + 1) % MOD
        
        dp = new_dp
    
    return dp[1]
```

### Time and Space complexity Analysis

- **Time Complexity:** O(m × n × 150 × log(150))
  - We iterate through m rows
  - For each row, we iterate through n elements
  - For each element, we iterate through all 150 possible GCD values
  - Each GCD computation takes O(log(150)) time using Euclidean algorithm
  - Total: O(m × n × 150 × log(150)) ≈ O(m × n) with a constant factor

- **Space Complexity:** O(150) = O(1)
  - We maintain a DP array of size 151 (to store counts for GCDs 0 to 150)
  - We create a new_dp array for each row transition, but only one at a time
  - No recursion stack or additional data structures beyond fixed-size arrays

### Potential follow-up questions (as if you're the interviewer)

- (Follow-up question 1)  
  *What if the matrix values could go up to 10⁹? How would you optimize?*  
  *Hint: Consider that GCD values decrease rapidly; you only need to track distinct GCD values encountered, not all values up to 10⁹. Use a dictionary or set to store only reachable GCDs.*

- (Follow-up question 2)  
  *Can you optimize space further if m is very large?*  
  *Hint: You only need the previous row's DP state to compute the current row's state. Use two arrays and alternate between them, or use a single array with careful updates.*

- (Follow-up question 3)  
  *How would you modify the solution if we need to find ways where GCD equals some value k (not necessarily 1)?*  
  *Hint: Simply return dp[k] instead of dp[1]. The logic remains identical; only the final answer changes.*

### Summary
This problem uses **dynamic programming with state compression**. The key insight is that GCD values are limited (1 to 150), allowing us to track them explicitly in a DP table. We process each row sequentially, maintaining a count of ways to achieve each possible GCD. This pattern applies to any problem where:
- You need to track some property through multiple stages
- The property has a limited number of distinct values
- The property can be computed incrementally

This is a common pattern in problems involving number theory (GCD, LCM) combined with combinatorial counting.


### Flashcard
Use DP with bitmask to track GCD values (≤ 150); for each row, compute which GCDs are achievable, then combine across rows to count coprime selections.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming), Matrix(#matrix), Combinatorics(#combinatorics), Number Theory(#number-theory)

### Similar Problems
