### Leetcode 1642 (Medium): Furthest Building You Can Reach [Practice](https://leetcode.com/problems/furthest-building-you-can-reach)

### Description  
Given a list of buildings (by their heights), and a number of bricks and ladders, determine the furthest building index you can reach from left to right. When moving from building i to i+1:
- If the next building is not taller, move for free.
- If it's taller, you must use either ladders (jump any height), or bricks (use equal to height difference).
Ladders and bricks are scarce. Maximize the index reached.

### Examples  
**Example 1:**  
Input: `heights = [4,2,7,6,9,14,12]`, `bricks = 5`, `ladders = 1`  
Output: `4`  
*Explanation: Climb from 4->2 for free, 2->7 (5 bricks), 7->6 (free), 6->9 (ladder). Cannot proceed from 9 to 14 (out of resources). Reach index 4.*

**Example 2:**  
Input: `heights = [4,12,2,7,3,18,20,3,19]`, `bricks = 10`, `ladders = 2`  
Output: `7`  
*Explanation: Use ladders at largest jumps, bricks on smaller ones, detailed management needed.*

**Example 3:**  
Input: `heights = [14,3,19,3]`, `bricks = 17`, `ladders = 0`  
Output: `3`  
*Explanation: Use 11 bricks to go 3->19, reach end.*

### Thought Process (as if you’re the interviewee)  
Brute force would be at each building, try all possible ways to assign bricks/ladders, but this grows exponentially.

Optimal plan: Use ladders for the biggest climbs and bricks for smaller climbs. Use a min-heap to always "swap" the smallest climb from ladder to brick if exceeded ladder limit.

At each uphill step, push height difference into min-heap. If heap's size exceeds ladders, pop the smallest, and pay that cost in bricks. If out of bricks, return current index.

### Corner cases to consider  
- No uphill moves
- ladders ≥ number of uphills (can go all the way)
- Not enough resources at first big climb
- All climbs are zero or negative
- heights has length 1

### Solution

```python
import heapq

def furthestBuilding(heights, bricks, ladders):
    heap = []  # min-heap for climbs where we used ladder so far
    for i in range(len(heights) - 1):
        climb = heights[i + 1] - heights[i]
        if climb > 0:
            heapq.heappush(heap, climb)
            if len(heap) > ladders:
                bricks -= heapq.heappop(heap)
                if bricks < 0:
                    return i
    return len(heights) - 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n \* log k), where n = len(heights), k = number of ladders (maximum heap size). Heap operations dominate.
- **Space Complexity:** O(k), heap holds at most ladders+1 elements.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if you were only allowed to use bricks for climbs up to a threshold?  
  *Hint: Use binary search to find max reachable index given brick/ladder limit.*

- Can you return the actual path (list of buildings reached)?  
  *Hint: Track indices, maybe store heap state per position for traceback.*

- What if ladders and bricks cannot be mixed—must use only one per run?  
  *Hint: Problem becomes segmented; DP required.*

### Summary
Min heap/greedy pattern: always save ladders for largest uphill jumps. This approach often appears for resource allocation where you want to maximize progress with limited tools.


### Flashcard
Use ladders for the largest climbs and bricks for smaller ones, optimizing with a min-heap.

### Tags
Array(#array), Greedy(#greedy), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Make the Prefix Sum Non-negative(make-the-prefix-sum-non-negative) (Medium)
- Find Building Where Alice and Bob Can Meet(find-building-where-alice-and-bob-can-meet) (Hard)