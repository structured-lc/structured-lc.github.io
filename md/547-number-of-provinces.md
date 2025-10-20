### Leetcode 547 (Medium): Number of Provinces [Practice](https://leetcode.com/problems/number-of-provinces)

### Description  
Given an \(n \times n\) adjacency matrix `isConnected`, where `isConnected[i][j] = 1` if city \(i\) and city \(j\) are directly connected, and 0 otherwise, return the **number of provinces**. A province is a group of directly or indirectly connected cities, and no other cities outside of the group.  
It's the same as finding the **number of connected components** in an undirected graph where each node represents a city.

### Examples  

**Example 1:**  
Input: `isConnected = [[1,1,0],[1,1,0],[0,0,1]]`  
Output: `2`  
*Explanation: Cities 0 and 1 are directly connected; city 2 is separate. So there are two disconnected groups (provinces).*

**Example 2:**  
Input: `isConnected = [[1,0,0],[0,1,0],[0,0,1]]`  
Output: `3`  
*Explanation: Each city is isolated, so each is its own province.*

**Example 3:**  
Input: `isConnected = [[1,1,1],[1,1,1],[1,1,1]]`  
Output: `1`  
*Explanation: All cities are connected directly/indirectly, so there is just one province.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  For each city, mark all other cities it can reach using DFS or BFS. Each time you find a city that hasn't been visited before, start a DFS/BFS and mark all reachable cities as visited. Count how many times you have to start a new DFS/BFS as the number of provinces.
- **Optimization:**  
  This is an undirected graph connectivity problem. Instead of exponential solutions, an O(\(n^2\)) DFS, BFS, or Union-Find (Disjoint Set Union - DSU) is efficient and standard practice.
- **Trade-offs:**  
  - DFS/BFS is easier to implement with the adjacency matrix.
  - Union-Find is more optimal for dynamic connectivity or frequent union/check operations but requires a bit more coding.

I would go with the **DFS** approach for clarity and readability, since the city's connected matrix is suitable for iterating and marking visited directly.

### Corner cases to consider  
- Only one city: `isConnected = [[1]]` (should return 1)
- Completely connected graph (all cities interconnected)
- No two cities connected (all ones on the diagonal, rest are zeros)
- Duplicate or symmetric connections (matrix always symmetric)
- Very large number of cities (test for performance)

### Solution

```python
def findCircleNum(isConnected):
    n = len(isConnected)
    visited = [False] * n  # Track which cities have been visited
    
    def dfs(city):
        for neighbor in range(n):
            # If there is a connection and we haven't visited the neighbor yet
            if isConnected[city][neighbor] == 1 and not visited[neighbor]:
                visited[neighbor] = True
                dfs(neighbor)  # Visit the neighbor

    provinces = 0
    for city in range(n):
        if not visited[city]:
            provinces += 1     # Starting a new DFS means a new province
            visited[city] = True
            dfs(city)
    return provinces
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(\(n^2\)), where \(n\) is the number of cities. Each connection is checked once in the adjacency matrix.
- **Space Complexity:** O(\(n\)) for the `visited` list, and in the worst case O(\(n\)) additional for the recursion stack in DFS.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the graph was *dynamic* and connections could be added/removed?  
  *Hint: Union-Find / Disjoint Set Union with path compression improves efficiency for dynamic connectivity queries.*

- How would you write this using *BFS* instead of DFS?  
  *Hint: Use a queue to visit neighbors iteratively.*

- Could you solve this in-place, using the matrix only and minimizing extra space?  
  *Hint: Try marking visited in the matrix itself, or use the diagonal as a visited marker.*

### Summary
This problem is a classic example of the **connected components** pattern in graph theory, commonly solved using **DFS, BFS, or Union-Find**.  
It's fundamental and appears in problems involving friend circles, grid islands, or connectivity queries. The DFS/BFS approach is both efficient and interview-friendly when adjacency matrices are given.


### Flashcard
Count connected components using DFS/BFS/Union-Find; each unvisited node starts a new component.

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Graph(#graph)

### Similar Problems
- Number of Connected Components in an Undirected Graph(number-of-connected-components-in-an-undirected-graph) (Medium)
- Robot Return to Origin(robot-return-to-origin) (Easy)
- Sentence Similarity(sentence-similarity) (Easy)
- Sentence Similarity II(sentence-similarity-ii) (Medium)
- The Earliest Moment When Everyone Become Friends(the-earliest-moment-when-everyone-become-friends) (Medium)
- Detonate the Maximum Bombs(detonate-the-maximum-bombs) (Medium)