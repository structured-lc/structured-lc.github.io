### Leetcode 1037 (Easy): Valid Boomerang [Practice](https://leetcode.com/problems/valid-boomerang)

### Description  
Given three points in the 2D plane, each represented as a pair of integer coordinates, determine if they form a "boomerang."  
A valid boomerang must satisfy two conditions:  
- All **three points are distinct** (no duplicates).
- They are **not all in a straight line** (not collinear).

You return True if both conditions hold; otherwise, False.

### Examples  

**Example 1:**  
Input: `[[1,1],[2,3],[3,2]]`  
Output: `True`  
*Explanation: All points are distinct. These three points do not lie on a single straight line, so they form a valid boomerang.*

**Example 2:**  
Input: `[[1,1],[2,2],[3,3]]`  
Output: `False`  
*Explanation: All three points are distinct, but they lie on the same straight line (slope between every pair is identical), so this is not a boomerang.*

**Example 3:**  
Input: `[[0,0],[0,1],[0,2]]`  
Output: `False`  
*Explanation: All points are distinct, but they are on a vertical line, which means they are collinear.*

### Thought Process (as if you’re the interviewee)  
First, make sure the three points are all distinct—if not, immediately return False.

Then, check if the three points are collinear.  
- For three points A, B, C, they are collinear if the slope between A and B is the same as the slope between B and C.
- To avoid division (and potential division by zero), it's better to use the cross product.  
- If the area of the triangle formed by the three points is zero, they are collinear.  
- Formula:  
  - (y₂ - y₁) × (x₃ - x₂) == (y₃ - y₂) × (x₂ - x₁)  
  - Check for inequality: if not equal, they are **not** collinear → valid boomerang.

I prefer the cross product check because it's mathematically robust, concise, and avoids division or float precision concerns. This constant-time check is optimal for three points.

### Corner cases to consider  
- Points are the same: e.g., `[[1,1],[1,1],[2,3]]`
- All points on vertical or horizontal line
- Large/small integer values to ensure no overflow (in Python, handled naturally)
- Negative coordinates

### Solution

```python
def isBoomerang(points):
    # Unpack points for readability
    (x1, y1), (x2, y2), (x3, y3) = points
    
    # Check all points are distinct
    if points[0] == points[1] or points[1] == points[2] or points[0] == points[2]:
        return False

    # Check if the points are collinear using cross product
    # (y2-y1)*(x3-x2) != (y3-y2)*(x2-x1)
    return (y2 - y1) * (x3 - x2) != (y3 - y2) * (x2 - x1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1),  
  Only constant-time operations are performed irrespective of input values.
- **Space Complexity:** O(1),  
  No extra data structures proportional to input size; just some variables for coordinates.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you are given N points and need to find all unique boomerangs from them?  
  *Hint: Think about combinations (choose any 3), and optimize how you determine if each triple is a boomerang.*

- Could you implement an integer overflow-proof version in a language with bounded integer types?  
  *Hint: Carefully consider order of operations, and possible use of larger data types if available.*

- If points have floating point coordinates, how would you handle precision issues?  
  *Hint: Consider using an epsilon value when comparing for collinearity instead of strict equality.*

### Summary
This problem leverages the concept of **collinearity in 2D geometry**, specifically using the cross product of vectors to avoid precision and division issues. The pattern—checking if three points are not on a line—is foundational in computational geometry and appears in many convex hull and polygon problems. The coding pattern is a direct, constant-time formula and highlights clean geometric reasoning.