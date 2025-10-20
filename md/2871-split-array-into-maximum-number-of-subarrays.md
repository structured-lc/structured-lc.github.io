### Leetcode 2871 (Medium): Split Array Into Maximum Number of Subarrays [Practice](https://leetcode.com/problems/split-array-into-maximum-number-of-subarrays)

### Description  
Given an array of non-negative integers, split the array into the maximum number of non-empty contiguous subarrays.  
For each subarray, calculate its score as the result of a bitwise AND of all its elements. We want to maximize the number of subarrays such that the sum of all subarray scores is minimized.  
A subarray ends when the bitwise AND of its numbers reaches zero, and you can then start a new subarray from the next number.

### Examples  

**Example 1:**  
Input: `nums = [1,0,2,0,1]`  
Output: `4`  
*Explanation: Subarrays: [1,0], [2,0], [1].  
- [1,0] → 1 & 0 = 0  
- [2,0] → 2 & 0 = 0  
- [1] → 1  
Only the last subarray has a non-zero AND, so you can't split there. Splits are made whenever AND reaches zero, total splits = 4.*

**Example 2:**  
Input: `nums = [0,0,0]`  
Output: `3`  
*Explanation: Every element is zero, so each can be its own subarray because 0 & any = 0. Total = 3 splits.*

**Example 3:**  
Input: `nums = [3,3,3]`  
Output: `1`  
*Explanation: The AND never reaches zero: 3 & 3 = 3, continue ANDing→ still 3. Only one possible subarray.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all split points and check AND of every possible subarray. This is exponential and not feasible for large arrays.

- **Observation:**  
  The key is: the AND of numbers is non-increasing as you move right.  
  As soon as the AND reaches zero, we can "cut" and start a new subarray.  
  So, a greedy approach:  
  - Traverse nums, track running AND;  
  - Each time running AND becomes zero, increment split count and reset AND tracker.

- **Why this works:**    
  AND is a "sticky" operation — once a bit is zero, it can never come back.  
  Splitting at every zero-AND gives most splits, and thus minimizes the score sum.

- **Trade-offs:**  
  - O(n) time, O(1) space.  
  - Simple to code, optimal.

### Corner cases to consider  
- Empty array (though by constraints, may not be allowed).
- All zeros: [0,0,0].
- All ones or identical nonzero numbers: [3,3,3].
- No split point because AND never zero: e.g., [1,3,7].
- Large arrays.
- Alternating zeros and nonzeros.

### Solution

```python
def maxSubarrays(nums):
    # Count of valid subarrays
    count = 0
    # The current AND value
    curr = -1  # All-bits set (for first comparison; could also use ~0 or just nums[0] at start)
    for num in nums:
        if curr == -1:
            curr = num
        else:
            curr &= num
        # If current AND hits zero, we can split here
        if curr == 0:
            count += 1
            curr = -1  # Reset for next subarray
    # If we never hit zero, it means only one subarray (the whole array)
    return count if count > 0 else 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Single pass through nums, each with a constant-time AND operation.
- **Space Complexity:** O(1) — Only a handful of variables are used for tracking.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted to keep track of the subarrays themselves, not just the count?  
  *Hint: Store start/end indices whenever you split.*

- How would you handle negative numbers in the input?  
  *Hint: Bitwise AND on negatives will propagate sign bit, may need extra logic.*

- If the goal changed to maximize the sum of the AND scores rather than minimize, how would you change your approach?  
  *Hint: Think about merging vs. splitting subarrays for maximal score.*

### Summary
This problem is a classic case for a greedy linear scan with bitwise operations, leveraging the property that the bitwise AND can only lose '1' bits as more numbers are added. The code structure is highly reusable for similar problems where a subarray must be split on a specific value or property, making it a common pattern in greedy or scan-based questions.


### Flashcard
Traverse nums, tracking running AND; each time it becomes zero, increment split count and reset AND.

### Tags
Array(#array), Greedy(#greedy), Bit Manipulation(#bit-manipulation)

### Similar Problems
