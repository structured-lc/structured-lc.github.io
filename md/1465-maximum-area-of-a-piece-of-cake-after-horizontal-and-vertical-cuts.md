### Leetcode 1465 (Medium): Maximum Area of a Piece of Cake After Horizontal and Vertical Cuts [Practice](https://leetcode.com/problems/maximum-area-of-a-piece-of-cake-after-horizontal-and-vertical-cuts)

### Description  
You have a rectangular cake of dimensions `h × w`. There are arrays of horizontal and vertical cuts, each being the distance from the respective edge. You must perform all cuts, splitting the cake into rectangles. After all cuts, return the area of the largest rectangle (modulo 10⁹+7).

### Examples  

**Example 1:**  
Input: `h = 5, w = 4, horizontalCuts = [1,2,4], verticalCuts = [1,3]`  
Output: `4`  
*Explanation: Maximum piece size comes from cuts at (2, 3) to (4, 4): area = 2×2 = 4.*

**Example 2:**  
Input: `h = 5, w = 4, horizontalCuts = [3,1], verticalCuts = [1]`  
Output: `6`  
*Explanation: After sorting, max height = max(3-1, 5-3) = 2, max width = max(1, 4-1) = 3, area = 2×3 = 6.*

**Example 3:**  
Input: `h = 5, w = 4, horizontalCuts = [3], verticalCuts = [3]`  
Output: `9`  
*Explanation: One horizontal and one vertical cut; largest rectangle is 3×3 = 9.*

### Thought Process (as if you’re the interviewee)  
- The largest piece will be determined by the largest distance between any two consecutive horizontal cuts (and the edges), and likewise for vertical cuts.
- So, sort both cut arrays and compute maximum gap between consecutive cuts (including edges at 0 and h/w).
- The area of the largest rectangle is then: max_height × max_width, modulo 10⁹+7.

### Corner cases to consider  
- Cuts not in order; need to sort cuts.
- Cut at 0 or at edge (duplicate, full height/width piece).
- Only one cut in either direction.

### Solution

```python
def maxArea(h, w, horizontalCuts, verticalCuts):
    MOD = 10**9 + 7
    # Sort and add edges
    horizontalCuts = sorted([0] + horizontalCuts + [h])
    verticalCuts = sorted([0] + verticalCuts + [w])
    # Max gap between consecutive cuts
    max_h = max(horizontalCuts[i+1] - horizontalCuts[i] for i in range(len(horizontalCuts)-1))
    max_w = max(verticalCuts[i+1] - verticalCuts[i] for i in range(len(verticalCuts)-1))
    return (max_h * max_w) % MOD
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n log n + m log m), n and m = number of horizontal and vertical cuts (due to sorting).
- **Space Complexity:** O(1) extra (after sorting/new arrays).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of cuts is extremely large?  
  *Hint: Sorting may become a bottleneck; special data structures or streaming approaches possible.*

- Can you quickly answer "what is the kth largest piece" after all cuts?  
  *Hint: Maintain areas in a max-heap or track all rectangles formed by the cuts.*

- How would you approach minimizing the area of the largest piece?  
  *Hint: Place cuts to balance largest gaps in each direction.*

### Summary
A classic greedy/geometry problem: reduces to finding max difference in sorted list (distance between cuts). This pattern is common for max/min interval partition/mathematical cutting problems.