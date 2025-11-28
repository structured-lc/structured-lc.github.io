### Leetcode 3427 (Easy): Sum of Variable Length Subarrays [Practice](https://leetcode.com/problems/sum-of-variable-length-subarrays)

### Description  
You are given an integer array **nums** of size n. For each index **i** (0 ≤ i < n), define a subarray from index  
**start = max(0, i - nums[i])** up to **i** (inclusive).  
Your task is to return the total sum of all elements in all such subarrays for every index **i**.  

### Examples  

**Example 1:**  
Input: `nums = [2,3,1]`  
Output: `11`  
*Explanation:*
- For i = 0: subarray nums[0:0] → [2], sum = 2  
- For i = 1: subarray nums[0:1] → [2, 3], sum = 5  
- For i = 2: subarray nums[1:2] → [3, 1], sum = 4  
Total sum = 2 + 5 + 4 = 11

**Example 2:**  
Input: `nums = [3,1,1,2]`  
Output: `13`  
*Explanation:*
- For i = 0: subarray nums[0:0] → [3], sum = 3  
- For i = 1: subarray nums[0:1] → [3, 1], sum = 4  
- For i = 2: subarray nums[1:2] → [1, 1], sum = 2  
- For i = 3: subarray nums[1:3] → [1, 1, 2], sum = 4  
Total sum = 3 + 4 + 2 + 4 = 13

**Example 3:**  
Input: `nums = [1,1,1]`  
Output: `6`  
*Explanation:*
- i=0: nums[0:0] → [1], sum = 1  
- i=1: nums[0:1] → [1,1], sum = 2  
- i=2: nums[1:2] → [1,1], sum = 2  
Total = 1 + 2 + 2 = 5

### Thought Process (as if you’re the interviewee)  
A direct brute-force solution would be, for every index i, to compute start = max(0, i - nums[i]), then sum all elements nums[start] to nums[i] for every i.  
But this is potentially O(n²), which is inefficient for larger n.

To optimize, notice that repeated subarray sums can be quickly calculated using a **prefix sum** array.  
- Precompute prefix sums for nums, so sum of nums[l] to nums[r] is prefix[r+1] - prefix[l].  
- For each i:  
  - start = max(0, i - nums[i])  
  - sum_i = prefix[i+1] - prefix[start]  
  - Accumulate sum_i for answer.

This makes the solution O(n) in time and space.

### Corner cases to consider  
- Array of length 1, e.g., [5]  
- nums[i] ≥ i (start becomes 0)  
- nums containing all the same value  
- nums[i] = 1 for all i (minimal subarrays)  
- nums containing maximum values (to check for overflow if relevant)

### Solution

```python
def sumOfVariableLengthSubarrays(nums):
    n = len(nums)
    # Build prefix sum: prefix[i+1] = sum(nums[:i+1])
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i+1] = prefix[i] + nums[i]

    total = 0
    for i in range(n):
        start = max(0, i - nums[i])
        # sum from nums[start] to nums[i] inclusive
        total += prefix[i + 1] - prefix[start]

    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) for computing prefix sums and another O(n) for the main loop, so O(n) overall.  
- **Space Complexity:** O(n) for the prefix sums array. The extra space is proportional to the input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case if the array is very large and cannot fit in memory?  
  *Hint: Streaming prefix sums, process chunks at a time.*

- Can you return the subarray sum for each i (not just the total sum)?  
  *Hint: Store each sum_i in a result array.*

- If updates are made to the array between queries, how would you support efficiently calculating updated results?  
  *Hint: Segment trees or Binary Indexed Tree (Fenwick Tree) for dynamic prefix sums.*

### Summary
This problem illustrates the **prefix sum pattern**, converting a brute-force O(n²) approach into an efficient O(n) algorithm.  
It's a classic example of using prefix sums for range sum queries, a pattern useful in subarray sum, sliding window, and many range query problems.  
Commonly applied in array processing, time-series sums, and other aggregate range computations.


### Flashcard
Precompute prefix sums; for each index i, compute start = max(0, i − nums[i]) and use prefix sums to get the subarray sum in O(1).

### Tags
Array(#array), Prefix Sum(#prefix-sum)

### Similar Problems
- Range Sum Query - Immutable(range-sum-query-immutable) (Easy)
- Maximum Sum of 3 Non-Overlapping Subarrays(maximum-sum-of-3-non-overlapping-subarrays) (Hard)