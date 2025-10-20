### Leetcode 2411 (Medium): Smallest Subarrays With Maximum Bitwise OR [Practice](https://leetcode.com/problems/smallest-subarrays-with-maximum-bitwise-or)

### Description  
Given a 0-indexed array of non-negative integers nums, for each index i, find the length of the smallest non-empty subarray starting at i whose bitwise OR is as large as possible for any starting-at-i subarray. Return an array ans where ans[i] = length of this smallest subarray.

In other words, for every index i, determine the length of the smallest subarray nums[i…j] such that the bitwise OR of it equals the maximum possible bitwise OR considering any subarray starting at i.

### Examples  

**Example 1:**  
Input: `nums = [1,0,2,1,3]`,  
Output: `[3,3,2,2,1]`  
Explanation:  
- Maximum possible OR starting at any index is 3.  
- i=0: Smallest prefix with OR=3 is `[1,0,2]` (length 3).  
- i=1: `[0,2,1]`, length 3.  
- i=2: `[2,1]`, length 2.  
- i=3: `[1,3]`, length 2.  
- i=4: `[3]`, length 1.

**Example 2:**  
Input: `nums = [1,2]`,  
Output: `[2,1]`  
Explanation:  
- i=0: `[1,2]`, OR=3, length 2  
- i=1: `[2]`, OR=2, length 1

**Example 3:**  
Input: `nums = [0,0,0]`,  
Output: `[1,1,1]`  
Explanation:  
- Every prefix has OR=0, so answer is 1 for all.

### Thought Process (as if you’re the interviewee)  
Brute-force:  
- For each index i, try every subarray nums[i:j], calculate its OR, and track the smallest length where OR equals the max possible starting at i.
- Too slow: O(n²).

Optimized:  
- We notice the bitwise OR is monotonic: as we include more elements to the right, the OR only increases or stays the same.
- Instead of recalculating max OR for every starting i, we can process from right to left, remembering for every bit the latest position where it will change (turn on).
- For each i, "how far to the right do I need to go so all bits present in the maximum OR from i onwards are set?"  
- Use a 32-size array last[] where last[b] is the rightmost index for which bit b is set. At each i, OR together all nums[i…n−1], for each bit b which is set in OR, the subarray must extend to at least the last occurrence of b.
- So, for every i, minimal length needed is max(last_set_positions) − i + 1.

Why this works:  
- By tracking rightmost positions where each bit is present, we make sure the OR will reach the maximum possible.

### Corner cases to consider  
- All elements are 0  
- Array with one element  
- All elements are equal and nonzero  
- Bits that never occur  
- Max OR is in the first element  
- Array with high/low values mixed

### Solution

```python
def smallestSubarrays(nums):
    n = len(nums)
    ans = [1] * n           # initialize with 1 for each index
    last_set = [0] * 32     # last_set[b] = last index where bit b is set
    n_minus_1 = n - 1
    
    # Start from the end of the array and update the position of last set bit for each bit.
    for i in range(n_minus_1, -1, -1):
        for b in range(32):
            if (nums[i] >> b) & 1:
                last_set[b] = i
        # Find the furthest right position needed to get max OR
        furthest = i
        for b in range(32):
            if last_set[b]:
                furthest = max(furthest, last_set[b])
        ans[i] = furthest - i + 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 32) = O(n)  
  For each index, check at most 32 bits, so overall linear with n.
- **Space Complexity:** O(32) + O(n)  
  O(32) for bit tracking, O(n) for the result array.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize for space if memory is limited?  
  *Hint: Can you avoid using the last_set array, or reduce it further for smaller integer ranges?*

- What if we want the length of the largest (not smallest) subarray with the property?  
  *Hint: The answer may always be n−i; any subarray would work.*

- How would your solution change for AND instead of OR?  
  *Hint: The AND operator doesn't naturally grow as you extend the window; needs a different approach, possibly a segment tree.*

### Summary
The solution uses bit manipulation and greedy right-to-left iteration. By tracking the latest position of each bit, we efficiently compute how far to extend the window to capture the maximal bitwise OR. This is a classic application of reverse array scanning and "bit contribution tracking." The sliding window + bitmask idea can also be seen in problems involving subarrays with bitwise constraints.


### Flashcard
Process from right to left, tracking the smallest subarray length where the bitwise OR equals the maximum possible.

### Tags
Array(#array), Binary Search(#binary-search), Bit Manipulation(#bit-manipulation), Sliding Window(#sliding-window)

### Similar Problems
- Merge k Sorted Lists(merge-k-sorted-lists) (Hard)
- Bitwise ORs of Subarrays(bitwise-ors-of-subarrays) (Medium)
- Longest Subarray With Maximum Bitwise AND(longest-subarray-with-maximum-bitwise-and) (Medium)