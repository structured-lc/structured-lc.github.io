### LeetCode 3710 (Hard): Maximum Partition Factor [Practice](https://leetcode.com/problems/maximum-partition-factor)

### Description

In this problem, you are given a set of points and asked to find the maximum possible distance \(d\) such that all points can be divided into two groups (colored with two colors) where no two points in the same group are closer than \(d\). This distance is known as the *partition factor*.

### Examples

**Example 1:**  
Input: Points = `[(0, 0), (1, 1), (3, 3), (4, 4)]`  
Output: `1`  
Explanation: The maximum distance is 1, as we can place points `(0, 0)` and `(1, 1)` in one group and `(3, 3)` and `(4, 4)` in another, ensuring no two points in the same group are closer than 1 unit.

**Example 2:**  
Input: Points = `[(0, 0), (5, 5), (10, 10)]`  
Output: `5`  
Explanation: We can place points `(0, 0)` and `(5, 5)` in one group and `(10, 10)` in another (or vice versa), ensuring no two points in the same group are closer than 5 units.

**Example 3:**  
Input: Points = `[(0, 0), (4, 4), (8, 8), (12, 12)]`  
Output: `4`  
Explanation: We can divide the points into two groups with a distance of 4 between points in each group.

### Thought Process
To solve this problem, we can use a brute-force approach initially by trying all possible distances and checking if we can color the points accordingly. However, this is inefficient for large inputs.

1. **Brute Force:** Try all possible distances, from smallest to largest, and check if points can be colored such that no two points of the same color are closer than the current distance. This approach is inefficient due to its high time complexity.

2. **Optimized Approach:** Use binary search to find the largest distance \(d\). For each distance \(d\) we test:

   - **Check Feasibility:** Determine if it's possible to color the points so that no two points of the same color are closer than \(d\). We can do this by checking each pair of points and ensuring they are either far enough apart or not in the same group.

   - **Binary Search:** If the current distance \(d\) is feasible, try increasing it. If not, decrease it. This process continues until we find the maximum distance where the condition is satisfied.

3. **Graph Theory:** Another approach involves constructing a graph where points are nodes, and edges connect points closer than \(d\). We then check if the graph is bipartite using DFS or BFS. If it is bipartite, all points can be colored with two colors under the given distance constraint.

### Corner Cases to Consider
- **Empty Array:** If there are no points, the partition factor can be considered as infinity or undefined.
- **Single Element:** If there is only one point, any distance works.
- **Equal Elements:** If all points are the same (in the same location), the partition factor is 0 unless they can be divided into distinct groups.
- **Points on the Same Line:** If all points are collinear, ensure that they can be divided based on their distance in a line.

### Solution
```python
def maximumPartitionFactor(points):
    # Calculate distances between points
    def calculateDistances(points):
        distances = []
        for i in range(len(points)):
            for j in range(i + 1, len(points)):
                # Manhattan distance
                distance = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])
                distances.append(distance)
        return distances

    distances = calculateDistances(points)
    distances.sort()

    # Binary search for the maximum distance
    def isFeasible(distance):
        # Check if points can be colored so no two points of the same color are closer than 'distance'
        # This part can be optimized using graph algorithms like checking bipartiteness
        graph = {}
        edges = []
        for i in range(len(points)):
            for j in range(i + 1, len(points)):
                manhattan_distance = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])
                if manhattan_distance < distance:
                    edges.append((i, j))
        
        # Simple coloring attempt
        colors = [None] * len(points)
        for edge in edges:
            if colors[edge[0]] is None:
                colors[edge[0]] = 0
            if colors[edge[1]] is None:
                colors[edge[1]] = 1 if colors[edge[0]] == 0 else 0
            elif colors[edge[0]] == colors[edge[1]]:
                return False  # Not feasible
        return True

    low, high = max(0, min(distances)), max(distances)
    while low < high:
        mid = (low + high + 1) // 2  # Bias towards higher distances
        if isFeasible(mid):
            low = mid
        else:
            high = mid - 1

    return low
```

### Time and Space Complexity Analysis

- **Time Complexity:** O(n² log(max_distance)), where n is the number of points. This breaks down into O(n²) for creating distances and edges, and O(log(max_distance)) for the binary search.
- **Space Complexity:** O(n²) for storing edges between points and distances.

### Potential Follow-up Questions

1. **Optimizing Graph Construction:** How can you improve the efficiency of constructing the graph for checking bipartiteness?

2. **Handling High-Dimensional Data:** If points are in higher dimensions (e.g., 3D), how would you adapt the solution to still find the maximum partition factor efficiently?

3. **Incremental Updates:** If points are added or removed dynamically, how would you update the partition factor without recalculating everything from scratch?


### Flashcard
Use binary search on the distance value, then check if points can be 2-colored such that no two same-color points are closer than the current distance.

### Tags
Array(#array), Binary Search(#binary-search), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Graph(#graph)

### Similar Problems
