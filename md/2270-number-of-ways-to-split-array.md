### Leetcode 2270 (Medium): Number of Ways to Split Array [Practice](https://leetcode.com/problems/number-of-ways-to-split-array)

### Description  
Given a **0-indexed** integer array `nums` of length n, you are to find how many ways you can split the array into two non-empty parts such that:
- The sum of the left part (first i+1 elements) is **greater than or equal** to the sum of the right part (remaining elements).
- Each part must be non-empty, so a valid split point is at index i such that 0 ≤ i < n - 1.

Return the **number of valid splits**.

### Examples  

**Example 1:**  
Input: `nums = [10, 4, -8, 7]`  
Output: `2`  
*Explanation:*
- Split at i=0: left=, right=[4, -8, 7] → 10 ≥ (4 + -8 + 7) → 10 ≥ 3 ✅
- Split at i=1: left=[10, 4], right=[-8, 7] → 14 ≥ (-8 + 7) → 14 ≥ -1 ✅
- Split at i=2: left=[10, 4, -8], right= → 6 ≥ 7 ❌  
So, 2 valid splits.

**Example 2:**  
Input: `nums = [1, 1, 1]`  
Output: `1`  
*Explanation:*
- Split at i=0: left=[1], right=[1, 1] → 1 ≥ 2 ❌  
- Split at i=1: left=[1, 1], right=[1] → 2 ≥ 1 ✅  
So, 1 valid split.

**Example 3:**  
Input: `nums = [2, 3, 1, 0]`  
Output: `2`  
*Explanation:*
- i=0: left=[2], right=[3,1,0] → 2 ≥ 4 ❌
- i=1: left=[2,3], right=[1,0] → 5 ≥ 1 ✅
- i=2: left=[2,3,1], right= → 6 ≥ 0 ✅  
So, 2 valid splits.

### Thought Process (as if you’re the interviewee)  
First, check every split: for each i from 0 to n-2, calculate the sum of the left and right. Naively, this is O(n²).  
To optimize:
- Precompute the **total sum** of nums.
- Iterate through nums (up to n-2), keep a running prefix sum (left sum). For each i:
  - Right sum is total - left_sum.
  - If left_sum ≥ right_sum, increase the count.
This reduces to O(n) and O(1) extra space (with only variables), or O(n) space if prefix sums are stored.

### Corner cases to consider  
- All numbers are zero, e.g. `[0,0,0]`.
- All negatives, all positives.
- Minimal size: n=2.
- Large integers; test for overflow.
- Array where no splits are possible.
- Array where every split is valid.

### Solution

```python
def waysToSplitArray(nums):
    n = len(nums)
    total_sum = sum(nums)
    left_sum = 0
    count = 0
    
    # Loop to n-1, so that there's at least one element on the right
    for i in range(n - 1):
        left_sum += nums[i]
        right_sum = total_sum - left_sum
        if left_sum >= right_sum:
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), as we pass through the array once to compute the prefix (left) sums.
- **Space Complexity:** O(1), since we use a few variables only; no extra data structures proportional to n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is very large and you must optimize for memory?
  *Hint: Can you do it with only a running sum?*

- How would you modify to count only splits with left > right?
  *Hint: Change the ‘≥’ condition in your check.*

- Can you do it if the input is a stream of numbers?
  *Hint: You’ll need two passes, or maintain state with only partial knowledge.*

### Summary
This problem is a classic **prefix sum** and **one-pass scan** pattern, common in array partition/splitting questions.  
Optimization comes from avoiding redundant sum computations by using cumulative totals.  
The coding approach and pattern here can be applied in subarray partition, “find kth split” and many “sliding window” like interview problems.


### Flashcard
Precompute total sum, iterate with running prefix sum, and count splits where left sum ≥ right sum—O(n) time.

### Tags
Array(#array), Prefix Sum(#prefix-sum)

### Similar Problems
- Split Array Largest Sum(split-array-largest-sum) (Hard)
- Find Pivot Index(find-pivot-index) (Easy)
- Ways to Split Array Into Three Subarrays(ways-to-split-array-into-three-subarrays) (Medium)
- Find the Middle Index in Array(find-the-middle-index-in-array) (Easy)
- Partition Array Into Two Arrays to Minimize Sum Difference(partition-array-into-two-arrays-to-minimize-sum-difference) (Hard)
- Minimum Average Difference(minimum-average-difference) (Medium)