### Leetcode 2462 (Medium): Total Cost to Hire K Workers [Practice](https://leetcode.com/problems/total-cost-to-hire-k-workers)

### Description  
Given a list of worker **hiring costs** (`costs`), you are to hire exactly **k** workers. Each time you hire, you may only choose from among the first **candidates** or last **candidates** available workers, hiring the one with the lowest cost (prioritizing the lower index for ties). After hiring, the worker leaves the pool and you repeat until **k** hires are made. Compute the **minimum total cost** to hire **k** workers following these rules.

### Examples  

**Example 1:**  
Input: `costs = [17,12,10,2,7,2,11,20,8]`, `k = 3`, `candidates = 4`  
Output: `11`  
*Explanation:*
- Session 1: Consider [17,12,10,2] and [20,8] → lowest is 2 (index 3) → hire, costs now [17,12,10,7,2,11,20,8]
- Session 2: Consider [17,12,10,7] and [20,8] → lowest is 7 (index 4) → hire, costs now [17,12,10,11,20,8]
- Session 3: Consider [17,12,10,11] and [20,8] → lowest is 8 (index 5 in original, now at last index) → hire
- Total cost = 2 + 7 + 2 = **11**

**Example 2:**  
Input: `costs = [1,2,4,1]`, `k = 3`, `candidates = 3`  
Output: `4`  
*Explanation:*
- First 3 and last 3 both overlap since there are only 4 workers.
- Choose min among [1,2,4,1]: pick 1 (index 0) → left: [2,4,1]
- Next session: [2,4,1]: pick 1 (last index, now at index 2)
- Next session: [2,4]: pick 2 (index 0)
- Total cost = 1 + 1 + 2 = **4**

**Example 3:**  
Input: `costs = [5,5,5,5]`, `k = 2`, `candidates = 2`  
Output: `10`  
*Explanation:*
- All costs the same: pick leftmost 5 (index 0), then next leftmost 5 (index 1)
- Total cost = 5 + 5 = **10**

### Thought Process (as if you’re the interviewee)  
- Brute-force idea: In each session, check the first and last **candidates** elements, scan them for the minimum, ensuring not to select someone already hired; remove them from the pool. Repeat **k** times.  
  - This would be \(O(k \times candidates)\) per operation, or worse if implemented naively, especially if slicing arrays.
- Optimize: To efficiently get the minimum from both ends, we can use two min-heaps—one for the **left candidates** window and one for the **right candidates** window. Each hiring session, compare the top of each heap, hire the cheaper one (using index as tiebreaker), and adjust the window by pushing the next element into the appropriate heap.  
  - Heaps ensure each extraction is \(O(\log n)\), and we only track at most \(2 \times candidates\) workers at any point.
- Trade-offs: Heaps optimize for quick minimum extraction. Care needed to handle the case where windows overlap or fewer elements than candidates remain.

### Corner cases to consider  
- `k = 0`: Should return 0.
- `candidates` >= `len(costs)`: Both ends' pools overlap—just pick lowest k costs.
- All costs equal: Always pick by index rule.
- Only one worker available: Single element case.
- Workers < 2 * candidates: Windows may overlap; do not double count any worker.
- Tie in costs: Must choose the worker with the lower index.

### Solution

```python
import heapq

def totalCost(costs, k, candidates):
    # Initialize two min-heaps for left and right candidate windows
    n = len(costs)
    left_heap = []
    right_heap = []
    l = 0
    r = n - 1
    
    # Fill initial heaps
    for _ in range(candidates):
        if l <= r:
            heapq.heappush(left_heap, (costs[l], l))
            l += 1
        if l <= r:
            heapq.heappush(right_heap, (costs[r], r))
            r -= 1

    total = 0
    hired = 0
    while hired < k:
        # Choose the smallest available from either heap
        if left_heap and right_heap:
            if left_heap[0][0] <= right_heap[0][0]:
                cost, idx = heapq.heappop(left_heap)
                total += cost
                # Move left pointer forward and add next to left_heap if still in range
                if l <= r:
                    heapq.heappush(left_heap, (costs[l], l))
                    l += 1
            else:
                cost, idx = heapq.heappop(right_heap)
                total += cost
                # Move right pointer backward and add next to right_heap if still in range
                if l <= r:
                    heapq.heappush(right_heap, (costs[r], r))
                    r -= 1
        elif left_heap:
            cost, idx = heapq.heappop(left_heap)
            total += cost
            if l <= r:
                heapq.heappush(left_heap, (costs[l], l))
                l += 1
        elif right_heap:
            cost, idx = heapq.heappop(right_heap)
            total += cost
            if l <= r:
                heapq.heappush(right_heap, (costs[r], r))
                r -= 1
        hired += 1
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Each hire operation is \(O(\log c)\) due to each heap containing up to **candidates** elements.  
  - For **k** hires: \(O(k \log(candidates))\).
  - Initial heap build: up to \(O(candidates)\).
  - Total: \(O(k \log(candidates)) + O(candidates)\).

- **Space Complexity:**  
  - The two heaps store at most \(2 \times candidates\) elements, so \(O(candidates)\) extra space; input costs array of size \(n\).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you must output the indices of the hired workers in the correct order?  
  *Hint: Track and store indices along with costs when popping from heaps.*

- How would the solution change if the hiring rules required random batches, not strictly left/right windows?  
  *Hint: The heap strategy may still work, but batch creation and management logic changes.*

- If `costs` is extremely large and cannot be fully stored in memory, what would you do?  
  *Hint: Use streaming algorithms and maintain min-heaps only for relevant portions.*

### Summary
This is a classic **two-heap window min extraction** problem. We efficiently maintain two min-heaps for both left and right candidates, always hiring the minimum-cost worker. The approach is a type of *greedy algorithm* with heap window management. This *sliding window with heaps* technique is also applicable in problems where you must repeatedly pick the smallest (or largest) values from multiple moving windows or subsets, such as streaming data minimums or sliding window medians.


### Flashcard
Use two min-heaps for left and right candidate windows to always hire the lowest-cost worker from either end in O(k log candidates) time.

### Tags
Array(#array), Two Pointers(#two-pointers), Heap (Priority Queue)(#heap-priority-queue), Simulation(#simulation)

### Similar Problems
- Meeting Rooms II(meeting-rooms-ii) (Medium)
- Time to Cross a Bridge(time-to-cross-a-bridge) (Hard)