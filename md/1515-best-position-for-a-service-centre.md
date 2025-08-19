### Leetcode 1515 (Hard): Best Position for a Service Centre [Practice](https://leetcode.com/problems/best-position-for-a-service-centre)

### Description  
Given a list of customers' positions on a 2D map, find a single point—the best position on the map—to build a new service center so that the **sum of Euclidean distances** from this location to all customer positions is minimized. Return the minimal sum (to 5 decimal places). The position can be anywhere, not necessarily at an integer.

### Examples  

**Example 1:**  
Input: `positions = [[0,0],[1,0],[0,1]]`  
Output: `2.00000`  
*Explanation: Choosing (0.5, 0.5). Distance to each = sqrt(0.5² + 0.5²) = ~0.707, so total = 0.707 × 3 ≈ 2.121, but the minimal total is exactly 2 (best at edge midpoint).* 

**Example 2:**  
Input: `positions = [[1,1],[3,3]]`  
Output: `2.82843`  
*Explanation: Best is the midpoint (2,2), sum = sqrt(2) + sqrt(2) ≈ 2.82843.*

**Example 3:**  
Input: `positions = [[4,1],[1,4],[0,0]]`  
Output: `7.70820`  
*Explanation: Center at roughly (1.3, 1.3).* 


### Thought Process (as if you’re the interviewee)  
The objective is to minimize the total Euclidean distance from a single center point to multiple 2D points. For the sum of Manhattan distances, the optimal point is the median, but for **Euclidean distance**, there is no simple closed-form answer with more than two points. 

A brute-force approach would be to search the grid at high resolution, but that's too slow. Instead, I realize this is the **Fermat–Weber point problem**, best approximated using **gradient descent** (continuous optimization), as the sum of distances is convex but not differentiable everywhere.

Steps:
- Initialize with the centroid (mean) of all the positions.
- Use gradient descent: Compute the gradient (the direction in which the sum reduces fastest), move by a small step each iteration.
- Stop when changes become insignificant (convergence).

Trade-off: This approach is efficient in practice and gives sufficient precision for the problem’s requirements.


### Corner cases to consider  
- Only one position — answer is at that position, sum = 0
- All positions coincide — answer is that point, sum = 0
- Positions all on a straight line
- Zero or negative coordinates


### Solution

```python
from typing import List
import math

def getMinDistSum(positions: List[List[int]]) -> float:
    # Initial guess: centroid (average of points)
    n = len(positions)
    x = sum(p[0] for p in positions) / n
    y = sum(p[1] for p in positions) / n
    eps = 1e-7   # Precision
    lr = 1.0     # Initial learning rate
    for _ in range(10000):  # Enough iterations for convergence
        grad_x = grad_y = 0.0
        for px, py in positions:
            dx = x - px
            dy = y - py
            dist = math.hypot(dx, dy) + 1e-8  # Avoid div by zero
            grad_x += dx / dist
            grad_y += dy / dist
        grad_x /= n
        grad_y /= n
        tx = x - lr * grad_x
        ty = y - lr * grad_y
        if abs(tx - x) < eps and abs(ty - y) < eps:  # Converged
            break
        x, y = tx, ty
        lr *= 0.99  # Decay learning rate
    # Compute total distance from final point
    return sum(math.hypot(x - px, y - py) for px, py in positions)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × iter), where n = number of positions and iter is the number of iterations (around 10⁴ for convergence). Each iteration computes gradient over all positions.
- **Space Complexity:** O(1) extra — only uses a few variables. Input size O(n).


### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to place k service centers?  
  *Hint: Consider the k-medians or k-means problem, which requires clustering beforehand.*

- What if distances were Manhattan (L₁) instead of Euclidean (L₂)?  
  *Hint: The best point is the componentwise median, closed form.*

- How would you speed up convergence or guarantee global minimum?  
  *Hint: Use stochastic/mini-batch gradient descent, adjust learning rate adaptively, or check with multiple random initializations.*

### Summary
The approach is an application of **iterative convex optimization** (gradient descent) to minimize the sum of Euclidean distances—a version of the Fermat–Weber point problem. This pattern of using gradient descent is common where the loss is convex but has no closed-form minimum. The centroid start is typical for such algorithms.

### Tags
Array(#array), Math(#math), Geometry(#geometry), Randomized(#randomized)

### Similar Problems
