### Leetcode 795 (Medium): Number of Subarrays with Bounded Maximum [Practice](https://leetcode.com/problems/number-of-subarrays-with-bounded-maximum)

### Description  
Given an array of integers `nums` and two integers `left` and `right`, count the number of contiguous, non-empty subarrays such that the maximum element in each subarray is at least `left` and at most `right`.  
In other words: for every subarray, if its largest value is between `left` and `right` (inclusive), you should count it toward the total.

### Examples  

**Example 1:**  
Input: `nums = [2, 1, 4, 3], left = 2, right = 3`  
Output: `3`  
*Explanation: The subarrays are: [2], [2, 1], [3]. Each of their maximums is within [2, 3].*

**Example 2:**  
Input: `nums = [2, 9, 2, 5, 6], left = 2, right = 8`  
Output: `7`  
*Explanation: Subarrays are: [2], [2, 9], [9, 2], [2], [2, 5], [5, 6], . Only subarrays where the max is between 2 and 8 are counted.*

**Example 3:**  
Input: `nums = [1, 1, 1], left = 2, right = 3`  
Output: `0`  
*Explanation: No subarray has maximum ≥2. Result is 0.*

### Thought Process (as if you’re the interviewee)  

First, I’d think brute-force: enumerate all subarrays, for each find its maximum, and check if it’s in [left, right]. For n elements, this is O(n²) time, too slow for large inputs.

Let’s optimize.  
Suppose we could count the number of subarrays whose maximum ≤ x in O(n) time. Then:

- Number of subarrays with max in [left, right] =  
   (Number of subarrays with max ≤ right)  
  − (Number of subarrays with max < left, i.e., max ≤ left−1)

So, define a helper function that for a value x, counts all subarrays where the maximum ≤ x.  
If an element > x, you cannot include it in any subarray, so you "reset".  
Otherwise, for every position, you count the number of valid subarrays ending there by extending the window.

Final answer = f(right) − f(left−1),  
where f(x) is the count of subarrays with max ≤ x.

This is O(n) as we make two O(n) passes.

### Corner cases to consider  
- Empty array: Output 0 (though spec says input is non-empty)
- All elements < left ⇒ output 0
- All elements > right ⇒ output 0
- left == right
- nums contains duplicates, or all equal elements (e.g., [4,4,4])
- Array of length 1
- left == min(nums), right == max(nums)

### Solution

```python
def numSubarrayBoundedMax(nums, left, right):
    # Helper to count subarrays where max element ≤ bound
    def count(bound):
        res = 0
        curr = 0
        for num in nums:
            if num <= bound:
                curr += 1    # extend valid subarrays ending here
            else:
                curr = 0     # reset at any number > bound
            res += curr
        return res

    return count(right) - count(left - 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We make two linear passes (each O(n)). All logic inside loops is O(1) per iteration.

- **Space Complexity:** O(1)  
  Only a handful of variables used. No recursion or extra space proportional to input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted to return the subarrays themselves, not just the count?  
  *Hint: Think about storing starting indices for valid subarrays.*

- How would you handle very large integers, or modify to allow negatives?  
  *Hint: The logic does not rely on sign, just on value comparisons.*

- Could you solve it in a streaming fashion (online), as numbers arrive?  
  *Hint: Think about maintaining running windows and counts.*

### Summary  
This problem uses the classic two-pass or difference-of-counting window technique. The core coding pattern ― sliding window with resets when constraints break ― is broadly applicable to subarray range queries. The prefix sum–like `count(bound)` logic is also common for problems involving "at most"/"less than or equal" conditions.


### Flashcard
Count subarrays with max ≤ right and subtract those with max < left; use a sliding window to count in O(n) time.

### Tags
Array(#array), Two Pointers(#two-pointers)

### Similar Problems
- Count Subarrays With Median K(count-subarrays-with-median-k) (Hard)
- Find the Number of Subarrays Where Boundary Elements Are Maximum(find-the-number-of-subarrays-where-boundary-elements-are-maximum) (Hard)