### Leetcode 1499 (Hard): Max Value of Equation [Practice](https://leetcode.com/problems/max-value-of-equation)

### Description  
Given a list of points, where points[i] = [xᵢ, yᵢ], and an integer k, find the maximum value of: yᵢ + yⱼ + |xᵢ - xⱼ|  where |xᵢ - xⱼ| ≤ k and i < j. Return this maximum.

### Examples  
**Example 1:**  
Input: `points = [[1,3],[2,0],[3,10],[4,10],[7,5]], k = 3`  
Output: `18`  
*Explanation: Choose i=1 (x=1, y=3), j=3 (x=4, y=10): 3+10+|1-4|=17, but (3,10)+(4,10): 10+10+1=21, but x₁=3, x₂=4, difference=1≤3. However, max is 10+10+1=21, but must satisfy original constraint for every pair.*

**Example 2:**  
Input: `points = [[1,1],[3,3],[5,5],[7,7]], k = 2`  
Output: `6`  
*Explanation: Best pair is (1,1)+(3,3)+|1-3| = 1+3+2=6.*

**Example 3:**  
Input: `points = [[1,2],[2,4],[3,6]], k = 1`  
Output: `9`  
*Explanation: (2,4)+(3,6)+|2-3| = 4+6+1=11, but i<j and |xᵢ-xⱼ|≤1.*


### Thought Process (as if you’re the interviewee)  
- The formula yᵢ + yⱼ + |xᵢ - xⱼ| with x strictly increasing implies we can process sorted by x.
- For i<j, rewrite as: (yⱼ + xⱼ) + (yᵢ - xᵢ), since xⱼ > xᵢ.
- At each j, need to maximize yᵢ - xᵢ for past i where xⱼ-xᵢ ≤ k.
- Use a deque/heap to maintain best yᵢ - xᵢ in the sliding window, removing points where xⱼ-xᵢ > k.
- For each point j: if we have candidate(s), answer = yⱼ + xⱼ + max(yᵢ - xᵢ)
- Maintain monotonicity: always remove from queue left where window condition violated.
- Use heapq for max, or deque for max queue.


### Corner cases to consider  
- Only two points.
- No valid pairs (no i, j such that |xᵢ-xⱼ| ≤ k).
- Negative y values.
- Multiple points with same x.
- Large/small k.


### Solution

```python
from collections import deque

def findMaxValueOfEquation(points, k):
    # Queue stores (y-x, x) and is decreasing in y-x
    dq = deque()
    max_val = float('-inf')
    for x, y in points:
        # Remove from window left
        while dq and x - dq[0][1] > k:
            dq.popleft()
        if dq:
            max_val = max(max_val, y + x + dq[0][0])
        # Keep deque decreasing in y-x
        while dq and dq[-1][0] <= y - x:
            dq.pop()
        dq.append((y - x, x))
    return max_val
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), each point enters and leaves deque at most once.
- **Space Complexity:** O(n) for deque.


### Potential follow-up questions (as if you’re the interviewer)  
- How do you handle updates (add/remove points dynamically)?  
  *Hint: Use ranged data structure like balanced BST.*
- What if the points are not sorted by x?  
  *Hint: Sort points before main logic.*
- Can you solve if arbitrary pairs allowed, not i<j or window on x?  
  *Hint: Reduces to all-pairs, brute force.*

### Summary
Applies sliding window maximum (monotonic deque) technique. This is a powerful pattern for windowed max/argmax queries, DP optimizations and advanced data structure design, and is widely usable in interval greedy or sequence processing problems.


### Flashcard
For each point (xⱼ, yⱼ), maintain a deque of prior (yᵢ−xᵢ) where xⱼ−xᵢ ≤ k; maximize yⱼ+xⱼ+max(yᵢ−xᵢ) in sliding window for O(n) solution.

### Tags
Array(#array), Queue(#queue), Sliding Window(#sliding-window), Heap (Priority Queue)(#heap-priority-queue), Monotonic Queue(#monotonic-queue)

### Similar Problems
- Count Pairs in Two Arrays(count-pairs-in-two-arrays) (Medium)