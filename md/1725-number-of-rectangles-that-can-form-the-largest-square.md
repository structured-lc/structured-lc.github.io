### Leetcode 1725 (Easy): Number Of Rectangles That Can Form The Largest Square [Practice](https://leetcode.com/problems/number-of-rectangles-that-can-form-the-largest-square)

### Description  
Given a list of rectangles, where each rectangle is represented as `[length, width]`, you can cut squares out of these rectangles. From a rectangle `[l, w]`, you can form a square of side `k` where `k ≤ l` and `k ≤ w`—that is, the largest possible square is side `min(l, w)`.  
Your task is to:
1. Find the **maximum square side length** that can be cut from any of the rectangles.
2. Count **how many rectangles** can produce a square of this maximum side length.

### Examples  

**Example 1:**  
Input: `rectangles = [[5,8],[3,9],[5,12],[16,5]]`  
Output: `3`  
*Explanation: The largest squares from each rectangle are `[5,3,5,5]`. The maximum is `5`, which occurs in 3 rectangles.*

**Example 2:**  
Input: `rectangles = [[2,3],[3,7],[4,3],[3,7]]`  
Output: `3`  
*Explanation: Largest squares are `[2,3,3,3]`. The max is `3`, which appears 3 times.*

**Example 3:**  
Input: `rectangles = [[4,4],[4,4],[4,4]]`  
Output: `3`  
*Explanation: Each rectangle can form a square of length `4`. Max is `4` (appears 3 times).*

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:**  
  For each rectangle, the largest square possible is `min(length, width)`. Store these values in an array.
  Next, find the maximum value in this array—this is the side of the largest possible square.  
  Finally, count how many times this maximum occurs in the array.

- **Optimization:**  
  Instead of storing all min values, keep track of the current max length found and a count. Whenever a greater length is found, update the max and reset the count. If it matches the max, increment the count.  
  This reduces space used, as we don't need to keep an extra array—just two variables as we scan the list.

- **Trade-offs:**  
  - Space: Using the optimized approach uses constant extra space.
  - Time: Both approaches are O(n), but the space-optimized does everything in one scan.


### Corner cases to consider  
- Empty input (not possible per constraints, but good to note if the constraints could change).
- All rectangles with the same sides.
- All rectangles are "thin" so `min(l, w)` is always `1`.
- More than one rectangle can make the max square.
- Only one rectangle can make the max square.
- Large input values (test for integer overflow if coding in Java/C++).

### Solution

```python
def countGoodRectangles(rectangles):
    # Initialize variables to track the max square length and its count
    max_len = 0
    count = 0

    for length, width in rectangles:
        # The largest square from this rectangle
        side = min(length, width)

        # New max found, reset count
        if side > max_len:
            max_len = side
            count = 1
        # Same as current max, increment count
        elif side == max_len:
            count += 1

    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We process each rectangle once.

- **Space Complexity:** O(1)  
  We only use a few variables for tracking; no extra storage that grows with input size.


### Potential follow-up questions (as if you’re the interviewer)  

- What if rectangles could be squares?  
  *Hint: Try with rectangles where length == width; does your solution break or need adjustment?*

- How would you extend this if you wanted to count the number of distinct square side lengths possible?  
  *Hint: Use a set to capture unique min(l, w) values and count them at the end.*

- What if you needed to return the locations (indices) of rectangles that can form the largest square instead of just the count?  
  *Hint: Store indices in an array whenever you find a rectangle that matches max_len.*

### Summary
The approach here is a simple **single-pass max/min and counting problem**, common in ad-hoc/greedy problems. It demonstrates how to scan a list while maintaining best-so-far and frequency counts, a pattern frequently needed for interview questions requiring O(n) solutions with minimal space. This concept of "track best value and its count" appears in problems like finding mode, max frequency, or most recent value in a stream.