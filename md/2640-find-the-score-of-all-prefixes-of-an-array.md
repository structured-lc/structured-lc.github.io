### Leetcode 2640 (Medium): Find the Score of All Prefixes of an Array [Practice](https://leetcode.com/problems/find-the-score-of-all-prefixes-of-an-array)

### Description  
Given an integer array `nums`, you are asked to compute, for every prefix of the array, a score value as follows:

- For a 0-based index `i`, define a "conversion" array up to `i` where the jᵗʰ value is:  
  `conver[j] = nums[j] + max(nums[0..j])` (0 ≤ j ≤ i)

- The **score** for that prefix is the sum of all values in its "conversion" array, i.e.,  
  `score[i] = sum_{j=0..i} conver[j]`

Return an array `ans` where `ans[i]` is the score for prefix `nums[0..i]`. Each `ans[i]` captures how the prefix up to i would be scored per the rules above.


### Examples  

**Example 1:**  
Input: `nums = [2,3,7,5,10]`  
Output: `[4, 10, 24, 36, 56]`  
*Explanation:*
- Prefix 0: [2] → conver = [2+2]=[4] → sum = 4
- Prefix 1: [2,3] → conver = [2+2, 3+3]=[4,6] → sum=10
- Prefix 2: [2,3,7] → conver = [2+2, 3+3, 7+7]=[4,6,14] → sum=24
- Prefix 3: [2,3,7,5] → conver=[4,6,14,7+7]=[4,6,14,14] → sum=38 (But given expected 36; likely, max is updated up to index)
- Correction: Actually, conver[3] = nums[3] + max(nums[0..3]) = 5 + 7 = 12, so prefix 3: [2,3,7,5] → conver=[4,6,14,12] → sum=36
- Prefix 4: [2,3,7,5,10] → now max=10, conver: [2+2, 3+3, 7+7, 5+10, 10+10]=[4,6,14,15,20], sum=59. 
- But from example output, the last value is 56, which means only the newly added element ever updates the max. Let's use the code logic for the running max so at each step:
    - idx 0: max=2, conver=2+2=4, sum=4
    - idx 1: max=3, conver[1]=3+3=6, sum=4+6=10
    - idx 2: max=7, conver[2]=7+7=14, sum=10+14=24
    - idx 3: max=7, conver[3]=5+7=12, sum=24+12=36
    - idx 4: max=10, conver[4]=10+10=20, sum=36+20=56

**Example 2:**  
Input: `nums = [1,1,1,1]`  
Output: `[2,4,6,8]`  
*Explanation:*  
- At every prefix, max always stays 1, so conver = [2,2,2,2...], cumulative sums: 2,4,6,8.

**Example 3:**  
Input: `nums = [5]`  
Output: ``  
*Explanation:*  
- Only one element, conver=5+5=10.


### Thought Process (as if you’re the interviewee)  
I start by understanding the conversion and scoring process:
- For each i, I need to know the maximum in nums[0..i]. This can be updated while processing left to right.
- For that prefix, conver[i]=nums[i]+max_so_far.
- The score for prefix i is the sum of conver values up to index i.

**Brute-force:**  
For each prefix:
- Iterate 0..i for max
- Build conver[0..i]
- Sum conver[0..i]  
This is O(n²), since finding max for each prefix and summing is costly.

**Optimal:**  
I can compute the max-so-far in O(1) at each step with a running variable.
I also maintain the score-to-date as a running sum.
Algorithm:
- Initialize max_so_far=nums, score=0
- For i in 0..n-1:
  - Update max_so_far = max(max_so_far, nums[i])
  - conver_value = nums[i] + max_so_far
  - score += conver_value
  - ans[i]=score

This gives O(n) total time and O(1) extra space (aside from output).

I choose this O(n) approach for both clarity and efficiency; it uses the standard *prefix/max tracking pattern*.


### Corner cases to consider  
- **Single element array** (should just be [nums \* 2])
- **All elements same** (should get increasing multiples of that value)
- **Strictly increasing array**
- **Strictly decreasing array**
- **Array with negative values**
- **Zeros in array**
- **Empty array** (problem constraints likely disallow; if not, should return empty)


### Solution

```python
def findPrefixScore(nums):
    n = len(nums)
    ans = []
    max_so_far = float('-inf')
    score = 0

    for i in range(n):
        # Update max_so_far for prefix up to i
        max_so_far = max(max_so_far, nums[i])
        # conver[i]: nums[i] + current prefix max
        conver_value = nums[i] + max_so_far
        # Section sum: sum of conver up to i (running)
        score += conver_value
        # The answer for this prefix
        ans.append(score)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We iterate once left-to-right, updating max-so-far, computing conver_value, and the running sum each in O(1).
- **Space Complexity:** O(n) — Needed for the output array `ans`. All other variables use only O(1) space.


### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of max, we used min in the conversion array?  
  *Hint: Try a similar algorithm with a min_so_far variable tracking the minimum prefix value.*

- Can you do this in-place if allowed to modify the input array?  
  *Hint: You can overwrite nums or use it as workspace, but track indices carefully.*

- How would the approach change if you only needed the score for the full array, not every prefix?  
  *Hint: You could drop the ans array and return just the running sum after the loop.*


### Summary
This problem uses **prefix sum** and **prefix maximum tracking** patterns, both very common in array algorithms. The key optimization is recognizing that both can be calculated on-the-fly in a single O(n) pass. The same approach (running variable for prefix aggregate and max/min) re-appears in sliding window problems, stock profit, and subarray sum/max/min problems.