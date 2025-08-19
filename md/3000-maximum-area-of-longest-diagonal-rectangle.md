### Leetcode 3000 (Easy): Maximum Area of Longest Diagonal Rectangle [Practice](https://leetcode.com/problems/maximum-area-of-longest-diagonal-rectangle)

### Description  
Given a list of rectangles, where each rectangle is described by its length and width, find the area of the rectangle that has the **longest diagonal**. If there are multiple rectangles with the same diagonal length, choose the rectangle with the **maximum area** among them. The diagonal of a rectangle is calculated with the Pythagorean theorem: diagonal = sqrt(length² + width²).

### Examples  

**Example 1:**  
Input: `dimensions = [[9,3],[8,6]]`  
Output: `48`  
*Explanation: Rectangle 0 has diagonal ≈ 9.49, area = 27. Rectangle 1 has diagonal = 10, area = 48. Longest diagonal is 10, so return 48.*

**Example 2:**  
Input: `dimensions = [[3,4],[4,3]]`  
Output: `12`  
*Explanation: Both rectangles have the same diagonal of 5. Their areas are both 12, so return the maximum area, which is 12.*

**Example 3:**  
Input: `dimensions = [[1,1]]`  
Output: `1`  
*Explanation: Only one rectangle, diagonal ≈ 1.41, area = 1.*

### Thought Process (as if you’re the interviewee)  
First, I need to calculate the diagonal of each rectangle, which is the hypotenuse given by sqrt(length² + width²). Since comparing diagonals directly would require handling decimals, and sqrt(a) > sqrt(b) if and only if a > b, I can compare the squared lengths directly to avoid floating point issues and avoid unnecessary computations.

My plan:
- For each rectangle, compute diagonal² = length² + width² and area = length × width.
- Keep track of the largest diagonal² found so far, and the largest area seen for that diagonal.
- If I find a rectangle with a larger diagonal², update the maximum diagonal² and the area.
- If I find a rectangle with the same diagonal², but a larger area, update the area.

I'm choosing this single-pass O(n) approach for its simplicity and efficiency.

### Corner cases to consider  
- Only one rectangle.
- Multiple rectangles with the same diagonal — pick the rectangle with the maximum area.
- All rectangles have the same length and width.
- Length or width is 1 (minimal size).
- Large numbers (to check for integer overflow, but within constraints this is OK).

### Solution

```python
def max_area_of_longest_diagonal_rectangle(dimensions):
    max_diag_sq = 0    # Max diagonal squared seen so far
    max_area = 0       # Max area for the max diagonal seen so far

    for length, width in dimensions:
        diag_sq = length * length + width * width   # Diagonal squared
        area = length * width

        if diag_sq > max_diag_sq:
            max_diag_sq = diag_sq
            max_area = area
        elif diag_sq == max_diag_sq:
            if area > max_area:
                max_area = area

    return max_area
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rectangles. We loop through the input once and do constant work per rectangle.
- **Space Complexity:** O(1), as we only track two variables regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if rectangles are described by floating point numbers instead of integers?  
  *Hint: How would you handle precision and comparison if input uses floats?*

- What if you had to return all rectangles with the max diagonal (not just area)?  
  *Hint: How would you collect all candidates in a list?*

- What if you had billions of rectangles and cannot load them all into memory?  
  *Hint: Is your approach single-pass or can it work in a streaming setting?*

### Summary
This problem uses a classic **single-pass maximum-tracking** strategy: scan through a list while maintaining the "best so far" properties based on coupled criteria (diagonal length primary, area secondary). The avoidance of sqrt and floating-point by comparing squared lengths is a useful and common math trick for optimization and precision when dealing with distances or lengths, widely applicable in computational geometry, selection problems, and competitive programming.

### Tags
Array(#array)

### Similar Problems
