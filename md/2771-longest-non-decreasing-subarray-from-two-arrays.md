### Leetcode 2771 (Medium): Longest Non-decreasing Subarray From Two Arrays [Practice](https://leetcode.com/problems/longest-non-decreasing-subarray-from-two-arrays)

### Description  
You are given two integer arrays, nums1 and nums2, of equal length n. At each position i (0 ≤ i < n), you must select nums1[i] or nums2[i] to form a new array nums3. The goal is to maximize the length of the longest contiguous non-decreasing subarray in nums3.  
A non-decreasing subarray is a contiguous subsequence where each element is greater than or equal to the previous one.

### Examples  

**Example 1:**  
Input: `nums1 = [2,3,1], nums2 = [1,2,1]`  
Output: `2`  
*Explanation: Choose nums2=1, nums2[1]=2, then nums3=[1,2,1]. The longest non-decreasing subarray is [1,2] (length 2).*

**Example 2:**  
Input: `nums1 = [1,3,2,1], nums2 = [2,2,3,4]`  
Output: `4`  
*Explanation: Choose nums1=1, nums2[1]=2, nums2[2]=3, nums2[3]=4, so nums3=[1,2,3,4]. The whole array is non-decreasing (length 4).*

**Example 3:**  
Input: `nums1 = [4,5,1], nums2 = [3,5,1]`  
Output: `3`  
*Explanation: Choose nums2=3, nums1[1]=5, nums1[2]=1, so nums3=[3,5,1]. The longest non-decreasing subarray is [3,5] or [5,1] (length 2), but if you choose nums1=4, nums1[1]=5, nums2[2]=1, nums3=[4,5,1], again max length 2. But check every switch, and the optimal non-decreasing might be just the maximum among all these (length 2 or 3 depending on values).*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:** Consider every possible way to build nums3 (2ᶰ possibilities). For each, check the longest non-decreasing subarray. *Clearly infeasible for n up to 10⁵.*
- **Optimization:** Notice that for each position, you just need to know: What’s the longest non-decreasing subarray ending here if you pick nums1[i] or nums2[i]? You can solve it with dynamic programming.
- For each i, keep two dp values:
    - `dp1`: length of longest non-decreasing subarray ending at i if pick nums1[i]
    - `dp2`: same, but if pick nums2[i]
- For each i, update dp1 and dp2 using previous values and transitions, since you can pick either value at each step.
- This only requires O(1) states per position (two integers), so O(n) time and O(1) extra space.
- This is preferred for its optimal efficiency and clarity.

### Corner cases to consider  
- Arrays of length 1 (output should be 1)
- All numbers equal
- Both arrays strictly decreasing
- Both arrays strictly increasing
- Arrays with repeated numbers
- Alternating up and down patterns
- Cases where switching between arrays is necessary

### Solution

```python
def maxNonDecreasingLength(nums1, nums2):
    n = len(nums1)
    # dp1: length of non-decreasing subarray ending at i with nums1[i]
    # dp2: same for nums2[i]
    dp1 = dp2 = 1
    ans = 1

    for i in range(1, n):
        ndp1 = ndp2 = 1
        # If previous nums1 can continue for current nums1
        if nums1[i] >= nums1[i-1]:
            ndp1 = max(ndp1, dp1 + 1)
        # If previous nums2 can continue for current nums1
        if nums1[i] >= nums2[i-1]:
            ndp1 = max(ndp1, dp2 + 1)
        # If previous nums1 can continue for current nums2
        if nums2[i] >= nums1[i-1]:
            ndp2 = max(ndp2, dp1 + 1)
        # If previous nums2 can continue for current nums2
        if nums2[i] >= nums2[i-1]:
            ndp2 = max(ndp2, dp2 + 1)

        dp1, dp2 = ndp1, ndp2
        ans = max(ans, dp1, dp2)

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) because we only loop over the arrays once, doing a constant number of operations per index.
- **Space Complexity:** O(1) extra space, as we only maintain three integer variables regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted to recover the actual subarray (not just the length)?  
  *Hint: Backtrack by storing previous choices and indices.*

- How would you handle queries where only a portion of the arrays is updated frequently?  
  *Hint: Consider segment trees or persistent DP for range updates.*

- What if you could pick from k arrays instead of just two at each index?  
  *Hint: Expand DP to size k for transitions, with careful state management.*

### Summary
This problem uses a classic **dynamic programming** pattern: maintaining the best "ending" value for two paths and propagating them forward in O(n) time. Such patterns commonly occur in array-chaining or combining scenarios. This approach is particularly useful in situations where at each step, the choice is between a small constant number of options dependent only on the previous state—found in sequence building, "choose from multiple lists," or variants of LIS/array DP problems.