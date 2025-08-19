### Leetcode 1589 (Medium): Maximum Sum Obtained of Any Permutation [Practice](https://leetcode.com/problems/maximum-sum-obtained-of-any-permutation)

### Description  
Given an array **nums** and a list of integer intervals **requests** where each request is a pair `[start, end]`, you may **permute** nums in any way.  
For each request, sum the numbers from index `start` to `end` in the permuted array.  
Return the **maximum total sum** of all these request sums, among all possible permutations.  
Since the result may be large, return it modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3, 4, 5]`, `requests = [[1, 3], [0, 1]]`  
Output: `19`  
*Explanation:  
- You can permute nums as [3, 5, 4, 2, 1].  
- requests goes from index 1 to 3: (5+4+2)=11  
- requests[1] goes from index 0 to 1: (3+5)=8  
- 11+8=19 gives the maximum possible sum with optimal permutation.*

**Example 2:**  
Input: `nums = [1, 2, 3, 4, 5, 6]`, `requests = [[0,1]]`  
Output: `11`  
*Explanation:  
- Place the two largest elements in the 0ᵗʰ and 1ˢᵗ positions: [6,5,4,3,2,1]  
- The only request sums positions 0+1: 6+5=11.*

**Example 3:**  
Input: `nums = [1,2,3,4,5,10]`, `requests = [[0,2],[1,3],[1,1]]`  
Output: `47`  
*Explanation:  
- An optimal permutation is [4,10,5,3,2,1]  
- Request 0: 4+10+5=19  
- Request 1: 10+5+3=18  
- Request 2: 10  
- 19+18+10=47.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try all permutations of nums (n!), compute each total. This is not feasible for n > 8.
- **Observation:** Each index in nums may be counted multiple times (for overlapping requests).  
  If we know for each position how many times it will be *used* in requests, the optimal is:  
  - Put the largest nums in the positions that are summed most often.
- **Plan:**  
  1. For each index, count how many times it appears in any request.  
     - Use the "difference array" trick: for each [start, end] do `count[start]+=1; count[end+1]-=1`, then prefix sum.
  2. Sort nums ascending, and the counts descending.
  3. Multiply the largest nums by the largest counts, sum, and take modulo 10⁹ + 7.
- **Why this is optimal:** Greedy assignment: most weighted indices get the largest values.

### Corner cases to consider  
- nums or requests arrays of length 1.
- An index that isn't involved in any request.
- Highly overlapping requests (some indices very high count, some zero).
- All requests on the same subarray.
- Negative numbers in nums (according to constraints, nums[i] ≥ 0).
- Duplicates in nums; all values equal.

### Solution

```python
def maxSumRangeQuery(nums, requests):
    n = len(nums)
    count = [0] * (n + 1)

    # 1. Calculate frequency for each index using difference array
    for l, r in requests:
        count[l] += 1
        if r + 1 < n:
            count[r + 1] -= 1

    # 2. Accumulate to get actual frequency counts for each index
    for i in range(1, n):
        count[i] += count[i - 1]
    count = count[:n]  # Remove the extra slot

    # 3. Sort frequencies and nums to assign biggest nums to biggest frequencies
    count.sort()
    nums.sort()

    MOD = 10 ** 9 + 7

    # 4. Compute answer
    res = 0
    for i in range(n):
        res = (res + count[i] * nums[i]) % MOD

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n + m), where n = len(nums), m = len(requests).  
  Counting is O(m), sorting is O(n log n), combining is O(n).
- **Space Complexity:** O(n), for the count array and sorting buffers.

### Potential follow-up questions (as if you’re the interviewer)  

- What if requests could overlap arbitrarily many times—does this approach still work?  
  *Hint: Yes, because we always assign largest values by highest frequency regardless of overlaps.*

- What if nums can be negative as well?  
  *Hint: Greedy still works; assign negative numbers to least useful positions.*

- How would you modify this if requests were streaming (not known in advance)?  
  *Hint: You'd need a different approach, maybe some online method, since can't optimize the permutation in advance.*

### Summary
This problem is an excellent example of how greedy and counting approaches can outperform brute-force permutations.  
The key trick—counting how often each index is accessed using a difference array, then greedily assigning the largest values—can be applied to any resource allocation problem where weights are known in advance. It's a classic pattern for maximizing sums under reordering constraints.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting), Prefix Sum(#prefix-sum)

### Similar Problems
