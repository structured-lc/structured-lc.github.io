### Leetcode 473 (Medium): Matchsticks to Square [Practice](https://leetcode.com/problems/matchsticks-to-square)

### Description  
You are given an integer array `matchsticks` where each element represents the length of a matchstick. Your task is to determine if you can use all the matchsticks to form exactly one square. You **must** use every matchstick exactly once, you **cannot break** any matchstick, and you can combine matchsticks to form sides of the square as long as each side has the same length.

### Examples  

**Example 1:**  
Input: `matchsticks = [1,1,2,2,2]`  
Output: `true`  
*Explanation: We can arrange the matchsticks as [1,1], [2], [2], [2] to form sides of length 2 for the square.*

**Example 2:**  
Input: `matchsticks = [3,3,3,3,4]`  
Output: `false`  
*Explanation: The sum of matchsticks is 16, and the side should be 4, but the single 4 cannot be paired with others to achieve a proper square using every stick.*

**Example 3:**  
Input: `matchsticks = [5,5,5,5,4,4,4,4,3,3,3,3]`  
Output: `true`  
*Explanation: The total length is 48, which means each side should be 12. By grouping [5,4,3], [5,4,3], [5,4,3], [5,4,3] we form four sides of length 12.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  Try every possible way to partition the sticks into four groups with equal sum. This is exponential, as each stick can go to any group, with 4ⁿ possibilities. Infeasible for n up to 15.

- **Backtracking:**  
  Since the sides are identical, use backtracking to assign each matchstick to one of the four sides, ensuring no side exceeds the target length.  
  Start with the largest matchstick to prune impossible branches early (sorting descending helps).  
  If all sides reach the target without exceeding, a square can be formed.

- **Why backtracking works:**  
  n is small (≤15). Sorting helps optimize recursion by checking the largest sticks first, pruning bad paths ASAP.

- **Trade-offs:**  
  DP or bitmask-DP possible, but backtracking with sorting is cleaner given small n and gives optimal performance in practice.

### Corner cases to consider  
- The total sum of matchsticks is not divisible by 4 – impossible to form a square.
- Any matchstick is longer than side length – return false instantly.
- Only one matchstick or too few sticks – impossible.
- Repeated values or all same values (should work if divisible).
- Already grouped into fours.

### Solution

```python
def makesquare(matchsticks):
    # Total length must be divisible by 4
    total = sum(matchsticks)
    if total % 4 != 0:
        return False
    
    target = total // 4
    n = len(matchsticks)
    
    # If any stick is longer than side, cannot make square
    if max(matchsticks) > target:
        return False
    
    # Sort descending for better pruning
    matchsticks.sort(reverse=True)
    
    # Initialize 4 sides as 0
    sides = [0] * 4
    
    def backtrack(index):
        if index == n:
            # Check all sides equal to target
            return sides[0] == sides[1] == sides[2] == sides[3] == target
        
        for i in range(4):
            # Skip if adding exceeds target
            if sides[i] + matchsticks[index] > target:
                continue
            # Prune duplicate states
            if i > 0 and sides[i] == sides[i-1]:
                continue
            sides[i] += matchsticks[index]
            if backtrack(index + 1):
                return True
            sides[i] -= matchsticks[index]
        return False
    
    return backtrack(0)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(4ⁿ), as each matchstick can be assigned to any of 4 sides, but sorting and pruning reduce practical paths.

- **Space Complexity:**  
  O(n) due to recursion stack and side array (constant size 4).

### Potential follow-up questions (as if you’re the interviewer)  

- What if there were k sides instead of 4?  
  *Hint: Generalize the backtracking/partitioning pattern.*

- How would you handle very large inputs (n > 20)?  
  *Hint: Use more advanced DP (bitmask) or approximation if exact solution too slow.*

- Can this be solved with dynamic programming?  
  *Hint: State defined by subset of matchsticks (bitmask), DP for possible subset sums.*

### Summary
This problem uses the classic **backtracking with pruning** pattern, efficient due to small input size. Sorting helps by reducing the search space, allowing for early stopping when adding a stick overshoots the target. Similar backtracking techniques appear in partition, subset sum, and k-equal-sums problems. Understanding state pruning, recursion, and the importance of sorting for optimization are key skills here.


### Flashcard
Use backtracking to assign each matchstick to one of four sides, pruning when a side exceeds target length; sort descending for efficiency.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Backtracking(#backtracking), Bit Manipulation(#bit-manipulation), Bitmask(#bitmask)

### Similar Problems
- Maximum Rows Covered by Columns(maximum-rows-covered-by-columns) (Medium)