### Leetcode 2786 (Medium): Visit Array Positions to Maximize Score [Practice](https://leetcode.com/problems/visit-array-positions-to-maximize-score)

### Description  
Given a 0-indexed integer array **nums** and a positive integer **x**, you start at position 0 and can move from your current position *i* to any position *j* (i < j).  
- When you visit position *i*, you earn **nums[i]** points.
- If you move to a position with different parity (odd/even) from your current, you lose **x** points.

Calculate the **maximum total score** you can get starting at the first index, by visiting any set of subsequent indices in order.

### Examples  

**Example 1:**  
Input: `nums = [2,3,6,1,9,2]`, `x = 5`  
Output: `17`  
*Explanation: Start at index 0 (2, even). You can visit indices in this order: 0→2→4, earning 2+6+9 = 17 points.  
No parity switches needed, so no penalties are applied.*

**Example 2:**  
Input: `nums = [2,4,6,8]`, `x = 3`  
Output: `20`  
*Explanation: Visit all: 0→1→2→3 (all even). Total = 2+4+6+8 = 20, no penalties.*

**Example 3:**  
Input: `nums = [1,2,3,4,5,6]`, `x = 1`  
Output: `21`  
*Explanation:  
Possible optimal:  
- 0 (1), switch to 1 (2) with penalty: 1 + 2 - 1 = 2 (but if you always switch parity, you lose each time).  
- But better is to take a path with fewer switches.  
The best is to take all elements, switching parity at each step but paying only 1 penalty each time (as a part of the calculation), and the optimal path totals to 21.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try all possible paths, but since at every step you can jump to any next position, this leads to exponential time.
- **Observation:**  
  The **only constraint** is the **parity change penalty**. If you continue on the same parity, there is **no penalty**.
- **Dynamic Programming:**  
  - Maintain the best score so far if your last pick is **even** or **odd**.
  - For each position, consider:  
    - Continue using the same parity (no penalty).
    - Switch parity (incur -x penalty).
  - Update best scores for each parity as you traverse.
- **Why DP is better:**  
  - O(n) time by always carrying forward the best "odd-ending" and "even-ending" path.
  - O(1) or O(2) extra space for the two parities.
- **Tradeoffs:**  
  - Can't do better than O(n).  
  - Using just two variables for parities is clean and avoids extra DP arrays.

### Corner cases to consider  
- Single element array: should return that number.
- All numbers with the same parity: never pay penalty.
- Large x: avoid switching parity unless absolutely necessary.
- x = 0: no penalty, just sum all.
- Alternating odd/even array: must pay penalty at each step.
- Empty array: undefined by problem (skip).
- Negative numbers: penalty might counteract negative values in nums.

### Solution

```python
def maxScore(nums, x):
    # Track maximal score ending with even and odd number
    # parity 0 for even, 1 for odd
    even = float('-inf')
    odd = float('-inf')

    # Initialize with index 0
    if nums[0] % 2 == 0:
        even = nums[0]
    else:
        odd = nums[0]

    # Traverse from next position
    for v in nums[1:]:
        if v % 2 == 0:
            # Next is even; two cases:
            # Continue from previous even-parity chain (no penalty)
            # OR switch from odd (pay penalty x)
            # Compare to previous even, too: do not have to take every index
            prev_even = even  # Keep current value since we update even
            prev_odd = odd
            even = max(even + v, (odd - x) + v)
        else:
            # Next is odd
            prev_even = even
            prev_odd = odd
            odd = max(odd + v, (even - x) + v)

    # Return the best score finishing at either parity
    return max(even, odd)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Single pass through nums, and each update is O(1).
- **Space Complexity:** O(1)  
  Only extra space used is two variables for parities (`even`, `odd`).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can move **both forward and backward** in the array?  
  *Hint: Graph traversal, revisit with tracking visited.*

- How would you reconstruct the **path(s) yielding the max score**?  
  *Hint: Track previous choices or use parent pointers during DP.*

- What if the **penalty is not fixed**, but varies depending on parity value or index?  
  *Hint: DP state must include more info, may need a DP table.*

- Can you optimize for **time or space** if array is extremely large or streamed?  
  *Hint: How few variables can you use? Does streaming force single-pass logic?*

### Summary
This problem uses the **"two-state DP"** or **"separate track for each parity"** pattern, which is useful when only a local property (like parity or color) affects transitions and costs.  
Common in problems with "one or few switching penalties" and when all moves can only get better by considering the best so far for each class (parity here).  
Pattern appears in stock buy/sell problems, coloring, even/odd walking, and simplified state transitions.


### Flashcard
Use dynamic programming to track max score for even and odd positions, updating scores and applying penalty only when parity changes.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Jump Game II(jump-game-ii) (Medium)
- Stone Game(stone-game) (Medium)