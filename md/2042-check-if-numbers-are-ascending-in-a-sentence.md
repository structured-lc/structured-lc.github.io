### Leetcode 2042 (Easy): Check if Numbers Are Ascending in a Sentence [Practice](https://leetcode.com/problems/check-if-numbers-are-ascending-in-a-sentence)

### Description  
Given a sentence made up of words and positive integers separated by single spaces, determine if all the numbers in the sentence appear in strictly increasing order from left to right. Ignore the words. If no numbers or one number occur, return true.

### Examples  

**Example 1:**  
Input: `"1 box has 3 blue 4 red 6 green and 12 yellow marbles"`  
Output: `True`  
*Explanation: Numbers are 1, 3, 4, 6, 12. They are in strictly increasing order.*

**Example 2:**  
Input: `"hello world 5 x 5"`  
Output: `False`  
*Explanation: Numbers are 5, 5. The sequence is not strictly increasing (equal numbers).*

**Example 3:**  
Input: `"sun 100 rises 111 sets 80"`  
Output: `False`  
*Explanation: Numbers are 100, 111, 80. 80 < 111, which breaks the strictly increasing order.*

### Thought Process (as if you’re the interviewee)  
- The problem asks for strictly increasing numbers in a sentence.
- **Brute-force approach:** 
  - Split the sentence into tokens.
  - Extract all numbers into a list, iterate through them, and check if each subsequent number is greater than the previous.
  - This uses extra space to store all numbers.
- **Optimized approach:**
  - Instead of collecting all numbers first, just keep track of the last seen number while iterating through tokens.
  - As soon as a new number is found, compare it to the previous number.
  - If any number is not strictly greater than the previous, return False.
  - This is O(n) time, O(1) extra space (aside from input).
- **Trade-off:** Both approaches are O(n) time. The optimized approach avoids some extra space and is cleaner.

### Corner cases to consider  
- No numbers in the sentence (should return True).
- Only one number (should return True).
- Negative numbers (not possible per problem, but code should ignore non-digit tokens correctly).
- Numbers at start or end of sentence.
- Sentences with no spaces/extra spaces (per constraints: always well-formed).
- Numbers with leading zeros (per constraints: there are none).

### Solution

```python
def are_numbers_ascending(s: str) -> bool:
    tokens = s.split()
    prev_num = -1    # By problem, all numbers are positive

    for token in tokens:
        if token.isdigit():
            curr_num = int(token)
            if curr_num <= prev_num:
                return False
            prev_num = curr_num

    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the sentence. Each token is processed once, each number is compared in O(1).
- **Space Complexity:** O(1) extra space. Only a few variables, no additional list storage (aside from input which is required).

### Potential follow-up questions (as if you’re the interviewer)  

- What if numbers could be negative or have leading zeros?  
  *Hint: Consider robust string-to-number parsing.*

- How would you extend this to floating point numbers?  
  *Hint: Use float conversion and consider 'isdigit()' limitations.*

- Can you do this in one line in python (for fun)?  
  *Hint: Use iterators and generators, but that's less readable for interviews.*

### Summary
This problem uses the **string parsing** and **state tracking** patterns. You scan sequentially, updating a variable as you go, and short-circuit if something breaks the required property. This is common in problems where you need to check for monotonicity, sortedness, or process elements with accumulators. The idea generalizes to a variety of stream-like checking questions.


### Flashcard
Iterate through sentence tokens, track last number, and check each new number is strictly greater—no need to store all numbers.

### Tags
String(#string)

### Similar Problems
- String to Integer (atoi)(string-to-integer-atoi) (Medium)
- Sorting the Sentence(sorting-the-sentence) (Easy)
- Check if All A's Appears Before All B's(check-if-all-as-appears-before-all-bs) (Easy)