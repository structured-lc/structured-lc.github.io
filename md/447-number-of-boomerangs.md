### Leetcode 447 (Medium): Number of Boomerangs [Practice](https://leetcode.com/problems/number-of-boomerangs)

### Description  
You are given n points in the plane that are all distinct, where points[i] = [xi, yi]. A boomerang is a tuple of points (i, j, k) such that the distance from i to j equals the distance from i to k (where i is the center of the boomerang).

Return the number of boomerangs.

### Examples  

**Example 1:**  
Input: `points = [[0,0],[1,0],[2,0]]`  
Output: `2`  
*Explanation: The two boomerangs are [[1,0],[0,0],[2,0]] and [[1,0],[2,0],[0,0]].*

**Example 2:**  
Input: `points = [[1,1],[2,2],[3,3]]`  
Output: `2`  
*Explanation: The two boomerangs are [[2,2],[1,1],[3,3]] and [[2,2],[3,3],[1,1]].*

**Example 3:**  
Input: `points = [[1,1]]`  
Output: `0`  

### Thought Process (as if you're the interviewee)  
This problem asks us to find tuples (i, j, k) where point i is equidistant from points j and k. The key insights:

1. **Center point**: For each point as center, count how many other points are at each distance
2. **Distance calculation**: Use squared distance to avoid floating point issues
3. **Permutation counting**: If n points are at the same distance from center, we can form n × (n-1) boomerangs

Approaches:
1. **Brute force**: Check all triplets - O(n³)
2. **Hash map grouping**: For each center, group points by distance - O(n²)
3. **Distance matrix**: Precompute all distances - O(n²) space and time

The hash map approach is optimal, processing each center point and grouping other points by their distance from the center.

### Corner cases to consider  
- Less than 3 points (no boomerangs possible)
- All points collinear
- All points at same distance from a center
- Duplicate points (problem states all distinct)
- Points forming regular polygons
- Single point or empty array

### Solution

