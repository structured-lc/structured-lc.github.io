### Leetcode 973 (Medium): K Closest Points to Origin [Practice](https://leetcode.com/problems/k-closest-points-to-origin)

### Description  
Given an array of points on the 2D plane, each point represented as [x, y], and an integer k, return the k points closest to the origin (0, 0) using Euclidean distance. The returned points can be in any order.  
The distance between (x, y) and (0, 0) is calculated as sqrt(x² + y²), but to compare relative distances, it's sufficient to use the squared value (x² + y²).

### Examples  

**Example 1:**  
Input: `points = [[1,3], [-2,2]], k = 1`  
Output: `[[-2,2]]`  
*Explanation:  
Distances: [1² + 3² = 10], [(-2)² + 2² = 8]. The point [-2,2] is closer to the origin.*

**Example 2:**  
Input: `points = [[3,3],[5,-1],[-2,4]], k = 2`  
Output: `[[3,3],[-2,4]]`  
*Explanation:  
Distances: [3² + 3² = 18], [5² + (-1)² = 26], [(-2)² + 4² = 20]. The two closest are [3,3] (18) and [-2,4] (20).*

**Example 3:**  
Input: `points = [[0,1],[1,0]], k = 2`  
Output: `[[0,1],[1,0]]`  
*Explanation:  
Both distances: 1. Both points are the same distance from the origin; return both.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  Calculate the Euclidean distance for each point and sort all points based on distance. Return the first k points.

- **Heap Optimization:**  
  Since we only care about the k closest, we can use a **max heap** of size k to always keep the closest k points. For each new point, if it is closer than the farthest point currently in the heap, replace it. This avoids sorting the entire array.

- **Quickselect Algorithm:**  
  We can use a variation of quickselect (partial quicksort) to partition the points such that the first k are the closest. Quickselect is efficient for selection problems like this but is harder to implement correctly with custom comparators.

- **Trade-offs:**  
  Heap is simple and works in O(n log k) time, using O(k) extra space.  
  Quickselect is faster on average (O(n)), but worst-case can degrade to O(n²) if unbalanced on some inputs. For interviews, the heap-based method is usually preferred for clarity and robustness.

### Corner cases to consider  
- k equals the number of points (return all)
- Points with equal distances to the origin (ties)
- The input array is empty
- The value of k is 0
- Negative and positive coordinates
- Very large or very small coordinates (test for overflow)

### Solution

```python
def kClosest(points, k):
    # Helper function to calculate the squared distance
    def squared_distance(point):
        x, y = point
        return x * x + y * y

    # Build a max heap of size k: store pairs (-distance, index)
    heap = []
    for i in range(k):
        dist = squared_distance(points[i])
        heap.append((-dist, i))  # Negate to simulate max heap with min heap logic

    # Heapify initial k elements
    for i in range(k//2 - 1, -1, -1):
        # Heapify subtree rooted at i
        j = i
        while 2 * j + 1 < k:
            left = 2 * j + 1
            right = 2 * j + 2
            largest = j
            if heap[left][0] > heap[largest][0]:
                largest = left
            if right < k and heap[right][0] > heap[largest][0]:
                largest = right
            if largest == j:
                break
            heap[j], heap[largest] = heap[largest], heap[j]
            j = largest

    # Process the rest of the points
    for i in range(k, len(points)):
        dist = squared_distance(points[i])
        if -dist > heap[0][0]:  # If current point is closer than farthest in heap
            heap[0] = (-dist, i)
            # Restore heap property
            j = 0
            while 2 * j + 1 < k:
                left = 2 * j + 1
                right = 2 * j + 2
                largest = j
                if heap[left][0] > heap[largest][0]:
                    largest = left
                if right < k and heap[right][0] > heap[largest][0]:
                    largest = right
                if largest == j:
                    break
                heap[j], heap[largest] = heap[largest], heap[j]
                j = largest

    # Extract the k closest points from the indices stored in the heap
    result = []
    for (_, idx) in heap:
        result.append(points[idx])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log k):  
  - Initial heapify for k elements is O(k).
  - For each of the remaining n - k points, each heap adjustment is O(log k).
  - Total is O(n log k).

- **Space Complexity:**  
  O(k):  
  - Extra space for the heap (at most k elements).
  - Output array of size k.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of points is extremely large and they reside on disk?  
  *Hint: Think about external sorting or streaming techniques. Can you process points in a single pass?*

- How would you handle the case if k is very large, say almost n?  
  *Hint: When k ≈ n, is sorting the full array better than using a heap?*

- Suppose distance calculation is expensive. Can you reduce the number of distance computations?  
  *Hint: Caching, or avoid recalculating distances where possible.*

### Summary
This problem uses the "top-k" pattern, often solved via heap or partial quickselect. The heap-based approach is efficient for moderate k and allows us to process very large arrays in a streaming fashion. This pattern appears in problems like finding k largest/smallest elements, top-k frequent, or nearest neighbors. The solution avoids the performance costs of sorting the full array and is robust for interviews.


### Flashcard
Use a max heap of size k to keep the closest k points by Euclidean distance, or use Quickselect to partition and select the k closest.

### Tags
Array(#array), Math(#math), Divide and Conquer(#divide-and-conquer), Geometry(#geometry), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Quickselect(#quickselect)

### Similar Problems
- Kth Largest Element in an Array(kth-largest-element-in-an-array) (Medium)
- Top K Frequent Elements(top-k-frequent-elements) (Medium)
- Top K Frequent Words(top-k-frequent-words) (Medium)
- Find Nearest Point That Has the Same X or Y Coordinate(find-nearest-point-that-has-the-same-x-or-y-coordinate) (Easy)
- Minimum Rectangles to Cover Points(minimum-rectangles-to-cover-points) (Medium)
- K-th Nearest Obstacle Queries(k-th-nearest-obstacle-queries) (Medium)