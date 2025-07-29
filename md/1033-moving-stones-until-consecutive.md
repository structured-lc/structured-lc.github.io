### Leetcode 1033 (Medium): Moving Stones Until Consecutive [Practice](https://leetcode.com/problems/moving-stones-until-consecutive)

### Description  
Given three stones placed at integer positions `a`, `b`, and `c` on the x-axis, each move consists of picking up the stone at either endpoint (smallest or largest position) and moving it to any unoccupied integer position between the two endpoint stones (not landing on the center stone). The goal is to determine:
- The **minimum** number of moves required to arrange the stones in three consecutive positions.
- The **maximum** number of moves it could take to do so.

Return an array `[min_moves, max_moves]`.

### Examples  

**Example 1:**  
Input: `a = 1, b = 2, c = 5`  
Output: `[1, 2]`  
*Explanation: Sorting, we have [1, 2, 5].  
- Minimum moves: Move the stone at 5 to 3 (`[1,2,3]`), done in 1 move.  
- Maximum moves: Move from 5 to 4, then from 4 to 3 (`[1,2,4]` → `[1,2,3]`), so 2 moves total.*

**Example 2:**  
Input: `a = 4, b = 3, c = 2`  
Output: `[0, 0]`  
*Explanation: After sorting, `[2,3,4]`—already consecutive, so no moves are needed.*

**Example 3:**  
Input: `a = 3, b = 5, c = 1`  
Output: `[1, 2]`  
*Explanation: Sorted positions: `[1,3,5]`.  
- Minimum: Move 1 to 2 or 5 to 4 (makes `[2,3,5]` or `[1,3,4]`, then final move to get them consecutive).  
But actually, moving 5 to 2 results in `[1,2,3]` in 1 move (since you cannot move onto 3), so minimum is 1.  
- Maximum: Move 1→2, 5→4 (two steps).*

### Thought Process (as if you’re the interviewee)  
First, **sort** the three positions so that `x < y < z`.  
Our only allowed move each time is to move an endpoint stone into a slot strictly between the endpoints, not covering the middle stone.  
The goal is that the stones become consecutive: `x+1, x+2, x+3`.

- **Brute-force** approach would be to try all possible moves at each step, but since there are only 3 stones and nearly fixed distance, this is overkill.
- We can **optimize** by focusing on the distances between stones:
    - If the stones are already consecutive (gaps of 1 between each), return `[0, 0]`.
    - If one of the gaps is 1 (i.e., two stones are adjacent), and the other gap is 2, then only one move is needed (move the endpoint next to the others).
    - Otherwise, the minimum number of moves is 2.

- For the **maximum moves**, always move the endpoint stones one space at a time into the available slots until all are consecutive. The number of such moves is simply `(z-x-2)` (total empty slots between endpoints).

### Corner cases to consider  
- Stones already consecutive: [a, b, c] = [2, 3, 4] → `[0, 0]`
- Two stones adjacent, the third two spaces away: [1, 2, 4]
- Two stones adjacent, third farther: [1, 2, 6]
- All stones widely spread: [1, 4, 8]

### Solution

```python
def numMovesStones(a: int, b: int, c: int):
    # Sort the positions
    x, y, z = sorted([a, b, c])

    # Calculate gaps between consecutive stones
    gap1 = y - x
    gap2 = z - y

    # If already consecutive, no moves needed
    if gap1 == 1 and gap2 == 1:
        return [0, 0]

    # Minimum moves:
    # 1. If any gap is 1 (adjacent) or 2 (one gap), only 1 move needed.
    if gap1 <= 2 or gap2 <= 2:
        min_moves = 1
    else:
        min_moves = 2

    # Maximum moves: fill all empty spaces between endpoints step by step
    max_moves = (z - x - 2)

    return [min_moves, max_moves]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1). Only a constant number of operations (sorting three numbers and simple calculations).
- **Space Complexity:** O(1). No additional data structures or recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- How would this change if you had **n stones** instead of 3?  
  *Hint: Think about generalizing gaps and similar endpoint movement rules.*

- What if **stones could be moved from anywhere**, not just the endpoints?  
  *Hint: Now, the minimum moves could change dramatically; perhaps a greedy sweep is possible.*

- Can you output the **actual move sequence** (not just counts)?  
  *Hint: Track positions after each move, simulate the process.*

### Summary
This problem is a good example of reasoning about **intervals and greedy movement** on a number line. It uses the **min-max pattern**: find the smallest and largest number of steps given constraints.  
The key insight is to avoid brute-force by leveraging the invariant that only endpoints can move and by analyzing position gaps. This approach—sorting and working with adjacent differences—can be found in other consecutive or rearrangement problems (like minimum moves to equal array elements, or arranging tokens on a line).