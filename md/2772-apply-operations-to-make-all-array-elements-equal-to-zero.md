### Leetcode 2772 (Medium): Apply Operations to Make All Array Elements Equal to Zero [Practice](https://leetcode.com/problems/apply-operations-to-make-all-array-elements-equal-to-zero)

### Description  
Given a 0-indexed integer array **nums** and a positive integer **k**, you are allowed to repeatedly select any subarray of size **k** (contiguous elements) and decrease **all** its elements by 1.  
Return **True** if you can make all elements of the array exactly 0, else return **False**.

This is essentially checking if you can get to an all-zero array by only subtracting ‘1’ from arbitrary windows of length ‘k’, as many times as you want.

### Examples  

**Example 1:**  
Input: `nums = [2,2,3,1,1,0], k = 3`  
Output: `True`  
*Explanation:  
1. Subtract 1 from nums[0:3]: [1,1,2,1,1,0]  
2. Subtract 1 from nums[0:3]: [0,0,1,1,1,0]  
3. Subtract 1 from nums[2:5]: [0,0,0,0,0,0]  
All elements can be made zero.*

**Example 2:**  
Input: `nums = [1,3,1,1], k = 2`  
Output: `False`  
*Explanation:  
You cannot make every number zero: after every feasible window operation, at least one element will always be positive.*

**Example 3:**  
Input: `nums = [0,0,0], k = 2`  
Output: `True`  
*Explanation:  
All elements are already zero, no operation needed.*

### Thought Process (as if you’re the interviewee)  

- **Brute force idea:**  
Try all possible sequences of subarrays of length k, applying “subtract 1 from all elements” repeatedly, tracking progress. This isn’t viable; time grows exponentially.

- **Observation:**  
Each position can only be decreased via subarrays that include it.  
For index i, only subarrays in range [max(0, i-k+1), min(i, n-k)] can operate on nums[i].  
Aim: For each element from left to right, when nums[i] > 0, subtract from window starting at i (if within bounds). Repeat until nums[i] reaches 0, propagate the operation’s effect to the next k-1 elements.

- **Optimized solution:**  
Sweep from left to right.
  - When nums[i] > 0 and i+k≤n, perform nums[i] operations starting at i.  
  - Subtract nums[i] from nums[i]…nums[i+k-1], move forward.
  - If at any point you get to a position i where nums[i] > 0 and you can no longer do a full k-window starting at i (i+k > n), return False.

- **Why this works:**  
By greedily using the operations as far left as possible, you cover every possibility and never “waste” an operation.
Trade-off: O(n) time and O(1) extra space (can be O(k) if using a moving sum for large k).

### Corner cases to consider  
- Empty array (nums = [])
- k = 1 (each element can be individually zeroed)
- nums already all zeros
- nums where len(nums) < k (no operation possible unless already all zeros)
- Large element in the last possible k-window making zeros impossible
- Single element: nums = [a], k = 1

### Solution

```python
def checkArray(nums, k):
    n = len(nums)
    curr_op = 0        # Running count of active decrements to apply (like a prefix sum trick)
    op_queue = [0] * n # Queue to remember where applied operations end

    for i in range(n):
        curr_op -= op_queue[i]  # Remove expired operations at this position
        need = nums[i] - curr_op

        if need < 0:
            # Applied too many operations in the past, over-subtracted
            return False

        if need > 0:
            if i + k > n:
                return False    # Cannot apply operation past the end
            curr_op += need    # Log that 'need' new operations start here
            if i + k < n:
                op_queue[i + k] += need # This batch of operations ends at i+k
            
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Single pass through the array, all operations (increment/decrement) are O(1) per element.

- **Space Complexity:** O(n).  
  Extra storage for op_queue array of size n to track when decrement batches expire.
  
  (This can be reduced to O(k) with a rotating array by using modulo, but O(n) is simplest and more readable.)

### Potential follow-up questions (as if you’re the interviewer)  

- If k can change between operations, how would you design the algorithm?  
  *Hint: Precompute range overlap or use interval/segment trees for fast range updates.*

- Can you return the exact sequence of operations, not just True/False?  
  *Hint: Keep a list of window intervals and their counts; reconstruct the steps as you go.*

- What if instead of subtracting 1, you could subtract any value up to nums[i] in one operation?  
  *Hint: Try a greedy or dynamic programming approach, as each window might allow big jumps.*

### Summary
This problem demonstrates the **greedy plus prefix sum** (difference array) technique: sweep from left, apply the minimum number of operations at the earliest possible place, and keep track of running “decrement” counts efficiently.  
This pattern appears in other range-update/range-query problems such as “range addition,” “car pooling,” or sliding window difference array problems, and is a powerful method in interval manipulation tasks.


### Flashcard
Scan left to right, when nums[i] > 0 apply operation at window starting at i, decrement subsequent k elements.

### Tags
Array(#array), Prefix Sum(#prefix-sum)

### Similar Problems
- Continuous Subarray Sum(continuous-subarray-sum) (Medium)
- Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold(number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold) (Medium)