### Leetcode 1354 (Hard): Construct Target Array With Multiple Sums [Practice](https://leetcode.com/problems/construct-target-array-with-multiple-sums)

### Description  
Given a target array of positive integers, you start with an array of all 1s (same length as target). Every operation, you choose an index and set the number at that index to be the sum of the whole array. Return true if you can build the target array from an array of ones, otherwise false.

### Examples  

**Example 1:**  
Input: `target = [9,3,5]`  
Output: `True`  
*Explanation: Start with [1,1,1] → [1,1,3] → [3,1,3] → [9,3,5].*

**Example 2:**  
Input: `target = [1,1,1,2]`  
Output: `False`  
*Explanation: It's impossible to reach from ones.*

**Example 3:**  
Input: `target = [8,5]`  
Output: `True`  
*Explanation: [1, 1] → [1, 2] → [3, 2] → [3, 5] → [8, 5].*


### Thought Process (as if you’re the interviewee)  
Forward simulation is complex. Work backwards:
- At each step, the largest element must have come from a "previous sum" operation, so subtract the sum of others from it.
- Use a max-heap (invert values) to always find and operate on the largest number.
- If at any point the largest number becomes less than the sum of the rest (or ≤ 0), impossible.
- Stop when all are 1 (the base array).

Edge trick: If at any step the sum of the rest is 1, you can always reduce the max to 1 through repeated subtractions.

### Corner cases to consider  
- target contains a single very large number
- [1, ... 1, something > 1]
- All ones (already valid)
- Cases where sum of rest equals or exceeds max

### Solution

```python
import heapq

def isPossible(target):
    total = sum(target)
    target = [-x for x in target]  # max-heap
    heapq.heapify(target)
    
    while True:
        max_num = -heapq.heappop(target)
        rest = total - max_num
        if max_num == 1 or rest == 1:
            return True
        if rest == 0 or max_num < rest or max_num % rest == 0:
            return False
        updated = max_num % rest
        total = rest + updated
        heapq.heappush(target, -updated)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(log n × log (max value)) because each heap operation is O(log n) and the max decreases significantly each time.
- **Space Complexity:** O(n) for the heap and some variables.

### Potential follow-up questions (as if you’re the interviewer)  
- What if the allowed operation were sum of a subset instead of whole array?
  *Hint: Original approach would break, need to track additional info.*

- Can you reconstruct the sequence of moves as proof if possible?
  *Hint: Keep track of the array at each step as you go backward.*

- What if negative numbers are allowed?
  *Hint: Subtraction logic would change the termination conditions.*

### Summary
This is a reverse simulation with max-heap, a smart variant of greedy approach seen often in problems where largest elements govern the state. Pattern applies to optimal allocation, incremental construction, and greedy-decompose problems.


### Flashcard
Work backwards using a max-heap; repeatedly subtract sum of others from the largest, check for impossibility or all ones.

### Tags
Array(#array), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Minimum Amount of Time to Fill Cups(minimum-amount-of-time-to-fill-cups) (Easy)