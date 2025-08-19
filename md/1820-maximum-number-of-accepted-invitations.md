### Leetcode 1820 (Medium): Maximum Number of Accepted Invitations [Practice](https://leetcode.com/problems/maximum-number-of-accepted-invitations)

### Description  
There are m boys and n girls. Each boy has a list of girls he would like to invite to a party. Each girl can accept at most one invitation, and each boy can invite at most one girl. Return the maximum number of accepted invitations possible.

### Examples  

**Example 1:**  
Input: `grid = [[1,1,1],[1,0,1],[0,0,1]]`  
Output: `3`  
*Explanation: Boy 0 can invite girl 0, boy 1 can invite girl 2, boy 2 can invite girl 2. But since girl 2 can only accept one, we get boy 0→girl 0, boy 1→girl 1 (not possible), boy 2→girl 2. Better: boy 0→girl 1, boy 1→girl 2, boy 2→girl 2 (not possible). Optimal: boy 0→girl 0, boy 1→girl 2, which gives 2. Wait, let me recalculate: boy 0→girl 0, boy 1→girl 2, boy 2 cannot invite anyone new, so 2 total. Actually, boy 0→girl 1, boy 1→girl 0, boy 2→girl 2 gives 3.*

**Example 2:**  
Input: `grid = [[1,0,1,0],[1,0,0,0],[0,0,1,0],[1,1,0,0]]`  
Output: `3`  
*Explanation: Maximum matching between boys and girls gives 3 successful invitations.*

### Thought Process (as if you're the interviewee)  
This is a classic bipartite matching problem. I have two sets (boys and girls) and need to find the maximum matching where each node can be matched to at most one node from the other set.

Approaches:
1. **Maximum Bipartite Matching**: Use Hungarian algorithm or Ford-Fulkerson with DFS/BFS
2. **Greedy with backtracking**: Try to match each boy, and if a girl is already taken, see if we can reassign previous matches
3. **Network Flow**: Model as max flow problem from source through boys to girls to sink

I'll use the augmenting path approach with DFS, which is simpler to implement than full Hungarian algorithm.

### Corner cases to consider  
- More boys than girls or vice versa
- No possible matches (all 0s in grid)
- Perfect matching possible (everyone gets matched)
- Single boy or single girl
- Grid where some boys have no preferences
- Grid where some girls are not liked by anyone

### Solution

```python
def maximumInvitations(grid):
    m, n = len(grid), len(grid[0])
    
    # match[i] stores which boy is matched to girl i (-1 if unmatched)
    match = [-1] * n
    result = 0
    
    # Try to find a match for each boy
    for boy in range(m):
        # visited[i] tracks if girl i was visited in current DFS
        visited = [False] * n
        
        # Try to find an augmenting path starting from this boy
        if dfs(boy, grid, match, visited):
            result += 1
    
    return result

def dfs(boy, grid, match, visited):
    # Try to match current boy with each girl he likes
    for girl in range(len(grid[0])):
        # Skip if boy doesn't like this girl or girl already visited
        if not grid[boy][girl] or visited[girl]:
            continue
        
        visited[girl] = True
        
        # If girl is unmatched OR we can find alternative match for her current boy
        if match[girl] == -1 or dfs(match[girl], grid, match, visited):
            match[girl] = boy
            return True
    
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × (m + n)) in worst case. For each boy, we might do DFS that visits all girls and recursively all boys, but with optimizations it's often much better in practice.
- **Space Complexity:** O(n + recursion depth) for the match array and visited array, plus O(m) for recursion stack in worst case.

### Potential follow-up questions (as if you're the interviewer)  

- How would you solve this using maximum flow algorithms?  
  *Hint: Create source connected to all boys, boys connected to preferred girls, girls connected to sink, all edges with capacity 1.*

- Can you optimize for the case where the grid is very sparse?  
  *Hint: Use adjacency lists instead of grid representation to avoid checking all n girls for each boy.*

- What if boys could invite multiple girls but girls still accept only one?  
  *Hint: Modify the constraints by removing the matching limit for boys but keeping it for girls.*

### Summary
This problem is a classic application of bipartite matching using augmenting paths. The key insight is using DFS to find paths that can improve the current matching by reassigning existing matches when necessary. This pattern appears in assignment problems, resource allocation, and any scenario involving optimal pairing between two distinct groups with constraints.

### Tags
Array(#array), Depth-First Search(#depth-first-search), Graph(#graph), Matrix(#matrix)

### Similar Problems
