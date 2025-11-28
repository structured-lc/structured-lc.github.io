### Leetcode 3024 (Easy): Type of Triangle [Practice](https://leetcode.com/problems/type-of-triangle)

### Description  
Given an integer array of size 3 representing possible side lengths of a triangle, determine the **type** of triangle they form — or if they can't form a triangle at all.  
- Return `"equilateral"` if all sides are equal.  
- Return `"isosceles"` if exactly 2 sides are equal.  
- Return `"scalene"` if all sides are different.  
- Return `"none"` if the sides can't form a valid triangle (i.e., if any two sides summed is not greater than the third).  
A triangle is **valid** if for every pair of sides, their sum is strictly greater than the third side.

### Examples  

**Example 1:**  
Input: `[3,3,3]`,  
Output: `"equilateral"`  
*Explanation: All sides are equal, so it's equilateral.*

**Example 2:**  
Input: `[5,5,8]`,  
Output: `"isosceles"`  
*Explanation: Only two sides are equal and all triangle inequalities are satisfied.*

**Example 3:**  
Input: `[3,4,5]`,  
Output: `"scalene"`  
*Explanation: All sides differ. All triangle inequalities are satisfied, so it's scalene.*

**Example 4:**  
Input: `[1,2,3]`,  
Output: `"none"`  
*Explanation: 1 + 2 is not greater than 3, so a triangle can't be formed.*

### Thought Process (as if you’re the interviewee)  
First, **check for triangle validity** using the triangle inequality: for any sides a, b, c: a + b > c, b + c > a, and a + c > b.  
Sorting the array simplifies the check: after sorting, if sides = [x, y, z] with x ≤ y ≤ z, then just verify x + y > z.

If valid, identify the triangle type:
- If all three sides are the same → `"equilateral"`
- Else if exactly two sides are the same → `"isosceles"`
- Else → `"scalene"`

Sorting also makes equality checks easy (adjacent values).  
Time/space trade-off is negligible at size 3, but sorting is straightforward and bug-proof at this scale.

### Corner cases to consider  
- Sides with zeros or negative values (invalid as triangle sides).
- Sides that can’t form a triangle (violate triangle inequality, e.g., [1, 2, 4]).
- All sides equal, but zero (e.g., [0, 0, 0]: not a triangle).
- Two sides equal but can't form triangle (e.g., [1, 1, 2]).
- Unordered sides (do not assume sorted input).

### Solution

```python
def triangleType(nums):
    # Sort sides for easy comparison and triangle check
    nums.sort()
    a, b, c = nums

    # First, check that all are positive
    if a <= 0:
        return "none"

    # Check triangle inequality: a + b > c
    if a + b <= c:
        return "none"

    # If all three sides are equal
    if a == c:
        return "equilateral"

    # If exactly two sides are equal
    if a == b or b == c:
        return "isosceles"

    # Otherwise, all sides are different
    return "scalene"
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1). Sorting a fixed-size (3 elements) array is constant time; all other checks are O(1).
- **Space Complexity:** O(1). No extra space usage; only constant auxiliary variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle floating-point side lengths?  
  *Hint: Consider floating-point precision and equality checks.*

- What if the input size could be larger and represent multiple triangles?  
  *Hint: Process every consecutive triplet, or sliding window.*

- Can you implement this without sorting?  
  *Hint: Use direct comparison for triangle inequality and equality checks.*

### Summary
This solution uses **sorting for symmetry**, reducing triangle validity and type detection to a few simple comparisons. This is a classic geometry/toy validation pattern, similar to other "identify category given rules" problems. The array size is fixed, so performance is constant time; this technique is widely applicable to geometric object filtering and basic rule-checking problems.


### Flashcard
Type of Triangle (Easy)

### Tags
Array(#array), Math(#math), Sorting(#sorting)

### Similar Problems
