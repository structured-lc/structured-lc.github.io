### Leetcode 3758 (Medium): Convert Number Words to Digits [Practice](https://leetcode.com/problems/convert-number-words-to-digits)

### Description  
Convert a string containing English number words into their numeric digit representation. The input string contains words like "zero", "one", "two", etc., separated by spaces, and you need to output the corresponding number as a string of digits. For example, "zero four zero one" becomes "0401".

### Examples  

**Example 1:**  
Input: `"zero four zero one"`  
Output: `"0401"`  
*Explanation: Each word maps to its corresponding digit—"zero" → "0", "four" → "4", "zero" → "0", "one" → "1". Joining them gives "0401".*

**Example 2:**  
Input: `"one two three"`  
Output: `"123"`  
*Explanation: "one" → "1", "two" → "2", "three" → "3". Result is "123".*

**Example 3:**  
Input: `"nine"`  
Output: `"9"`  
*Explanation: Single word "nine" maps directly to "9".*


### Thought Process (as if you're the interviewee)  
The straightforward approach is to create a dictionary that maps each English word ("zero" through "nine") to its corresponding digit. Then split the input string by spaces to get individual words, look up each word in the dictionary, and concatenate the results.

The brute-force solution is intuitive: iterate through each word and build the result string by appending digits one at a time. This works well and has minimal overhead.

A slightly optimized version uses a generator expression with `join()` instead of concatenating strings in a loop, which is more efficient in Python since strings are immutable. This approach is clean, readable, and performs well for the typical constraints of this problem.

I'd go with the dictionary + generator expression approach because it's concise, efficient, and handles all cases in a single pass without unnecessary intermediate string copies.

### Corner cases to consider  
- Single word input like `"five"` should return `"5"`
- Input with all zeros like `"zero zero zero"` should return `"000"`
- Maximum input where all nine digits appear multiple times
- Empty string (if applicable based on constraints)
- Case sensitivity—words might be lowercase only

### Solution

```python
def convertWordsToDigits(words: str) -> str:
    # Dictionary mapping word to digit
    word_to_digit = {
        "zero": "0",
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9"
    }
    
    # Split input into words, map each to digit, join result
    result = ''.join(
        word_to_digit[word] 
        for word in words.split()
    )
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of words in the input string. We iterate through each word exactly once to perform a dictionary lookup (O(1)) and append to the result.
- **Space Complexity:** O(m), where m is the length of the output string. The dictionary is constant size (10 entries). The dominant space usage comes from storing the output result string.


### Potential follow-up questions (as if you're the interviewer)  

- (Follow-up question 1)  
  *What if the input contained compound words like "twenty three" or "one hundred"? How would you handle converting these to numbers?*  
  *Hint: Consider grouping words into meaningful units (ones, tens, hundreds) and use a hierarchical dictionary structure. Think about how to accumulate values for different magnitudes.*

- (Follow-up question 2)  
  *How would you handle very large numbers like "five billion two hundred million"? Would your approach scale?*  
  *Hint: Process the words in groups based on scale keywords like "thousand", "million", "billion". Keep track of current value and accumulated result separately.*

- (Follow-up question 3)  
  *What if you needed to handle both directions—convert digits to words AND words to digits? How would you structure your code?*  
  *Hint: Create separate helper functions for each direction and perhaps use inverse dictionaries. Consider code organization and reusability.*

### Summary
This problem uses a simple dictionary-mapping pattern to transform word representations into their digit equivalents. The solution leverages Python's `split()` method to tokenize the input and a generator expression with `join()` for efficient string building. This pattern is widely applicable whenever you need to translate between two symbolic representations, such as converting between Roman numerals and integers, or translating encoded strings. The key insight is recognizing that straightforward lookup-based transformations are often the most efficient approach when a direct mapping exists.

### Tags
String(#string), Trie(#trie)

### Similar Problems
