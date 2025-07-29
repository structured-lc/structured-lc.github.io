### Leetcode 276 (Medium): Paint Fence [Practice](https://leetcode.com/problems/paint-fence)

### Description  
Given **n** fence posts and **k** colors, count the number of ways to paint the posts such that:
- **Every post** is painted exactly one color.
- **No three or more consecutive posts** have the same color.

You must return the total number of valid ways to paint the fence.


### Examples  

**Example 1:**  
Input: `n = 3, k = 2`  
Output: `6`  
*Explanation: Listed possibilities:  
1. Red, Red, Green  
2. Red, Green, Red  
3. Red, Green, Green  
4. Green, Green, Red  
5. Green, Red, Green  
6. Green, Red, Red  
Painting all posts the same (Red, Red, Red or Green, Green, Green) is not allowed (would have 3 in a row of the same color).*  

**Example 2:**  
Input: `n = 2, k = 4`  
Output: `16`  
*Explanation:  
Both posts same color: 4 ways (one color for both).  
Both posts different colors: 4 (first) × 3 (second) = 12 ways.  
Total = 4 + 12 = 16.*  

**Example 3:**  
Input: `n = 1, k = 1`  
Output: `1`  
*Explanation:  
Only one post, one color; just one way to paint.*  


### Thought Process (as if you’re the interviewee)  

- **Brute-Force Idea:**  
  Try all possible ways to paint each post with any color, recursively, but prune any coloring with 3 or more consecutive posts of the same color. This would be highly inefficient with exponential time complexity.

- **Subproblems and Optimization:**  
  Notice that the problem always comes down to deciding for each post:
    * Should the current post have the same color as the previous one, or a different color?
    * If the last two are the same, the next *must* be different.

- **State Definition:**  
  Use **Dynamic Programming**:
    - Let `same` be the number of ways where the last two posts are the same color.
    - Let `diff` be the number of ways where the last two posts are different colors.

- **Transition:**
    * For `same`, you can only get here if the previous two were different, so `same = diff_prev`.
    * For `diff`, you can get here from any valid previous, multiplying by (k-1) choices: `diff = (same_prev + diff_prev) × (k-1)`.

- **Base Cases:**
    * n = 1: just k ways.
    * n = 2: same = k (both same color); diff = k × (k-1) (choose a color for first post, and a different for second).

- **Final Answer:**  
  After n steps, total ways = same + diff.

- **Trade-offs:**  
  The optimized DP uses just a couple integers, so O(1) space is enough.


### Corner cases to consider  
- n = 0 (no posts) → 0 ways.
- k = 0 (no colors) → 0 ways.
- n = 1, k ≥ 1 → 1 post, must use one of k colors.
- k = 1, n ≥ 3 → Not possible (violates "no 3 same color" rule).
- n = 2, any k → both same or different allowed.
- k = 2, n = 3 → Only ways without 3 repeated.
- Large n, large k.


### Solution

```python
def numWays(n: int, k: int) -> int:
    # Edge cases
    if n == 0 or k == 0:
        return 0
    if n == 1:
        return k

    # Base cases
    same = k           # Both first two posts, same color
    diff = k * (k - 1) # Both first two posts, different colors

    for i in range(3, n + 1):
        # If the last two are the same, we have to differ the next one
        new_same = diff
        # If the last two are different, next can be any color except the previous one
        new_diff = (same + diff) * (k - 1)
        same = new_same
        diff = new_diff

    return same + diff
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  We do a single pass from 3 to n, constant work each.
- **Space Complexity:** O(1).  
  Only a few variables needed, no extra arrays.


### Potential follow-up questions (as if you’re the interviewer)  

- What if now *four* or more consecutive posts cannot have the same color?  
  *Hint: How does the DP state/recursion change if you can't have 4 in a row?*

- How would you print all possible configurations instead of counting them?  
  *Hint: Think recursion with backtracking, and prune invalid sequences early.*

- Could you generalize for any rule like "no more than m consecutive posts same color"?  
  *Hint: DP state would need to track consecutive counts up to m-1.*


### Summary
This problem uses a **dynamic programming pattern**—specifically, a "ways to reach here" rolling recurrence with overlapping subproblems. By focusing on "same" and "different" state transitions, we quickly solve the problem in O(n) time and O(1) space, a classic example of state compression in DP. This can be extended to other "no more than m in a row" coloring, tiling, or arrangement tasks.