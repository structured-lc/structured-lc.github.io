### Leetcode 423 (Medium): Reconstruct Original Digits from English [Practice](https://leetcode.com/problems/reconstruct-original-digits-from-english)

### Description  
Given a jumbled string formed by concatenating the English words for digits (zero to nine), possibly multiple times and out of order, reconstruct the *original* sequence of digits (0–9), sorted in ascending order.   
- Each character belongs to exactly one digit word.
- Input guarantees that such a valid digit sequence exists — no unrelated or extra letters.  
For example, `"owoztneoer"` can be mapped to the digits represented by the words `"zero"`, `"one"`, and `"two"`, so the output should be `"012"`.

### Examples  

**Example 1:**  
Input: `owoztneoer`  
Output: `012`  
*Explanation: The string can be split as "zero" (z,e,r,o), "one" (o,n,e), and "two" (t,w,o). So output is digits 0, 1, 2 in sorted order.*

**Example 2:**  
Input: `fviefuro`  
Output: `45`  
*Explanation: "five" (f,i,v,e) and "four" (f,o,u,r) can be formed, so the digits are 4 and 5.*

**Example 3:**  
Input: `eighthree`  
Output: `38`  
*Explanation: The string "eight" (e,i,g,h,t) and "three" (t,h,r,e,e) can be formed, reconstructing digits 3 and 8.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force approach would be to generate all possible combinations of the digit words from the letters, subtracting word letter counts, but that’s extremely inefficient.

Instead, I realize that certain letters appear in only one digit word:
- 'z' only in "zero" (0)
- 'w' only in "two" (2)
- 'u' only in "four" (4)
- 'x' only in "six" (6)
- 'g' only in "eight" (8)

I can count how many times each of these unique-marker letters appears in the string. That directly tells me how many zeroes, twos, fours, sixes, and eights there are.

After accounting for these, some digits can be identified by their shared letters, minus the ones already used:
- 'o' for "one" (1), after zero, two, four are accounted for
- 'h' for "three" (3), after eight is removed
- 'f' for "five" (5), after four is done
- 's' for "seven" (7), after six is done
- 'i' for "nine" (9), after five, six, eight are counted

By processing in the correct order, each digit can be uniquely determined.

### Corner cases to consider  
- The input string is empty: should return an empty string.
- The digits repeat (e.g., input is "zerozero"): output should be "00".
- All letters for a single digit (e.g., "eight"): output should be "8".
- Words for all ten digits are present once, scrambled.

### Solution

```python
def originalDigits(s: str) -> str:
    # Count the occurrence of each letter in the input string
    letter_count = [0] * 26
    for c in s:
        letter_count[ord(c) - ord('a')] += 1

    # Prepare an array for each digit's frequency
    digit_count = [0] * 10

    # Unique letter for each digit, in order so dependencies work
    # z - zero(0), w - two(2), u - four(4), x - six(6), g - eight(8)
    digit_count[0] = letter_count[ord('z') - ord('a')]
    digit_count[2] = letter_count[ord('w') - ord('a')]
    digit_count[4] = letter_count[ord('u') - ord('a')]
    digit_count[6] = letter_count[ord('x') - ord('a')]
    digit_count[8] = letter_count[ord('g') - ord('a')]

    # one(o) = total o - zero(o) - two(o) - four(o)
    digit_count[1] = letter_count[ord('o') - ord('a')] - digit_count[0] - digit_count[2] - digit_count[4]

    # three(h) = total h - eight(h)
    digit_count[3] = letter_count[ord('h') - ord('a')] - digit_count[8]

    # five(f) = total f - four(f)
    digit_count[5] = letter_count[ord('f') - ord('a')] - digit_count[4]

    # seven(s) = total s - six(s)
    digit_count[7] = letter_count[ord('s') - ord('a')] - digit_count[6]

    # nine(i) = total i - five(i) - six(i) - eight(i)
    digit_count[9] = (
        letter_count[ord('i') - ord('a')] - digit_count[5] - digit_count[6] - digit_count[8]
    )

    # Build the result string with digits in ascending order
    result = []
    for d in range(10):
        result.extend([str(d)] * digit_count[d])
    return ''.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input string. We process the string once to build letter counts, and then do a constant number of operations and a final traversal up to 10 digits.
- **Space Complexity:** O(1) extra — the space for letter_count (26 letters) and digit_count (10 digits) is constant, independent of input. Input string is not duplicated.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input could also contain invalid or unrelated letters?
  *Hint: Would require validation before counting, or an early return/error handling.*
- How would you adapt this algorithm if the digit names were in another language?
  *Hint: You’d need to determine unique identifying letters for that language's digit names, or use a different mapping.*
- Could you reconstruct the full spelling order, not just the numbers sorted?
  *Hint: Instead of gathering by sorted digits, store or output words as you reconstruct and remove them from the input.*

### Summary
This problem uses **counting and deduction**, exploiting unique features of digit words to efficiently reconstruct the original sequence from a set of scrambled letters. The key insight is to use uniquely identifying letters for some digits, then work through dependencies for the rest. This is a classic counting and deduction approach, similar to other string reconstruction or frequency analysis problems. It’s a great example of how recognizing unique characteristics can optimize a brute-force combinatorial challenge.

### Tags
Hash Table(#hash-table), Math(#math), String(#string)

### Similar Problems
