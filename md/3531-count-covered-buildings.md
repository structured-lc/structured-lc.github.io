### Leetcode 3531 (Medium): Count Covered Buildings [Practice](https://leetcode.com/problems/count-covered-buildings)

### Description  
You are given a city of size n × n and a list of buildings' coordinates. Each building is uniquely identified by its (x, y) position. A building is called **covered** if there is at least one building to its left (same row, lower column), right (same row, higher column), above (same column, lower row), and below (same column, higher row). Return the number of covered buildings.

### Examples  

**Example 1:**  
Input: `n = 3, buildings = [[0,1],[1,0],[1,1],[1,2],[2,1]]`  
Output: `1`  
*Explanation: Only building [1,1] has buildings above ([0,1]), below ([2,1]), to the left ([1,0]), and to the right ([1,2]).*

**Example 2:**  
Input: `n = 4, buildings = [[0,0],[0,1],[0,2],[0,3],[1,0],[1,1],[1,2],[1,3]]`  
Output: `0`  
*Explanation: No building has others on all four sides (the second row does not have any building above or below).*

**Example 3:**  
Input: `n = 5, buildings = [[2,1],[2,3],[3,2],[1,2],[2,2]]`  
Output: `1`  
*Explanation: Building [2,2] is covered by [2,1](left), [2,3](right), [1,2](above), and [3,2](below).*

### Thought Process (as if you’re the interviewee)  
My first brute-force thought is, for each building, check if there exist buildings in all four directions—above, below, left, and right. For each building, we can scan through all others to check for each direction, but with k buildings this is O(k²). That is inefficient.

To optimize, I can preprocess:
- Group all buildings by their `x` and `y` coordinates.
- For each `x`, keep a sorted list of all `y`'s (`x_to_y` mapping).
- For each `y`, keep a sorted list of all `x`'s (`y_to_x` mapping).

Then, for a building at (x, y):
- In its row: check if there exist another building with `y' < y` and `y' > y` (i.e., left and right).
- In its column: check if `x' < x` and `x' > x` (above and below).
Since lists are sorted, check if current coordinate is strictly not at the min/max of its group.

This reduces the time per building to O(1) after sorting.

### Corner cases to consider  
- No buildings (empty array) ⇒ Should return 0.
- Only one building ⇒ 0 covered.
- All buildings on the edge ⇒ None will be covered.
- Dense blocks with no buildings in the center ⇒ Only centrally located buildings with all four neighbors can be covered.
- Some coordinate lists have only one value.
- Duplicates (problem says unique positions, so shouldn't happen. But guard for that in code.)

### Solution

```python
from collections import defaultdict
from typing import List

def countCoveredBuildings(n: int, buildings: List[List[int]]) -> int:
    # Map x-coordinate to list of all y's (row → columns)
    x_to_y = defaultdict(list)
    # Map y-coordinate to list of all x's (column → rows)
    y_to_x = defaultdict(list)
    
    # Fill the mappings
    for x, y in buildings:
        x_to_y[x].append(y)
        y_to_x[y].append(x)
    
    # Sort the coordinate lists
    for ys in x_to_y.values():
        ys.sort()
    for xs in y_to_x.values():
        xs.sort()
    
    count = 0
    for x, y in buildings:
        # The row for x: all y's having x as row
        row = x_to_y[x]
        # The column for y: all x's having y as column
        col = y_to_x[y]
        # Need at least one smaller and one greater y in row (left and right)
        # and one smaller and one greater x in col (above and below)
        if (
            row[0] < y < row[-1] and
            col[0] < x < col[-1]
        ):
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k log k), where k = number of buildings. This is for sorting each coordinate list (k buildings overall). Checking if a building is covered is O(1) per building, after the preprocessing.
- **Space Complexity:** O(k), for storing the coordinate → list mapping (building locations).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the city is very sparse and n is very large?  
  *Hint: Use sparse data structures, avoid O(n²) grid.*

- How to modify if diagonal neighbors also count for covering?  
  *Hint: Update your neighbor search to consider 8 directions instead of 4.*

- Can you return not just the count but the list of covered building positions?  
  *Hint: Store covered coordinates instead of just counting, then output their list.*

### Summary
The approach uses coordinate grouping and sorting for constant-time neighbor checks per building. The pattern is *row/column hashing* and is common in grid and rectangle coverage problems. It helps avoid brute-force O(n²) and can be reused for other “find neighbor in row/col” grid queries.


### Flashcard
Preprocess buildings into x→y and y→x mappings; for each building, use binary search on sorted coordinate lists to check if neighbors exist in all four directions in O(log k) per building.

### Tags
Array(#array), Hash Table(#hash-table), Sorting(#sorting)

### Similar Problems
