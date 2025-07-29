### Leetcode 2978 (Medium): Symmetric Coordinates [Practice](https://leetcode.com/problems/symmetric-coordinates)

### Description  
Given a table of coordinates, find all **unique symmetric pairs** (x, y) such that for coordinates (x₁, y₁) and (x₂, y₂), the pair is symmetric if x₁ = y₂ and x₂ = y₁. Only include pairs where x ≤ y. If there are duplicate coordinates, only output distinct results, and order the output by x, then y ascending.

### Examples  

**Example 1:**  
Input:  
| X  | Y  |  
|----|----|  
| 20 | 20 |  
| 20 | 20 |  
| 20 | 21 |  
| 23 | 22 |  
| 22 | 23 |  
| 21 | 20 |  
Output:  
| x  | y  |  
|----|----|  
| 20 | 20 |  
| 20 | 21 |  
| 22 | 23 |  
*Explanation:  
- (20, 20): appears twice; symmetric with itself, report once.  
- (20, 21) and (21, 20): symmetric, only (20, 21) since 20 < 21.  
- (23, 22) and (22, 23): symmetric, only (22, 23) since 22 < 23.*

**Example 2:**  
Input:  
| X  | Y  |  
|----|----|  
| 5  | 10 |  
| 10 | 5  |  
| 5  | 5  |  
Output:  
| x  | y  |  
|----|----|  
| 5  | 5  |  
| 5  | 10 |  
*Explanation:  
- (5, 10) and (10, 5): symmetric, output (5, 10) only.  
- (5, 5): symmetric with itself.*

**Example 3:**  
Input:  
| X | Y |  
|---|---|  
| 2 | 3 |  
| 3 | 2 |  
| 4 | 4 |  
| 1 | 2 |  
Output:  
| x | y |  
|---|---|  
| 2 | 3 |  
| 4 | 4 |  
*Explanation:  
- (2, 3) and (3, 2): symmetric, only (2, 3).  
- (4, 4): symmetric with itself.  
- (1, 2): no symmetric counterpart.*

### Thought Process (as if you’re the interviewee)  
First, I’d clarify “symmetric pair” as: (x, y) is symmetric with (y, x).  
For each (x, y), check if (y, x) exists.

**Brute force:** For each coordinate, check every other coordinate for its symmetric. This is O(n²), which is slow for large n.

**Optimize:**  
- Use a set to store all coordinates for O(1) lookup.  
- For each (x, y), check if (y, x) is in the set and x ≤ y.  
- Avoid duplicates by only collecting each pair once, with x ≤ y.

**Trade-offs:**  
- The set lookup avoids O(n²) scanning.
- Ensures uniqueness by always storing (min(x, y), max(x, y)).

### Corner cases to consider  
- Coordinates with x = y (self-symmetric, must appear at least twice to count if duplicates matter).
- Duplicates: Only output each unique pair once.
- No symmetric counterpart.
- Input with only one coordinate.
- Large input size.

### Solution

```python
def find_symmetric_coordinates(coordinates):
    # Store all coordinates for fast lookup
    coord_set = set((x, y) for x, y in coordinates)
    seen = set()
    result = []
    
    # Visited set to avoid duplicates
    for x, y in coord_set:
        # Symmetric pair check: (y, x) exists
        if (y, x) in coord_set:
            # Always add with x ≤ y
            a, b = min(x, y), max(x, y)
            if (a, b) not in seen:
                result.append([a, b])
                seen.add((a, b))
    # Sort result by x, then y
    result.sort()
    return result

# Example usage:
# coordinates = [[20, 20], [20, 20], [20, 21], [23, 22], [22, 23], [21, 20]]
# print(find_symmetric_coordinates(coordinates))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of input coordinates, for set creation and lookup/per coordinate (amortized). Sorting adds O(k log k) where k is unique results.
- **Space Complexity:** O(n) for the set and output.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input is very large?  
  *Hint: Is it possible to avoid duplicate symmetric checks? Use hashing efficiently?*

- Extend for higher-dimension coordinates, e.g., (x, y, z) and (z, y, x) symmetry.  
  *Hint: How would you generalize the approach for arbitrary symmetry definitions?*

- If only outputting pairs where x < y (not x ≤ y), how would your solution change?  
  *Hint: Filter out self-symmetric coordinates.*

### Summary
This problem uses the **hash-set lookup pattern** to efficiently find coordinate pairs based on symmetry.  
The key is to model the symmetry, ensure only unique pairs by always storing (min, max), and avoid quadratic search using a set.  
Variations of this approach are common in two-sum/two-pointer problems and set membership tasks.