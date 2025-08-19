### Leetcode 3174 (Easy): Clear Digits [Practice](https://leetcode.com/problems/clear-digits)

### Description  
Given a string s consisting of lowercase English letters and digits, remove all digits by repeatedly performing this operation:
- Delete the **first digit** and the **closest non-digit character to its left**.
Continue until no digits remain. Return the resulting string after all operations.
The input is guaranteed to be valid (there’s always a non-digit to the left of every digit that will be deleted).

### Examples  

**Example 1:**  
Input: `abc`  
Output: `abc`  
*Explanation: There are no digits, so nothing is removed. The final string is "abc".*

**Example 2:**  
Input: `cb34`  
Output: ``  
*Explanation:  
Step 1: The first digit is '3', the closest letter to its left is 'b'. Remove both. String becomes `c4`.  
Step 2: The next digit is '4', the closest letter to its left is 'c'. Remove both. String becomes `` (empty).*

**Example 3:**  
Input: `a1b2c3`  
Output: ``  
*Explanation:  
Step 1: First digit is '1', closest to the left is 'a'. Remove both → `b2c3`.  
Step 2: Next digit is '2', closest to the left is 'b'. Remove both → `c3`.  
Step 3: Next digit is '3', closest to the left is 'c'. Remove both → ``. All removed.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  I could repeatedly scan left to right to locate the first digit, then scan backwards to find its closest non-digit to the left, remove both, and repeat. But that’s O(n²).
  
- **Optimized approach:**  
  Since we always delete the nearest letter to the *left* of a digit, and we do so in a left-to-right manner, a stack simulates this "undo" pattern well.
  - As I read each character:
    - If it's a letter, push it onto the stack.
    - If it's a digit:
      - Pop the top letter from the stack (this is its closest non-digit to the left and is required by the rule).
      - Do *not* add the digit to the stack.
  - At the end, the stack contains the remaining letters in order. Join them as the result.
  - This is O(n) in both time and space, which is efficient and clean.

### Corner cases to consider  
- No digits at all (input stays unchanged)
- All characters are digits (not possible according to constraints, but would become empty if letters existed initially)
- Only one letter with multiple digits (can't happen, due to constraints)
- String where all digits are at the end or start 
- Letters and digits intertwined (e.g., `a1b2c3`)
- Minimum and maximum input lengths

### Solution

```python
def clearDigits(s: str) -> str:
    # Use a stack to simulate letter removals
    stack = []
    for ch in s:
        if ch.isdigit():
            # Remove the closest non-digit to the left
            if stack:
                stack.pop()
            # Do not add the digit itself
        else:
            # Just push the letter
            stack.append(ch)
    # Join the remaining letters
    return ''.join(stack)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(s). Each character is processed once.
- **Space Complexity:** O(n) in the worst case (if no digits), since all letters could be kept on the stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we wanted to also return the list of removed pairs (letter, digit) in order?
  *Hint: Use a separate list to record (popped_char, digit) pairs when a digit is processed.*

- How would you handle uppercase and special characters?
  *Hint: Decide if uppercase letters or non-letters are "non-digits" to be eligible for removal, and perhaps change isdigit()/isalpha() checks accordingly.*

- Can you do it in-place with O(1) space?
  *Hint: Consider two-pointer technique and overwriting, though stack-like structure is required by semantics.*

### Summary
This is a classic **stack-simulation** problem, where the "remove nearest to left" rule for each digit lends itself naturally to the stack structure. This pattern is common for problems involving undo, matching, or pairing to the previous element (e.g., valid parentheses, text editor simulations). Stack is ideal whenever we need immediate access to the most recent candidate for removal/action.

### Tags
String(#string), Stack(#stack), Simulation(#simulation)

### Similar Problems
