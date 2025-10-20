### Leetcode 478 (Medium): Generate Random Point in a Circle [Practice](https://leetcode.com/problems/generate-random-point-in-a-circle)

### Description  
Given a circle with a specified **radius** and **center coordinates** (x_center, y_center), implement a function `randPoint` that returns a **uniformly random point inside the circle**. The point’s coordinates should be returned as a list [x, y], and subsequent calls to the function should generate different random points inside the circle. The distribution must be truly uniform—not more concentrated toward the center.

### Examples  

**Example 1:**  
Input:  
`Solution(1, 0, 0)`  
`randPoint()`  
Output: `[-0.72939, -0.65505]`  
Explanation: Returns a point randomly within the circle of radius 1 and center (0, 0). Each call yields a different valid random point inside the circle.

**Example 2:**  
Input:  
`Solution(10, 5, -7.5)`  
`randPoint()`  
Output: `[11.52438, -8.33273]`  
Explanation: Returns a point inside a circle with radius 10 and center (5, -7.5).

**Example 3:**  
Input:  
`Solution(5, 2, 3)`  
`randPoint()`  
Output: `[4.24, 6.12]` (sample output)  
Explanation: A point randomly and uniformly distributed inside a circle radius 5 centered at (2, 3).

### Thought Process (as if you’re the interviewee)  
First, I need a way to generate a **uniform random point within a circle**.  
**Brute-force idea:**  
- Randomly select x, y within the square bounding the circle, and accept if (x, y) is inside the circle (rejection sampling).
- Downside: This can be inefficient; as radius grows, a larger fraction of picks land outside the circle.

**Optimal approach (polar coordinates):**  
- Use the **polar coordinate system**: any point inside the circle can be expressed by an angle θ (from 0 to 2π) and radius r (from 0 to R).
- To achieve *uniform area density*, r should not be chosen linearly in [0, R]; the probability density should be proportional to circumference at that r (that is, area increases with r²).
- Therefore, pick θ uniformly in [0, 2π) and r uniformly in [0, 1), but convert with r = sqrt(random.uniform(0,1)) × radius to correct for the area effect.
- Finally, convert (r, θ) to (x, y) using:
    - x = x_center + r × cosθ
    - y = y_center + r × sinθ

This ensures every point in the circle is equally likely, with constant time per query.

### Corner cases to consider  
- Very **small radius**, e.g., radius = 0 (should always return the center).
- **Negative or zero coordinates** for center.
- **Multiple calls** should not repeat the same point unless random returns same value.
- Check for **floating-point rounding errors** near the circle’s edge.

### Solution

```python
import random
import math

class Solution:
    def __init__(self, radius: float, x_center: float, y_center: float):
        self.radius = radius
        self.x_center = x_center
        self.y_center = y_center
        
    def randPoint(self) -> [float, float]:
        # Generate a uniformly random angle in [0, 2π)
        theta = random.uniform(0, 2 * math.pi)
        
        # Generate a radius, adjusted so points are uniform in area
        r = self.radius * math.sqrt(random.uniform(0, 1))
        
        # Calculate Cartesian coordinates
        x = self.x_center + r * math.cos(theta)
        y = self.y_center + r * math.sin(theta)
        
        return [x, y]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) per call to `randPoint`. All operations (random number generation, sqrt, trig) are constant time.
- **Space Complexity:** O(1) extra space, only storing the given parameters.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generalize this to generate a point **uniformly inside a 3D sphere**?  
  *Hint: Think about spherical coordinates and the analogous transformation to correct the radial distribution.*

- How would you generate points **along the circumference** of the circle uniformly?  
  *Hint: Only randomize θ, set radius equal to the circle’s actual radius.*

- If random number generation is not fast enough, can you **precompute points** and reuse them?  
  *Hint: Consider memory trade-off for large numbers of samples.*

### Summary
This problem demonstrates the **geometry + uniform random sampling** pattern, specifically the use of polar- or spherical-coordinates and radius transformation to ensure uniform density within a circle. Knowing how to sample uniformly inside circles/spheres is useful in computational geometry, Monte Carlo simulations, and gaming physics. The trick of taking the square root of the random variable is a classic technique whenever spatial density would otherwise be non-uniform due to the coordinate system.


### Flashcard
Generate random angle θ ∈ [0, 2π) and radius r ∈ [0, R) with r = R × sqrt(random), then convert to Cartesian coordinates.

### Tags
Math(#math), Geometry(#geometry), Rejection Sampling(#rejection-sampling), Randomized(#randomized)

### Similar Problems
- Random Point in Non-overlapping Rectangles(random-point-in-non-overlapping-rectangles) (Medium)