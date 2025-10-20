### Leetcode 1066 (Medium): Campus Bikes II [Practice](https://leetcode.com/problems/campus-bikes-ii)

### Description  
On a 2D campus grid, you have **N workers** and **M bikes** (N ≤ M). Each has a unique (x, y) coordinate.  
**Goal:** Assign each worker exactly one unique bike such that the **sum of Manhattan distances** between workers and their assigned bikes is **minimized**.  
- Manhattan distance: For points (x₁, y₁) and (x₂, y₂): \|x₁−x₂\| + \|y₁−y₂\|  
- Return the **minimum possible sum**.  

### Examples  

**Example 1:**  
Input: `workers = [[0,0], [2,1]], bikes = [[1,2], [3,3]]`  
Output: `6`  
*Explanation: Assign bike₀→worker₀ and bike₁→worker₁. Manhattan distances:  
worker₀-bike₀: |0-1|+|0-2| = 1+2=3,  
worker₁-bike₁: |2-3|+|1-3| = 1+2=3.  
Total = 3+3 = 6.*

**Example 2:**  
Input: `workers = [[0,0],[1,1],[2,0]], bikes = [[1,0],[2,2],[2,1]]`  
Output: `4`  
*Explanation: One optimal way:  
worker₀-bike₀: |0-1|+|0-0| = 1  
worker₁-bike₂: |1-2|+|1-1| = 1  
worker₂-bike₁: |2-2|+|0-2| = 2  
Total = 1+1+2 = 4.*

**Example 3:**  
Input: `workers = [[0,0]], bikes = [[99,99]]`  
Output: `198`  
*Explanation: Only possible: |0-99|+|0-99| = 99+99 = 198.*

### Thought Process (as if you’re the interviewee)  
- The goal is to **assign each worker a unique bike** for minimum sum of distances — classic assignment/combinatorial problem.
- **Naive/brute force:** Try all possible assignments (N! permutations). This is feasible since N ≤ 10 (max 10! ≈ 3.6 million).
- **Optimize:**  
  - Use **backtracking (DFS)** to assign bikes recursively to each worker and track used bikes.
  - Further improvement: Use **bitmask DP** to track states (which bikes assigned), and cache minimum results for subproblems (worker index, used bikes).
  - For BFS approach, use priority queue (Dijkstra's style) to always expand the lowest distance states first.
- **Why bitmask/DFS?** Small N, expensive but manageable with DP memoization. Faster than pure brute-force.

### Corner cases to consider  
- Fewer workers than bikes (M > N).
- Only one worker or one bike.
- All positions at origin, or all workers/bikes on same spot (should be distinct by constraints).
- Workers/bikes aligned in row/col (same x or y).
- Large coordinates (verify no overflow).

### Solution

```python
def assignBikes(workers, bikes):
    n = len(workers)
    m = len(bikes)
    
    from functools import lru_cache
    
    # Precompute all worker-bike distances
    dists = [[abs(wx - bx) + abs(wy - by) for bx, by in bikes] for wx, wy in workers]
    
    @lru_cache(maxsize=None)
    def dfs(w_idx, used_mask):
        # Base case: all workers assigned
        if w_idx == n:
            return 0
        
        min_total = float('inf')
        for b in range(m):
            if not (used_mask & (1 << b)):
                cand = dists[w_idx][b] + dfs(w_idx + 1, used_mask | (1 << b))
                min_total = min(min_total, cand)
        return min_total
    
    return dfs(0, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m × 2ᵐ)  
    - For each worker (n) and possible bike assignment (m), and for each possible state of assigned bikes (2ᵐ masks).
    - Feasible due to small limits (m ≤ 10).
- **Space Complexity:** O(2ᵐ × n) for the memoization cache + O(n×m) for the distance table.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there were hundreds of workers or bikes?  
  *Hint: Would need more efficient algorithms, e.g., Hungarian Algorithm.*

- Can it be solved with a greedy strategy?  
  *Hint: Greedy assignment may fail to find minimum; need to examine global min.*

- What if workers and bikes come in real-time (streaming)?  
  *Hint: Need an online algorithm. Decisions may have to be made without knowledge of future arrivals; might use a priority queue per event.*

### Summary
This problem is a **combinatorial assignment problem**, handled efficiently via **bitmask DP/backtracking with memoization** owing to tight input constraints.  
The pattern is common for small \( n \) optimization over permutations (DFS+bitmask), also seen in scheduling, robot assignment, and distributed resource allocation problems.


### Flashcard
Use backtracking or bitmask DP to assign bikes to workers, minimizing total distance by exploring all assignments (N ≤ 10).

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Backtracking(#backtracking), Bit Manipulation(#bit-manipulation), Bitmask(#bitmask)

### Similar Problems
- Campus Bikes(campus-bikes) (Medium)