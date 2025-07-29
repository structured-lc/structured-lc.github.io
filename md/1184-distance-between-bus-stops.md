### Leetcode 1184 (Easy): Distance Between Bus Stops [Practice](https://leetcode.com/problems/distance-between-bus-stops)

### Description  
You are given a **circular bus route** with `n` stops, labeled from 0 to n-1. The `distance` array gives the distance between every pair of consecutive stops: `distance[i]` is the distance from stop i to (i+1)%n.  
Given two stops, `start` and `destination`, calculate the **shortest distance** (either clockwise or counterclockwise) to go from `start` to `destination`.

### Examples  

**Example 1:**  
Input: `distance = [1,2,3,4], start = 0, destination = 1`  
Output: `1`  
*Explanation: Clockwise, the path is 0 → 1 (distance 1). Counterclockwise path is 0 → 3 → 2 → 1 with distance 4+3+2=9. Minimum is 1.*

**Example 2:**  
Input: `distance = [1,2,3,4], start = 0, destination = 2`  
Output: `3`  
*Explanation: Clockwise, the path is 0 → 1 → 2 (distance 1+2=3). Counterclockwise path is 0 → 3 → 2 (distance 4+3=7). Minimum is 3.*

**Example 3:**  
Input: `distance = [1,2,3,4], start = 0, destination = 3`  
Output: `4`  
*Explanation: Clockwise, the path is 0 → 1 → 2 → 3 (distance 1+2+3=6). Counterclockwise path is 0 → 3 (distance 4). Minimum is 4.*

### Thought Process (as if you’re the interviewee)  
Start with a **brute-force** approach:
- Since the route is circular, we can either move from `start` to `destination` clockwise, or the other way (counterclockwise).
- For the **clockwise distance**, sum up distances as you move from `start` to `destination` (wrap around the array if needed).
- For the **counterclockwise distance**, it's the total sum of distances minus the clockwise path.
- Return the **minimum** of the two.

**Optimizations:**
- Precompute the total sum of the route for efficiency.
- Handle the modular arithmetic to allow wrapping around the circle.

This approach is efficient for the constrained input (distance array ≤ 100).

### Corner cases to consider  
- start and destination are equal (distance should be 0)
- distance array has only 2 bus stops
- start > destination or destination > start (should work both directions)
- Large values in `distance` array

### Solution

```python
def distanceBetweenBusStops(distance, start, destination):
    # If destination is before start, swap so that we always move forward
    if start > destination:
        start, destination = destination, start
    
    # Clockwise sum from start to destination (not including destination)
    clockwise = sum(distance[start:destination])
    
    # Total distance around the circle
    total = sum(distance)
    
    # Counterclockwise is total minus clockwise
    counterclockwise = total - clockwise
    
    # Return the minimal distance
    return min(clockwise, counterclockwise)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of bus stops, due to summing up segments of the array and the total.
- **Space Complexity:** O(1), only using a few variables for calculation, no extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle **multiple queries** for shortest path between various start and destination pairs?  
  *Hint: Precompute prefix sums for O(1) path sum queries.*

- What if the **distance array is large** (say, n = 1e5) and there are many queries?  
  *Hint: Consider preprocessing or using a segment tree.*

- How would you modify the function to **return the actual route** (the stops traversed) as well as the minimum distance?  
  *Hint: Track indices while computing the path.*

### Summary
This problem is a classic application of **array segment sums** and handling **circular arrays**. The key insight is that for any two points on a ring, the shortest path is either clockwise or counterclockwise, and we can use modular arithmetic and prefix sums to calculate both efficiently. This pattern is useful in cycle-based array problems and can be applied to similar scenarios like circular race tracks, wrap-around games, or ring topology networks.