### Leetcode 2208 (Medium): Minimum Operations to Halve Array Sum [Practice](https://leetcode.com/problems/minimum-operations-to-halve-array-sum)

### Description  
Given an array of positive integers `nums`, you can perform the following operation any number of times: Select **any** value from the array and replace it with **exactly half** its current value. (You can pick already-halved numbers again for further reductions.)  
Your goal is to minimize the number of operations needed to make the sum of the array less than or equal to half of its **original** sum.

### Examples  

**Example 1:**  
Input: `nums = [5, 19, 8, 1]`  
Output: `3`  
*Explanation: Initial sum = 5 + 19 + 8 + 1 = 33. The minimal number of operations to reduce the sum by at least half (≤ 16.5) is:*
- *Halve 19 → 9.5 (sum=23.5)*
- *Halve 9.5 → 4.75 (sum=18.75)*
- *Halve 8 → 4 (sum=14.75)*

**Example 2:**  
Input: `nums = [3, 8, 20]`  
Output: `3`  
*Explanation: Initial sum = 31. Halve 20→10 (sum=21), halve 10→5 (sum=16), halve 8→4 (sum=12). Now 12 ≤ 15.5.*

**Example 3:**  
Input: `nums = [1, 2, 3, 4, 5]`  
Output: `2`  
*Explanation: Initial sum = 15. Halve 5→2.5 (sum=12.5), halve 4→2 (sum=10.5). Now 10.5 ≤ 7.5.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try all possible combinations of halving numbers, tracking how many operations it takes to reach half-sum. This is exponential (since every number can potentially be halved repeatedly), which is not feasible.
- **Greedy approach:** Always halve the largest value available, since this contributes the greatest reduction to the sum per operation.
    - Use a **max-heap** (priority queue) to always select the largest number quickly.
    - Track the running sum, and after halving, insert the new value back into the heap (since it can be halved again).
    - Continue until sum is ≤ half the original.
- **Why greedy with heap:** Each operation should maximize the reduction to minimize the step count; always halving the largest remaining number achieves this.

### Corner cases to consider  
- Single element array (e.g., ``)
- All elements equal (e.g., `[4,4,4,4]`)
- Large numbers mixed with small numbers (e.g., `[1000,1,1]`)
- Already less than half (should return 0 operations)
- Numbers that become fractional after halving

### Solution

```python
import heapq

def minOperations(nums):
    # Calculate initial sum
    total_sum = sum(nums)
    half_sum = total_sum / 2

    # Use a max-heap (invert sign for heapq)
    max_heap = [-float(num) for num in nums]
    heapq.heapify(max_heap)

    curr_sum = total_sum
    ops = 0

    while curr_sum > half_sum:
        # Always pick largest value
        largest = -heapq.heappop(max_heap)
        halved = largest / 2
        curr_sum -= (largest - halved)
        heapq.heappush(max_heap, -halved)
        ops += 1

    return ops
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n) to build the heap + O(k log n) where k is the number of operations needed (each operation is one heappop and one heappush). In the worst case, k can be much larger than n if many repeated halvings occur, but it is always bounded by the input and the number size.

- **Space Complexity:**  
  O(n) for the heap and variables. No extra data structures beyond proportional to the array size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you change your algorithm if you could only halve each number at most once?  
  *Hint: Would sorting or simple counting work for this variant?*

- How would your approach change if, instead of halving, you could reduce a number to any positive integer less than itself?  
  *Hint: Dynamic programming or sort/greedy logic may differ.*

- Can you generalize your approach if the reduction factor is variable (e.g., divide by k instead of 2 each time)?  
  *Hint: How would you change the priority or operation per iteration?*

### Summary
This problem uses a classic **greedy + heap pattern**: always operate on the maximum to achieve optimal cumulative effect in minimal steps. The approach is related to problems where you must minimize operations while shrinking some aggregate; max-heap enables efficiently picking the best candidate each time. This pattern also appears in problems like reducing files/weights by combining or splitting, or in resource distribution/modification optimization tasks.


### Flashcard
Always halve the largest remaining number using a max-heap; track sum reduction until at least half the original sum is removed.

### Tags
Array(#array), Greedy(#greedy), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Remove Stones to Minimize the Total(remove-stones-to-minimize-the-total) (Medium)
- Minimum Operations to Exceed Threshold Value II(minimum-operations-to-exceed-threshold-value-ii) (Medium)