### Leetcode 2398 (Hard): Maximum Number of Robots Within Budget [Practice](https://leetcode.com/problems/maximum-number-of-robots-within-budget)

### Description  
You are given two arrays: **chargeTimes** and **runningCosts** of length n, representing n robots. To run a consecutive group of k robots from i to j (inclusive), the **total cost** is:  
- max(chargeTimes[i..j]) + k × sum(runningCosts[i..j]).  
Your goal: find the **maximum number k** of consecutive robots you can run without exceeding a given **budget**.  
Return the largest k (window size) such that there is a subarray of length k whose total cost as above is ≤ budget. If it's not possible to run even 1 robot, return 0.

### Examples  

**Example 1:**  
Input: `chargeTimes = [3,6,1,3,4], runningCosts = [2,1,3,4,5], budget = 25`  
Output: `3`  
*Explanation:  
Consider the first 3 robots: max(3,6,1) + 3 × (2+1+3) = 6 + 9 = 15 < 25.  
Moving the window right will result in a higher cost.  
No way to run 4 consecutive robots within budget. So answer is 3.*

**Example 2:**  
Input: `chargeTimes = [11,12,19], runningCosts = [10,8,7], budget = 19`  
Output: `0`  
*Explanation:  
Any individual robot: cost will be at least 11 + 10 = 21 > 19.  
So you can’t run any robot under the budget.*

**Example 3:**  
Input: `chargeTimes = [5,4,7], runningCosts = [3,2,1], budget = 15`  
Output: `2`  
*Explanation:  
- Robots 0-1: max(5,4) + 2×(3+2) = 5 + 10 = 15 ≤ 15, so possible.  
- Robots 1-2: max(4,7) + 2×(2+1) = 7 + 6 = 13 ≤ 15, so possible.  
- All 3 together: max(5,4,7) + 3×(3+2+1) = 7 + 18 = 25 > 15.  
So answer is 2.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force**: Try every window size k = n down to 1, and every subarray of length k. For each, calculate max(chargeTimes) and sum(runningCosts) in the window. This is O(n³); too slow for constraints up to 5×10⁴ robots.
- **Optimization**:  
  - We want the largest window size k where some subarray's cost ≤ budget.  
  - For *fixed* k, can we check efficiently for all windows of that size?
    - Use a sliding window:  
        - sum(runningCosts) can be maintained in O(1) per step.  
        - max(chargeTimes) is harder; use a **monotonic deque** to track the max in O(1) per step.
  - **Binary search** k: For each mid, check if any window of size k is within budget.
- **Final Approach**:  
  - Use binary search on k (1…n).  
  - For each k, use sliding window + monotonic deque for max in O(n) per check.
  - Overall O(n log n) time.
- **Trade-offs**: This approach is efficient for up to 5×10⁴ robots, balances code complexity with runtime.

### Corner cases to consider  
- All costs very high (budget too low ⇒ return 0).
- All costs very low (can run all robots ⇒ return n).
- Single element arrays.
- All chargeTimes equal.
- All runningCosts zero or all the same.
- k = 1 (only one robot is possible within budget).

### Solution

```python
def maximumRobots(chargeTimes, runningCosts, budget):
    n = len(chargeTimes)
    left = 0
    max_k = 0
    running_cost_sum = 0
    from collections import deque

    max_deque = deque()  # stores indices of chargeTimes in decreasing order

    for right in range(n):
        # Add the current running cost
        running_cost_sum += runningCosts[right]
        
        # Maintain deque: pop smaller elements from right (we want max on left)
        while max_deque and chargeTimes[max_deque[-1]] <= chargeTimes[right]:
            max_deque.pop()
        max_deque.append(right)

        # Calculate window size
        window_size = right - left + 1
        # Calculate total cost for current window
        while (window_size > 0 and (
               chargeTimes[max_deque[0]] + window_size * running_cost_sum > budget)):
            # Slide window forward
            if max_deque[0] == left:
                max_deque.popleft()
            running_cost_sum -= runningCosts[left]
            left += 1
            window_size = right - left + 1

        # Update max_k
        max_k = max(max_k, window_size)

    return max_k
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Each index is pushed and popped at most once from the deque.
  - Sliding window is efficient; the binary search step can be avoided by using this greedy expansion.
- **Space Complexity:** O(n)  
  - The deque and window sum both require O(n) additional space.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution if the robots didn’t have to be consecutive?
  *Hint: Consider sorting/combining sets, but the combinatorial explosion likely requires a new approach.*

- If you needed to return not just k, but the actual indices of robots to run, how would you modify the code?
  *Hint: Track the window positions where the maximum k is achieved.*

- How would you solve this if the arrays were being updated dynamically (add/remove robots or costs in real time)?
  *Hint: Consider data structures like segment trees or heaps to maintain window maximum efficiently with updates.*

### Summary
This problem uses a sliding window combined with a **monotonic deque** to efficiently maintain the maximum in a window—an advanced, but common, pattern in hard array/sliding window interviews. The cost formula combines both max and sum, requiring careful update logic.  
This pattern applies to any problem needing window maximum/minimum (e.g., "sliding window maximum"), and strongly illustrates real-world use of double-ended queues (deque) for fast window min/max calculation.

### Tags
Array(#array), Binary Search(#binary-search), Queue(#queue), Sliding Window(#sliding-window), Heap (Priority Queue)(#heap-priority-queue), Prefix Sum(#prefix-sum), Monotonic Queue(#monotonic-queue)

### Similar Problems
- Sliding Window Maximum(sliding-window-maximum) (Hard)
- Kth Smallest Product of Two Sorted Arrays(kth-smallest-product-of-two-sorted-arrays) (Hard)
- Maximum Number of Tasks You Can Assign(maximum-number-of-tasks-you-can-assign) (Hard)
- Minimized Maximum of Products Distributed to Any Store(minimized-maximum-of-products-distributed-to-any-store) (Medium)
- Minimum Time to Complete Trips(minimum-time-to-complete-trips) (Medium)