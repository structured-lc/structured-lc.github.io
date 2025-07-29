### Leetcode 2184 (Medium): Number of Ways to Build Sturdy Brick Wall [Practice](https://leetcode.com/problems/number-of-ways-to-build-sturdy-brick-wall)

### Description  
You are given a set of brick widths (bricks), and you must build a wall of a given height and width. Each row must be exactly the full width, using an unlimited number of bricks of any type in the list. For the wall to be sturdy, the vertical joints (where bricks meet, except the two edges) of adjacent rows must not align, i.e., no two joints from two adjacent rows can be at the same position (except at the walls' edges). Compute how many different ways you can build such a wall, modulo 1,000,000,007.

### Examples  

**Example 1:**  
Input: `height=2, width=3, bricks=[1,2]`  
Output: `2`  
*Explanation: The two ways are:  
Row1: 1,2; Row2: 2,1  
and  
Row1: 2,1; Row2: 1,2  
(joint positions in the two rows never align except at ends)*

**Example 2:**  
Input: `height=3, width=2, bricks=[1,2]`  
Output: `4`  
*Explanation:  
Each row can be [1,1] or [2], so 2 options per row.
Adjacent rows always avoid joint alignment (except at edges),
so total ways: 2 × 2 = 4.*

**Example 3:**  
Input: `height=2, width=4, bricks=[1,3]`  
Output: `1`  
*Explanation:  
Only single valid brick split: [1,3] or [3,1];  
Due to alignment, only one valid arrangement for sturdy wall.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try every possible way to lay bricks on each row such that the total width is met, and for every way in every row, check that it does not share any joint with the row above (except edges). Recursively generate all possible walls and count the valid ones.
  
- **Optimization:**  
  Realize that rows with the same joint pattern are structurally equivalent. So, generate all **unique joint patterns** for a row (set of internal joint positions for the given width and bricks). For each possible row “pattern,” precompute which other patterns are “compatible” (i.e., they don’t have any overlapping joint positions except at the ends).

  Use **dynamic programming**:  
  - State: (current height, current row pattern)
  - Base case: height == 1 (each row pattern is valid individually)
  - Transition: for each pattern in current row, sum over all compatible patterns from the previous row.
  - Use memoization or bottom-up DP as height increases to avoid recomputation.
  
  The answer is the sum of all valid configurations for the top row across all patterns.

- **Why this approach:**  
  Avoids exponential recomputation by grouping by joint patterns, so state space is much smaller than all wall layouts.  
  Main cost is in preprocessing (generating patterns, compatibility), but that's manageable thanks to input limits.

### Corner cases to consider  
- width or height is 1
- bricks has only one size
- bricks can’t sum to width (no possible layout)
- duplicate brick sizes in input
- wall too thin for largest brick
- wall too short for more than one row

### Solution

```python
MOD = 10**9 + 7

def buildWall(height, width, bricks):
    # Step 1: Generate all possible row patterns as sets of joint positions
    from collections import defaultdict

    def get_patterns(width, bricks):
        # Each pattern is a tuple of inner joint positions
        result = []
        def dfs(pos, joints):
            if pos == width:
                # Store as a set for easy overlap checks
                result.append(tuple(joints))
                return
            for b in bricks:
                next_pos = pos + b
                if next_pos > width:
                    continue
                if next_pos < width:
                    dfs(next_pos, joints + [next_pos])
                else:
                    dfs(next_pos, joints)
        dfs(0, [])
        return result

    patterns = get_patterns(width, bricks)
    pattern_ids = {p: i for i, p in enumerate(patterns)}
    n = len(patterns)

    # Step 2: Precompute compatible pattern pairs
    compat = [[] for _ in range(n)]
    for i in range(n):
        for j in range(n):
            # Check if pattern i and j have any common inner joints
            if set(patterns[i]) & set(patterns[j]):
                continue
            compat[i].append(j)

    # Step 3: DP (Bottom-up)
    dp = [1] * n  # At height 1, any pattern is allowed
    for _ in range(height - 1):
        new_dp = [0] * n
        for i in range(n):  # Current row
            for j in compat[i]:  # All compatible previous rows
                new_dp[i] = (new_dp[i] + dp[j]) % MOD
        dp = new_dp

    return sum(dp) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(S² × H), where S is the number of unique row patterns and H is height. This includes the compatibility check for S² pairs and the DP transitions for H rows. For each pattern, forming it is exponential in width but generally feasible for practical constraints.

- **Space Complexity:**  
  O(S² + S), for the compatibility table (S²), the row pattern storage (S), plus the DP arrays (S).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very wide walls where the number of patterns explodes?
  *Hint: Can you prune possible patterns or use symmetry?*

- What if there were limits on how many times each type of brick could be used per row?
  *Hint: State space would need to track brick counts as part of the pattern.*

- What changes if bricks can be rotated (different lengths if rotated)?
  *Hint: You’d need to include all usable brick dimensions when generating patterns.*

### Summary
This problem is a classic application of **state compression dynamic programming** and **bitmasking** (if joint positions are coded as bitmasks), combined with graph compatibility (valid transitions between row patterns). It’s similar to tiling problems and featured often in DP/set-state interviews. The tree of valid patterns and compatibility computation is common in setup-heavy combinatorial DP, especially for 2D vital-parts adjacency constraints.