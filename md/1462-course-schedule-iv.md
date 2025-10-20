### Leetcode 1462 (Medium): Course Schedule IV [Practice](https://leetcode.com/problems/course-schedule-iv)

### Description  
You're given `numCourses` labeled from `0` to `numCourses - 1`. There are prerequisite pairs `[a, b]` meaning to take course `b` you must have first taken course `a`. You're also given queries `queries[j] = [uⱼ, vⱼ]`: for each query, determine if `uⱼ` is a prerequisite (directly or indirectly) of `vⱼ`. For each query, return `true` or `false`.

### Examples  

**Example 1:**  
Input: `numCourses = 2, prerequisites = [[1,0]], queries = [[0,1],[1,0]]`  
Output: `[false,true]`  
*Explanation: 0 is not a prerequisite of 1, but 1 is a prerequisite of 0 (direct relationship).*

**Example 2:**  
Input: `numCourses = 2, prerequisites = [], queries = [[1,0],[0,1]]`  
Output: `[false,false]`  
*Explanation: No prerequisites exist, so neither course is a prerequisite of the other.*

**Example 3:**  
Input: `numCourses = 3, prerequisites = [[1,2],[1,0],[2,0]], queries = [[0,1],[1,0],[1,2]]`  
Output: `[false,true,true]`  
*Explanation: 1→0, 1→2, 2→0, so 1 is a prerequisite for both 0 and 2 (direct and indirect).*

### Thought Process (as if you’re the interviewee)  
- This is a graph problem where each course is a node, and prerequisites are directed edges.
- For each query, we need to check if there is a path from `u` to `v` in the graph (i.e., can you reach `v` from `u` via prerequisites?).
- Brute-force DFS for every query is possible, but with many queries or a dense prerequisite list, it's inefficient.
- Instead, preprocess **all prerequisite relationships** between courses. Since the number of courses is small (typically ≤100), we can use the **Floyd-Warshall algorithm** to compute the transitive closure: for every course pair `(i, j)`, store if `i` is a prerequisite of `j` (directly or indirectly).
- After transitive closure, we can answer each query in O(1).

### Corner cases to consider  
- No prerequisites at all.
- Cycles in prerequisites. (This doesn't affect the answer; just need to check reachable relationships.)
- Queries where `uⱼ` and `vⱼ` are the same.
- Multiple edges and duplicate prerequisites.
- Disconnected graph (unrelated course clusters).

### Solution

```python
def checkIfPrerequisite(numCourses, prerequisites, queries):
    # Initialize the matrix: prereq[i][j] is True if i is a prereq of j
    prereq = [[False] * numCourses for _ in range(numCourses)]
    
    # Add direct edges
    for pre, course in prerequisites:
        prereq[pre][course] = True
    
    # Floyd-Warshall: for all a, b, c, if prereq[a][b] and prereq[b][c] -> prereq[a][c]
    for k in range(numCourses):
        for i in range(numCourses):
            for j in range(numCourses):
                if prereq[i][k] and prereq[k][j]:
                    prereq[i][j] = True
    
    # Answer each query
    return [prereq[u][v] for u, v in queries]
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n³ + q), where n = numCourses and q = number of queries. The triple loop is from Floyd-Warshall; query answers are O(q).
- **Space Complexity:** O(n²) for the prerequisite matrix.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if the graph was too large to fit a matrix in memory?  
  *Hint: Use adjacency lists and BFS/DFS per query when n is large or extremely sparse.*

- Can you return all possible chains of prerequisites between two courses?  
  *Hint: Use DFS and backtrack to collect all possible paths.*

- What if the queries arrive online (e.g., streaming)?  
  *Hint: Use dynamic BFS/DFS or maintain a cache for recently asked queries.*

### Summary
Uses classic graph transitive closure via Floyd-Warshall to answer reachability/precondition queries in O(1) per query after O(n³) setup. Common in DAG/path closure problems. Useful pattern for static graphs and repeated online queries.


### Flashcard
Precompute reachability between all course pairs (e.g., Floyd-Warshall), then answer each query by checking if u can reach v.

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Graph(#graph), Topological Sort(#topological-sort)

### Similar Problems
