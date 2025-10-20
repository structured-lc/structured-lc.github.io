### Leetcode 2233 (Medium): Maximum Product After K Increments [Practice](https://leetcode.com/problems/maximum-product-after-k-increments)

### Description  
Given an array of non-negative integers `nums` and an integer `k`, you can increment **any** element by 1 in each operation. You can do this **at most** `k` times. Return the **maximum possible product** of the elements in `nums` after performing at most `k` increments.  
Since the answer may be very large, return it modulo 10⁹ + 7.  
The key: in each step, you may choose *any* element—so repeated increments of the same element are allowed.

### Examples  

**Example 1:**  
Input: `nums = [0, 4], k = 5`  
Output: `20`  
*Explanation: Increment the 0 five times, making nums = [5, 4]. Product = 5 × 4 = 20. No other increment pattern yields a higher product.*

**Example 2:**  
Input: `nums = [6, 3, 3, 2], k = 2`  
Output: `216`  
*Explanation: Increment the second 3 and the 2 by 1. Resulting nums = [6, 4, 3, 3]. Product = 6 × 4 × 3 × 3 = 216, which is the maximum possible.*

**Example 3:**  
Input: `nums = [1, 2, 3], k = 3`  
Output: `27`  
*Explanation: Increment 1 twice and 2 once to get [3, 3, 3]. Product = 3 × 3 × 3 = 27, which is maximal.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try every combination of incrementing any element k times. This leads to exponential time—impractical even for small arrays.
- **Observation:**  
  To maximize the product, you should increment the **smallest element** each time—this balances the numbers and lifts the lowest "weight" in the multiplication most effectively.
  For example, in [3, 7], if you increment 7, total product grows less than incrementing 3.
- **Optimized approach:**  
  Use a **min-heap** (priority queue):  
  - Add all nums to a min-heap.
  - For each of k steps:
    - Pop the smallest element, increment by 1, and push back.
    - Repeat until k is exhausted.
  - Multiply all elements for the result (modulo 10⁹+7).
- **Reasoning:**  
  Always lifting the current minimum grows the product the fastest, as the delta in product is maximized by boosting the lowest factor.

### Corner cases to consider  
- k = 0 (should return product of original nums)
- nums has zero(s) (will likely be incremented first)
- nums has equal elements
- k > total difference to make all elements equal (some increments to the same element will be required)
- Large input: ensure modulo is taken to avoid overflow

### Solution

```python
import heapq

def maximumProduct(nums, k):
    MOD = 10**9 + 7
    # Build a min-heap from nums
    heapq.heapify(nums)

    for _ in range(k):
        # Always increment the current smallest number
        smallest = heapq.heappop(nums)
        heapq.heappush(nums, smallest + 1)

    # Calculate product modulo 10^9+7
    result = 1
    for num in nums:
        result = (result * num) % MOD

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k log n + n), where n = len(nums).
  - Each operation is a heap pop and push (log n), performed k times.
  - Final product computation is O(n).
  - Heapify at the start is O(n).
- **Space Complexity:** O(n)
  - Heap contains n elements, extra space is minimal.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize further if k is very large compared to n?
  *Hint: Can you batch increments for elements with the same value instead of incrementing one by one?*

- What if instead of incrementing by 1, you could increment by any number up to a total sum ≤ k?
  *Hint: Try to equalize elements directly using integer division and distributing the remainder increments.*

- How would you adapt this to minimize the product after k increments?
  *Hint: Try decrementing the largest number each time (use a max-heap instead).*

### Summary
This problem is a classic example of *min-heap greedy allocation*: always apply resources (increments) to the weakest link (smallest element) to maximize overall outcome (product). This pattern frequently appears in resource distribution, balancing work/loads, or maximizing multiplicative output by leveling up low values. Optimizing increment allocation is widely useful, especially with priority queues.


### Flashcard
Always increment the smallest element to maximize product—use a min-heap for efficiency.

### Tags
Array(#array), Greedy(#greedy), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Minimum Size Subarray Sum(minimum-size-subarray-sum) (Medium)
- Minimum Increment to Make Array Unique(minimum-increment-to-make-array-unique) (Medium)
- Minimum Operations to Make the Array Increasing(minimum-operations-to-make-the-array-increasing) (Easy)