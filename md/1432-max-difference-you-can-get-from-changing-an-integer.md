### Leetcode 1432 (Medium): Max Difference You Can Get From Changing an Integer [Practice](https://leetcode.com/problems/max-difference-you-can-get-from-changing-an-integer)

### Description  
Given an integer `num`, choose two integers `a` and `b` (0 ≤ a, b ≤ 9, a ≠ b) and perform two operations:
- Replace *all* occurrences of `a` with `b` in `num` to get two new numbers, max and min (replace with largest and smallest feasible digits each time).
Return the difference between the maximum and minimum numbers you can get by exactly one such operation to each (max and min).

### Examples  
**Example 1:**  
Input: `num = 555`
Output: `888`
*Explanation: max = 999 (replace all 5→9); min = 111 (replace all 5→1), so 999 - 111 = 888.*

**Example 2:**  
Input: `num = 9`
Output: `8`
*Explanation: max = 9 (replace 9→9, stays same); min = 1 (replace 9→1), so 9 - 1 = 8.*

**Example 3:**  
Input: `num = 123456`
Output: `820000`
*Explanation: max = 923456 (change first 1 → 9); min = 103456 (change 2 → 0), so 923456 - 103456 = 820000.*

### Thought Process (as if you’re the interviewee)  
We are to maximize and minimize the number by one digit replacement (all such digits). For max: replace the most "limiting" digit with 9. For min: replace a high left digit (not already 1 or 0) with 1 or 0—making sure not to make a leading zero.

So, for max: find the first digit ≠ 9, replace all of them with 9.
For min: replace the first digit ≠ 1 with 1 (if first digit > 1), otherwise find first digit > 0 (and not at first index) and replace all with 0.
Edge case: don't create leading zero.

### Corner cases to consider  
- num has only one digit.
- All digits the same (e.g., 999, 111).
- num contains 0s (cannot replace leading digit with 0).
- Replacing a digit with itself doesn't change the number.

### Solution

```python
def maxDiff(num):
    S = str(num)
    # Maximize by replacing first non-9 with 9 everywhere
    for ch in S:
        if ch != '9':
            max_num = int(S.replace(ch, '9'))
            break
    else:
        max_num = num
    # Minimize by replacing
    if S[0] != '1':
        min_num = int(S.replace(S[0], '1'))
    else:
        for ch in S[1:]:
            if ch not in ('0', S[0]):
                min_num = int(S.replace(ch, '0'))
                break
        else:
            min_num = num
    return max_num - min_num
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(d), where d is the number of digits in num (constant time for typical integer sizes).
- **Space Complexity:** O(d), to store string versions of num.

### Potential follow-up questions (as if you’re the interviewer)  
- What if negative numbers are allowed?  
  *Hint: You'd have to adjust logic for negative values (leading '-').*

- Could you optimize further if num is very large (hundreds of digits)?  
  *Hint: Process as string, but ensure replacements avoid introducing leading zeros.*

- Can you generalize for base-k numbers?  
  *Hint: Replace with max-imum digit possible for that base.*

### Summary
This problem uses a "greedy digit replacement" pattern and careful string handling—searching for the best candidate for maximizing/minimizing. This approach is recurring in number / digit transformation problems.