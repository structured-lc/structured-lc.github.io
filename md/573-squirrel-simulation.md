### Leetcode 573 (Medium): Squirrel Simulation [Practice](https://leetcode.com/problems/squirrel-simulation)

### Description  
You are given a grid defined by its height and width, a **squirrel start position**, a **tree position**, and a list of **nut positions** (all with grid coordinates). The squirrel must **collect all nuts one at a time**, carrying them to the tree after each collection. The squirrel moves in four directions (up, down, left, right) — one cell per move, and measures distance using **Manhattan distance**.  
Return the **minimum total distance** the squirrel needs to travel to collect all the nuts and place them under the tree, starting from its initial position.

### Examples  

**Example 1:**  
Input: `height = 5, width = 7, tree = [2, 2], squirrel = [4, 4], nuts = [[3,0],[2,5]]`  
Output: `22`  
*Explanation: The squirrel must start at [4,4], pick each nut one at a time, and bring it to the tree at [2,2]. The optimal path gives total moves of 22.*

**Example 2:**  
Input: `height = 5, width = 7, tree = [3,0], squirrel = [2,2], nuts = [[3,1],[0,0]]`  
Output: `12`  
*Explanation: For each nut, calculate the round-trip distance to the tree; except for the first nut, the squirrel starts from its initial position, not the tree.*

**Example 3:**  
Input: `height = 2, width = 2, tree = [0,1], squirrel = [1,1], nuts = [[1,0],[0,0]]`  
Output: `8`  
*Explanation: The squirrel must collect both nuts, and back-and-forth for each. Optimizing the order gives minimum distance.*

### Thought Process (as if you’re the interviewee)  
First, notice that **for every nut except the first**, the squirrel always starts at the tree:  
- For nut k: squirrel moves from tree → nut → tree (distance: 2 × dist(nut, tree)).  

But **for the very first nut**, the squirrel starts from its unique **start position** (not the tree).  
- For first nut: distance is dist(squirrel, nut) + dist(nut, tree).  

Thus, the total baseline distance (if the squirrel started each time from the tree) is `sum(2 × dist(nut, tree) for all nuts)`.  
But for the first nut, the path is (squirrel → nut → tree) instead of (tree → nut → tree), so we can **save** `dist(tree, nut) - dist(squirrel, nut)` for whichever nut we pick up first.

To minimize total distance:  
- Precompute the total (assuming each from tree)  
- Try each nut as first to see which gives maximal savings

**Why this is optimal:**  
- The only variable is the first trip. All other trips must start and end at the tree, so optimizing the first makes the total minimal.

### Corner cases to consider  
- No nuts (return 0).
- Squirrel starts on the tree.
- Some nuts are at the tree's position.
- All nuts at same position.
- Squirrel starts on top of a nut.
- Only one nut.

### Solution

```python
def minDistance(height, width, tree, squirrel, nuts):
    tr, tc = tree
    sr, sc = squirrel
    
    # Total cost if squirrel starts EVERY trip from tree
    total = 0
    max_saving = float('-inf')
    for nr, nc in nuts:
        dist_tree = abs(nr - tr) + abs(nc - tc)
        dist_squirrel = abs(nr - sr) + abs(nc - sc)
        total += 2 * dist_tree
        # Compute the saving by picking this nut first
        saving = dist_tree - dist_squirrel
        if saving > max_saving:
            max_saving = saving
    # Subtract best single saving (i.e., pick that nut first)
    return total - max_saving
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of nuts. For each nut, we compute distances and keep a running total.
- **Space Complexity:** O(1), only a few variables for tracking totals; no extra storage proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the squirrel could carry more than one nut at a time?  
  *Hint: Can you batch nuts per trip to the tree?*  

- What if not all moves cost the same, e.g., some cells are blocked or have weights?  
  *Hint: Need to use shortest path algorithms (like BFS or Dijkstra) instead of Manhattan distance.*

- How would things change if the tree or nuts could move, too?  
  *Hint: Would require repeated recalculation or dynamic programming.*

### Summary
This problem demonstrates a **greedy optimization pattern** mixed with mathematical simplification. By spotting that only the *first nut's collection* alters the starting point, the rest become deterministic. The technique relates to problems on minimizing round-trip costs where one initial leg can be optimized, a pattern applicable in logistics, robotics pickup/drop-off planning, and variations of the traveling salesman problem.