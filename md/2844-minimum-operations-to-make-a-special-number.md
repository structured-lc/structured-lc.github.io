### Leetcode 2844 (Medium): Minimum Operations to Make a Special Number [Practice](https://leetcode.com/problems/minimum-operations-to-make-a-special-number)

### Description  
Given a string `num` representing a non-negative integer, you can delete any digit in one operation (anywhere, multiple times). If you delete all digits, the number becomes '0'.  
Your task: Find the **minimum operations needed to make the number divisible by 25** (a "special" number).  
Divisible by 25 ⇒ the number ends with "00", "25", "50", or "75".

### Examples  

**Example 1:**  
Input: `num = "2245047"`  
Output: `2`  
*Explanation: Delete digits at positions 5 and 6 ("4" and "7") ⇒ "22450", which ends with "50" and is divisible by 25. Can't do better.*

**Example 2:**  
Input: `num = "2908305"`  
Output: `3`  
*Explanation: Delete digits at positions 3, 4, and 6 ("8", "3", and "5") ⇒ "2900", which ends with "00" and is divisible by 25. Minimum required.*

**Example 3:**  
Input: `num = "10"`  
Output: `1`  
*Explanation: Delete digit at position 0 ("1") ⇒ "0", which is divisible by 25.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:** Try all combinations of deleting digits to form all possible numbers; for each, check if it ends with "00", "25", "50", or "75". Track minimal deletions.
- This is exponential in time and impractical given up to 100 digits.
- **Key insight:** To get a number divisible by 25, **it must end with one of four special pairs ("00", "25", "50", "75")**.  
  So, for each of those endings, search from right to left for those two digits in the needed order. For each try, count how many deletions are necessary.
- For "00", look for two '0's: scan from right to left, find the last '0', then look left for the next '0'.
- For "25", look for '5' at end, then '2' before it.
- For "50", look for '0' at end, then '5' before it.
- For "75", look for '5' at end, then '7' before it.
- Track all possible such pairs, keep the minimal number of deletions (i.e., digits to skip between the matched ones).
- Also, if can't form any pair, minimal answer is to remove all but one digit to get single '0'.
- **Trade-off:** This greedy reverse scan is O(n) time for each ending, or O(4n), which is fast.

### Corner cases to consider  
- Input is already "0", or "00", etc.
- Only one digit.
- No way to form any of the pairs ("00", "25", "50", "75").
- Leading digits are zeros after removals.
- All digits same but not making a valid pair.
- Multiple options — need true minimal deletions, not just first pair found.

### Solution

```python
def minimumOperations(num: str) -> int:
    n = len(num)
    candidates = ["00", "25", "50", "75"]
    min_ops = n  # maximum: remove all digits

    for ending in candidates:
        j = n - 1  # position to match ending[1] (rightmost)
        # Find rightmost position with ending[1]
        while j >= 0:
            if num[j] == ending[1]:
                # Look left for ending[0]
                i = j - 1
                while i >= 0:
                    if num[i] == ending[0]:
                        # Digits to remove: (n-1 - j) after j + (j-1 - i) between i and j
                        ops = (n - 1 - j) + (j - 1 - i)
                        min_ops = min(min_ops, ops)
                        break  # No need to look for more i, since we want earliest i from the left
                    i -= 1
            j -= 1

    # Special case: can we make "0" by deleting all but one '0'?
    zeros = num.count('0')
    if zeros:
        min_ops = min(min_ops, n - 1)

    return min_ops
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = num.length. For each of 4 endings, worst-case scan entire string twice (right to left, then inner left scan for first match), but 4×n is just O(n).
- **Space Complexity:** O(1). Only uses counters and a few pointers, no extra storage proportional to input.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you extend the solution for any divisor (not just 25)?
  *Hint: What patterns make numbers divisible by 100, 4, 8, etc.?*

- What if you can only remove digits from the end, not from anywhere?
  *Hint: Greedy scan from the end, only consider the last digits.*

- If you can change a digit (replace) instead of just removing?
  *Hint: Dynamic programming to try both removing and replacing digits.*

### Summary
This problem uses the **greedy string scanning pattern**, exploiting divisibility rules for 25 (ends with 00, 25, 50, 75) to minimize deletions. It's a classic interview test of transforming string-digit numbers using targeted searches, with application to many "make number divisible by X" scenarios. The O(n) time and constant space approach is both efficient and elegant for this class of problems.

### Tags
Math(#math), String(#string), Greedy(#greedy), Enumeration(#enumeration)

### Similar Problems
- Remove K Digits(remove-k-digits) (Medium)
- Remove Digit From Number to Maximize Result(remove-digit-from-number-to-maximize-result) (Easy)