### Leetcode 414 (Easy): Third Maximum Number [Practice](https://leetcode.com/problems/third-maximum-number)

### Description  
Given an integer array, return the **third distinct maximum** number in this array. If there are fewer than three distinct numbers, return the maximum number.  
- **Distinct** means duplicates count as one value.
- For example:  
  - For `[3,2,1]`, the third max is 1 (since 3, 2, 1 are all distinct).
  - For `[1,2]`, there are only two distinct numbers, so return the maximum (2).
  - For `[2,2,3,1]`, the third max is 1, ignoring the duplicate 2.

### Examples  

**Example 1:**  
Input: `nums = [3,2,1]`  
Output: `1`  
*Explanation: Distinct values are 3, 2, 1 → third max is 1.*

**Example 2:**  
Input: `nums = [1,2]`  
Output: `2`  
*Explanation: Only two distinct numbers (2, 1). Fewer than 3, so return max: 2.*

**Example 3:**  
Input: `nums = [2,2,3,1]`  
Output: `1`  
*Explanation: Distinct values 3, 2, 1. Third max is 1.*

### Thought Process (as if you’re the interviewee)  
Start with the brute-force idea:
- Extract **unique** numbers (use set).
- Sort and pick the third largest if possible.

That would work, but requires O(n log n) time due to sort.

The optimized O(n) solution:
- We need to track the **top three distinct maximums**.
- Use three variables (`first`, `second`, `third`) initialized to −∞.
- Iterate through numbers:
  - If new and > current max, push down everything to the right.
  - If number is between current maxes, push down as appropriate.
  - Skip duplicates (by checking all three).
- At the end, if `third` has been assigned (not still −∞), return it; else return the max.

This single-pass approach is O(n), constant space (not using containers beyond a few variables), and easy enough to reason about.

### Corner cases to consider  
- Array of length < 3 (e.g. `[1]` or `[1,2]`).
- All numbers are the same (e.g. `[2,2,2]`).
- Negative numbers and mix of negatives and positives.
- Large input and integer overflow issues.
- Duplicates spanning more than 3 of the same number (e.g. `[2,2,3,3,1,1]`).
- Very large and very small (boundary) values.

### Solution

```python
def thirdMax(nums):
    # Track the top 3 distinct maximums
    first = second = third = float('-inf')

    for num in nums:
        # Skip if we've already seen this number as one of our maxes
        if num == first or num == second or num == third:
            continue
        if num > first:
            # num is the new max; shift first/second down
            third = second
            second = first
            first = num
        elif num > second:
            # num is the new second max
            third = second
            second = num
        elif num > third:
            # num is the new third max
            third = num

    # If third has changed, return it; otherwise return the largest seen
    return third if third > float('-inf') else first
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Each number is checked in constant time for its position among top 3. No sorting, no set.
- **Space Complexity:** O(1).  
  Only a few variables are used, regardless of the size of input. Even skipping duplicates is done via scalar comparisons (no extra data structures).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you do this with a built-in set or heap?  
  *Hint: Consider Python’s set and sort if requirements allow more space for cleaner code.*

- What if you needed the kᵗʰ maximum instead of third?  
  *Hint: Generalize the approach—maybe use a min-heap of size k to keep track efficiently.*

- How would you handle updates (e.g. streaming input or repeated queries)?  
  *Hint: A data structure supporting insertion and k-smallest/largest, such as a balanced BST or heap, might help.*

### Summary
This problem uses the **tracking minimums/maximums pattern** with constant variables, which is common for problems asking for the kth largest/smallest value when k is small.  
Typical applications include leaderboards, real-time statistics, and similar logic for games or ranking lists.  
Recognizing when duplicates should be ignored (focus on "distinct") is key. The approach is a variation of the classic “running maximum”/“running minimum” technique.