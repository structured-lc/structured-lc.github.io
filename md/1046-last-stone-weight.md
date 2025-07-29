### Leetcode 1046 (Easy): Last Stone Weight [Practice](https://leetcode.com/problems/last-stone-weight)

### Description  
Given a list of *positive integers* representing the weights of stones, you simulate the following game:  
- In each turn, pick the two heaviest stones and smash them.
- If the stones are the same weight, both are destroyed.
- If their weights differ, the lighter stone is destroyed, and the heavier becomes the difference of their weights.
- Repeat until at most one stone remains.  
Return the weight of this stone, or 0 if none remain.

### Examples  

**Example 1:**  
Input: `[2,7,4,1,8,1]`,  
Output: `1`  
*Explanation:*
- Smash 8 and 7 → 1 (new stone), stones: `[2,4,1,1,1]`
- Smash 4 and 2 → 2 (new stone), stones: `[1,1,1,2]`
- Smash 2 and 1 → 1 (new stone), stones: `[1,1,1]`
- Smash 1 and 1 → 0 (both destroyed), stones: `[1]`
- Only one stone remains: `1`.

**Example 2:**  
Input: `[1]`,  
Output: `1`  
*Explanation:*
Only one stone, so it remains.

**Example 3:**  
Input: `[3,3]`,  
Output: `0`  
*Explanation:*
Smash 3 and 3 → both destroyed. No stone remains.

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach**:  
  Each turn, scan the list to find the two heaviest stones. Remove them, compute the result, insert back.  
  However, finding the two largest elements repeatedly has O(n²) time complexity.

- **Optimization**:  
  We need a data structure to efficiently fetch and remove the two largest stones.  
  A **max-heap** (priority queue) allows us to always extract the largest efficiently (push and pop both O(log n)).  
  Since Python’s `heapq` is min-heap, we can simulate a max-heap by storing negative weights.  
  This reduces overall time complexity to O(n log n).  
  Trade-off: Using a heap adds some implementation complexity, but is much faster.

### Corner cases to consider  
- Only one stone in input (just return its weight)
- All stones with identical weight
- No stones remain after all smashes (input pairs up evenly)
- All stones of size 1 (many zeroes may appear during process)
- Large weights or long input list (test performance)

### Solution

```python
def lastStoneWeight(stones):
    # Convert all stone weights to negative to use min-heap as a max-heap
    heap = [-s for s in stones]
    # Heapify the list
    import heapq
    heapq.heapify(heap)
    
    # Repeat until at most one stone left
    while len(heap) > 1:
        # Pop two heaviest stones (negate back to positive)
        first = -heapq.heappop(heap)
        second = -heapq.heappop(heap)
        if first != second:
            # If not equal, push the difference back onto the heap (as negative)
            heapq.heappush(heap, -(first - second))
    # Return the last stone's weight or 0 if none remain
    return -heap[0] if heap else 0
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log n)  
  - Each insertion and removal from heap is O(log n).
  - In the worst case, we reduce the list by 1 each round, up to n times.

- **Space Complexity:**  
  O(n)  
  - The heap stores up to n (negative) weights.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could only use O(1) extra space?
  *Hint: Can you simulate in-place? How would you sort or find max in-place?*

- What if you must return the sequence of smash results (all intermediate stones)?
  *Hint: Store history after each operation.*

- What if there are billions of stones but only a small number of unique weights?
  *Hint: Can you use a counting array or hashmap to speed up processing?*

### Summary
This problem uses a **greedy** approach, implemented efficiently with a **heap (priority queue)**. This pattern—repeatedly retrieving/removing maximum or minimum values—occurs in many scheduling and simulation problems, such as "Kth Largest Element," "Merge K Sorted Lists," and more. The heap technique is key whenever you must make frequent, efficient max/min extractions.