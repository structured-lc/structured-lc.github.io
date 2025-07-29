### Leetcode 1823 (Medium): Find the Winner of the Circular Game [Practice](https://leetcode.com/problems/find-the-winner-of-the-circular-game)

### Description  
Given **n** people standing in a circle (labeled 1 through n), they play a game: starting from person 1, every k-th person is eliminated from the circle until only one remains. Return the label of the last person remaining.  
It's a variant of the well-known Josephus problem—an elimination process in which people are removed in a fixed step until one survivor remains.

### Examples  

**Example 1:**  
Input: `n = 5, k = 2`  
Output: `3`  
*Explanation: Starting with [1,2,3,4,5]: 2 is eliminated (count 1 → 2), then 4 (count 3 → 4), then 1 (5 → 1), then 5 (3 → 5). Only 3 remains at the end.*

**Example 2:**  
Input: `n = 6, k = 5`  
Output: `1`  
*Explanation: Starting with [1,2,3,4,5,6]: 5 is eliminated (count 1 → 5), then 4 (6 → 4), then 6 (1 → 6), then 2 (3 → 2), then 3 (1 → 3). Only 1 remains.*

**Example 3:**  
Input: `n = 1, k = 1`  
Output: `1`  
*Explanation: Only one person. No elimination occurs; 1 is the winner.*

### Thought Process (as if you’re the interviewee)  
- First, simulate the elimination step-by-step: use a list to represent the circle, repeatedly remove the k-th person, and continue until one is left. This is intuitive but not efficient, as it requires O(n\*k) time.
- With each removal, the circle "rotates" and the next count resumes from the person after the one eliminated. We need to handle wrap-around, so modular arithmetic helps.
- The problem is equivalent to the Josephus problem. The classic recurrence: Josephus(n, k) = (Josephus(n-1, k) + k) % n. Base case: Josephus(1, k) = 0 (zero-indexed).
- To fit one-based indexing, add 1 to the result.
- Recursion yields O(n) time and O(n) stack, but we can convert to iteration for O(1) space.
- This approach is much better than an explicit simulation for large n, as it’s linear time and constant additional space.

### Corner cases to consider  
- n = 1 (only one person)
- k = 1 (each round eliminates the "next" person; the answer is always n)
- k ≥ n (k is larger than the remaining circle, requiring modular step)
- Large n and k, to test efficiency
- n = k
- Both n and k at their minimum values
- Both n and k at their maximum allowed values

### Solution

```python
def findTheWinner(n: int, k: int) -> int:
    # This is the Josephus problem (using 0-based indexing internally)
    winner = 0  # For n = 1, the answer is 0 (0th person)
    for i in range(2, n + 1):
        winner = (winner + k) % i
    # Convert zero-based to one-based index
    return winner + 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  We loop from i = 2 to n, and each step does O(1) work.

- **Space Complexity:** O(1).  
  We use just two variables (winner and i); no extra storage or recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n is very large (e.g., 10⁹)?  
  *Hint: Consider iterative solution to avoid stack overflow and minimize space.*

- Can you output the order in which players are eliminated?  
  *Hint: You will need to simulate the process, possibly with a data structure such as deque or list.*

- How is this related to the classic Josephus problem, and how could you generalize the elimination step?  
  *Hint: Explore the mathematical recurrence and generalization for arbitrary step size k.*

### Summary
This problem demonstrates the **Josephus recurrence pattern**—a powerful mathematical approach to solve games of elimination in circles, where modular arithmetic is leveraged to simulate cyclic removals efficiently. This pattern is common in problems involving elimination, scheduling, or wrap-around schemes and is far more efficient than explicit simulation for large inputs.