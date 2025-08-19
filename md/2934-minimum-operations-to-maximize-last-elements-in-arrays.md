### Leetcode 2934 (Medium): Minimum Operations to Maximize Last Elements in Arrays [Practice](https://leetcode.com/problems/minimum-operations-to-maximize-last-elements-in-arrays)

### Description  
You are given two integer arrays, **nums1** and **nums2**, both of length n.  
You can perform any number of operations, where in each operation you pick an index i (0 ≤ i < n) and **swap nums1[i] with nums2[i]**.

Your goal is to make the last element of each array the maximum value in its own array:
- nums1[n−1] = max(nums1)
- nums2[n−1] = max(nums2)

Return **the minimum number of swap operations** needed to achieve this for both arrays. If impossible, return -1.

### Examples  

**Example 1:**  
Input: `nums1 = [1,3,4], nums2 = [2,2,2]`  
Output: `0`  
*Explanation: nums1[2] = 4 (max of nums1), nums2[2] = 2 (max of nums2). Both last elements already satisfy the requirements, so 0 operations are needed.*

**Example 2:**  
Input: `nums1 = [1,2,2], nums2 = [2,2,1]`  
Output: `1`  
*Explanation: Swap index 0.  
After swap: nums1 = [2,2,2], nums2 = [1,2,1].  
nums1[2] = 2 (max of nums1), nums2[2] = 1 (max of nums2).  
The requirements are met with only 1 operation.*

**Example 3:**  
Input: `nums1 = [1,3,2], nums2 = [2,3,1]`  
Output: `-1`  
*Explanation:  
No sequence of swaps can make the last element of both arrays the maximum in its array at the same time. It is impossible, so return -1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all combinations of swap-or-not for each index (2ⁿ possibilities), simulate, and check if both arrays have their max at the last position. This is very inefficient.
- **Key Insight:**  
    - Swaps at each index are independent: for index i, swapping swaps only nums1[i] and nums2[i].
    - The challenge reduces to making nums1[n-1] the max of nums1 and nums2[n-1] the max of nums2 using swaps.
- Try two strategies:
    1. **No Swap at Last:** See if both arrays can achieve their requirement without swapping the last elements.
    2. **Swap Last:** Force a swap at the last element and then check if it's possible.
- For each scenario, for all positions except the last, decide whether to swap or not to ensure the maximum elements end up at the last index in both arrays.
- For each scenario:
    - Track what values must end up in the last position in each array (after possible swap for scenario 2).
    - For every other index, count the number of swaps needed to eliminate higher numbers from before the last index.
    - If not possible, result is -1.
- **Optimal:** Try both scenarios (swap/not swap at last), keep the minimum valid operation count.

### Corner cases to consider  
- Arrays already meet the last element == max condition.
- Same value appears in both arrays' last position, and is the max.
- It is impossible (the highest value cannot be put at last due to swap "conflicts").
- Multiple indices tied for the maximum.
- n = 1 (single element).
- All elements are equal.

### Solution

```python
def minOperations(nums1, nums2):
    n = len(nums1)
    
    def check(swap_last):
        # Optionally swap the last element
        if swap_last:
            nums1[-1], nums2[-1] = nums2[-1], nums1[-1]
        
        target1 = nums1[-1]
        target2 = nums2[-1]

        cnt = 0
        for i in range(n-1):
            # If nums1[i] > target1 or nums2[i] > target2, must swap to "push" maxes out
            s = False
            if nums1[i] > target1 and nums2[i] > target2:
                # Impossible: "too big" in both, can't fix with one swap
                if swap_last:
                    nums1[-1], nums2[-1] = nums2[-1], nums1[-1]
                return -1
            # Swap if this puts the value in the correct array
            if nums1[i] > target1:
                cnt += 1
                s = True
            elif nums2[i] > target2:
                cnt += 1
                s = True
            # swap not required, already correct
        if swap_last:
            nums1[-1], nums2[-1] = nums2[-1], nums1[-1]
            if cnt == -1:
                return -1
            cnt += 1 # initial swap at last
        return cnt
    
    ans1 = check(False)
    ans2 = check(True)
    
    if ans1 == -1 and ans2 == -1:
        return -1
    elif ans1 == -1:
        return ans2
    elif ans2 == -1:
        return ans1
    else:
        return min(ans1, ans2)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
    For each scenario (two total), iterate through the arrays once.
- **Space Complexity:** O(1).  
    Only a few variables are used for bookkeeping; no extra arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can pick *any* index and swap (not necessarily the same index) between arrays?
  *Hint: Now, element positions are flexible. Try mapping occurrences like in a two pointers or sorting problem.*

- What changes if you want the *minimum* at the last index instead of the maximum?
  *Hint: Modify comparison directions, but the structure of the algorithm remains similar.*

- What about operations where you can swap *any* pair (i, j) (not just at same index)?
  *Hint: The problem becomes sorting both arrays with minimal swaps, which can be a variant of cycle decomposition.*

### Summary
The approach uses careful case-checking—swapping at the last index or not—to ensure "max at end" constraints in both arrays, and counts swaps required elsewhere so that no forbidden value sneaks in before the end.  
It’s a classic "greedy with dual cases" pattern, commonly used when there’s a key pivot and two main "roots" to check for feasibility.  
Recognizing that swaps are limited to the same index and that only two cases need checking (swap/not swap last) keeps the solution linear and efficient. This reduction technique can be found in in-place array transformation and "move max/min to end/start" family of problems.

### Tags
Array(#array), Enumeration(#enumeration)

### Similar Problems
- Minimum Swaps To Make Sequences Increasing(minimum-swaps-to-make-sequences-increasing) (Hard)