### Leetcode 11 (Medium): Container With Most Water [Practice](https://leetcode.com/problems/container-with-most-water)

### Description  
You are given an array of non-negative integers, where each integer represents the height of a vertical line on a coordinate plane. The vertical lines are positioned at indices corresponding to their array positions. Your goal is to find two lines, which together with the x-axis form a container that holds the greatest amount of water. The amount of water the container can hold is limited by the shorter of the two lines and the distance between them. You must return the maximum area of water that can be contained. You cannot tilt the container.

### Examples  

**Example 1:**  
Input: `height = [1,8,6,2,5,4,8,3,7]`  
Output: `49`  
*Explanation: The lines at positions 1 (height 8) and 8 (height 7) form the container with the most water. The height is min(8,7) = 7, width is (8 - 1) = 7, so area = 7 × 7 = 49.*

**Example 2:**  
Input: `height = [1,1]`  
Output: `1`  
*Explanation: The two lines have the same height, and the width is 1, so area = 1 × 1 = 1.*

**Example 3:**  
Input: `height = [4,3,2,1,4]`  
Output: `16`  
*Explanation: The container formed by first and last lines has height min(4,4) = 4 and width 4, so area = 4 × 4 = 16.*

### Thought Process (as if you’re the interviewee)  
- Start with the brute-force method: check every pair of lines (i, j) with 0 ≤ i < j < n, calculate the area = min(height[i], height[j]) × (j - i), keep track of the maximum. This is simple but O(n²) time and inefficient for large arrays.  
- Optimize by using a two-pointer approach: initialize one pointer `left` at the start of the array, another `right` at the end. Calculate the current area, update maximum if needed. Then move the pointer at the shorter line inward because moving the taller line inward cannot increase area — the height is limited by the shorter line. This reduces time to O(n).  
- This two-pointer technique efficiently finds the maximum area in one pass by intelligently narrowing the search space.

### Corner cases to consider  
- Array length exactly 2 (minimum valid input).  
- All heights are the same.  
- Strictly increasing or decreasing height arrays.  
- Large height values with small distances.  
- Heights containing zeros.  

### Solution

```python
def max_area(height):
    # Initialize two pointers at the ends of the array
    left, right = 0, len(height) - 1
    max_water = 0
    
    # Iterate until the two pointers meet
    while left < right:
        # Calculate the area of water between the two lines
        width = right - left
        current_height = min(height[left], height[right])
        area = width * current_height
        
        # Update max_water if we found a bigger container
        if area > max_water:
            max_water = area
        
        # Move the pointer at the shorter line inward
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_water
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We make a single pass through the array with two pointers moving inward.  
- **Space Complexity:** O(1) — We use only constant extra space regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if the container could be tilted at an angle?  
  *Hint: This would remove the constraint that the height is limited by the shorter vertical line, increasing complexity drastically.*  

- Can you explain why moving the pointer at the shorter line is always optimal over moving the pointer at the taller line?  
  *Hint: Area is constrained by the shorter line, so moving the taller line won't help unless the shorter line moves.*  

- How would you modify the approach if you needed to return the indices of the lines forming the maximum container, not just the area?   
  *Hint: Keep track of indices when updating the maximum area.*  

### Summary  
This problem uses the two-pointer pattern to efficiently find a pair of indices forming the container with the maximum water. This approach is common for array problems requiring pairwise optimization using linear time, notably where comparisons determine pointer movement. Similar two-pointer techniques are used in problems like trapping rain water, merging sorted arrays, or finding pairs with given sums in sorted lists.


### Flashcard
Use two pointers at both ends; move the pointer at the shorter line inward to maximize area in O(n) time.

### Tags
Array(#array), Two Pointers(#two-pointers), Greedy(#greedy)

### Similar Problems
- Trapping Rain Water(trapping-rain-water) (Hard)
- Maximum Tastiness of Candy Basket(maximum-tastiness-of-candy-basket) (Medium)
- House Robber IV(house-robber-iv) (Medium)