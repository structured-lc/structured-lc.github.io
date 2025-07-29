### Leetcode 2103 (Easy): Rings and Rods [Practice](https://leetcode.com/problems/rings-and-rods)

### Description  
Given a string representing rings placed on rods, each consecutive pair of characters describes a ring: the first character is the color ('R', 'G', 'B'), and the second is the rod number ('0'-'9'). A rod can have multiple rings of any color.  
The task: **Count how many rods have at least one ring of all three colors (R, G, and B).**

### Examples  

**Example 1:**  
Input: `B0R0G0R9G9B9`  
Output: `2`  
*Explanation: Rod 0 has rings B, R, G (all three colors). Rod 9 has B, G, R (all three colors). So, answer is 2.*

**Example 2:**  
Input: `B0B6G0R6R0R6G9`  
Output: `1`  
*Explanation: Rod 0 has B, G, R (all three colors). Rod 6 only has R and B. Rod 9 only has G. Only rod 0 qualifies.*

**Example 3:**  
Input: `G4`  
Output: `0`  
*Explanation: Only rod 4 is used and only a green ring is present. No rod has all three colors.*

### Thought Process (as if you’re the interviewee)  
First idea:  
- For each rod (0-9), track which colors are placed on it.
- Parse the input string in steps of 2: the first is color, second is rod number.
- For each rod, maintain a set of colors seen.
- After parsing, count rods that have exactly 3 colors.

Optimization:  
- Because colors are only 'R', 'G', 'B', we can encode them as bits (e.g., R=1, G=2, B=4).
- Each rod is an integer (bitmask) — OR in the bit for each color.
- A rod with all 3 colors will have a bitmask of 7 (1|2|4).
- This approach is O(n) time and O(1) space (since there are always 10 rods).

Selected approach:  
- Bitmask per rod for efficiency and trivial lookup.

### Corner cases to consider  
- Empty input (no rings): output should be 0.
- All rings on one rod but missing one or more colors: output should be 0.
- Multiple rings of same color on same rod: should still only count once.
- Rings for only one color across all rods: output should be 0.
- All three colors, but each on different rods: output should be 0.

### Solution

```python
def countPoints(rings: str) -> int:
    # Array to represent the set of colors seen at each rod (0-9)
    color_mask = [0] * 10
    
    for i in range(0, len(rings), 2):
        color, rod = rings[i], int(rings[i + 1])
        
        # Map color to bit: R=1, G=2, B=4
        if color == 'R':
            color_bit = 1
        elif color == 'G':
            color_bit = 2
        else:  # color == 'B'
            color_bit = 4
        
        # Mark color presence using bitwise OR
        color_mask[rod] |= color_bit
    
    # Count rods where all 3 color bits are present (mask == 7)
    return sum(mask == 7 for mask in color_mask)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input string. We iterate through each ring pair once.
- **Space Complexity:** O(1). The rod array is always size 10, regardless of input. No dependence on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle more than three colors?
  *Hint: Consider using a bitmask with more bits, or use sets if the number of colors is unbounded.*

- Can you extend this solution to return the actual rod numbers with all colors?
  *Hint: Instead of just counting, collect their indices in a list and return it.*

- What if the rods were not labeled 0-9 but could be arbitrary integers?
  *Hint: Use a dictionary mapping rod numbers to bitmask or sets, instead of a fixed-size array.*

### Summary
This problem uses a **bitmasking** approach, which is efficient because the set of possible rods and colors is fixed and small. This pattern of encoding categories with bits is common in situations with small, known finite sets (like days of week, types, boolean flags). The idea also emphasizes how problem constraints (fixed number of rods, fixed colors) can lead to simple and efficient solutions over more general-purpose approaches (like dicts or sets).