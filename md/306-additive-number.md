### Leetcode 306 (Medium): Additive Number [Practice](https://leetcode.com/problems/additive-number)

### Description  
Given a string of digits, determine if it can be split into a sequence of numbers such that:
- The sequence contains at least three numbers.
- Every number after the first two is the sum of the two preceding numbers.
- Numbers cannot have leading zeros, except for when the number itself is 0.

For example, the string "112358" can become [1, 1, 2, 3, 5, 8], each new number being the sum of the prior two (1+1=2, 1+2=3, etc). The challenge is to check for such a sequence by splitting the string in all possible ways that satisfy the above rules.

### Examples  

**Example 1:**  
Input: `112358`  
Output: `True`  
*Explanation: Can split as 1, 1, 2, 3, 5, 8.  
1+1=2, 1+2=3, 2+3=5, 3+5=8. Sequence is valid.*

**Example 2:**  
Input: `199100199`  
Output: `True`  
*Explanation: Can split as 1, 99, 100, 199.  
1+99=100, 99+100=199. Sequence is valid.*

**Example 3:**  
Input: `1023`  
Output: `False`  
*Explanation: All possible splits either lead to numbers with leading zeros or break the property prev1+prev2=next.*

**Example 4:**  
Input: `123`  
Output: `True`  
*Explanation: 1, 2, 3.  
1+2=3. Sequence is valid.*

### Thought Process (as if you’re the interviewee)  
To solve the problem, I'd try all possible ways to split the string's prefix into the first two numbers (since the rest of the sequence is determined by those) and check if the remaining string can be partitioned accordingly.

- **Brute-force idea:**  
  Try all pairs of potential first and second numbers (by every possible split of the string's prefix), then build the rest of the sequence by adding those two. At every step, compare the next expected number with the string. If they match, continue; if not, backtrack.

- **How to avoid pitfalls?**  
  - Avoid numbers with leading zeros (except "0").
  - It’s sufficient to try all partitions for the first two numbers where their total length < len(num).

- **Why not use recursion/backtracking?**  
  Since each guess for the first two numbers fixes the whole sequence, iteration with early pruning suffices.  
  Also, explicit backtracking usually isn't needed since we only have to proceed one path per guess.

- **Trade-offs:**  
  The brute-force search is exponential, but since num ≤ 35, this approach is tractable.

### Corner cases to consider  
- Input length < 3: automatically False.
- Leading zeros in any number (except single '0') invalidate the sequence.  
  For example:
  - "011235" (Not valid; leading zero in nonzero number)
  - "101" (Valid: 1, 0, 1)
- Large numbers (ensure code doesn’t overflow; strings handle this).
- Sequences where the sum overflows the string boundary (wrong split).
- Not enough characters left in the string to continue the sequence.

### Solution

```python
def isAdditiveNumber(num: str) -> bool:
    n = len(num)
    # Try every possible split for the first and second number
    for i in range(1, n):
        for j in range(i+1, n):
            # Get first num[0:i] and second num[i:j]
            num1, num2 = num[:i], num[i:j]
            # Skip if num starts with 0 and has more than 1 digit
            if (len(num1) > 1 and num1[0] == '0') or (len(num2) > 1 and num2[0] == '0'):
                continue
            x, y = int(num1), int(num2)
            k = j
            while k < n:
                z = x + y
                z_str = str(z)
                if not num.startswith(z_str, k):
                    break
                k += len(z_str)
                x, y = y, z
            if k == n:
                return True
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³)  
  - Two nested loops for first two numbers: O(n²).  
  - For each pair, while loop advances across the string: at most O(n) steps, so O(n³) in total.
- **Space Complexity:** O(1) extra space  
  - Only a few integer variables and slices; does not use additional data structures proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return the actual sequence, not just True/False?  
  *Hint: Keep track of the sequence as you build it. Return when sequence is successfully formed.*

- How would you handle sequences that allow negative numbers?  
  *Hint: You’d need different split logic, as '-' could appear and parsing gets trickier.*

- Can you handle inputs with length > 10⁶ efficiently?  
  *Hint: Current brute-force would not scale. Consider dynamic programming or pruning.*

### Summary
This is a classic **string backtracking/search** problem, where you try all possible splits for the first two numbers and validate the additive property greedily for the remainder. The **key insight** is that once you choose the first two numbers, the entire sequence is determined. Variants of this approach (brute force partitioning, checking for special rules like no leading zeros) apply in many digit-splitting or sequence construction problems.

### Tags
String(#string), Backtracking(#backtracking)

### Similar Problems
- Split Array into Fibonacci Sequence(split-array-into-fibonacci-sequence) (Medium)