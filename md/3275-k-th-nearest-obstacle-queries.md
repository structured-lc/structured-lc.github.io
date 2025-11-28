### Leetcode 3275 (Medium): K-th Nearest Obstacle Queries [Practice](https://leetcode.com/problems/k-th-nearest-obstacle-queries)

### Description  
Given a sequence of queries, each is an obstacle placed at a point (x, y) on a 2D plane.  
After each query, report the distance from the origin (0,0) to the k-th nearest obstacle so far using Manhattan distance, where distance = |x| + |y|.  
If there are fewer than k obstacles after a query, return -1 for that query.  
You must process queries online: after each placement, update the result before the next query.

### Examples  

**Example 1:**  
Input: `k = 2, queries = [[3,2], [1,4], [0,6], [2,3]]`  
Output: `[ -1, 5, 5, 5 ]`  
*Explanation:*
- q₁: |3|+|2|=5, less than 2 obstacles → -1  
- q₂: |1|+|4|=5, now have 2 obstacles with distances [5,5] → the 2ⁿᵈ smallest is 5  
- q₃: |0|+|6|=6, distances [5,5,6] → 2ⁿᵈ smallest is 5  
- q₄: |2|+|3|=5, distances [5,5,5,6] → 2ⁿᵈ smallest is 5

**Example 2:**  
Input: `k = 1, queries = [[-1,-1], [2,3]]`  
Output: `[ 2, 2 ]`  
*Explanation:*
- q₁: |−1|+|−1|=2, one obstacle, 1ˢᵗ nearest is 2  
- q₂: |2|+|3|=5, two obstacles [2,5], 1ˢᵗ nearest is 2

**Example 3:**  
Input: `k = 3, queries = [[1,1], [0,0], [2,2], [0,3]]`  
Output: `[ -1, -1, 1, 2 ]`  
*Explanation:*
- q₁: |1|+|1|=2, <3 obstacles → -1  
- q₂: |0|+|0|=0, [2,0], still <3 → -1  
- q₃: |2|+|2|=4, [2,0,4], 3ʳᵈ nearest is 4  
- q₄: |0|+|3|=3, [2,0,4,3], sorted [0,2,3,4], 3ʳᵈ nearest is 3

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  For each query, calculate the distance, store all distances, sort the list, and pick the k-th smallest after every insertion. This is O(n² log n)—not efficient.
- **Heap optimization:**  
  Instead, maintain a max-heap of size k:  
  - For every new obstacle, calculate its distance and push to the heap.  
  - If heap size exceeds k, remove the largest.  
  - If heap has ≥k elements, the maximum at the top is the k-th nearest; else, output -1.
- **Why max-heap?**  
  We want to efficiently track the k closest obstacles; the largest in heap is currently the k-th nearest.
- This approach gives O(n log k) time, which is efficient for large input sizes.

### Corner cases to consider  
- Fewer than k obstacles after a query → output -1  
- Obstacles at the same coordinate (duplicate distances)  
- Negative coordinates  
- Very large or small values for x or y  
- k=1 (always report the nearest obstacle)  
- queries = [], or k larger than the number of total queries

### Solution

```python
import heapq

def kth_nearest_obstacle_queries(k, queries):
    # Max-heap for k nearest (use min-heap with negatives)
    heap = []
    result = []

    for x, y in queries:
        dist = abs(x) + abs(y)
        # Push negative distance for max-heap effect
        heapq.heappush(heap, -dist)
        # Keep only k elements (remove farthest if over k)
        if len(heap) > k:
            heapq.heappop(heap)
        # If we have fewer than k obstacles, output -1
        if len(heap) < k:
            result.append(-1)
        else:
            # The top is k-th nearest (restore sign)
            result.append(-heap[0])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log k)  
  Each insertion and (potential) removal in the heap is O(log k), and every query is processed once.
- **Space Complexity:** O(k)  
  The heap grows up to k elements. Output array is O(n) for n queries.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you report the k nearest **actual coordinates**, not just the distance?  
  *Hint: Store the coordinates alongside the distance in the heap.*

- What if obstacles can be **removed**?  
  *Hint: Use additional data structures—may need balanced BST or hash map for removals.*

- How would a solution change if the distance metric was **Euclidean** instead of Manhattan?  
  *Hint: The heap logic is unchanged; just calculate Euclidean distance using sqrt(x² + y²).*

### Summary
This problem uses the "top K elements" pattern, best solved with a size-k max-heap to efficiently maintain the current k closest values. This pattern is common in stream processing, online statistics, and leaderboard designs, and appears in many LeetCode problems (like "Kth Largest Element in a Stream", "Top K Frequent Elements", etc.).


### Flashcard
Maintain a max-heap of size k; for each obstacle, compute distance and push to heap; if size > k, pop max; answer is heap top if size ≥ k, else -1.

### Tags
Array(#array), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- K Closest Points to Origin(k-closest-points-to-origin) (Medium)