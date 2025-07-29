### Leetcode 1855 (Medium): Maximum Distance Between a Pair of Values [Practice](https://leetcode.com/problems/maximum-distance-between-a-pair-of-values)

### Description  
Given two **non-increasing** integer arrays `nums1` and `nums2`, find the maximum distance between any valid pair of indices (i, j) such that:
- 0 ≤ i < len(nums1)
- 0 ≤ j < len(nums2)
- i ≤ j
- nums1[i] ≤ nums2[j]

The distance is calculated as `j - i`. Return the largest possible such distance (0 if no valid pair exists).

### Examples  

**Example 1:**  
Input: `nums1 = [55,30,5,4,2]`, `nums2 = [100,20,10,10,5]`  
Output: `2`  
*Explanation: Valid pairs are (0,0), (2,2), (2,3), (2,4), (3,3), (3,4), (4,4).  
The max distance is 2, from pair (2,4): 2 = 4 - 2.*

**Example 2:**  
Input: `nums1 = [2,2,2]`, `nums2 = [10,10,1]`  
Output: `1`  
*Explanation: Valid pairs: (0,0), (0,1), (1,1).  
Max distance is 1 (from (0,1)).*

**Example 3:**  
Input: `nums1 = [30,29,19,5]`, `nums2 = [25,25,25,25,25]`  
Output: `2`  
*Explanation: Valid pairs: (2,2), (2,3), (2,4), (3,3), (3,4).  
Max distance is 2 (from (2,4)).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each i in nums1, check all j ≥ i in nums2 until nums2[j] < nums1[i]. Keep track of the best j - i.  
  This is O(n²), too slow for large arrays (up to 10⁵).

- **Optimized idea (Two Pointers):**  
  Since both arrays are non-increasing, for each i you can expand j as far right as possible while maintaining nums2[j] ≥ nums1[i], never going backward.  
  Use two pointers:  
  - For i = 0..len(nums1)-1, increment j as long as j < len(nums2) and nums2[j] ≥ nums1[i].  
  - After that, calculate j - i (since i ≤ j always holds), and update the answer.  
  Each pointer only increases; total O(n) time.

- **Why final approach:**  
  This pattern leverages the sorted (non-increasing) structure, which allows us to avoid redundant checking, giving linear time.  
  No extra space beyond a few pointers and counters.

### Corner cases to consider  
- Either array is length 1
- No valid pair (every nums1[i] > nums2[j] for all i,j)
- Arrays of different lengths
- Arrays with all equal elements
- Arrays where maximum distance is at the end or at the beginning

### Solution

```python
def maxDistance(nums1, nums2):
    # Pointers for nums1 and nums2
    res = 0
    j = 0
    
    for i in range(len(nums1)):
        # Move j forward as long as nums2[j] ≥ nums1[i] and j in bounds
        while j < len(nums2) and nums2[j] >= nums1[i]:
            j += 1
        # After loop, last j checked does not satisfy or end of nums2.
        # Valid j-1 gives distance (j-1) - i, but only if (j-1) ≥ i
        if j - 1 >= i:
            res = max(res, j - 1 - i)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each pointer (i for nums1 and j for nums2) advances forward but never backtracks; both together at most n + m steps (linear).
  
- **Space Complexity:** O(1)  
  No extra space except a few variables; arrays are not copied.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose the arrays are not sorted.  
  *Hint: Is there a way to preprocess or use a binary search?*

- How to find all pairs achieving the maximum distance?  
  *Hint: Save the pairs during calculation when reaching a new max.*

- How would you solve this if you were allowed to use extra space proportional to the array sizes?  
  *Hint: Consider preprocessing with hash maps or value-to-index mapping.*

### Summary
This problem uses the **two-pointer** pattern, optimal for working with two sorted (or monotonic) arrays in tandem. The approach is common for interval and range problems on sorted arrays, and can be applied more generally wherever expanding a sliding window is meaningful. No extra data structures are needed, making this approach highly efficient for large input sizes.