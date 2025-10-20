### Leetcode 492 (Easy): Construct the Rectangle [Practice](https://leetcode.com/problems/construct-the-rectangle)

### Description  
Given an integer representing the area of a rectangle, construct a pair of positive integers, length and width (l, w), such that:
- l × w = area,
- l ≥ w (length is always at least as large as width),
- The difference l - w is as small as possible (the rectangle should be as close to a square as possible).

You need to return [l, w].

### Examples  

**Example 1:**  
Input: `area=4`  
Output: `[2, 2]`  
*Explanation: 2 × 2 = 4. The rectangle is a square, so the length and width difference (0) is minimized.*

**Example 2:**  
Input: `area=37`  
Output: `[37, 1]`  
*Explanation: Since 37 is prime, the only possible dimensions are 37 × 1. So the difference is 36.*

**Example 3:**  
Input: `area=122122`  
Output: `[427, 286]`  
*Explanation: 427 × 286 = 122122. Among all possible pairs (l, w), this pair has l ≥ w and the smallest difference.*

### Thought Process (as if you’re the interviewee)  
First thought is to look for all possible pairs (l, w) that multiply to the area, but since l ≥ w and l × w = area, w must be ≤ √area.  
So, start from w=⌊√area⌋ and go down to 1. For each w, if area % w == 0:
- l = area // w
- Guarantee l ≥ w and also minimize l - w, since starting at largest w closest to square root.
Return the first [l, w] found for which area % w == 0, as this will be the pair with minimal difference.

This is faster than brute force (checking all pairs) and directly leverages the properties of multiplication and divisors.

### Corner cases to consider  
- area = 1 ⇒ should return [1, 1].
- area is a perfect square (like 9 ⇒ [3, 3]).
- area is a large prime ⇒ only [area, 1].
- Very large values to check integer overflow.
- area = 2 ⇒ [2, 1].

### Solution

```python
def constructRectangle(area: int):
    # Start checking width from the largest integer ≤ sqrt(area)
    width = int(area ** 0.5)
    # Decrease width until a valid factor is found
    while area % width != 0:
        width -= 1
    length = area // width
    return [length, width]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(√n), since in the worst case (area is a large prime), you check every number from √area down to 1.
- **Space Complexity:** O(1); only a few variables are used regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle cases where multiple solutions yield the same minimal difference?
  *Hint: Is there ever more than one pair with the same difference? Why or why not?*

- What if additional constraints (like maximum allowed length or width) were added?
  *Hint: How would you adapt your search? What if l or w must be ≤ K?*

- Could you do this for all valid (l, w) pairs instead of only the best one?
  *Hint: Can you enumerate all divisors efficiently?*

### Summary
This approach uses a math/number-theory pattern: start from √n and look for divisors to minimize the difference between the two factors. This is a classic “closest to square root divisor” search, and can be adapted for other problems involving factor pairs with minimal difference or optimal shapes (e.g. distributing items into balanced rows and columns). No extra data structures are needed.


### Flashcard
Start from w = floor(sqrt(area), decrement w; if area % w == 0, return [area // w, w] for minimal difference.

### Tags
Math(#math)

### Similar Problems
