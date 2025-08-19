### Leetcode 949 (Medium): Largest Time for Given Digits [Practice](https://leetcode.com/problems/largest-time-for-given-digits)

### Description  
Given an array with **exactly four digits**, form the **largest possible 24-hour time** ("HH:MM") using each digit exactly once.  
- The hours (HH) must be in the range 00–23, and the minutes (MM) in 00–59.
- If no valid time can be made, return an empty string.

**Example prompt rephrased for interview:**  
You receive four digits (not characters), and you must arrange them to make the latest possible valid time in 24-hour format. Each digit may be used only once. If there is no way to make a real "HH:MM" time from those digits, return an empty string instead.

### Examples  

**Example 1:**  
Input: `[1, 2, 3, 4]`  
Output: `23:41`  
*Explanation: Try all permutations. The largest valid time is 23:41. "43:21" is invalid because hours cannot be 43.*

**Example 2:**  
Input: `[5, 5, 5, 5]`  
Output: ``  
*Explanation: No valid time can be created because 55 is not a legal hour, nor is 55:55 a valid minute.*

**Example 3:**  
Input: `[0, 0, 0, 0]`  
Output: `00:00`  
*Explanation: All zeros is a valid time: 00 (hours) and 00 (minutes). It’s the minimum possible value.*

### Thought Process (as if you’re the interviewee)  
I'd start by noting there are only four digits and every digit must be used exactly once to create the time. This is a classic **permutation** problem: there are 4! = 24 possible ways to arrange the digits. For each arrangement, the first two digits become the hour, and the last two digits become the minute.

- **Brute-force:**  
  Try each permutation, check if it forms a valid hour (0–23) and minute (0–59). If valid, compute its total number of minutes since 00:00, and keep track of the maximum.
- **Optimization:**  
  Since there are only 24 (= 4!) permutations, brute-force is acceptable. We want the **largest** valid time, so we track the max found and at the end, format it as "HH:MM".
- **Trade-offs:**  
  No advanced data structures are needed; permutation generation and some integer arithmetic suffice. The problem size remains small due to the 4-digit constraint.

### Corner cases to consider  
- All same digits (e.g., `[5,5,5,5]`): No legal hour or minute can be created.
- Zeros or leading zeros (e.g., `[0,0,1,2]`): Output may require padding zeros.
- Impossible combinations (e.g., only digits ≥3 in the first position).
- Already largest format (e.g., `[2,3,5,9]`).
- Minimum time: `[0,0,0,0]`.
- Multiple ways to arrange same value (duplicates): Doesn't matter, only need the latest.

### Solution

```python
def largestTimeFromDigits(A):
    # Helper, generates all possible orderings (permutations) of A.
    def permute(nums):
        if len(nums) == 1:
            return [nums]
        res = []
        for i in range(len(nums)):
            # For each index, fix that digit, permute the rest
            rest = nums[:i] + nums[i+1:]
            for p in permute(rest):
                res.append([nums[i]] + p)
        return res

    max_minutes = -1  # Store max total minutes found
    best = []
    # Try all 24 permutations
    for p in permute(A):
        hour = p[0] * 10 + p[1]
        minute = p[2] * 10 + p[3]
        # Check valid 24-hour time
        if 0 <= hour <= 23 and 0 <= minute <= 59:
            total = hour * 60 + minute
            if total > max_minutes:
                max_minutes = total
                best = [hour, minute]
    if max_minutes == -1:
        return ""
    # Format with leading zeros
    return f"{best[0]:02d}:{best[1]:02d}"
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) (effectively constant — at most 24 permutations, each checked in constant time).
- **Space Complexity:** O(1) additional space beyond the input (just a few ints; permutation stack depth is at most 4).

### Potential follow-up questions (as if you’re the interviewer)  

- If the input has more than 4 digits, how would you generate the largest possible time?
  *Hint: Consider either picking the "largest" 4-digit selection or generalize permutation logic with constraints.*

- Can you avoid generating all permutations?
  *Hint: Check high digits first; prune useless branches as early as possible.*

- What if the format is 12-hour with AM/PM?
  *Hint: You'd need to restrict hours to 0–11 and handle AM/PM suffix.*

### Summary
The approach is a straight application of the **permutation + filter** pattern, well-suited to small input sets. Very similar brute-force tricks are useful for "find arrangement/combination with min/max property" questions, such as password or code-number problems where exhaustive checking is feasible.

### Tags
Array(#array), String(#string), Backtracking(#backtracking), Enumeration(#enumeration)

### Similar Problems
- Number of Valid Clock Times(number-of-valid-clock-times) (Easy)