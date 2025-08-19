### Leetcode 610 (Easy): Triangle Judgement [Practice](https://leetcode.com/problems/triangle-judgement)

### Description  
Given three positive integers representing the lengths of three line segments, determine whether these segments can form a triangle. To form a triangle, the sum of any two sides must be greater than the third side—this is known as the triangle inequality theorem. The problem provides a table (or a list) where each entry contains three values, and for each row, you need to return "Yes" if it forms a triangle, and "No" otherwise.

### Examples  

**Example 1:**  
Input: `x=13, y=15, z=30`  
Output: `No`  
*Explanation: 13 + 15 = 28 which is not greater than 30. So, they cannot form a triangle.*

**Example 2:**  
Input: `x=10, y=20, z=15`  
Output: `Yes`  
*Explanation: All the sums of two sides (10+20=30, 10+15=25, 15+20=35) are greater than the remaining side, so this is a valid triangle.*

**Example 3:**  
Input: `x=5, y=5, z=10`  
Output: `No`  
*Explanation: 5 + 5 = 10 is not greater than 10, so they cannot form a triangle.*


### Thought Process (as if you’re the interviewee)  
The brute-force approach is to check, for each group of three numbers, if the sum of any two sides is greater than the third. This can be directly applied by checking all three pairwise conditions:
- x + y > z
- x + z > y
- y + z > x

If all conditions are true, return "Yes", otherwise return "No".  
Sorting the sides doesn't make much difference in efficiency since only three numbers are involved; direct comparison is most straightforward. The problem is simple due to the constant number (three) of elements for each input, so the checks are both efficient and clear.

### Corner cases to consider  
- **Zero or negative side lengths:** The problem states positive integers, but still validate if inputs might include 0 or negatives.
- **Two sides sum exactly equals the third:** e.g., 2, 2, 4 (not a triangle).
- **All sides are equal:** e.g., 5, 5, 5 (should be valid).
- **Two sides much shorter than the third:** e.g., 1, 2, 100 (always invalid).
- **Large numbers:** Ensure logic holds for large side lengths.

### Solution

```python
def triangle_judgement(x, y, z):
    # Check triangle inequality for all pairs
    if x + y > z and x + z > y and y + z > x:
        return "Yes"
    else:
        return "No"

# Example usage for a list of inputs
inputs = [
    (13, 15, 30),
    (10, 20, 15),
    (5, 5, 10)
]

# Evaluate each input
for sides in inputs:
    result = triangle_judgement(*sides)
    print(f'Input: x={sides[0]}, y={sides[1]}, z={sides[2]}, Output: {result}')
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) per check (constant time for three comparisons). For n sets, overall O(n).
- **Space Complexity:** O(1), since no extra storage is needed beyond input variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle validating input if negative or zero values are possible?  
  *Hint: Check for `x > 0`, `y > 0`, and `z > 0` before proceeding.*

- What if you had to generalize this for n sides and check if they can form a convex polygon?  
  *Hint: For an n-gon, the sum of any n-1 sides must be greater than the remaining side.*

- What if the side lengths are floating point numbers (not integers)?  
  *Hint: Be careful with precision and edge cases with equality.*

### Summary
This problem demonstrates direct application of the triangle inequality theorem for three numbers. It uses constant-time logical checks, a pattern common in geometric validation problems and input filtering. The approach is simple, robust, and often appears in simulation, graphics, or geometry-related coding interviews.

### Tags
Database(#database)

### Similar Problems
