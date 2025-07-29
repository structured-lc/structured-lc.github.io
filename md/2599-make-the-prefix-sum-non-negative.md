### Leetcode 2599 (Medium): Make the Prefix Sum Non-negative [Practice](https://leetcode.com/problems/make-the-prefix-sum-non-negative)

### Description  
Given a **0-indexed** integer array **nums**, you may execute the following operation any number of times:  
- Choose any element and move it to the end of the array.  

Your goal is to make the **prefix sum** (where prefix[i] is the sum of nums to nums[i]) **never negative** at any index.  
Return the **minimum number of operations** required so that the prefix sum array has **no negative value**.  

The problem guarantees the input can always be made valid.

### Examples  

**Example 1:**  
Input: `nums = [2,3,-5,4]`  
Output: `0`  
*Explanation: The prefix sums are [2, 5, 0, 4]. No prefix is negative; no moves are needed.*

**Example 2:**  
Input: `nums = [3,-5,-2,6]`  
Output: `1`  
*Explanation:  
- Initial prefix sums: [3, -2, -4, 2].  
- After moving -5 to the end: [3, -2, 6, -5] → prefix sums: [3, 1, 7, 2].  
- Only 1 move needed.*

**Example 3:**  
Input: `nums = [-1, 2, 3]`  
Output: `1`  
*Explanation:  
- Initial prefix sums: [-1, 1, 4].  
- Move -1 to the end: [2, 3, -1] → prefix sums: [2, 5, 4].  
- One move suffices.*

### Thought Process (as if you’re the interviewee)  
To solve this, I first thought about simulating all possible sequences after moves, but realized the space is far too large for brute-force (n! possible permutations).  
Instead, I noticed:
- Only **negative numbers** can reduce the prefix sum enough to make it negative.
- If we can postpone the occurrence of most "damaging" negatives (i.e. place them at the end), the prefix sums will stay non-negative longer.
- We traverse nums and keep a "running sum" (prefix sum so far).  
- If the sum becomes negative at any point, we need to "delay" the earliest negative(s).  

Here's the optimization:
- Use a **min-heap or priority queue** to keep track of all negative numbers seen so far.
- When the running prefix sum gets negative, **pop the smallest (most negative) number**, simulate "moving it to the end" by removing its effect from the prefix sum, and count one operation.
- Repeat popping until the sum is non-negative.

This greedy + min-heap ensures we're always moving the most "harmful" negative out of the way, resulting in a minimal number of moves.

### Corner cases to consider  
- All numbers are positive (should return 0).
- All numbers are negative except for one (forces us to move all but one).
- Prefix sum is always >= 0 (no ops needed).
- Already sorted so prefix is always non-negative.
- nums has length 1 (negative gives 1 op, positive gives 0).
- Zeros at any place.
- Large numbers / mixed positive and negatives.

### Solution

```python
def makePrefSumNonNegative(nums):
    import heapq

    # Min-heap (in Python, by default it's min-heap, we want max-heap so use negative)
    min_heap = []
    ops = 0
    prefix_sum = 0

    for num in nums:
        prefix_sum += num

        # Track negative numbers seen so far
        if num < 0:
            heapq.heappush(min_heap, num)

        # Whenever prefix sum drops below 0, "move away" the most harmful negative seen so far
        while prefix_sum < 0 and min_heap:
            # Remove (pop) the smallest negative, simulate putting it at the end
            most_negative = heapq.heappop(min_heap)
            prefix_sum -= most_negative  # Remove its effect from the running prefix sum
            ops += 1

    return ops
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log n)  
  For each number, we could insert into the min-heap (at most O(n) negatives, so each insert is log n), and in the worst case, pop every negative.

- **Space Complexity:**  
  O(n)  
  In the worst case, all numbers are negative and are stored in the heap.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you return not only the number of ops, but also which indices to move?
  *Hint: Maintain index along with negative values in heap for record-keeping.*

- If array size is huge (≥10⁵), how could you optimize further if repeated queries on different parts of array?
  *Hint: Preprocess prefix sums and negative numbers; segment trees or offline queries if repeated.*

- How would you handle if the "move" operation is to the start instead of end?
  *Hint: The logic reverses; now you may need to put positive numbers at the start to maximize prefix.*

### Summary
This problem is a classic application of the **greedy algorithm** and **priority queue/min-heap** pattern, combined with prefix sum.  
The technique of prioritizing the removal (delay) of the largest-magnitude negative numbers is often used where you need to enforce array invariants (e.g., non-decreasing, non-negative sums).  
Similar heap-greedy tricks can be found in problems involving minimizing/removing “bad” effects, such as interval scheduling, meeting rooms, or balancing running totals with constraints.