```python
def numberOfBoomerangs(points):
    if len(points) < 3:
        return 0
    
    count = 0
    
    # Try each point as the center of boomerang
    for i in range(len(points)):
        # Map distance to count of points at that distance
        distance_count = {}
        
        # Calculate distance from center point i to all other points
        for j in range(len(points)):
            if i != j:
                # Use squared distance to avoid floating point issues
                dx = points[i][0] - points[j][0]
                dy = points[i][1] - points[j][1]
                dist_squared = dx * dx + dy * dy
                
                distance_count[dist_squared] = distance_count.get(dist_squared, 0) + 1
        
        # For each distance with n points, we can form n*(n-1) boomerangs
        for distance, point_count in distance_count.items():
            if point_count >= 2:
                # Choose 2 points from point_count points where order matters
                count += point_count * (point_count - 1)
    
    return count

# Alternative implementation using collections.defaultdict
from collections import defaultdict

def numberOfBoomerangsDefaultDict(points):
    if len(points) < 3:
        return 0
    
    total_boomerangs = 0
    
    for center in points:
        # Group points by their distance from center
        distance_groups = defaultdict(int)
        
        for point in points:
            if point != center:
                # Calculate squared distance
                dx = center[0] - point[0]
                dy = center[1] - point[1]
                dist_sq = dx * dx + dy * dy
                distance_groups[dist_sq] += 1
        
        # Count boomerangs for this center
        for count in distance_groups.values():
            if count >= 2:
                # Number of ordered pairs from count items
                total_boomerangs += count * (count - 1)
    
    return total_boomerangs

# More explicit implementation
def numberOfBoomerangsExplicit(points):
    n = len(points)
    if n < 3:
        return 0
    
    result = 0
    
    # For each point as potential center
    for center_idx in range(n):
        center = points[center_idx]
        distances = {}
        
        # Calculate distances to all other points
        for other_idx in range(n):
            if center_idx != other_idx:
                other = points[other_idx]
                
                # Squared distance (avoids sqrt and floating point)
                dist = (center[0] - other[0]) ** 2 + (center[1] - other[1]) ** 2
                
                if dist in distances:
                    distances[dist] += 1
                else:
                    distances[dist] = 1
        
        # Count boomerangs for each distance group
        for point_count in distances.values():
            if point_count >= 2:
                # Pick 2 points from point_count points (order matters)
                result += point_count * (point_count - 1)
    
    return result

# Optimized version with distance function
def numberOfBoomerangsOptimized(points):
    def squared_distance(p1, p2):
        return (p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2
    
    n = len(points)
    count = 0
    
    for i in range(n):
        dist_map = {}
        
        # Build distance frequency map for current center
        for j in range(n):
            if i != j:
                dist = squared_distance(points[i], points[j])
                dist_map[dist] = dist_map.get(dist, 0) + 1
        
        # Calculate boomerangs
        for freq in dist_map.values():
            count += freq * (freq - 1)
    
    return count

# Using Counter for cleaner code
from collections import Counter

def numberOfBoomerangsCounter(points):
    def distance_squared(p1, p2):
        return (p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2
    
    total = 0
    
    for center in points:
        # Count frequency of each distance
        distances = []
        for point in points:
            if point != center:
                distances.append(distance_squared(center, point))
        
        distance_counts = Counter(distances)
        
        # Add boomerangs for this center
        for count in distance_counts.values():
            if count >= 2:
                total += count * (count - 1)
    
    return total

# Brute force approach for verification
def numberOfBoomerangsBruteForce(points):
    def distance_squared(p1, p2):
        return (p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2
    
    n = len(points)
    count = 0
    
    # Check all possible triplets
    for i in range(n):
        for j in range(n):
            for k in range(n):
                if i != j and i != k and j != k:
                    # Check if distance from i to j equals distance from i to k
                    if distance_squared(points[i], points[j]) == distance_squared(points[i], points[k]):
                        count += 1
    
    return count

# Mathematical approach with permutations
def numberOfBoomerangsMath(points):
    import math
    
    def squared_dist(p1, p2):
        return (p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2
    
    n = len(points)
    total = 0
    
    for center_idx in range(n):
        # Group points by distance
        dist_groups = {}
        
        for other_idx in range(n):
            if center_idx != other_idx:
                dist = squared_dist(points[center_idx], points[other_idx])
                if dist not in dist_groups:
                    dist_groups[dist] = 0
                dist_groups[dist] += 1
        
        # For each group with k points, add k*(k-1) to result
        # This is equivalent to P(k,2) = k!/(k-2)! = k*(k-1)
        for group_size in dist_groups.values():
            if group_size >= 2:
                total += group_size * (group_size - 1)
    
    return total

# Clean final version
def numberOfBoomerangsClean(points):
    count = 0
    
    for center in points:
        distance_freq = {}
        
        # Calculate frequency of each distance from center
        for point in points:
            if point != center:
                dist_sq = (center[0] - point[0]) ** 2 + (center[1] - point[1]) ** 2
                distance_freq[dist_sq] = distance_freq.get(dist_sq, 0) + 1
        
        # Count boomerangs: for k points at same distance, we get k*(k-1) boomerangs
        for freq in distance_freq.values():
            count += freq * (freq - 1)
    
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) where n is the number of points. For each point as center, we calculate distances to all other points.
- **Space Complexity:** O(n) for the distance frequency map. In worst case, all points are at different distances from the center.

### Potential follow-up questions (as if you're the interviewer)  

- How would you modify this to find boomerangs where all three points are collinear?  
  *Hint: Instead of using distance, use slope or angle calculations to group collinear points.*

- What if you needed to find boomerangs in 3D space?  
  *Hint: Extend distance calculation to 3D: (x₁-x₂)² + (y₁-y₂)² + (z₁-z₂)².*

- How would you optimize this for very large datasets where most points are far apart?  
  *Hint: Use spatial data structures like KD-trees or grid-based hashing to reduce distance calculations.*

- Can you solve this if floating point distances were required instead of squared distances?  
  *Hint: Use appropriate precision handling and consider floating point comparison issues.*

### Summary
This problem demonstrates the power of grouping and counting techniques combined with geometric calculations. The key insight is recognizing that for each center point, we need to count how many ways we can choose 2 points from each distance group, where order matters (permutations). This pattern appears in many geometric problems involving equidistant points, clustering, and spatial analysis. Understanding how to efficiently group by calculated properties and apply combinatorial counting is fundamental for solving geometric optimization and analysis problems.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math)

### Similar Problems
- Line Reflection(line-reflection) (Medium)