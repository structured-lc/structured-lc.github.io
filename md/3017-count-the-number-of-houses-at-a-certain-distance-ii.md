### Leetcode 3017 (Hard): Count the Number of Houses at a Certain Distance II [Practice](https://leetcode.com/problems/count-the-number-of-houses-at-a-certain-distance-ii)

### Description  
Given \(n\) houses arranged in a line (numbered 1 to \(n\)), each connected to its immediate neighbors (i.e., house \(i\) is connected to \(i-1\) and \(i+1\)), and a single extra street directly connecting two houses, \(x\) and \(y\), your goal is:  
**For every \(k\) from 1 to \(n-1\), count how many pairs of houses have a minimum path (in terms of streets traveled) of \(k\) between them.**  
Return an array where result[\(k\)] is the number of unordered house pairs whose shortest path has length \(k\).

### Examples  

**Example 1:**  
Input=`n = 4, x = 2, y = 4`  
Output=`[3, 4, 1]`  
*Explanation: The house pairs at each distance are:  
- Distance 1: (1,2), (2,3), (3,4) → 3 pairs  
- Distance 2: (1,3), (2,4), (1,4), (2,4). (But (2,4) is shortcut by direct street, so shortest path is 1.) Adjust accordingly.*  

**Example 2:**  
Input=`n = 5, x = 1, y = 5`  
Output=`[4, 6, 4, 1]`  
*Explanation:  
Distance 1: (1,2), (2,3), (3,4), (4,5)  
Distance 2: (1,3), (2,4), (3,5), (1,5), (2,5), (1,4)  
...and so on, considering the shortcut 1-5.*  

**Example 3:**  
Input=`n = 3, x = 1, y = 2`  
Output=`[2, 1]`  
*Explanation:  
(1,2) directly connected (distance 1);  
(1,3) and (2,3) at distance 2 unless the extra street changes it.*  

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all pairs (i,j) \((1 ≤ i < j ≤ n)\), compute shortest path either along the line or via the shortcut, count pairs by their shortest distance.
  This gives O(n²) time — not feasible when n is large.

- **Optimize:**  
  For a line graph, the shortest path from i to j is |i-j|. The shortcut from x to y can create “shortcuts” for some pairs:
    - Going from i → x → y → j, or i → y → x → j, may be shorter than the direct line.
  For each pair, compute:  
    d₁ = |i-j| (direct)  
    d₂ = |i-x| + 1 + |j-y| (via shortcut)  
    d₃ = |i-y| + 1 + |j-x| (other way via shortcut)  
    minimal = min(d₁, d₂, d₃)  

  Instead of looping every pair, we can loop k from 1 to n-1, count pairs at each distance by leveraging symmetry and math:
    - For each possible pair distance k, base count = (n-k)
    - Adjust for pairs for which d₂ or d₃ is less than d₁

  **Final approach:** For k in 1 to n-1,  
    - Initialize answer[k] = n - k  
    - For all i in 1..n, check if using the shortcut gives a shorter path, increment accordingly (loop only through feasible ranges for efficiency).

### Corner cases to consider  
- n = 2 or n = 3 (very small city, few pairs)
- x == y (the shortcut is a loop, so no effective shortcut)
- x and y are neighbors (shortcut is redundant)
- The shortcut connects endpoints (e.g., 1 and n)
- Multiple pairs equidistant via multiple paths

### Solution

```python
def countOfPairs(n: int, x: int, y: int):
    # Ensure x < y for easier calculation
    if x > y:
        x, y = y, x

    # Answer array for k = 1 to n-1 (1-based indexing)
    ans = [0] * n

    for i in range(1, n+1):
        for j in range(i+1, n+1):
            # Direct path
            d1 = j - i
            # Path via the shortcut x <-> y
            d2 = abs(i - x) + 1 + abs(j - y)
            d3 = abs(i - y) + 1 + abs(j - x)
            d = min(d1, d2, d3)
            ans[d] += 1

    # Return ans[1:] (since ans[0] is unused)
    return ans[1:]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²).  
  We check all possible pairs (i,j) once where i < j. (There are about n²/2 such pairs.)
- **Space Complexity:** O(n).  
  Only need the answer array of size n.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve this in better than O(n²) time?  
  *Hint: Try to directly count ranges for which the shortcut gives shorter distance—use combinatorial counting, possibly with prefix sums.*

- What if there are multiple shortcuts given as extra streets?  
  *Hint: Can you generalize your approach to arbitrary extra edges on the graph? Would you need BFS?*

- How would you handle the case where roads form a tree or general graph?  
  *Hint: For general graphs, finding all pairs shortest path requires advanced algorithms—think Floyd-Warshall or BFS from each node.*

### Summary
This is a **graph distances** problem where most paths are predictable (linear), but a single shortcut “bends” these paths and demands systematic minimum distance calculation for all pairs.  
The approach is a classic **all-pairs shortest path** enumeration, optimized by math for the linear (path) case but brute-forced for the shortcut.  
This counting pattern arises in **distance queries** on trees/paths with perturbations (e.g., “how many pairs at distance k?”), **combinatorial counting**, and can be made efficient by exploiting symmetry when there are no cycles.