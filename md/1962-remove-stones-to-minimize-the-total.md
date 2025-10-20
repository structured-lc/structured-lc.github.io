### Leetcode 1962 (Medium): Remove Stones to Minimize the Total [Practice](https://leetcode.com/problems/remove-stones-to-minimize-the-total)

### Description  
Given an array of integers representing **piles** of stones, and an integer **k**, perform exactly **k** operations. In each operation, you choose **any pile** and remove half of its stones (rounded down, i.e., remove ⌊pile/2⌋ stones).  
You can perform multiple operations on the same pile.  
Your task: **Return the minimum possible total number of stones left in all piles after exactly k operations.**

- Each operation: pick the pile with the most stones, remove half (⌊pile/2⌋) stones.

### Examples  

**Example 1:**  
Input: `piles = [5,4,9]`, `k = 2`  
Output: `12`  
*Explanation:  
1. Remove from 9: 9 → 5 (⌊9/2⌋ = 4 taken, 5 remain). Piles: [5,4,5]  
2. Remove from 5: 5 → 3 (⌊5/2⌋ = 2 taken, 3 remain). Piles: [5,4,3]  
Total stones = 5 + 4 + 3 = 12*

**Example 2:**  
Input: `piles = [4,3,6,7]`, `k = 3`  
Output: `12`  
*Explanation:  
1. Remove from 7: 7 → 4 (⌊7/2⌋ = 3 taken). Piles: [4,3,6,4]  
2. Remove from 6: 6 → 3 (⌊6/2⌋ = 3 taken). Piles: [4,3,3,4]  
3. Remove from 4: 4 → 2 (⌊4/2⌋ = 2 taken). Piles: [2,3,3,4]  
Total stones = 2 + 3 + 3 + 4 = 12*

**Example 3:**  
Input: `piles = [1]`, `k = 100`  
Output: `1`  
*Explanation:  
No matter how many times you halve 1, it remains 1 (because ⌊1/2⌋ = 0).*

### Thought Process (as if you’re the interviewee)  
First, consider a brute force approach: for every operation, check all piles, find the largest, halve it, repeat k times. This obviously is inefficient.

To optimize, **always operate on the pile with the most stones**, since removing half from the largest pile reduces the total sum the most. This is a greedy approach.

The challenge is efficiently finding and updating the max pile in each operation.  
- Sorting is not efficient, as sorting after every change is expensive.  
- **Max Heap (priority queue)** efficiently gives us the max _in O(log n)_ upon removal and allows reinsertion after update.

Plan:  
- Add all piles to a max heap.  
- For k steps:  
  - Extract the largest pile, halve it (subtract ⌊x/2⌋), put the remaining stones back.  
- After k operations, sum the stones left in the heap.

This is efficient and guarantees we minimize the stone count in each operation.

### Corner cases to consider  
- Empty piles array (but as per constraints, piles will have at least one element)
- All piles have the same number of stones  
- Only one pile  
- k larger than total stones (eventually piles just remain at 1)  
- Piles containing 1 (cannot remove any more stones)
- k = 0 (no operation)

### Solution

```python
import heapq

def minStoneSum(piles, k):
    # Use a max-heap by storing negatives
    max_heap = [-x for x in piles]
    heapq.heapify(max_heap)

    for _ in range(k):
        # Get largest pile (invert sign)
        largest = -heapq.heappop(max_heap)
        # Remove half stones, rounded down
        removed = largest // 2
        remaining = largest - removed
        # Put updated value back
        heapq.heappush(max_heap, -remaining)

    # Sum up the stones (invert sign back)
    return -sum(max_heap)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + k × log n)
  - Initial heapify is O(n)
  - Each of k operations takes O(log n) for pop and push.
- **Space Complexity:** O(n)
  - The heap contains n elements.

### Potential follow-up questions (as if you’re the interviewer)  

- What if k is much larger than the number of stones in total?  
  *Hint: How does the process behave when piles drop to 1?*

- Can you return the sequence of piles after each operation, not just the total?  
  *Hint: Track and save the heap state after every operation.*

- How would you change this if you could only operate on distinct piles for each operation?  
  *Hint: What data structure ensures you don’t re-select piles within a pass?*

### Summary
This problem is a classic greedy question using a **max heap (priority queue)** to always pick the largest element quickly, which maximizes the reduction in total sum per operation.  
This heap/reduction pattern is common in problems where you repeatedly want the “current best” or “current biggest” item — for example, in "Reduce Array Size to Half", "IPO", or "Last Stone Weight".


### Flashcard
Use max-heap to always remove ⌊pile/2⌋ from largest pile, then reinsert remainder; repeat k times for minimal total sum.

### Tags
Array(#array), Greedy(#greedy), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Minimum Operations to Halve Array Sum(minimum-operations-to-halve-array-sum) (Medium)
- Maximal Score After Applying K Operations(maximal-score-after-applying-k-operations) (Medium)
- Take Gifts From the Richest Pile(take-gifts-from-the-richest-pile) (Easy)