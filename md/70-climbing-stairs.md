### Leetcode 70 (Easy): Climbing Stairs [Practice](https://leetcode.com/problems/climbing-stairs)

### Description  
You are climbing a staircase with **n** steps. Each time you can climb **either 1 or 2 steps**. Your task is to determine **how many distinct ways** you can reach the top. For instance, for each step you take, you can choose to either advance by one or two steps, and you want to count all possible ways to reach the nᵗʰ step.

### Examples  

**Example 1:**  
Input: `n = 2`  
Output: `2`  
*Explanation: You can reach the top by taking two 1-step jumps (1+1), or a single 2-step jump.*

**Example 2:**  
Input: `n = 3`  
Output: `3`  
*Explanation: Three ways: 1+1+1, 1+2, or 2+1.*

**Example 3:**  
Input: `n = 5`  
Output: `8`  
*Explanation: Paths are: 1+1+1+1+1, 1+1+1+2, 1+1+2+1, 1+2+1+1, 2+1+1+1, 1+2+2, 2+1+2, 2+2+1.*

### Thought Process (as if you’re the interviewee)  
First, try **brute-force recursion**: from the current step, recursively try jumping by 1 or 2 steps until reaching or surpassing n.  
This approach is highly inefficient—overlapping subproblems will cause exponential time.

Next, consider **dynamic programming**:  
- The number of ways to reach step i is the sum of ways to reach (i-1) and (i-2), since you can arrive there by taking a 1-step or a 2-step jump from those previous steps.
- This is analogous to the Fibonacci sequence: ways(i) = ways(i-1) + ways(i-2).

To optimize further, realize that you only need to keep track of the last two computed values – this allows for an **O(1) space iterative solution**.

### Corner cases to consider  
- n = 0 (no steps): should return 1 (1 way to stay at the bottom)
- n = 1 (only one step): only one way (single step)
- Very large n (check for integer overflow, though Python handles big ints)
- Negative n (invalid input)

### Solution

```python
def climbStairs(n):
    # Handle the trivial base cases
    if n == 0 or n == 1:
        return 1

    # Initialize variables for bottom-up calculation
    first = 1  # Ways to reach step 0
    second = 1 # Ways to reach step 1

    for i in range(2, n + 1):
        current = first + second  # Recurrence: ways(i) = ways(i-1) + ways(i-2)
        first, second = second, current  # Shift for next iteration

    return second
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we iterate from 2 up to n, performing constant work per loop.
- **Space Complexity:** O(1), as only a fixed number of variables are used regardless of input size. No array or recursion stack grows with n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the steps you can take at a time are from a custom set (e.g., 1, 3, 5)?
  *Hint: Try to generalize the recurrence.*

- What if some steps are broken and cannot be used?
  *Hint: Use a dynamic programming table and skip the forbidden indices.*

- Can you output the actual combinations, not just the count?
  *Hint: Use backtracking to enumerate and construct all paths.*

### Summary  
This problem is a textbook example of **dynamic programming** and a direct application of the Fibonacci sequence. The iterative O(1) space solution is both efficient and elegant. This coding pattern is commonly applied in problems involving counting distinct ways with overlapping subproblems, such as coin change, staircase jumps with different step sizes, and tiling problems.


### Flashcard
DP or Fibonacci: ways to reach step n = ways to (n–1) + ways to (n–2); use O(1) space if desired.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming), Memoization(#memoization)

### Similar Problems
- Min Cost Climbing Stairs(min-cost-climbing-stairs) (Easy)
- Fibonacci Number(fibonacci-number) (Easy)
- N-th Tribonacci Number(n-th-tribonacci-number) (Easy)
- Minimum Rounds to Complete All Tasks(minimum-rounds-to-complete-all-tasks) (Medium)
- Count Number of Ways to Place Houses(count-number-of-ways-to-place-houses) (Medium)
- Number of Ways to Reach a Position After Exactly k Steps(number-of-ways-to-reach-a-position-after-exactly-k-steps) (Medium)
- Count Ways To Build Good Strings(count-ways-to-build-good-strings) (Medium)
- Frog Jump II(frog-jump-ii) (Medium)
- Find Number of Ways to Reach the K-th Stair(find-number-of-ways-to-reach-the-k-th-stair) (Hard)
- The Number of Ways to Make the Sum(the-number-of-ways-to-make-the-sum) (Medium)