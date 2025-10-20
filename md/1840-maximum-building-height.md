### Leetcode 1840 (Hard): Maximum Building Height [Practice](https://leetcode.com/problems/maximum-building-height)

### Description  
Given n buildings labeled from 1 to n, you must assign each building a **non-negative integer height** such that:
- The height of the 1ˢᵗ building is **0**.
- The height difference between any two adjacent buildings is at most **1** (i.e., height[i+1] - height[i] ≤ 1).
- Some buildings have maximum height restrictions, restrictions = [[id₁, maxHeight₁], ...], meaning building idᵢ's height ≤ maxHeightᵢ.

Find the **maximum possible height** of any building if all constraints are followed.

### Examples  

**Example 1:**  
Input: `n = 5, restrictions = [[2,1],[4,1]]`  
Output: `2`  
*Explanation: heights can be [0,1,2,1,2]. The tallest is 2.*

**Example 2:**  
Input: `n = 6, restrictions = []`  
Output: `5`  
*Explanation: heights can be [0,1,2,3,4,5]. The tallest is 5 (just a staircase up).*

**Example 3:**  
Input: `n = 10, restrictions = [[5,3],[2,5],[7,4],[10,3]]`  
Output: `5`  
*Explanation: heights can be [0,1,2,3,3,4,4,5,4,3]. The tallest is 5.*

### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  Try all possible assignments for building heights; for each, check all constraints.  
  **Problem:** n can be up to 10⁹—this is hopelessly slow!

- **Observations:**  
  - The restriction on adjacent buildings forms a graph; we can only go up/down at most 1 per step.
  - Restrictions create “caps” we can’t exceed at specific buildings.
  - Must propagate these caps because changing one may affect feasible heights for others.

- **Optimization approach:**  
  1. Sort all restrictions by building index and always insert the trivial restriction: building 1 with height 0, and building n with unrestricted cap (unless already restricted).
  2. **Forward pass:** For each restriction, ensure it’s not higher than its left neighbor’s maxHeight + distance between buildings.
  3. **Backward pass:** For each restriction, ensure it’s not higher than its right neighbor’s maxHeight + distance.
  4. Between any two restrictions, the maximal achievable height must form a “triangle”—up at most 1 per step until the peak, then down to the next.
  5. For each restricted segment, calculate the highest midpoint reachable, then take the overall max across all segments.

  The algorithm simply propagates restrictions so all are feasible, then checks the maximal peak between each pair.

### Corner cases to consider  
- No restrictions (should just ramp up by 1 each time)
- Restriction at the last building, but not before
- All maxHeights set to 0 (forces everything to be zero)
- Restrictions inconsistent with distance: impossible, but problem guarantees are you can always satisfy them
- Only two buildings

### Solution

```python
def maxBuilding(n, restrictions):
    # Insert a restriction for building 1 (must be height 0)
    restrictions.append([1,0])

    # If n is not in restrictions, insert a restriction for building n with no cap (maxHeight = n-1)
    if not any(r[0] == n for r in restrictions):
        restrictions.append([n, n-1])

    # 1. Sort restrictions by building index
    restrictions.sort()

    # 2. Forward pass: propagate min feasible heights left to right
    for i in range(1, len(restrictions)):
        prev = restrictions[i-1]
        curr = restrictions[i]
        # Can't be higher than prev+distance
        curr[1] = min(curr[1], prev[1] + (curr[0] - prev[0]))

    # 3. Backward pass: right to left
    for i in range(len(restrictions)-2, -1, -1):
        nxt = restrictions[i+1]
        curr = restrictions[i]
        curr[1] = min(curr[1], nxt[1] + (nxt[0] - curr[0]))

    # 4. Get max possible building height between every pair of restrictions
    max_height = 0
    for i in range(1, len(restrictions)):
        left = restrictions[i-1]
        right = restrictions[i]
        # The maximal peak between left and right:
        # We can go up one per step from left[1], or down from right[1]
        dist = right[0] - left[0]
        possible_peak = (left[1] + right[1] + dist) // 2
        max_height = max(max_height, possible_peak)

    return max_height
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m log m) where m = number of restrictions (due to sorting). Each pass and calculation is O(m).
- **Space Complexity:** O(m) for storing the processed restrictions.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the difference allowed between adjacent buildings is k, not 1?  
  *Hint: How do you modify forward/backward passes and restriction propagation for a difference of k?*

- How to efficiently update the answer if a new restriction is added online?  
  *Hint: Segment trees or balanced BST structures for dynamic cap propagation.*

- How would you construct the actual height assignment for all buildings, not just the max?  
  *Hint: Simulate heights incrementally using the processed restriction caps.*

### Summary
This approach leverages **restriction propagation**—a common technique with interval and monotonicity constraints, using *forward/backward sweeps* to ensure all caps are feasible globally. The triangle-peak calculation between each fixed cap applies to "maximum staircase under multiple ceilings" and is broadly usable for propagation problems with local difference limits and global caps.


### Flashcard
Propagate height caps from restrictions, then compute max possible heights between caps; O(m log m) for m restrictions.

### Tags
Array(#array), Math(#math), Sorting(#sorting)

### Similar Problems
