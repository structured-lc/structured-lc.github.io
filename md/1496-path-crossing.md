### Leetcode 1496 (Easy): Path Crossing [Practice](https://leetcode.com/problems/path-crossing/)

### Description  
Given a string path, where each character is 'N', 'S', 'E', or 'W', representing moves one unit north, south, east, or west on a 2D grid starting at (0,0), determine if the path crosses itself (i.e., visits any coordinate more than once).

### Examples  

**Example 1:**  
Input: `"NES"`  
Output: `False`  
*Explanation: The path moves to (0,1), (1,1), (1,0); all coordinates distinct, so no crossing.*

**Example 2:**  
Input: `"NESWW"`  
Output: `True`  
*Explanation: Path: (0,0) → (0,1) → (1,1) → (1,0) → (0,0) → (-1,0); revisits (0,0) after steps, so path crosses.*

**Example 3:**  
Input: `"NNSWWEWS"`  
Output: `True`  
*Explanation: Visits a coordinate already visited earlier.*


### Thought Process (as if you’re the interviewee)  
- At each step, track the path's current (x, y) position.
- Use a set to store all visited coordinates. Before moving to a new location, check if it has already been visited—if yes, return True as the path crosses.
- Brute-force idea is to store a list of coordinates and check membership, but set has O(1) lookup and insert.
- To optimize, encode (x, y) as a tuple or a unique integer (hashing) so it can be efficiently inserted and checked in the set.
- Early exit improves efficiency once a repeated position is found.


### Corner cases to consider  
- Path is empty string: returns False (no movement).
- Path has only one move.
- Path returns to origin.
- Path loops back mid-path.


### Solution

```python
def is_path_crossing(path: str) -> bool:
    # Start at (0, 0) and add origin to visited set
    x, y = 0, 0
    visited = set()
    visited.add((x, y))
    for move in path:
        if move == 'N':
            y += 1
        elif move == 'S':
            y -= 1
        elif move == 'E':
            x += 1
        elif move == 'W':
            x -= 1
        # Check if we have been to this coordinate before
        coord = (x, y)
        if coord in visited:
            return True
        visited.add(coord)
    return False
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), where n is length of path; each move is processed once with O(1) operations.
- **Space Complexity:** O(n), for storing up to n+1 visited coordinates.


### Potential follow-up questions (as if you’re the interviewer)  
- Can you modify the function to return the coordinates where the first crossing occurs?  
  *Hint: Store coordinate when crossing is detected and return it.*
- What if diagonal moves are allowed?  
  *Hint: Expand movement logic for NE, NW, SE, SW.*
- How would you handle very long paths with memory constraints?  
  *Hint: Optimize the spatial hashing or use rolling windows if allowed.*

### Summary
This problem is a classic application of hash set membership checking and path simulation. The pattern used here—tracking state while iterating over a sequence—applies broadly to cycle detection, grid navigation, and simulation problems.

### Tags
Hash Table(#hash-table), String(#string)

### Similar Problems
