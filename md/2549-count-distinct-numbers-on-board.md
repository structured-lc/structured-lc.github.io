### Leetcode 2549 (Easy): Count Distinct Numbers on Board [Practice](https://leetcode.com/problems/count-distinct-numbers-on-board)

### Description  
You are given a positive integer **n**. Initially, only **n** is on the board.  
Each day for up to 10⁹ days, for every number **x** already on the board, you find all **i** in 1..n such that **x mod i = 1** and add those `i` to the board. Once a number is on the board, it remains there forever.  
You are to return the number of **distinct** integers present on the board after all these days.

### Examples  

**Example 1:**  
Input: `n = 5`  
Output: `4`  
*Explanation: Start with {5}. On day 1: 5 mod 2 = 1 and 5 mod 4 = 1, so 2 and 4 are added. On day 2, from new numbers: 4 mod 3 = 1, so 3 is added. Final set: {2, 3, 4, 5} (size 4).*

**Example 2:**  
Input: `n = 3`  
Output: `2`  
*Explanation: Start with {3}. On day 1: 3 mod 2 = 1, so 2 is added. No more additions possible. Final set: {2, 3} (size 2).*

**Example 3:**  
Input: `n = 1`  
Output: `1`  
*Explanation: Start with {1}. No i in 1..1 such that 1 mod i = 1 is possible (since 1 mod 1 = 0). Thus, only {1} remains.*

### Thought Process (as if you’re the interviewee)  
To tackle the problem:
- First, simulate the process for small n (like n=5 or n=3) on paper to spot any patterns.
- **Naive approach:** Try to simulate 10⁹ days. But that's utterly infeasible: at most we'll get all numbers from 1 up to n because new numbers must always be ≤ n.
- **Observation:** For n = 1, the answer is 1. For n > 1, every number less than n (from 2 to n) can eventually be generated on the board because at each step, for all current x on board, you keep adding any i where x mod i = 1.
- Why "n-1"? Because 1 never gets added (for any x, x mod 1 = 0), but every other i (2 ≤ i ≤ n) can be eventually added. Thus, if n > 1, the answer is n-1.
- O(1) solution by logic.

### Corner cases to consider  
- n = 1 (must return 1, not 0)
- n = 2
- Large values of n (e.g., 10⁹)
- Validate that you never return 0 or negative

### Solution

```python
def distinctIntegers(n: int) -> int:
    # If n == 1, only 1 will ever appear
    if n == 1:
        return 1

    # For n > 1, all numbers from 2..n will eventually appear
    return n - 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  Just a constant number of operations irrespective of input n.
- **Space Complexity:** O(1)  
  Only a few integer variables used; no extra storage or recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we wanted the actual list of numbers that appear after 10⁹ days?
  *Hint: Simulate the process for small n; is there a pattern?*

- How fast would your solution work for extremely large n, say n = 10¹⁸?  
  *Hint: Is there any dependency on the value of n in your formula?*

- What changes if, instead of x mod i = 1, we use a different constant, e.g., x mod i = k?  
  *Hint: Would all numbers still be reachable?*

### Summary
The final approach leverages mathematical insight: for n > 1, all numbers from 2 up to n can eventually be indirectly constructed using the board’s daily process. This **math/simulation insight** leads to an O(1) time, space solution—common in "growth by simulation" problems when a pattern emerges. This is a classic coding pattern, useful in reachability, closure, and set-growth simulation questions.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Simulation(#simulation)

### Similar Problems
- Count of Matches in Tournament(count-of-matches-in-tournament) (Easy)