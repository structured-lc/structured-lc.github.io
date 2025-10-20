### Leetcode 1702 (Medium): Maximum Binary String After Change [Practice](https://leetcode.com/problems/maximum-binary-string-after-change)

### Description  
Given a binary string (contains only '0' and '1'), you can perform two operations any number of times:  
1. Replace any occurrence of "00" with "10".
2. Replace any occurrence of "10" with "01".

Return the lexicographically largest (that is, highest-value) binary string you can achieve after applying these operations as many times as you want. The "value" of a binary string is its unsigned decimal interpretation.

### Examples  

**Example 1:**  
Input: `000110`  
Output: `111011`  
*Explanation:  
Start with 000110  
Replace "00" at the front: 10 0110  
Continue: 1 00110  
Take "00": 1 10110  
Now "10": 11 0110  
Keep going: 110 110  
Repeat: 111 010  
Move "10": 111 001  
Move "00": 111 101  
Now we're left with 111011 (cannot increase further).*

**Example 2:**  
Input: `01`  
Output: `01`  
*Explanation:  
No "00" or "10" to replace. Already maximal.*

**Example 3:**  
Input: `100110`  
Output: `111011`  
*Explanation:  
After a sequence of allowed swaps, you turn both "00" pairs into "10" and shift zeros as much as possible until only one '0' remains and it is in the right place: 111011.*

### Thought Process (as if you’re the interviewee)  
Let's first understand the effect of the two allowed operations:

- **Operation 1 ("00" → "10")** lets you remove a zero by turning two zeros into a one followed by a zero. It moves zeros to the right.
- **Operation 2 ("10" → "01")** lets you "slide" zeros further right.

Brute-force: Try all possibilities recursively—this is exponential, definitely NOT acceptable for long strings.

**Observation:**  
You can keep transforming any pair of zeros "00" by moving them right, but the sum total of zeros never increases—eventually, only one zero can remain and all the rest become ones.

**Key insight:**  
- The final answer always has all ones except a *single* '0'; this '0' can be strategically positioned [2][4].
- The leftmost zero after the first one is the only one that stays a zero; all other zeros can be 'pushed right' and converted.
- So: Count all '0's, find the first '0' in the string, and fill the rest accordingly.

**How do we find where the unique '0' ends up?**  
- Let idx = position of the first '0'.
- Let total_zero = number of '0's.
- The answer is:  
  - All ones up to idx,
  - then (total_zero - 1) ones,
  - then a single '0',
  - then the rest ones.

### Corner cases to consider  
- All ones: `"1111"` ⇒ already max, no zero to process.
- All zeros: `"0000"` ⇒ becomes `'1110'`
- "01", "10": minimal cases where no operations apply.
- Only one '0' present: output should be all ones except that position.
- Multiple clusters of '0's.

### Solution

```python
def maximumBinaryString(binary: str) -> str:
    # Convert to list for mutability, count zeros and find first zero position
    total_zero = binary.count('0')
    
    # If there's at most one zero, already maximal
    if total_zero <= 1:
        return binary.replace('0', '1')
    
    first_zero = binary.find('0')
    
    # All ones, except:
    # - leave a single zero at [first_zero + total_zero - 1]
    n = len(binary)
    ans = ['1'] * n
    place_zero = first_zero + total_zero - 1
    ans[place_zero] = '0'
    return ''.join(ans)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We scan once to count zeros (O(n)), and another time to construct the output (O(n)).
- **Space Complexity:** O(n)  
  We use a list of length n to store the answer.

### Potential follow-up questions (as if you’re the interviewer)  

- What if only one operation was allowed?
  *Hint: Would you still end up with only a single zero?*
- How would you modify your algorithm for larger strings (n up to 10⁶)?
  *Hint: Can be done in a single pass with O(1) extra space aside from the output.*
- Suppose you needed to return the minimal binary string after these operations instead—how would that change?
  *Hint: Try reversing the greedy idea, and see if zeros should be moved left instead.*

### Summary
This is a classic greedy-pattern string transformation: convert all but one zero to ones, and position the remaining zero as far right (but not at the end) as allowed.  
The approach relies on understanding how the operations interact and using counting and index tracking—no dynamic programming, backtracking, or explicit simulation is needed.  
This greedy string manipulation approach can be seen in other problems involving transform-and-maximize/minimize goals on strings or arrays.


### Flashcard
Transform leading zeros into ones using "00"→"10", then use "10"→"01" to slide remaining zeros right—maximize leading ones for lex largest string.

### Tags
String(#string), Greedy(#greedy)

### Similar Problems
- Longest Binary Subsequence Less Than or Equal to K(longest-binary-subsequence-less-than-or-equal-to-k) (Medium)