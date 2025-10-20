### Leetcode 2604 (Hard): Minimum Time to Eat All Grains [Practice](https://leetcode.com/problems/minimum-time-to-eat-all-grains)

### Description  
You are given two arrays: one for the positions of hens and one for the positions of grains, both on a 1D number line. Each **hen** can move left/right 1 unit per second and can consume any grain at the same location. In one second, a hen can only move but can eat any number of grains at her current spot. Multiple hens can eat the same grain if they arrive at the same time.  
Find the **minimum time** required so that all grains are eaten by hens (using any optimal movement and assignments).

### Examples  

**Example 1:**  
Input: `hens = [3,6,7], grains = [2,4,7,9]`  
Output: `2`  
*Explanation:  
- Hen at 3 → eats grain at 2 (1 sec).  
- Hen at 6 → eats grain at 4 (2 sec).  
- Hen at 7 → eats grains at 7 and 9 (2 sec).  
- All grains are covered in 2 seconds, and it's impossible in less.*

**Example 2:**  
Input: `hens = [5,10], grains = [6,7,8,9,10]`  
Output: `1`  
*Explanation:  
- Hen at 5 → moves to 6 (1 sec), eats 6.  
- Hen at 10 → already at 10, eats it and moves backward, eating 9, 8, 7 in 1 sec each, but as all hens move in parallel, all grains can be covered in 1 second since hens work simultaneously.*

**Example 3:**  
Input: `hens = [1], grains = `  
Output: `99`  
*Explanation:  
- The only hen at 1 must travel to 100, needing 99 seconds.*

### Thought Process (as if you’re the interviewee)  
Start with the brute-force:  
Try all possible assignments for each grain to a hen, compute the time taken for each, and take the maximum over all grains — but this leads to exponential possibilities and is not feasible (hens and grains can be up to 10⁵).

Optimized approach:  
- Key insight: The problem has **monotonicity** — if it’s possible to eat all grains in t seconds, it’s also possible in any t' > t.
- Therefore, we can **binary search** the answer t (from 0 up to a large upper bound, like the maximum distance).
- For a given t, greedily assign grains to hens by double-pointers:
  - Sort both hens and grains.
  - For each hen at position x, try to "cover" a range of grains that she can reach in t sec.
  - For each grain at position y, if |x-y| ≤ t, let this hen eat as many grains as possible within her reachable interval (using pointer advancement).
- If all grains are covered by hens in t seconds, we can try a smaller t; otherwise, we need larger t.

This is efficient: O(N log M), where N = number of grains, M = answer search space.

### Corner cases to consider  
- No hens or no grains (return 0 — if there’s nothing to eat, or nothing to eat it, instant or impossible).
- Grains and hens at same spots.
- Only one grain and/or one hen (simple calculation).
- All hens on one side, all grains on the other (worst-case travel).
- Multiple hens at same spot.
- Multiple grains at same spot.

### Solution

```python
def minimumTimeToEatAllGrains(hens, grains):
    # Sort hens and grains for greedy pointer assignment
    hens.sort()
    grains.sort()
    
    def can_eat_all(t):
        # Pointer for grains
        g = 0
        for h in hens:
            # If all grains are eaten, return True early
            if g == len(grains):
                return True
            # Each hen starts at position h and can cover interval [h-t, h+t]
            # She must maximize number of grains she can eat in t sec
            # Advance g as long as grain is within reachable
            left, right = h-t, h+t
            # Try to eat as many consecutive grains as possible within her coverage
            # For each starting grain position within [left, right],
            # Hen can cover symmetric reach, or try to "go" left then right.
            start = g
            # For each hen, she can cover continuous chunk of grains in several movement patterns:
            # Either go all left then right, or right then left
            # But since all movements take time, maximum reach is given by:
            # For each possible starting grain within hen's range, 
            # set rightmost grain that can be covered under t moves using one of two strategies:
            # (1) go left to y, then right to furthest reachable from y continuing for remaining time
            # (2) go right to y, then left to furthest left
            while g < len(grains) and abs(grains[g] - h) <= t:
                # Maximum grains that this hen can eat in this move
                left_dist = abs(grains[g] - h)
                # Option 1: go to leftmost, then right (cost: left, then all right)
                # max_right = grains[g] + (t - left_dist)
                # Eat all grains in [grains[g], grains[g] + (t - 2*left_dist)] ⩽ h+t
                # Greedy: Since we scan sequentially, it's OK to consume all possible grains within h+t
                g += 1
            # Now, the next grain is out of reach for this hen
        # If all grains have been eaten
        return g == len(grains)
    
    # Binary search the minimum t
    left, right = 0, max(abs(grains[-1] - hens[0]), abs(grains[0] - hens[-1]))
    answer = right
    while left <= right:
        mid = (left + right) // 2
        if can_eat_all(mid):
            answer = mid
            right = mid - 1
        else:
            left = mid + 1
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N log D), where N is max(len(hens), len(grains)), and D is the distance between farthest hen and grain. At each binary search step (log D), we scan all hens and grains in O(N).
- **Space Complexity:**  
  O(N), mainly for sorting input arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- If each hen can only eat k grains, how would you change your approach?  
  *Hint: Each hen's range now has a quota; need to track counts/grains assigned per hen.*

- What if hens and grains are placed in a 2D grid rather than a line?  
  *Hint: Use Manhattan distances; think of Hungarian algorithm for assignment/min-cost matching.*

- If some grains are poisonous for some hens (i.e., not all hens can eat all grains), how will you modify your check?  
  *Hint: Need to treat it as a bipartite matching.*

### Summary
This is a classical greedy + binary search ("binary search the answer") problem. Sorting both inputs allows for efficient greedy assignment via two pointers. Binary search finds the smallest feasible time. This strategy appears repeatedly in allocation, resource scheduling, and assignment problems (e.g., minimum days to process, minimum capacity/transports, etc.). The pattern is:  
1. Transformation to decision version (“can it be done in t?”),  
2. Use binary search for optimal t,  
3. For each t, efficiently check feasibility via greedy or simulation.


### Flashcard
Binary search the answer t; for each t, check if hens can eat all grains within t seconds.

### Tags
Array(#array), Two Pointers(#two-pointers), Binary Search(#binary-search), Sorting(#sorting)

### Similar Problems
- Kth Smallest Number in Multiplication Table(kth-smallest-number-in-multiplication-table) (Hard)