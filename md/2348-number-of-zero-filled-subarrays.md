### Leetcode 2348 (Medium): Number of Zero-Filled Subarrays [Practice](https://leetcode.com/problems/number-of-zero-filled-subarrays)

### Description  
Given an integer array, count the total number of subarrays where every element is 0.  
A *subarray* is a contiguous sequence in the array. Any continuous block of zeros can contribute multiple subarrays depending on its length.

### Examples  

**Example 1:**  
Input: `[1,3,0,0,2,0,0,4]`  
Output: `6`  
*Explanation: There are 2 single zeros at indices 2 and 3, so subarrays , , [0,0]. Similarly, at indices 5 and 6: , , [0,0]. Total = 6.*

**Example 2:**  
Input: `[0,0,0,2,0,0]`  
Output: `9`  
*Explanation:  
- For first three zeros: , , , [0,0], [0,0], [0,0,0] (3+2+1=6)  
- For last two zeros: , , [0,0] (2+1=3)  
Total = 6 + 3 = 9.*

**Example 3:**  
Input: `[2,5,7]`  
Output: `0`  
*Explanation: There are no zeros, so no zero-filled subarrays.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force approach would be to consider every possible subarray and check if all elements are zero. For `n` elements, that’s O(n²) subarrays, and O(n³) in total if we scan each for zeros — clearly inefficient.

Optimization:  
Notice that for a contiguous segment of `k` zeros, it produces k×(k+1)/2 zero-filled subarrays (the sum of the first k natural numbers). For example, three zeros in a row produce 1 (), 2 ([0,0]), and 3 ([0,0,0]) = 6 subarrays.

We can run through the array, count the length of each zero block, and add length × (length+1)/2 to the total.

Even faster and simpler:  
As we scan, keep a running count of the current streak of zeros. Each time we see a zero, we increment the streak and add it to our answer (since each new zero extends all previous streaks by 1). If not zero, reset the streak.

### Corner cases to consider  
- Empty array (should return 0).
- No zeros at all.
- All elements are zero.
- Single-element arrays (zero and non-zero).
- Zeros at the start or end.
- Multiple runs of zeros separated by non-zeros.

### Solution

```python
def zero_filled_subarray(nums):
    # Running count of zeros in current streak
    zero_streak = 0
    # Total number of zero-filled subarrays
    total = 0
    
    for num in nums:
        if num == 0:
            zero_streak += 1
            total += zero_streak  # Add all subarrays ending at this position
        else:
            zero_streak = 0  # Reset streak if non-zero
    
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we iterate over the array once.
- **Space Complexity:** O(1), only constant extra space is used for counters.

### Potential follow-up questions (as if you’re the interviewer)  

- What if each zero in a subarray needs to be replaced with a value (such as 1) — how would you count such modified subarrays?  
  *Hint: Consider dynamic modification within window.*

- How would you adapt the approach if asked for the total number of subarrays containing exactly `k` zeros (not necessarily contiguous)?  
  *Hint: Prefix sums or hashmap to store count of zeros seen so far.*

- How to find all unique zero-filled subarrays (as sets, not by position)?  
  *Hint: Use sets, but clarify what “unique” means in context (set of all-0 sequences with varying lengths).*

### Summary
This problem uses the **running sum / prefix streak** pattern, where we accumulate counts while scanning the array. Recognizing patterns in streaks and their contribution to the count is a common trick in substring/subarray counting problems (e.g., counting subarrays of a target sum, or longest consecutive sequence). The key insight is not to recount, but use incremental build-up.


### Flashcard
For each contiguous segment of k zeros, it contributes k×(k+1)/2 zero-filled subarrays; sum over all zero segments.

### Tags
Array(#array), Math(#math)

### Similar Problems
- Arithmetic Slices(arithmetic-slices) (Medium)
- Number of Smooth Descent Periods of a Stock(number-of-smooth-descent-periods-of-a-stock) (Medium)
- Length of the Longest Alphabetical Continuous Substring(length-of-the-longest-alphabetical-continuous-substring) (Medium)
- Find Consecutive Integers from a Data Stream(find-consecutive-integers-from-a-data-stream) (Medium)