### Leetcode 84 (Hard): Largest Rectangle in Histogram [Practice](https://leetcode.com/problems/largest-rectangle-in-histogram)

### Description  
You're given an array of integers that represent the heights of bars in a histogram. Each bar has a width of 1. The task is to determine the area of the largest rectangle that can be formed within the histogram. The rectangle must be made up of adjacent bars, and the height of the rectangle is limited by the shortest bar in the selected range.

### Examples  

**Example 1:**  
Input: `heights = [2,1,5,6,2,3]`  
Output: `10`  
*Explanation: The largest rectangle can be formed by bars with heights 5 and 6.  
These are at indices 2 and 3, and both have height at least 5, so the area is 5 × 2 = 10.*

**Example 2:**  
Input: `heights = [2,4]`  
Output: `4`  
*Explanation: Taking the bar at index 1 (height 4) as a rectangle covering just itself gives area 4.*

**Example 3:**  
Input: `heights = [2,1,2]`  
Output: `3`  
*Explanation: The largest rectangle can be formed by the first and third bars, both with height 2. Width is 1 (as bars aren't adjacent), but the single central bar (height 1) forms area 1. However, the sides alone give area 2 each, but the maximal area is rectangle of width 1 (over index 0 or 2), so the output is 3 (covering all three bars with height 1).*

### Thought Process (as if you’re the interviewee)  
To tackle this, my first brute-force thought is: for each bar, try to expand outwards to the left and right as far as possible as long as the bars are at least as tall, and calculate the maximum area for every bar. This leads to O(n²) time, which isn’t efficient for large arrays.

To optimize, I'll look for an O(n) solution with a stack. The stack helps track indices of bars where the height increases. When a bar of lower height is found, we know we can't extend rectangles based on taller bars further, so we can calculate areas for those and pop them off. When the stack is empty, it means bars can expand all the way back to the beginning. This "monotonic stack" approach ensures we can find, for each bar, the first smaller bar to its left and right, letting us compute the maximal-width rectangle for every bar efficiently.

### Corner cases to consider  
- Empty input array
- Single element array
- All elements are equal
- Heights in increasing or decreasing order
- Array with zeros

### Solution

```python
def largestRectangleArea(heights):
    # Add sentinel bars at both ends to simplify boundary logic
    heights = [0] + heights + [0]
    stack = []
    max_area = 0

    for i, h in enumerate(heights):
        # Maintain a stack of increasing bar heights
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            width = i - stack[-1] - 1  # width is bounded by indices on stack
            max_area = max(max_area, height * width)
        stack.append(i)
    return max_area
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each bar is pushed and popped from the stack at most once, so the overall runtime is linear in the number of bars.
- **Space Complexity:** O(n), due to the stack that in the worst case could hold all bar indices at once.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this algorithm to find the rectangle itself, not just its area?  
  *Hint: Track left and right boundaries for the maximal rectangle.*

- How would you adapt this approach for a 2D binary matrix where you want the maximal rectangle of 1s?  
  *Hint: Process each row as a histogram and reuse this histogram algorithm.*

- If each bar's width can vary, how would you modify the logic?  
  *Hint: You'd need to dynamically compute left and right boundaries, accounting for width at each step.*

### Summary
This problem is a classic use case for the monotonic stack pattern, which efficiently helps with problems asking for the previous or next "smaller/greater" element. This approach is used in many interval, histogram, and sliding window problems (like “Maximal Rectangle” in a binary 2D matrix). The stack preprocesses left/right bounds for each element in one pass, reducing brute-force O(n²) to O(n).


### Flashcard
Use a stack to track indices of increasing bars; for each bar, pop from the stack and calculate area when a lower bar is found, ensuring O(n) time.

### Tags
Array(#array), Stack(#stack), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Maximal Rectangle(maximal-rectangle) (Hard)
- Maximum Score of a Good Subarray(maximum-score-of-a-good-subarray) (Hard)