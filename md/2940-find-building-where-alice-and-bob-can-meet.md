### Leetcode 2940 (Hard): Find Building Where Alice and Bob Can Meet [Practice](https://leetcode.com/problems/find-building-where-alice-and-bob-can-meet)

### Description  
You're given an array of building heights, `heights`, where heights[i] is the height of the iᵗʰ building (0-indexed). Alice starts at building a and Bob starts at building b. Both can move only rightwards (to a higher-indexed building) and only to buildings with greater height than their current one. For multiple queries [a, b], find the smallest index of a building (right of both) where both Alice and Bob can meet, or -1 if none exists. They can only meet at a building if both can reach it independently, following these movement rules.

### Examples  

**Example 1:**  
Input: `heights = [1,3,2,5,4,7,8], queries = [[0, 3], [2, 4], [5, 6]]`  
Output: `[5, 5, 6]`  
*Explanation: Alice (from 0) and Bob (from 3) can both reach building 5 (height 7). Alice: 0→1→3→5. Bob: 3→5. For [2,4], both reach 5 as well. For [5,6], they are already on or next to the highest buildings rightward.*

**Example 2:**  
Input: `heights = [2,4,5,3,6,8,9], queries = [[1, 2], [2, 3], [0, 6]]`  
Output: `[4, 4, -1]`  
*Explanation: From 1 and 2, both can reach building 4 (height 6). For [2,3], both can reach building 4. For [0,6], no building to the right exists for them to meet.*

**Example 3:**  
Input: `heights = [5,6,2,8], queries = [[0,2], [3,2], [1,1]]`  
Output: `[3,-1,1]`  
*Explanation: Alice (0) and Bob (2) reach 3. For [3,2], neither can move further and cannot meet again. For [1,1], both start on building 1 (answer 1).*

### Thought Process (as if you’re the interviewee)  
The brute-force approach is:  
- For each query [a, b], generate all buildings Alice can reach from a, and all that Bob can reach from b, then find the smallest index in the intersection that is strictly to the right of both a and b.  
- But generating reachable buildings for every start is too slow for large input.

Optimization:  
- For each building, precompute the **next greater building** to the right (monotonic stack).
- Use this to simulate where Alice/Bob can go: for a given start, we can quickly "jump" to the next taller building, and repeat until out of bounds.
- For each query, simulate Alice's and Bob's jumps separately, collect their reachable sets (or even better, since jumps are strictly increasing indices, do a two pointers walk to merge their paths).
- There’s a faster way: For each start, store the sequence of reachable indices. Meeting point is the smallest index in both lists greater than both starts.

With further optimization, since moves always go to the right and heights strictly increase, we can binary search or use pointer merging on their respective paths.

Due to large constraints, an O(n + q) solution is needed. Precomputing next-greater paths (or ancestors) for jumping (like binary lifting) allows skips in O(log n).

Trade-offs: Binary lifting is space and setup heavy, but scales best for high q and long paths.

### Corner cases to consider  
- Alice and Bob start at the same building: answer is that index.
- Alice or Bob are already at the tallest building and can't move further.
- No taller building exists for either Alice or Bob after their starting index.
- Arrays of length 1: both must be at 0 to meet.
- Multiple queries: queries may overlap, efficient solution must handle this.

### Solution

```python
from typing import List

def find_building(heights: List[int], queries: List[List[int]]) -> List[int]:
    n = len(heights)
    # Precompute for each building the next greater to the right
    next_greater = [-1] * n
    stack = []
    for i in range(n-1, -1, -1):
        # Maintain monotonic stack: strictly decreasing heights
        while stack and heights[stack[-1]] <= heights[i]:
            stack.pop()
        next_greater[i] = stack[-1] if stack else -1
        stack.append(i)

    # For each building, precompute its "jump path": sequence of next greater indices
    jump_paths = [[] for _ in range(n)]
    for i in range(n):
        cur = i
        while True:
            nxt = next_greater[cur]
            if nxt == -1:
                break
            jump_paths[i].append(nxt)
            cur = nxt

    res = []
    for a, b in queries:
        if a == b:
            res.append(a)
            continue
        # Two pointers walking Alice's and Bob's jump paths
        i, j = 0, 0
        path_a = [a] + jump_paths[a]
        path_b = [b] + jump_paths[b]
        # Since all paths are increasing, merge like merge-sorted  
        pa, pb = 0, 0
        candidate = -1
        while pa < len(path_a) and pb < len(path_b):
            if path_a[pa] == path_b[pb] and path_a[pa] > max(a, b):
                candidate = path_a[pa]
                break
            if path_a[pa] < path_b[pb]:
                pa += 1
            elif path_b[pb] < path_a[pa]:
                pb += 1
            else:
                # Same index, but maybe not right of both
                if path_a[pa] > max(a, b):
                    candidate = path_a[pa]
                    break
                pa += 1
                pb += 1
        res.append(candidate)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + q × k) where k is max number of jumps any start can make. Preprocessing the next greater building: O(n). For each query, the merged walk is O(jump steps), effectively O(log n) per query in the average/worst case for nice data. Acceptable for constraints (n, q ≤ 5×10⁴).
- **Space Complexity:** O(n²) in worst case for jump_paths, but generally much less if buildings' heights are often strictly increasing or random. Can be optimized via binary lifting (not implemented above for simplicity).

### Potential follow-up questions (as if you’re the interviewer)  

- How can you further reduce the per-query time from O(k) to O(log k)?
  *Hint: Can you preprocess ancestor jumps for log-scale skips (binary lifting)?*
- What if Alice and Bob could move left as well as right?
  *Hint: How would next-greater logic change to handle both directions?*
- Suppose the meeting does not have to be minimal index, but minimal height?
  *Hint: After path walk, choose with min height among overlaps rather than min index.*

### Summary
This problem is a classic application of **monotonic stack** (for next greater element right), followed by efficient path finding (either via direct jump chains or merge through sorted lists). The coding techniques (stack, two pointers, preprocess for repeated queries) are common in interval, path, and ancestor-jump optimization problems such as binary lifting or jump links for sparse tables. The pattern appears in various next-greater, interval, and ancestor-type interview questions.