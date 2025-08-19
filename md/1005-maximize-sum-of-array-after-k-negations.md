### Leetcode 1005 (Easy): Maximize Sum Of Array After K Negations [Practice](https://leetcode.com/problems/maximize-sum-of-array-after-k-negations)

### Description  
Given an integer array, you are allowed to choose an index and flip the sign of its value (negate it) — you must do exactly **k** such operations (you can pick the same index multiple times). Your goal: **maximize the sum** of the array after performing all k negations.  
In other words, after k flips (each turning a value `a` into `-a`), return the largest possible sum of the array.


### Examples  

**Example 1:**  
Input: `nums = [4,2,3], k = 1`  
Output: `5`  
*Explanation: We negate the smallest value `2` → `[4,-2,3]`; sum = 5.*

**Example 2:**  
Input: `nums = [3,-1,0,2], k = 3`  
Output: `6`  
*Explanation:  
Step 1: Flip `-1` → `[3,1,0,2]`  
Step 2: Flip `0` → `[3,1,0,2]` (same zero, no effect)  
Step 3: Flip `0` again → `[3,1,0,2]`  
Final sum = 6. If there is a zero, extra flips do not hurt.*

**Example 3:**  
Input: `nums = [-2,9,9,8,4], k = 5`  
Output: `32`  
*Explanation:  
Flip in order: `-2` → `2`, then flip the smallest four numbers (which are all 2/4/8/9: each flip just alternates sign, so flip the smallest repeatedly if k > n),  
After flipping, final sum is maximized at 32.*


### Thought Process (as if you’re the interviewee)  

**1. Brute force idea:**  
Try all k combinations of flips. This is exponentially slow and not practical for large inputs.

**2. Greedy improvement:**  
- Since flipping a negative to positive always increases the sum, flip as many negatives as possible.
- Sort the array to bring negatives to the front.
- Flip the smallest (most negative) number in each operation.
- If all negatives are flipped and k flips remain, repeatedly flip the smallest absolute number (which minimizes the sum decrease).
- If k is still not zero, keep flipping the smallest number (possibly undoing a previous flip) because flipping the same number twice will return it to its original value.
- If there is a zero in the array, further flips have no effect if k remains odd.

**3. Final approach choice:**  
Greedy + Sorting provides the simplest, most optimal solution (O(n log n) time for sorting).


### Corner cases to consider  
- Array contains zeros: Further flips do not decrease the sum (safe to spend extra flips here).
- All numbers are positive: Flipping any number will decrease sum; minimize decrease by flipping the smallest value.
- k much larger than the array size: After flipping all negatives, may flip positives/unavoidably, so minimize harm.
- Array of length 1: Must flip the same element repeatedly.
- Array is empty: Return 0 (by convention).


### Solution

```python
def largestSumAfterKNegations(nums, k):
    # Sort to bring negatives to the front
    nums.sort()
    
    # Flip as many negatives as possible
    for i in range(len(nums)):
        if nums[i] < 0 and k > 0:
            nums[i] = -nums[i]
            k -= 1
    
    # If k flips remain, flip the smallest number (even number of flips cancels out)
    if k % 2 == 1:
        # Find the smallest absolute value
        min_idx = nums.index(min(nums))
        nums[min_idx] = -nums[min_idx]
    
    # Return the maximized sum
    return sum(nums)
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), due to sorting the input array.
- **Space Complexity:** O(1) extra space if modifying input; O(n) if making a copy.


### Potential follow-up questions (as if you’re the interviewer)  

- What if you cannot flip the same element more than once?  
  *Hint: Use a set to remember flipped indices and flip up to k unique negatives, then, if needed, flip the least positive number.*

- Could you solve this without sorting (in linear time)?  
  *Hint: Use a heap or counting sort to process negatives and track the minimum absolute value.*

- What if you wanted the minimum possible sum, not the maximum?  
  *Hint: Flip positives instead of negatives first; use the same greedy idea in reverse.*


### Summary  
This problem uses the **Greedy + Sorting** pattern: always flip the most negative values until flips run out, handling even/odd leftovers by flipping the smallest absolute value (if k is odd).  
This pattern (greedily fixing the worst elements first, then dealing with leftovers) appears in problems about maximizing/minimizing sums with repeated limited operations, or when sign changes can be applied flexibly.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Find Subsequence of Length K With the Largest Sum(find-subsequence-of-length-k-with-the-largest-sum) (Easy)