### Leetcode 1182 (Medium): Shortest Distance to Target Color [Practice](https://leetcode.com/problems/shortest-distance-to-target-color)

### Description  
Given an array **colors** containing only the integers 1, 2, or 3 (denoting three possible colors), answer several **queries**.  
Each query is a pair `[i, c]` where `i` is an index in the `colors` array, and `c` (1, 2, or 3) is the target color.  
For each query, return the **shortest distance** from index `i` to any position in the array where the color is exactly `c`.  
If no such element exists in the array, return `-1`.  
The distance between two indices is the absolute difference of their indices.

### Examples  

**Example 1:**  
Input: `colors = [1,1,2,1,3,2,2,3,3]`, `queries = [[1,3],[2,2],[6,1]]`  
Output: `[3,0,3]`  
*Explanation:  
- For query `[1,3]`: index 1, looking for color 3. The nearest 3 is at index 4: |1 - 4| = 3.  
- For query `[2,2]`: index 2, looking for color 2. It's already at index 2: |2 - 2| = 0.  
- For query `[6,1]`: index 6, looking for color 1. The closest 1 is at index 3: |6 - 3| = 3.*

**Example 2:**  
Input: `colors = [1,2]`, `queries = [[0,3]]`  
Output: `[-1]`  
*Explanation:  
- Only colors 1 and 2 exist, so there is no 3 in the array. Return -1.*

**Example 3:**  
Input: `colors = [2,1,2,2,3,1,2,1]`, `queries = [[4,2],[0,1],[7,3]]`  
Output: `[0,1,3]`  
*Explanation:  
- Query `[4,2]`: index 4, looking for color 2. The closest is index 3 or 6: min(|4-3|, |4-6|) = 1, but at index 4 itself there's no 2.  
- Correction: index 4 is 3, but left (index 3) is color 2 (|4-3|=1), right (index 6) is color 2 (|6-4|=2), but in the array, color 2 is at index 3, so shortest is 1.  
- Query `[0,1]`: nearest 1 is at index 1: |0-1|=1.  
- Query `[7,3]`: nearest 3 is at index 4: |7-4|=3.*

### Thought Process (as if you’re the interviewee)  
**Brute-force:**  
- For each query, scan the entire array to find indices with the target color, and return the minimal absolute difference to `i`.
- O(n) time per query leads to O(q * n) overall, which is inefficient if there are many queries.

**Optimal Approach (Preprocessing):**  
- Since only colors 1, 2, and 3 exist, we can precompute for each index and each color:
  - Distance to the nearest occurrence of that color to the **left**.
  - Distance to the nearest occurrence of that color to the **right**.

- To do this:  
  - Perform two passes:
    - Left-to-right: For each color, track last seen, and update distance.
    - Right-to-left: Same idea.

- For each query, use the precomputed values to get distances to nearest on left and right, then return the smaller one.

- This approach gives O(n × 3 + q), where n is length of colors and q is number of queries.  
- We choose this approach for efficiency and because the queries are independent and repetitive scanning is wasteful.

### Corner cases to consider  
- If the color doesn’t exist in the array, return -1.
- Query is at the very beginning or end.
- Multiple queries for indices with no matching color.
- Input arrays of length 1.
- Queries for colors outside 1-3 (should not occur, but check input specs).

### Solution

```python
from typing import List

def shortestDistanceColor(colors: List[int], queries: List[List[int]]) -> List[int]:
    n = len(colors)
    INF = float('inf')
    
    # Precompute left nearest positions for each color
    left = [[INF] * 3 for _ in range(n)]
    last_seen = [INF] * 3
    for i in range(n):
        color = colors[i] - 1
        last_seen[color] = i
        for c in range(3):
            left[i][c] = last_seen[c]
    
    # Precompute right nearest positions for each color
    right = [[INF] * 3 for _ in range(n)]
    last_seen = [INF] * 3
    for i in range(n-1, -1, -1):
        color = colors[i] - 1
        last_seen[color] = i
        for c in range(3):
            right[i][c] = last_seen[c]
    
    result = []
    for idx, color in queries:
        c = color - 1
        
        # Distance to left nearest
        left_idx = left[idx][c]
        right_idx = right[idx][c]
        dist = INF
        
        if left_idx != INF:
            dist = min(dist, abs(idx - left_idx))
        if right_idx != INF:
            dist = min(dist, abs(right_idx - idx))
        
        if dist == INF:
            result.append(-1)
        else:
            result.append(dist)
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Precompute left and right arrays: O(n × 3)  
  - Processing queries: O(q)  
  - **Total:** O(n + q), dominated by O(n) preprocessing (constants are small because only 3 colors).
  
- **Space Complexity:**  
  - Extra arrays used: left (n × 3), right (n × 3), last_seen (3)  
  - **Total:** O(n), as 3n is linear.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if colors are not limited to 3 but could be up to 10⁵ different colors?  
  *Hint: Can you preprocess using dictionaries or sparse data structures?*

- If queries arrive in an online fashion (i.e., after previous answers), can you quickly update if colors list changes?  
  *Hint: Think about segment trees or balanced BSTs for range queries and updates.*

- What if the definition of "distance" changes (e.g., circular array, or weighted distances)?  
  *Hint: How can you change preprocessing to account for new distance metrics?*

### Summary
This problem uses a classic two-pointer and preprocessing technique: for each index, store the nearest left and right positions of each color, and answer queries in constant time.  
This "precompute nearest for each class/type" pattern is useful for range query problems and can be adapted to cases like nearest greater/smaller element, or nearest occurrence for strings and intervals.

### Tags
Array(#array), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming)

### Similar Problems
