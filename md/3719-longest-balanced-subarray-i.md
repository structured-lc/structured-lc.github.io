### Leetcode 3719 (Medium): Longest Balanced Subarray I [Practice](https://leetcode.com/problems/longest-balanced-subarray-i)

### Description  
Given an integer array `nums`, find the length of the longest contiguous subarray in which the number of distinct even numbers is equal to the number of distinct odd numbers.  
A subarray is contiguous, and "distinct" means each unique even or odd value counts only once per subarray.

### Examples  

**Example 1:**  
Input: `nums = [3,2,2,5,4]`  
Output: `5`  
*Explanation: The subarray `[3,2,2,5,4]` has 2 distinct even numbers (2,4) and 2 distinct odd numbers (3,5). Length is 5.*

**Example 2:**  
Input: `nums = [2,5,4,3]`  
Output: `4`  
*Explanation: `[2,5,4,3]` includes 2 distinct even (2,4), 2 distinct odd (5,3). Length is 4.*

**Example 3:**  
Input: `nums = [1,1,1,1]`  
Output: `0`  
*Explanation: All numbers are the same and odd, so there are no subarrays with equal number of distinct even and odd numbers. The answer is 0.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all possible subarrays, count distinct even and distinct odd numbers for each, and maintain the maximum length where they are equal.  
  This is \( O(n^3) \): looping over all subarrays and, for each, counting distinct evens/odds with a set.
- **Optimized:**  
  We need an efficient way to compute and compare the counts of *distinct evens* and *distinct odds* for dynamic ranges.  
  The balanced subarray definition is similar to finding subarrays where the "difference" between the counts is zero.

  To optimize, we can use:
  - Sliding window (not straightforward since distinct values are required)
  - Hash map approach:  
    - Maintain two sets: one for distinct evens, one for distinct odds, but updating/removing as the window moves is tricky.
    - Instead, for each prefix, record the difference in the count of unique evens and odds.  
    - Store the **first index where a particular (diff, even_mask, odd_mask) appears** in a dictionary.
    - For each index, if the same state (diff, even_mask, odd_mask) was seen before, then the subarray between these two points is balanced.

  - But as there can be large values, using masks is not efficient. For this problem, we stick with the brute-force with pruning, given moderate constraints.

### Corner cases to consider  
- Empty array (`nums = []`)
- No evens or no odds at all
- All numbers are same
- Array with alternating even/odd but only one unique even/one odd
- Subarray at the start or end is the answer
- Only two numbers, one even, one odd

### Solution

```python
def longestBalancedSubarray(nums):
    n = len(nums)
    max_len = 0

    # Try every possible subarray
    for i in range(n):
        even_set = set()
        odd_set = set()
        for j in range(i, n):
            if nums[j] % 2 == 0:
                even_set.add(nums[j])
            else:
                odd_set.add(nums[j])
            # Check if balanced
            if len(even_set) == len(odd_set) and len(even_set) > 0:
                max_len = max(max_len, j - i + 1)
    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n²) — Outer loop chooses the start, inner loop expands the end.  
  Each inner loop step adds/removes at most one element from sets.  

- **Space Complexity:**  
  O(k) — Where k is the number of unique elements between i and j, since we keep two sets (evens and odds) per subarray. In practice: O(n) per subarray, but global extra space is O(1).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve it in O(n) time?
  *Hint: Think about representing the presence of elements as bit masks or arrays, and tracking state transitions by prefix/HashMap techniques.*

- What if numbers can be very large? Would your solution still work?
  *Hint: Hashing actual values or using a different kind of mapping may be necessary.*

- How would you extend this to return the actual subarray, not just the length?
  *Hint: Track the start and end indices whenever you find a new maximum.*

### Summary
This problem is a variant of the sliding window and prefix-hashing common in subarray and substring balancing problems.  
The brute-force stepwise scan with sets fits small/medium input, and teaches how to scan for subarrays with custom balance criteria.  
For harder variations or larger constraints, patterns from "prefix sum with state hashing" or "two-pointer with value tracking" would be applied, which are useful in many substring/subarray balancing/interleaving problems.

### Tags


### Similar Problems
