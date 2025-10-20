### Leetcode 42 (Hard): Trapping Rain Water [Practice](https://leetcode.com/problems/trapping-rain-water)

### Description  
Given an array of non-negative integers representing the heights of bars, where each bar has a width of 1, compute how much **water** can be trapped between the bars after rainfall. Visualize the bars as blocks in a histogram with the sky above. Any water trapped at an index is bound by the tallest bars to its left and right. You need to calculate the **total trapped water**.

### Examples  

**Example 1:**  
Input: `[0,1,0,2,1,0,1,3,2,1,2,1]`  
Output: `6`  
*Explanation: At each position, calculate trapped water as min(max_left, max_right) - height. Trapped water exists at indices 2, 4, 5, 6, 8, 9 (sum = 6).*

**Example 2:**  
Input: `[4,2,0,3,2,5]`  
Output: `9`  
*Explanation: Water accumulates at bars 1 (2 units), 2 (4), 3 (1), 4 (2) for a total of 9.*

**Example 3:**  
Input: `[1,2,3,4]`  
Output: `0`  
*Explanation: No water is trapped because there is never a bar taller than the current bar from both left and right.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  For each bar, scan left to find the tallest bar, then right for the tallest right bar. The water at position i is min(max_left, max_right) - height[i]. If negative, it's zero.  
  This is O(n²) due to two scans per index.

- **Optimized dynamic programming approach:**  
  Precompute left_max and right_max arrays:
    - left_max[i]: tallest bar to the left of i (including i)
    - right_max[i]: tallest bar to the right of i (including i)
  For each position, water trapped = min(left_max, right_max) - height[i].  
  This is O(n) time, O(n) space.

- **Two-pointer approach (most optimal, O(n) time, O(1) space):**  
  Use two pointers (left and right), starting from both ends. Keep track of max_left and max_right values as you move pointers inward. At each step, compare max_left and max_right:
    - If max_left < max_right: Water at left = max_left - height[left]. Move left pointer right.
    - Otherwise, water at right = max_right - height[right]. Move right pointer left.
  This ensures you always process the smaller side, so the answer is always correct, with only one pass and constant memory.

I prefer the two-pointer approach for its simplicity and O(1) space.

### Corner cases to consider  
- Empty array (`[]`) or only one/two bars → no water trapped.
- All elements the same → no pits to trap water.
- Tallest bars at the ends; pits in the middle.
- Bars with zeros or single valleys.
- Multiple pits of various widths.

### Solution

```python
def trap(height):
    # Edge case: need at least 3 bars to trap water
    if not height or len(height) < 3:
        return 0

    left = 0
    right = len(height) - 1
    max_left = 0
    max_right = 0
    total_water = 0

    while left < right:
        # Always process the smaller max side first
        if height[left] < height[right]:
            if height[left] >= max_left:
                max_left = height[left]
            else:
                # Water can be trapped on left side
                total_water += max_left - height[left]
            left += 1
        else:
            if height[right] >= max_right:
                max_right = height[right]
            else:
                # Water can be trapped on right side
                total_water += max_right - height[right]
            right -= 1

    return total_water
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since each index is visited at most once by either pointer.
- **Space Complexity:** O(1), as only a constant number of variables are used regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your solution if the array could be modified in place?  
  *Hint: Can you reuse the input array to store left_max or right_max data?*

- What if the bars are given as a linked list, not an array?  
  *Hint: Can the two-pointer solution work when indexes are not accessible directly?*

- Suppose the water is a resource; how would you efficiently update the answer if a block's height is updated frequently?  
  *Hint: Try using segment trees or binary indexed trees for range maximum queries.*

### Summary
This problem uses the "**two-pointer/trapping rain water**" pattern, which often appears when you’re required to collect, compare, or merge data from both ends of a list. It’s a classic **sliding window/two-pointer** style, and frequently arises in array and histogram-related interview questions (e.g., container with most water, largest rectangle in histogram, etc.). The key is recognizing that the local minimum of the max heights on each side defines the water trapped.


### Flashcard
Precompute left_max and right_max for each index; water at i is min(left_max, right_max) − height[i], summed over all bars.

### Tags
Array(#array), Two Pointers(#two-pointers), Dynamic Programming(#dynamic-programming), Stack(#stack), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Container With Most Water(container-with-most-water) (Medium)
- Product of Array Except Self(product-of-array-except-self) (Medium)
- Trapping Rain Water II(trapping-rain-water-ii) (Hard)
- Pour Water(pour-water) (Medium)
- Maximum Value of an Ordered Triplet II(maximum-value-of-an-ordered-triplet-ii) (Medium)