### Leetcode 2923 (Easy): Find Champion I [Practice](https://leetcode.com/problems/find-champion-i)

### Description  
Given a square grid representing match results between teams, where `grid[i][j] = 1` means team i defeated team j, find the team that defeated **all** other teams. This "champion" is the row index in the grid where every other column (except itself) is 1. If such a team exists, return its index.

### Examples  

**Example 1:**  
Input:  
```
grid = [
 [1, 1, 1],
 [0, 1, 0],
 [0, 1, 1]
]
```  
Output: `0`  
*Explanation:* Team 0 defeated team 1 and team 2 (all except itself), so it is the champion.

**Example 2:**  
Input:  
```
grid = [
 [0, 1],
 [1, 0]
]
```  
Output: `-1`  
*Explanation:* Neither team defeated all other teams.

**Example 3:**  
Input:  
```
grid = [
 [1]
]
```  
Output: `0`  
*Explanation:* Only one team exists, so it's trivially the champion.

### Thought Process (as if you’re the interviewee)  
First, I would consider the brute-force method: for each team (row in grid), check if it defeated every other team by verifying that every element except the diagonal one is 1. This would be an O(n²) approach, iterating over all rows and columns.

I would then consider that since the matrix is square and relatively small, O(n²) is acceptable, so I'd proceed with this direct check.

No obvious way to optimize to less than O(n²) since you need to inspect each relationship at least once, unless there were sorted or additional information constraints.

Therefore, finalize on direct checking per team, returning the index of the one with all victories.

### Corner cases to consider  
- Single team (1×1 grid)  
- No champion exists (no row with all 1's except the diagonal)  
- All teams defeated nobody (all zeros except diagonal)  
- Multiple teams with identical maximum victories but none defeat all others  
- Diagonal elements might be 1 or 0; champion check should ignore them

### Solution

```python
def findChampion(grid):
    n = len(grid)  # number of teams
    
    for i in range(n):
        # Count victories excluding self-match
        victories = 0
        for j in range(n):
            if i != j and grid[i][j] == 1:
                victories += 1
        
        # If victories equal total opponents, i is champion
        if victories == n - 1:
            return i
    
    # No champion found
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), since we iterate over each element in the n × n grid once.  
- **Space Complexity:** O(1), no extra space other than a few variables is used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the grid was very large, how could you optimize memory or runtime?  
  *Hint: Precompute victory counts, or use early break when a row misses a 1.*

- How would you find all champions if multiple exist?  
  *Hint: Instead of returning immediately, store all valid indices.*

- Could you represent teams and results as a graph and use graph algorithms?  
  *Hint: Think of teams as nodes and wins as directed edges.*

### Summary
This problem uses a straightforward iteration pattern checking each row for a condition applied to all columns. Essentially, it's a typical 2D matrix scan pattern seen in adjacency matrix problems for graphs, especially for dominance or "universal winner" checks. It is a common pattern for tournament or graph dominance problems.

### Tags
Array(#array), Matrix(#matrix)

### Similar Problems
