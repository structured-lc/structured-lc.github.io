### Leetcode 1762 (Medium): Buildings With an Ocean View [Practice](https://leetcode.com/problems/buildings-with-an-ocean-view)

### Description  
You are given an array representing heights of buildings lined up from left to right, with the ocean on their right side. A building has an ocean view if all buildings to its right are shorter in height. The task is to find and return the indices of all buildings that have an ocean view, sorted in increasing order.

### Examples  

**Example 1:**  
Input: `heights = [4,2,3,1]`  
Output: `[0,2,3]`  
*Explanation: Building 0 (height 4) sees the ocean because all buildings to the right are shorter. Building 1 (height 2) does not see the ocean because building 2 is taller. Building 2 (height 3) sees the ocean because building 3 is shorter. The last building (height 1) always sees the ocean.*

**Example 2:**  
Input: `heights = [4,3,2,1]`  
Output: `[0,1,2,3]`  
*Explanation: All buildings are in descending order of height, so each building can see the ocean directly.*

**Example 3:**  
Input: `heights = [1,3,2,4]`  
Output: `[3]`  
*Explanation: Only the last building (index 3, height 4) can see the ocean as all others have taller or equal-height buildings to their right blocking the view.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach would check for each building if any building to its right is taller or equal in height, which leads to O(n²) time complexity. This is inefficient for large input sizes.

A more optimized approach is to iterate from right to left (since ocean is on the right), track the maximum height found, and identify buildings taller than this max height to have ocean views. This reduces complexity to O(n). We store indices of such buildings and reverse the result at the end to get ascending order.

Trade-off is between code simplicity and efficiency: the O(n²) brute force is straightforward but slow, the O(n) solution uses a single pass and auxiliary space but is optimal.

### Corner cases to consider  
- Single building (always has ocean view).
- All buildings with the same height (only the rightmost building has view).
- Ascending order of heights.
- Descending order of heights.
- Large number of buildings (performance considerations).

### Solution

```python
def findBuildings(heights):
    # List to store indices of buildings with ocean view
    ocean_view_indices = []
    # Track the maximum height seen so far from the right
    max_height = float('-inf')
    
    # Iterate from right to left
    for i in range(len(heights) - 1, -1, -1):
        # If current building is taller than max_height, it has ocean view
        if heights[i] > max_height:
            ocean_view_indices.append(i)
            max_height = heights[i]
    
    # Reverse the collected indices to return them in ascending order
    return ocean_view_indices[::-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of buildings. We traverse the list once from right to left.
- **Space Complexity:** O(n) in the worst case, storing indices of all buildings when ocean view applies to all.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution if the ocean was on the left side?  
  *Hint: Iterate from left to right and check against the max height so far.*

- How to solve the problem if buildings of the same height to the right block the ocean view?  
  *Hint: Use strict greater than comparison.*

- Can we do the solution in-place without extra space for output?  
  *Hint: Consider using a stack or modifying the input list if allowed.*

### Summary
This problem uses a classic **monotonic decreasing traversal pattern** when scanning from the right to find buildings taller than those to their right. This pattern is common in skyline or visibility problems and is efficient for linear-time scanning problems involving comparisons with aggregates from one side.

### Tags
Array(#array), Stack(#stack), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Number of Visible People in a Queue(number-of-visible-people-in-a-queue) (Hard)
- Finding the Number of Visible Mountains(finding-the-number-of-visible-mountains) (Medium)