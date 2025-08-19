### Leetcode 2321 (Hard): Maximum Score Of Spliced Array [Practice](https://leetcode.com/problems/maximum-score-of-spliced-array)

### Description  
Given two integer arrays **nums₁** and **nums₂** of the same length, you can *swap* any single subarray (contiguous elements) between them (or choose not to swap any).  
After the (optional) swap, the “score” of the operation is **max(sum(nums₁), sum(nums₂))**.  
Your task is to choose a subarray (could be empty or whole) to swap (at most once) to obtain the largest possible score.

### Examples  

**Example 1:**  
Input: `nums1 = [60,60,60]`, `nums2 = [10,90,10]`  
Output: `210`  
*Explanation: Swapping nums1[1..1] with nums2[1..1] gives*  
nums1 = `[60,90,60]` sum = 210  
nums2 = `[10,60,10]` sum = 80  
Score is max(210, 80) = 210.

**Example 2:**  
Input: `nums1 = [20,40,20,70,30]`, `nums2 = [50,20,50,40,20]`  
Output: `220`  
*Explanation: Swapping nums1[1..3] with nums2[1..3] gives*  
nums1 = `[20,20,50,40,30]` sum = 160  
nums2 = `[50,40,20,70,20]` sum = 200  
Score is max(160, 200) = 200 (but if swap [0..4], nums1 sum = 140, nums2 sum = 220, score = 220, the maximum).

**Example 3:**  
Input: `nums1 = [7,11,13]`, `nums2 = [1,1,1]`  
Output: `31`  
*Explanation: No swap needed; nums1 = [7,11,13] sum = 31, nums2 = [1,1,1] sum = 3. Score = 31. Swapping any subarray only lowers the score.*

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:** Try all possible intervals [l..r] (n² possibilities), swap those subarrays, compute the new sums for both arrays, and track the maximum score.  
  This is too slow for large n.

- **Observation:** Swapping any subarray between the arrays increases one sum and decreases the other by the difference in the interval.  
- For fixed [l..r], swapping that segment adds sum(nums2[l..r]) - sum(nums1[l..r]) to nums1’s total (and vice versa).
- The best possible gain for nums1’s sum is to find the subarray in nums2 - nums1 with maximum sum (Kadane’s algorithm).  
  Similarly for nums2’s sum.

- **Efficient approach:**  
  - For maximizing nums1 sum: Find the subarray where swapping brings in the most gain = find subarray with maximum sum of (nums2[i] - nums1[i]) using Kadane’s.
  - For maximizing nums2 sum: Find the subarray with maximum sum of (nums1[i] - nums2[i]).
  - The result is max(original nums1 sum + best possible improvement, original nums2 sum + their best possible improvement).

- **Trade-offs:**  
  - Only need one pass with Kadane’s algorithm on differences, O(n) time.

### Corner cases to consider  
- Arrays are empty
- Arrays have length 1
- Arrays are identical (no swap needed)
- Arrays with all equal elements
- Swapping gives a negative improvement (don’t swap)
- Gain/loss is the same for both arrays by swapping full array

### Solution

```python
def maximumsSplicedArray(nums1, nums2):
    # Calculate initial sums
    sum1 = sum(nums1)
    sum2 = sum(nums2)
    
    # Helper to find max gain for swapping into arr1 from arr2
    def max_gain(a, b):
        max_ending_here = max_so_far = b[0] - a[0]
        for i in range(1, len(a)):
            diff = b[i] - a[i]
            max_ending_here = max(diff, max_ending_here + diff)
            max_so_far = max(max_so_far, max_ending_here)
        return max_so_far if max_so_far > 0 else 0

    # Option 1: Swap some subarray from nums2 into nums1
    gain1 = max_gain(nums1, nums2)
    # Option 2: Swap some subarray from nums1 into nums2
    gain2 = max_gain(nums2, nums1)
    
    # The best score is the original sum plus the max possible gain (or no gain if negative)
    return max(sum1 + gain1, sum2 + gain2)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Two passes (Kadane’s algorithm) over the arrays, each of length n.
- **Space Complexity:** O(1) — Only a few variables; no extra arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you are allowed to swap multiple, non-overlapping subarrays?  
  *Hint: Try to reduce the problem to the Maximum Sum of K Disjoint Subarrays.*

- What if the arrays can be of different lengths?  
  *Hint: How would you redefine a valid subarray swap between mismatched lengths?*

- Can you track which interval to swap in O(n) as well?  
  *Hint: Standard Kadane’s can be modified to return interval indices when maximum is found.*

### Summary
This problem uses the classic **Kadane’s algorithm** pattern for max subarray sum, but applies it to the difference arrays (nums2ᵢ - nums1ᵢ and vice versa) to efficiently find the optimal single interval to swap for maximizing the total.  
Key insight: The best swap corresponds exactly to the maximum-gain subarray in the difference array, which is a staple trick in array manipulation and interview settings.  
This technique is widely applicable in problems that require maximizing or minimizing array sums by applying restricted subarray operations.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Maximum Subarray(maximum-subarray) (Medium)