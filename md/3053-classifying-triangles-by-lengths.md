### Leetcode 3053 (Easy): Classifying Triangles by Lengths [Practice](https://leetcode.com/problems/classifying-triangles-by-lengths)

### Description  
Given three integers representing the lengths of the sides of a triangle (A, B, and C), classify the triangle as one of the following types:
- **Equilateral:** All three sides are equal.
- **Isosceles:** Exactly two sides are equal.
- **Scalene:** All sides are different.
- **Not A Triangle:** The given side lengths cannot form a valid triangle (i.e., the sum of any two sides is not strictly greater than the third).

### Examples  

**Example 1:**  
Input: `A=20, B=20, C=23`  
Output: `Isosceles`  
*Explanation: 20 = 20 ≠ 23, and the three sides satisfy triangle inequalities (20+20 > 23, 20+23 > 20, 20+23 > 20).*

**Example 2:**  
Input: `A=20, B=20, C=20`  
Output: `Equilateral`  
*Explanation: All three sides are equal and satisfy triangle inequalities.*

**Example 3:**  
Input: `A=20, B=21, C=22`  
Output: `Scalene`  
*Explanation: All sides are different and satisfy triangle inequalities (20+21 > 22, etc).*

**Example 4:**  
Input: `A=13, B=14, C=30`  
Output: `Not A Triangle`  
*Explanation: 13+14 = 27 ≤ 30, fails triangle inequality.*

### Thought Process (as if you’re the interviewee)  
Start by checking if the three side lengths can form a triangle using the triangle inequality: the sum of any two sides must be strictly greater than the third.  
- If not, return "Not A Triangle."
- Otherwise, check:
    - If all three are equal, return "Equilateral."
    - If exactly two are equal, return "Isosceles."
    - If all are different, return "Scalene."

A brute force approach is fine here since each test is O(1).  
Optimally, order the decisions so that the triangle validity is checked first to short-circuit invalid cases.

### Corner cases to consider  
- Sides with zero or negative length.
- Two sides whose sum equals the third (invalid).
- Large numbers / integer overflow (not likely in real coding interviews with practical ranges).
- Unordered sides (order does not matter).
- All sides different but invalid triangle.

### Solution

```python
def classify_triangle(A: int, B: int, C: int) -> str:
    # First: check for valid triangle using the triangle inequalities
    if A <= 0 or B <= 0 or C <= 0:
        return "Not A Triangle"

    # The sum of any two sides must be strictly greater than the third
    if (A + B <= C) or (A + C <= B) or (B + C <= A):
        return "Not A Triangle"
    
    # Check all equal
    if A == B == C:
        return "Equilateral"
    
    # Check if exactly two sides equal
    if A == B or B == C or A == C:
        return "Isosceles"
    
    # Otherwise, all sides are different
    return "Scalene"
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  All operations involve a fixed number of integer comparisons and arithmetic.
- **Space Complexity:** O(1)  
  Uses a constant amount of space regardless of input values.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle floating-point side lengths?  
  *Hint: Be careful with equality and precision errors when comparing floats.*

- How would you extend your solution to process a batch/list of triangles efficiently?  
  *Hint: Consider batching and returning a list of outputs.*

- Could you provide an explanation to the user about *why* a set of lengths cannot form a triangle?  
  *Hint: Output which side or condition failed the triangle inequality.*

### Summary
This problem demonstrates simple **classification pattern** based on numerical properties and validity checks.  
Key patterns: input validation, conditionals, setting up clear decision logic.  
Variants of this problem (triangle validity, object classification) appear frequently in interviews and competitive programming.


### Flashcard
Check triangle inequality (sum of any two sides > third), then classify by equality: all equal = Equilateral, two equal = Isosceles, all different = Scalene.

### Tags
Database(#database)

### Similar Problems
