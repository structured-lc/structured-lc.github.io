### Leetcode 2219 (Medium): Maximum Sum Score of Array [Practice](https://leetcode.com/problems/maximum-sum-score-of-array)

### Description  
Given an integer array **nums**, for each index \(i\) (0 ≤ i < n), its "sum score" is defined as the maximum of:
- The sum of the elements from the start up to index \(i\) (**prefix sum**, i.e., nums + ... + nums[i])
- The sum of the elements from index \(i\) to the end (**suffix sum**, i.e., nums[i] + ... + nums[n-1])
Return the **maximum** sum score among all possible indices.

### Examples  

**Example 1:**  
Input: `nums = [3, 1, -2, 5, 2]`  
Output: `9`  
*Explanation:  
- i=0: prefix=3, suffix=9 → max=9  
- i=1: prefix=4, suffix=6 → max=6  
- i=2: prefix=2, suffix=5 → max=5  
- i=3: prefix=7, suffix=7 → max=7  
- i=4: prefix=9, suffix=2 → max=9  
Maximum sum score = 9.*

**Example 2:**  
Input: `nums = [-1, -2, -3]`  
Output: `-1`  
*Explanation:  
- i=0: prefix=-1, suffix=-6 → max=-1  
- i=1: prefix=-3, suffix=-5 → max=-3  
- i=2: prefix=-6, suffix=-3 → max=-3  
Maximum sum score = -1.*

**Example 3:**  
Input: `nums = [4]`  
Output: `4`  
*Explanation:  
Only one index, prefix=4, suffix=4, so the result is 4.*

### Thought Process (as if you’re the interviewee)  

First, understand that for every index i, we need to compare:
- sum from start to i (prefix)
- sum from i to end (suffix)

A brute-force approach is, for all i, compute both sums directly. But this results in O(n²) time.

To optimize, I notice:
- Prefix sums can be precomputed as we scan left to right.
- The total sum of the array is known up front; for any index i, suffix sum can be derived as total_sum - prefix_sum_before_i, where prefix_sum_before_i is sum(nums[0:i]).

Thus, for each i, we can:
- Maintain prefix sum as we iterate
- Derive suffix sum at i with: total_sum - sum(nums[0:i])
- For each i, take max(prefix sum at i, suffix sum at i)
- Track the overall max.

This is O(n) time and O(1) space (or O(n) space if keeping an explicit prefix array).

### Corner cases to consider  
- All negative numbers (maximum may be "less negative")
- Single-element array
- Array with all zeros
- Large input size (test efficiency)
- Cases where prefix == suffix (palindromic structure)
- Array with positive and negative mix

### Solution

```python
def maximumSumScore(nums):
    n = len(nums)
    total_sum = sum(nums)             # Total sum for suffix calculation
    prefix_sum = 0
    max_score = float('-inf')

    for i in range(n):
        prefix_sum += nums[i]                # Prefix sum up to index i
        suffix_sum = total_sum - (prefix_sum - nums[i])   # Suffix sum starting at i
        score = max(prefix_sum, suffix_sum)
        max_score = max(max_score, score)
    return max_score
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we traverse the list once to calculate total_sum, and once more to compute prefix and suffix sums and the max.
- **Space Complexity:** O(1) extra space, as we only use variables for sums and counters (no extra arrays apart from input).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the definition of "score" changes to min(prefix, suffix), or abs(prefix - suffix)?  
  *Hint: Adjust the aggregation logic as per the new operation.*

- How would you return the index or indices where the maximum sum score is achieved?  
  *Hint: Track indices along with the max calculation.*

- What if nums is a stream and you cannot pre-compute the total sum efficiently?  
  *Hint: You may need to process prefix/suffix in different passes or only keep track of running prefix/suffix.*

### Summary
This problem demonstrates the prefix sum trick, a very common pattern when needing range sums; by leveraging cumulative sums and the relationship between prefix and suffix, we achieve a linear solution. The same approach can be adapted for problems involving ranges, divides, or partitions where sums up to or from an index are needed.