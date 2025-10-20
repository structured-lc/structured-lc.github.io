### Leetcode 718 (Medium): Maximum Length of Repeated Subarray [Practice](https://leetcode.com/problems/maximum-length-of-repeated-subarray)

### Description  
Given two arrays of integers, find the **maximum length of a subarray that appears in both arrays**.  
A subarray is a contiguous sequence of elements; order and continuity matter.  
Your task is to determine the length of the longest such subarray.

### Examples  

**Example 1:**  
Input: `nums1 = [1,2,3,2,1]`, `nums2 = [3,2,1,4,7]`  
Output: `3`  
*Explanation: The longest repeated subarray is `[3,2,1]`.*

**Example 2:**  
Input: `nums1 = [0,0,0,0,0]`, `nums2 = [0,0,0,0,0]`  
Output: `5`  
*Explanation: Both arrays are the same, so the entire array is the repeated subarray: `[0,0,0,0,0]`.*

**Example 3:**  
Input: `nums1 = [1,2,3]`, `nums2 = [4,5,6]`  
Output: `0`  
*Explanation: There are no common elements; thus, no repeated subarray.*

### Thought Process (as if you’re the interviewee)  
First, **brute-force** would check all subarrays of one array and see if they appear in the other, but this is very inefficient (O(n³)).  
To optimize, notice this resembles the **Longest Common Substring** problem, which is solved via **Dynamic Programming (DP)**:  
- Let `dp[i][j]` be the length of the longest subarray ending at `nums1[i-1]` and `nums2[j-1]`.
- If `nums1[i-1] == nums2[j-1]`, then `dp[i][j] = dp[i-1][j-1] + 1`, else `0`.
- The answer is the **maximum** value in the DP table.  
This runs in O(mn) time and O(mn) space, where m,n are the lengths of the arrays.

**Space can be reduced** to O(n) by keeping only the previous row in memory.

Other approaches (e.g., binary search + rolling hash) are more complex but not necessary here given constraints.

### Corner cases to consider  
- Empty arrays (nums1 or nums2 length 0)
- Arrays with no overlapping values at all
- Arrays whose entire contents match
- Arrays with only one element each
- Arrays with repeated, but non-contiguous, common values

### Solution

```python
def findLength(nums1, nums2):
    m, n = len(nums1), len(nums2)
    # Initialize 2D DP array with extra row & col for easier indexing
    dp = [[0] * (n+1) for _ in range(m+1)]
    maxlen = 0

    for i in range(1, m+1):
        for j in range(1, n+1):
            if nums1[i-1] == nums2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
                maxlen = max(maxlen, dp[i][j])
            # else dp[i][j] remains 0 (initialized)
    return maxlen
```

**Optimized space (1D DP):**
```python
def findLength(nums1, nums2):
    m, n = len(nums1), len(nums2)
    dp = [0] * (n+1)
    maxlen = 0

    for i in range(1, m+1):
        prev = 0
        for j in range(n, 0, -1):
            temp = dp[j]
            if nums1[i-1] == nums2[j-1]:
                dp[j] = dp[j-1] + 1
                maxlen = max(maxlen, dp[j])
            else:
                dp[j] = 0
            prev = temp
    return maxlen
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), as each cell of the DP table is visited once for each combination of i and j.
- **Space Complexity:** O(m × n) for 2D DP. Can be reduced to O(n) with 1D DP optimization, as only one row (or previous values) is needed at a time.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need not only the length but the actual subarray?
  *Hint: Keep track of the ending index when updating max length and reconstruct the subarray afterward.*

- How would you solve this if arrays can be very large (millions of elements)?
  *Hint: Explore binary search with rolling hash for substring verification.*

- How would your algorithm change if it was subsequence (not subarray)?
  *Hint: This becomes Longest Common Subsequence, which has a similar DP, but state transition and definition differ.*

### Summary
This problem uses the **Dynamic Programming** pattern commonly seen in "Longest Common Substring" problems. The key idea is to build solutions for subproblems (matching ends of subarrays) and carry those results forward, always maintaining the maximum.  
This approach is widely applicable to other string/array comparison problems involving contiguous blocks and can be optimized for space if only the last result is needed.


### Flashcard
Use DP where dp[i][j] is the length of the longest common subarray ending at nums1[i-1] and nums2[j-1]; answer is the max dp value.

### Tags
Array(#array), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming), Sliding Window(#sliding-window), Rolling Hash(#rolling-hash), Hash Function(#hash-function)

### Similar Problems
- Minimum Size Subarray Sum(minimum-size-subarray-sum) (Medium)
- Longest Common Subpath(longest-common-subpath) (Hard)
- Find the Maximum Length of a Good Subsequence II(find-the-maximum-length-of-a-good-subsequence-ii) (Hard)
- Find the Maximum Length of a Good Subsequence I(find-the-maximum-length-of-a-good-subsequence-i) (Medium)