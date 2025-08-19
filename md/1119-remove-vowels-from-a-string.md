### Leetcode 1119 (Easy): Remove Vowels from a String [Practice](https://leetcode.com/problems/remove-vowels-from-a-string)

### Description  
Given a string `s` consisting only of lowercase English letters, remove all the vowels ('a', 'e', 'i', 'o', 'u') from it and return the resulting string. The order of the remaining characters should remain unchanged.  
You do not need to worry about uppercase letters or non-English characters, as inputs are guaranteed to only contain lowercase English letters.

### Examples  

**Example 1:**  
Input: `s = "leetcodeisacommunityforcoders"`  
Output: `"ltcdscmmntyfrcdrs"`  
*Explanation: All vowels ('e', 'o', 'e', 'i', 'a', 'o', 'u', 'i', 'o', 'o', 'e') are removed from the original string, leaving only consonants.*

**Example 2:**  
Input: `s = "aeiou"`  
Output: `""`  
*Explanation: The input string consists only of vowels, so after removing all vowels, we are left with an empty string.*

**Example 3:**  
Input: `s = "programming"`  
Output: `"prgrmmng"`  
*Explanation: Remove 'o', 'a', 'i' from `"programming"`, leaving `"prgrmmng"`.*

### Thought Process (as if you’re the interviewee)  
First, I need to scan each character of the input string and check if it is a vowel.  
- A brute-force way is to check each character: if it's not a vowel, add it to a new result string.
- To check if a character is a vowel efficiently, I'll use a set containing the characters {'a', 'e', 'i', 'o', 'u'}.
- For each character in the string, if it's not in the vowel set, I'll append it to a list (since string concatenation is O(n²) in Python).
- Finally, I’ll join the list into the output string.

This approach is simple and efficient for this constraint (string length up to 1000).  
Extra optimizations like regular expressions or using built-in string replace aren’t generally necessary in interviews, as writing the logic explicitly is often preferred.

### Corner cases to consider  
- Empty input string: should return an empty string.
- Input with only vowels: should return an empty string.
- Input with no vowels: should return the string unchanged.
- Single letter input (vowel vs consonant).
- Long input strings (test efficiency and avoid unnecessary copies).

### Solution

```python
def removeVowels(s: str) -> str:
    # Define the set of vowel characters for quick lookup
    vowels = {'a', 'e', 'i', 'o', 'u'}
    # Create a list to collect non-vowel characters
    result_chars = []
    # Iterate through each character in the input string
    for c in s:
        # If character is not a vowel, add to result
        if c not in vowels:
            result_chars.append(c)
    # Join the list into a string and return
    return ''.join(result_chars)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input string. We process each character once.
- **Space Complexity:** O(n), as in the worst case (no vowels), we store all characters in an intermediate list before joining.

### Potential follow-up questions (as if you’re the interviewer)  

- What changes if the input could contain uppercase letters?
  *Hint: Should you check for both cases, or convert everything to lowercase first?*

- How would you handle removing a different set of characters passed as a parameter?
  *Hint: Can you generalize the function to accept a set of removable characters?*

- Can you do it in-place if the language and constraints allowed string modification?
  *Hint: Think about the trade-off between mutability and language features.*

### Summary

This problem uses the **filtering pattern**, which is very common for string and array manipulation tasks—collect characters or elements that satisfy a condition, and skip others. It's a staple pattern that can be applied to problems like removing special characters, digits, or filtering based on various criteria in strings or lists.

### Tags
String(#string)

### Similar Problems
- Reverse Vowels of a String(reverse-vowels-of-a-string) (Easy)
- Remove Digit From Number to Maximize Result(remove-digit-from-number-to-maximize-result) (Easy)