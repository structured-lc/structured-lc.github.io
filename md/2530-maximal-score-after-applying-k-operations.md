### Leetcode 2530 (Medium): Maximal Score After Applying K Operations [Practice](https://leetcode.com/problems/maximal-score-after-applying-k-operations)

### Description  
You are given an integer array **nums** and an integer **k**. Starting with a score of 0, perform exactly **k** operations. In each operation:  
- Pick any index i such that 0 ≤ i < nums.length  
- Add nums[i] to your score  
- Replace nums[i] with ⎡nums[i] / 3⎤ (ceiling of nums[i] divided by 3)  
Return the **maximum possible score** you can achieve after k operations.

### Examples  

**Example 1:**  
Input: `nums = [10,10,10,10,10], k = 5`  
Output: `50`  
*Explanation: Each number is selected once. Each pick gives 10. Total = 10+10+10+10+10 = 50.*

**Example 2:**  
Input: `nums = [1,10,3,3,3], k = 3`  
Output: `17`  
*Explanation:  
- Operation 1: Pick index 1 (10). Score = 10. nums = [1, 4, 3, 3, 3]  
- Operation 2: Pick index 1 (4). Score = 10+4=14. nums = [1, 2, 3, 3, 3]  
- Operation 3: Pick index 2 (3). Score = 14+3=17. nums = [1, 2, 1, 3, 3]*

**Example 3:**  
Input: `nums = [8,1,9], k = 4`  
Output: `19`  
*Explanation:  
- Operation 1: Pick index 2 (9). Score = 9; nums = [8,1,3]  
- Operation 2: Pick index 0 (8). Score = 9+8=17; nums = [3,1,3]  
- Operation 3: Pick index 0 (3). Score = 17+3=20; nums = [1,1,3]  
- Operation 4: Pick index 2 (3). Score = 20+3=23; nums = [1,1,1]*

### Thought Process (as if you’re the interviewee)  
First, to maximize the score, we should always choose the largest available number at every step. Picking the largest guarantees the highest incremental gain, and when we divide by 3 (using ceiling), that number drops substantially, making others potentially better candidates for the next picks.

- **Brute Force:** Try all possible pick sequences — O(k × n) per recursion. This is intractable (k can be up to 10⁵).
- **Greedy with Sort:** Sort after every pick to find the max — O(k × n log n), still too slow.
- **Optimal (Heap):** Store all numbers in a max-heap (priority queue, using negatives for Python's min-heap). At each step, pop the largest value, add to score, compute its ⎡num/3⎤, and push back. Repeat k times.

This heap method ensures O(k log n) time, because each operation is pop & push on the heap.

### Corner cases to consider  
- Single-element arrays (nums = [x], k=1 or k>1)
- All elements equal
- k > nums.length
- Large values in nums (test ceiling logic)
- nums contains 1's (ceil(1/3) = 1, so doesn't decrease)
- k = 0 (trivial, should always return 0)
- Large maximum k

### Solution

```python
import heapq

def maxKelements(nums, k):
    # Convert nums into a max heap by inserting negatives (heapq is min-heap by default)
    max_heap = [-x for x in nums]
    heapq.heapify(max_heap)
    
    score = 0
    for _ in range(k):
        # Pop the largest current element
        current = -heapq.heappop(max_heap)
        score += current
        
        # Compute ⎡current / 3⎤. We use integer division trick for ceiling
        next_val = (current + 2) // 3
        # Push the updated value back into the heap
        heapq.heappush(max_heap, -next_val)
        
    return score
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n) to build the heap initially, then O(k log n) for k pops/pushes (each log n). Total: O(n + k log n).

- **Space Complexity:**  
  O(n) for the heap, plus variables. No recursion or extra structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the division was floor instead of ceiling?  
  *Hint: Simpler to implement, less "stickiness" for 1's.*

- What would change if you could pick only from previously unpicked numbers?  
  *Hint: No pushing back; remove after use, can sort once.*

- How would you solve if k ≫ n, that is, k ≫ length of nums?  
  *Hint: Many cycle repeats — what number do entries stabilize at?*

### Summary
This problem is a classic **greedy algorithm** with a **max-heap** (priority queue) pattern, commonly used when always needing to pick the current global best (like "top K", "frequency buckets", or "resource allocation" problems). The heap guarantees efficient maximum selection and reinsertion as values change over time. This general approach appears in other problems where you need to repeatedly choose and update the best candidate, such as merging k sorted lists, scheduling, or repeated extraction.


### Flashcard
Always pick the current maximum, divide by 3 (ceil), and repeat k times—use a max-heap for O(k log n) time.

### Tags
Array(#array), Greedy(#greedy), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Sliding Window Maximum(sliding-window-maximum) (Hard)
- Remove Stones to Minimize the Total(remove-stones-to-minimize-the-total) (Medium)