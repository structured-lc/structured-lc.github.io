### Leetcode 2293 (Easy): Min Max Game [Practice](https://leetcode.com/problems/min-max-game)

### Description  
Given an integer array **nums** of length 2ⁿ, repeatedly build a new array by pairing elements:
- For each consecutive pair (nums[2i], nums[2i+1]), if the index `i` is even, take the minimum; if `i` is odd, take the maximum.
- Replace `nums` with this new array and repeat until one element remains.
Return the final element left in the array.

### Examples  

**Example 1:**  
Input: `[1,3,5,2,4,8,2,2]`  
Output: `1`  
*Explanation:  
First round: [min(1,3), max(5,2), min(4,8), max(2,2)] → [1,5,4,2]  
Second round: [min(1,5), max(4,2)] → [1,4]  
Third round: [min(1,4)] → [1]
Final answer is 1.*

**Example 2:**  
Input: `[3,5,1,6]`  
Output: `1`  
*Explanation:  
First round: [min(3,5), max(1,6)] → [3,6]  
Second round: [min(3,6)] → [3]
Final answer is 3.*

**Example 3:**  
Input: `[7,6]`  
Output: `6`  
*Explanation:  
First round: [min(7,6)] → 
Only one element left: 6.*

### Thought Process (as if you’re the interviewee)  
Start with the brute-force idea:
- Simulate the process as described: Build a new array each time, applying min/max alternately based on the index.
- Continue until only one element remains.

To optimize, notice:
- We don't always need to create new arrays; we can modify the original array in place to save space.
- Since each round halves the array size, total computation is efficient for reasonable input sizes.

Trade-offs:
- Modifying in place is more memory-efficient, but either approach has the same time complexity due to always processing every pair in each round.

### Corner cases to consider  
- Only one element (`nums` length = 1)
- All elements are equal
- Alternating min/max values (e.g., [10,1,10,1])
- Large input size
- Negative numbers

### Solution

```python
def minMaxGame(nums):
    n = len(nums)
    # Repeat until only one element is left
    while n > 1:
        for i in range(n // 2):
            # Even index: take min, odd index: take max
            if i % 2 == 0:
                nums[i] = min(nums[2 * i], nums[2 * i + 1])
            else:
                nums[i] = max(nums[2 * i], nums[2 * i + 1])
        n //= 2  # Each round halves the array size
    return nums[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each element is used in log₂(n) rounds, and each round processes n/2 pairs, so total pairs processed is n - 1.
- **Space Complexity:** O(1) extra — The algorithm modifies the input array in-place, so no additional space is used except for variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you design this for an immutable input array?
  *Hint: Build a new array in each round rather than modifying in place.*

- Can you generalize this approach to n not being a power of 2?
  *Hint: Consider how to handle the last unpaired element in each round.*

- How would you parallelize this process for very large arrays?
  *Hint: Independent pairs can be processed in parallel at each step.*

### Summary
This problem uses the "array simulation" pattern. The approach involves repeatedly rewriting the array at half its size, applying min/max alternately, until one element remains. The key insight is to process pairs (either in place or into a new array) and reduce, similar to tournament or pyramid reduction problems. This pattern can be applied to problems like pairing elimination, tournament winner determination, and other structured iterative reductions.