### Leetcode 3443 (Medium): Maximum Manhattan Distance After K Changes [Practice](https://leetcode.com/problems/maximum-manhattan-distance-after-k-changes)

### Description  
Given a string `s` representing moves on a 2D grid (`'N'`, `'S'`, `'E'`, `'W'`), and an integer `k` representing the max number of moves you can change to any other direction, what is the maximum Manhattan distance (|x| + |y|) from the origin `(0, 0)` that you can reach at any moment during or after performing the moves in order, changing up to `k` moves as you like?  
At each step you may choose to flip the direction of the current or any previous move (as long as total changes ≤ k), with the goal of maximizing the Manhattan distance at that point in your walk.

### Examples  

**Example 1:**  
Input: `s = "NWSE"`, `k = 1`  
Output: `3`  
*Explanation: Maximum achievable Manhattan distance is 3 by optimally flipping one move (e.g., flipping 'S' to 'N'). Step-by-step, you walk: N (0,1) → W (-1,1) → S (-1,0) → E (0,0). If you flip 'S' to 'N': (-1,2) → (0,2), max distance during your walk is 3.*

**Example 2:**  
Input: `s = "NSWWEW"`, `k = 3`  
Output: `6`  
*Explanation: With up to 3 changes, you can convert three moves to all be in a straight line to maximize Manhattan distance. The sum of the best possible alignment at any step is 6.*

**Example 3:**  
Input: `s = "NNEE"`, `k = 0`  
Output: `4`  
*Explanation: With no changes, just follow the steps: (0,1) → (0,2) → (1,2) → (2,2). Maximum Manhattan distance is |2| + |2| = 4.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:** Try all possible ways of changing up to k moves to any other direction and track the max Manhattan distance after each move. Since there are 4\*n options per move and up to k changes, it's exponential and not feasible for n up to 10⁵.
- **Observation:** The best possible Manhattan distance at any time is if you have a sequence of movements that all point in the same direction (e.g. all 'N' or all 'E'), as each contributes +1 to either x or y.
- **Optimization:**  
  - For any prefix of the moves, at each position i, calculate the furthest distance you can get with ≤ k changes up to that point.
  - Enumerate all possible pairs of directions ('NE', 'NW', 'SE', 'SW'): for each, simulate walking, greedily changing up to k moves not matching those directions, and count consecutive matches (treating k non-matching as aligned due to allowed changes). For each step, keep track of the current max distance.
  - For each scenario, the algorithm increments the current distance for moves in the “favored” directions, uses up a change for non-favored directions (if changes remain), and decrements if neither is possible.

- **Tradeoff:** This approach, by considering 4 meaningful direction pairs and greedy simulation, has linear complexity.

### Corner cases to consider  
- Empty move string (`s = ""`, `k` any): return 0  
- `k = 0` (no changes allowed): must follow steps as-is  
- All moves in one direction (max Manhattan naturally achieved)  
- Moves that cancel each other ('N' followed by 'S', etc.)  
- k ≥ n (can make every move whatever you want)  
- Only one move  
- Negative inputs (should not occur by constraints)

### Solution

```python
def maxDistance(s: str, k: int) -> int:
    # Possible direction pairs to maximize distance in one quadrant
    direction_pairs = [('N', 'E'), ('N', 'W'), ('S', 'E'), ('S', 'W')]
    n = len(s)
    max_ans = 0
    
    for d1, d2 in direction_pairs:
        changes = 0   # Number of non-{d1, d2} encountered so far
        dist = 0      # Current potential Manhattan distance
        ans = 0
        for ch in s:
            if ch == d1 or ch == d2:
                dist += 1
            elif changes < k:
                # Use a change here to convert to 'd1' or 'd2'
                dist += 1
                changes += 1
            else:
                dist -= 1
            if dist > ans:
                ans = dist
        if ans > max_ans:
            max_ans = ans
    return max_ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(4 × n) = O(n).  
  For each of 4 direction-pairs, we go through `s` once.
- **Space Complexity:** O(1) auxiliary (ignoring input/output).  
  No extra storage beyond counters; not counting input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your approach if moves can be made in arbitrary directions (not just 'N','S','E','W')?  
  *Hint: Generalize the quadrant method, perhaps using vectors and greedy selection.*

- What if you also had to report the path or the sequence of changes you made to achieve the max distance?  
  *Hint: Store parent/backtracking indices or keep track of move origins as you process.*

- If moves can be undone (move back in history) and you can change past moves, how does this affect your solution?  
  *Hint: Consider dynamic programming with state representing position and changes used.*

### Summary
This problem is a classic **greedy simulation with case enumeration**: for each of several “optimally aligned” directions, simulate the walk greedily making changes where most valuable, to maximize a one-sided metric (Manhattan distance). The pattern of **enumeration + greedy simulation** is common in path optimization problems, and the approach applies in many grid-walk, "fix K mistakes" or alignment-maximization scenarios.

### Tags
Hash Table(#hash-table), Math(#math), String(#string), Counting(#counting)

### Similar Problems
- As Far from Land as Possible(as-far-from-land-as-possible) (Medium)