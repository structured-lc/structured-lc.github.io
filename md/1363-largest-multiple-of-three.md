### Leetcode 1363 (Hard): Largest Multiple of Three [Practice](https://leetcode.com/problems/largest-multiple-of-three)

### Description  
Given an array of digits, build the largest number possible (using all or some digits, each at most once) that is a multiple of 3. Return the result as a string. If not possible, return "".

### Examples  

**Example 1:**  
Input: `digits = [8, 1, 9]`  
Output: `"981"`  
*Explanation: 9+8+1=18 (divisible by 3), all digits used, arranged largest to smallest.*

**Example 2:**  
Input: `digits = [8, 6, 7, 1, 0]`  
Output: `"8760"`  
*Explanation: Remove 1 (sum=8+6+7+0=21, divisible by 3). Arrange largest to smallest.*

**Example 3:**  
Input: `digits = [1]`  
Output: `""`  
*Explanation: 1 is not a multiple of 3, can't remove digits to reach 0.*

### Thought Process (as if you’re the interviewee)  
A number is a multiple of 3 if the sum of its digits is divisible by 3. To maximize the number, sort all digits in descending order. If the digit sum is already divisible by 3, just join the sorted digits. If not, remove the minimal number of digits to make the sum divisible by 3 (remove 1 digit with remainder equal to sum%3, or if unable, two digits with remainder 3-sum%3). Always remove the smallest digits possible. Special cases: if all digits removed, return ""; if result is only zeros, return "0".

### Corner cases to consider  
- All digits are 0 (output must be "0", not leading zeroes)
- No possibility (removing digits still leaves no valid number)
- Multiple digits need to be removed (careful picking the smallest)
- Only one digit not a multiple of 3

### Solution
```python
def largestMultipleOfThree(digits):
    count = [[], [], []]  # 0: mod 0, 1: mod 1, 2: mod 2
    for d in digits:
        count[d % 3].append(d)
    total = sum(digits)
    rem = total % 3
    # Sort for easy removal and easy output
    for arr in count:
        arr.sort()
    if rem:
        # Try removing one from rem bucket
        if count[rem]:
            count[rem].pop(0)
        # Otherwise, remove two from (3-rem) bucket
        elif len(count[3 - rem]) >= 2:
            count[3 - rem].pop(0)
            count[3 - rem].pop(0)
        else:
            return ""
    # Reconstruct result
    ans = count[0] + count[1] + count[2]
    if not ans:
        return ""
    ans.sort(reverse=True)
    if ans[0] == 0:
        return "0"
    return "".join(str(x) for x in ans)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n log n), mostly from sorting the digits for final arrangement; all other steps are O(n).
- **Space Complexity:** O(n), for bucketing digits and result.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case where you're only allowed to use all digits?  
  *Hint: Return result only if sum is divisible by 3.*

- What if you want the smallest multiple of 3?  
  *Hint: Sort ascending instead of descending at output.*

- How can you extend to largest multiple of k (for other integer k)?  
  *Hint: Trickier; must consider mod k remainders and greedy removals.*

### Summary
The solution partitions digits by mod 3, removes the minimum set to make the sum a multiple of 3, then outputs the largest number using the remaining sorted digits. Common greedy/digit manipulation pattern, useful in divisibility and maximum arrangement problems.