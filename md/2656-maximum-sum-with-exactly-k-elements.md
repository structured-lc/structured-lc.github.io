### Leetcode 2656 (Easy): Maximum Sum With Exactly K Elements  [Practice](https://leetcode.com/problems/maximum-sum-with-exactly-k-elements)

### Description  
You are given a 0-indexed integer array `nums` and an integer `k`. You can perform the following operation **exactly `k` times**:  
1. Select the largest element `m` from `nums`.
2. Remove `m` from the array.
3. Insert `m + 1` into the array.
4. Add `m` to your score.

Return the **maximum possible score** after exactly `k` operations.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4,5]`, `k = 3`  
Output: `18`  
*Explanation:*
- 1st operation: pick 5, add 5; insert 6 → nums = [1,2,3,4,6], score = 5
- 2nd operation: pick 6, add 6; insert 7 → nums = [1,2,3,4,7], score = 11
- 3rd operation: pick 7, add 7; insert 8 → nums = [1,2,3,4,8], score = 18

**Example 2:**  
Input: `nums = [5,5,5]`, `k = 2`  
Output: `11`  
*Explanation:*
- 1st operation: pick 5, add 5; insert 6 → nums = [5,5,6], score = 5
- 2nd operation: pick 6, add 6; insert 7 → nums = [5,5,7], score = 11

**Example 3:**  
Input: `nums = `, `k = 1`  
Output: `100`  
*Explanation:*  
- Only one possible pick (100); result is 100.

### Thought Process (as if you’re the interviewee)  

First, notice that in every operation, we want the **maximum** value so our score increases as much as possible.  
- If we pick the current maximum (`x`), add it to score, and insert (`x+1`), for the next round, `x+1` becomes the largest, etc.
- Therefore, if the original max in array is `x`, the operated sequence is: `x`, `x+1`, `x+2`, ..., `x + (k-1)`.

The sum for these `k` picks is just:  
Sum = x + (x+1) + (x+2) + ... + (x + k - 1)  
This is an arithmetic sequence.  
Sum = k \* x + (0 + 1 + ... + (k-1))  
Sum = k \* x + k \* (k-1) // 2

**Brute-force:**  
Simulate every operation, keep finding the max using a heap or sorting. This is inefficient: O(k log n).

**Optimal:**  
Just compute the above formula in O(n) time (to find max), no need to modify the array since the process is always deterministic.

### Corner cases to consider  
- Empty array (`nums = []`, not allowed by constraints, but still should mention)
- All elements are the same
- Only one element in nums
- k = 1
- Very large `k` (much larger than length of nums)
- Negative numbers (edge: always pick the least negative/maximum)

### Solution

```python
def maximizeSum(nums, k):
    # Find the maximum element in nums
    x = nums[0]
    for num in nums:
        if num > x:
            x = num
    # Calculate sum: k * x + k * (k - 1) // 2
    total = x * k + (k * (k - 1)) // 2
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  To find the maximum element in the array of length n. All other operations are O(1).

- **Space Complexity:** O(1)  
  Constant extra space (no new data structures, only a few variables).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could do the operation unlimited times until the sum reaches a given limit?  
  *Hint: Instead of fixed k, you keep operating until your running total exceeds or matches a target value.*

- What if you had to always pick the **minimum** instead of the maximum?  
  *Hint: Adapt the same approach, but for minimum.*

- If negative numbers are allowed, how would output be affected?  
  *Hint: You’d always want the least negative/largest number.*

### Summary
This greedy approach leverages **arithmetic sequences** and the insight that always picking the current maximum (and increasing it each time) yields the largest possible total. The problem is a classic “repeated pick with updating” pattern, similar to problems involving **greedy upgrades** or **repeated optimizations with a sliding maximum**. This pattern can be used in other "incremental maximize" situations where selections impact future possibilities.


### Flashcard
Pick the maximum value x for k operations; total score is k × x + (k × (k – 1))/2 using arithmetic series sum.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
