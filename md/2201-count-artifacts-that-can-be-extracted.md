### Leetcode 2201 (Medium): Count Artifacts That Can Be Extracted [Practice](https://leetcode.com/problems/count-artifacts-that-can-be-extracted)

### Description  
You’re given an n × n grid with artifacts buried, where each artifact is defined by its top-left and bottom-right coordinates [(r₁, c₁, r₂, c₂)]. Each artifact forms a rectangle, occupying all cells within those two points. A list of positions to dig is given; an artifact can be *extracted* if every cell it occupies has been dug. Find how many artifacts can be completely extracted.

### Examples  

**Example 1:**  
Input: `n=2, artifacts=[[0,0,0,0],[0,1,1,1]], dig=[[0,0],[0,1]]`  
Output: `1`  
*Explanation: Two artifacts — the first covers (0,0), the second covers (0,1) and (1,1). Only (0,0) and (0,1) are dug; (1,1) is not, so only the first artifact is fully uncovered and can be extracted.*

**Example 2:**  
Input: `n=2, artifacts=[[0,0,0,0],[0,1,1,1]], dig=[[0,0],[0,1],[1,1]]`  
Output: `2`  
*Explanation: All three grid cells occupied by artifacts are dug, so both artifacts can be extracted.*

**Example 3:**  
Input: `n=3, artifacts=[[0,0,0,1],[1,0,1,1],[2,0,2,0]], dig=[[0,0],[0,1],[1,1]]`  
Output: `2`  
*Explanation:  
Artifact 1: (0,0),(0,1) - both dug  
Artifact 2: (1,0),(1,1) - only (1,1) dug  
Artifact 3: (2,0) - not dug  
So only artifacts 1 can be extracted.*

### Thought Process (as if you’re the interviewee)  
- First, for each artifact, I need to determine if all its cells have been dug.
- The most naive/brute-force approach is: for each artifact, for each cell it covers, check if it was dug (e.g., search in the dig list). This is slow: up to 10⁵ artifacts and 4 cells per artifact, thousands of checks against the dig list.
- To optimize, I can make a set of all dug cells for O(1) lookup. Then, for each artifact, enumerate all its covered cells and check if each is present in the dug set.
- Since no artifacts overlap and each covers at most 4 cells, this approach is efficient enough.

### Corner cases to consider  
- dig covers no artifact completely  
- All dig entries are empty (no cell dug)  
- Each artifact is a single cell  
- Artifacts touching the border of the grid  
- Artifacts with the same area but at different locations  
- All artifacts already completely dug

### Solution

```python
def digArtifacts(n, artifacts, dig):
    # Put all dug cells in a set for O(1) lookup
    dug_positions = set((r, c) for r, c in dig)
    
    count = 0
    for r1, c1, r2, c2 in artifacts:
        can_extract = True
        # Check all cells occupied by this artifact
        for r in range(r1, r2 + 1):
            for c in range(c1, c2 + 1):
                if (r, c) not in dug_positions:
                    can_extract = False
                    break
            if not can_extract:
                break
        if can_extract:
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(A × K), where A = number of artifacts, K = max cells per artifact (≤4). Each artifact, we check up to 4 cells, and each lookup is O(1). Building the dug set is O(D), where D = len(dig), so total time is O(D + A × K).

- **Space Complexity:**  
  O(D) for the dug_positions set. No other significant extra structures are needed.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the grid is very large, and you cannot afford to create a set of all dug positions?
  *Hint: Think about coordinate hashing, or compressed bitmaps if memory is critical*

- Can you return the indices of all extractable artifacts, not just the count?
  *Hint: Store successful artifact indices during the check*

- What if artifacts can overlap?
  *Hint: You’ll need to track, for each grid cell, which artifacts occupy it; maybe build a cell-to-artifact map.*

### Summary
This problem uses a common *set for fast lookup* pattern to quickly check membership of cells. The solution is efficient due to the problem constraints (no overlaps, at most 4 cells per artifact, unique digs) and is a typical “grid scan with lookups” question, seen in other problems involving coverage, connected components, or region queries. The technique can be generalized to problems involving grid masking or coordinate membership checks.

### Tags
Array(#array), Hash Table(#hash-table), Simulation(#simulation)

### Similar Problems
- Maximal Square(maximal-square) (Medium)