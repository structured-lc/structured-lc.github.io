### Leetcode 1880 (Easy): Check if Word Equals Summation of Two Words [Practice](https://leetcode.com/problems/check-if-word-equals-summation-of-two-words)

### Description  
Given three lowercase strings (`firstWord`, `secondWord`, `targetWord`), where each letter from 'a' to 'j' maps to a digit 0-9 (i.e., 'a' → 0, 'b' → 1, …, 'j' → 9), treat each word as a number by concatenating the digits. Check if the sum of the numeric values of `firstWord` and `secondWord` equals the numeric value of `targetWord`.

### Examples  

**Example 1:**  
Input: `firstWord="acb", secondWord="cba", targetWord="cdb"`  
Output: `true`  
*Explanation: "acb" → "021" → 21, "cba" → "210" → 210, sum is 21 + 210 = 231. "cdb" → "231" → 231. So, output is true.*

**Example 2:**  
Input: `firstWord="aaa", secondWord="a", targetWord="aab"`  
Output: `false`  
*Explanation: "aaa" → "000" → 0, "a" → "0" → 0, sum is 0. "aab" → "001" → 1. Output is false.*

**Example 3:**  
Input: `firstWord="aaa", secondWord="a", targetWord="aaaa"`  
Output: `true`  
*Explanation: "aaa" → "000" → 0, "a" → "0" → 0, sum is 0. "aaaa" → "0000" → 0. Output is true.*

### Thought Process (as if you’re the interviewee)  
The core idea is to convert each word to its numeric value by mapping each letter (from left-to-right) to its digit, then assembling those digits to an integer.

1. **Brute force approach**:  
   - For each character in a word, map it to its corresponding digit by subtracting the ASCII value of 'a'.
   - Build a string of digits, then convert that string to an integer.
   - Check if: firstWord_num + secondWord_num == targetWord_num.

2. **Optimized approach**:  
   - Rather than constructing a string, create the number directly as you iterate (e.g., result = result × 10 + value).
   - This is efficient (single sweep per word), and has O(n) time overall, where n is the length of the longest word.

Trade-offs are minimal; the brute and optimized versions are similar for short constraints, but the latter uses less memory.

### Corner cases to consider  
- One or more strings are single letter.
- All letters are 'a' (map to 0).
- The resulting numbers have leading zeroes.
- Output is false because numeric values do not add.
- Maximum string length allowed by constraints.
- Input words that would cause integer overflow in other languages (Python handles big integers).

### Solution

```python
def isSumEqual(firstWord, secondWord, targetWord):
    # Helper to convert a word to its numeric value
    def word_to_num(word):
        num = 0
        for c in word:
            # Map 'a'..'j' to 0..9, building integer digit by digit
            num = num * 10 + (ord(c) - ord('a'))
        return num

    # Compute numeric values for all 3 words
    first_num = word_to_num(firstWord)
    second_num = word_to_num(secondWord)
    target_num = word_to_num(targetWord)

    # Check if their summation matches the target
    return (first_num + second_num) == target_num
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(L), where L is the maximum length among the three input words, since we process each character once.
- **Space Complexity:** O(1), ignoring input; only a few integer variables and simple accumulators are needed, with no extra storage dependent on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the alphabet mapping was to a different base (e.g, base-16)?
  *Hint: Generalize word-to-num to handle different mapping or bases.*

- What if some letters could map to two or more digits (e.g., 'a' → '10')?
  *Hint: How would you parse/assemble the number? Consider ambiguity and digit splitting.*

- What if input words could contain any lowercase letter, not just 'a'-'j'?
  *Hint: What happens with letters outside the mapping range? Defensive coding or error handling?*

### Summary
This problem is essentially a *string to number conversion* using a custom mapping, followed by a simple arithmetic check. The *digit-by-digit number construction* pattern is widely used—similar patterns apply to problems like "String to Integer (Atoi)", "Valid Number", or base conversion scenarios. This implementation is efficient and clear, directly mimicking the logic we would use to form numbers digit-by-digit.


### Flashcard
Convert words to numbers by mapping letters to digits, then check if the sum of two words equals the target word.

### Tags
String(#string)

### Similar Problems
