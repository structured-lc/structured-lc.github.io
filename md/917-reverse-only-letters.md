### Leetcode 917 (Easy): Reverse Only Letters [Practice](https://leetcode.com/problems/reverse-only-letters/)

### Description  
Given a string, reverse only its English letters (a-z, A-Z), leaving all other characters in their original positions. Letters must appear in the string in the opposite order, but all non-letter characters do not move from their position.  
For example, in the string `"a-bC-dEf-ghIj"`, hyphens are not moved, but the order of letters is reversed.

### Examples  

**Example 1:**  
Input: `s = "ab-cd"`  
Output: `"dc-ba"`  
*Explanation: Letters are reversed (“a”⇔“d”, “b”⇔“c”), but the hyphen remains at position 2.*

**Example 2:**  
Input: `s = "a-bC-dEf-ghIj"`  
Output: `"j-Ih-gfE-dCba"`  
*Explanation: All letters are reversed, non-letter characters (hyphens) stay in the same place. The order of reversed letters matches their appearance from end to start.*

**Example 3:**  
Input: `s = "Test1ng-Leet=code-Q!"`  
Output: `"Qedo1ct-eeLg=ntse-T!"`  
*Explanation: Numbers and special characters (“1”, “=”, “-”, “!”) do not move. All letters are reversed in their spots.*

### Thought Process (as if you’re the interviewee)  
First, I’d clarify what counts as a letter (only a-z, A-Z), and that other characters (digits, symbols, punctuation) do not move.

**Brute-force idea:**  
- Collect all the letters into a stack so they’re reversed.
- Iterate again and build a new string, popping a letter from the stack when needed, or keeping the current character if it’s not a letter.
- This is simple, but takes extra space proportional to the number of letters.

**Optimized (two-pointer approach):**  
- Use two pointers, one from front (left), one from end (right).
- Advance left pointer until it finds a letter, similarly advance right pointer.
- Swap the letters at these positions.
- Move both pointers inward and repeat.
- If either pointer hits a non-letter, just skip it without swapping.
- This way, we reverse letters in O(n) time and O(n) space (since strings in Python are immutable, so we build a list).

**Why two pointers?**  
- Minimizes passes: only need one scan of the string.
- No extra copying or large buffer needed.

### Corner cases to consider  
- Empty string: `""` → `""`
- No letters: `"1234!@#"` → unchanged.
- All letters: `"abcdef"` → `"fedcba"`
- String starts or ends with non-letter: `"1abc!"` → `"1cba!"`
- Only one letter: `"2a3"` → `"2a3"`
- Mixed Upper and Lower case: should preserve their casing and order where applicable.

### Solution

```python
def reverseOnlyLetters(s: str) -> str:
    # Convert string to list to allow modifications
    chars = list(s)
    # Initialize two pointers
    left, right = 0, len(s) - 1

    while left < right:
        # Move left pointer until we find a letter
        while left < right and not chars[left].isalpha():
            left += 1
        # Move right pointer until we find a letter
        while left < right and not chars[right].isalpha():
            right -= 1
        # Swap the letters at left and right
        if left < right:
            chars[left], chars[right] = chars[right], chars[left]
            left += 1
            right -= 1

    return ''.join(chars)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(s).  
  Each character is visited at most once by either left or right pointer, so total operations are linear.

- **Space Complexity:** O(n).  
  Since strings are immutable in Python, we use a list to store and modify the characters. In-place swap reduces extra space, but we still need to store the answer as a list of n characters.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you reverse only digits in a string, ignoring letters and symbols?  
  *Hint: Change the isalpha() checks to .isdigit().*

- How would you handle Unicode or accented letters?  
  *Hint: Use Unicode-aware functions or regex to identify a broader set of letters.*

- Can this be done strictly in-place (O(1) extra space) in languages with mutable strings?  
  *Hint: Yes, arrays/lists or character arrays allow true in-place swaps; Python strings themselves are immutable.*

### Summary  
This problem uses the **two-pointer** pattern—an efficient way to process problems where swaps or comparisons are needed from both ends of a sequence. The solution is simple and readable, and the technique can be reused in problems involving palindromes, reversals with constraints, or selective swapping.


### Flashcard
Use two pointers from both ends, swapping only letters and skipping non-letters.

### Tags
Two Pointers(#two-pointers), String(#string)

### Similar Problems
- Faulty Keyboard(faulty-keyboard) (Easy)