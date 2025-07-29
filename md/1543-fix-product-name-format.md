### Leetcode 1543 (Easy): Fix Product Name Format [Practice](https://leetcode.com/problems/fix-product-name-format)

### Description  
Given a product name string, return a new string such that:
- The first character of every word is **capitalized** (uppercase).
- All other letters in each word are **lowercase**.
- Words are separated by single spaces.

### Examples  

**Example 1:**  
Input: `name = "apple pie"`  
Output: `"Apple Pie"`  
*Explanation: The first letter of both 'apple' and 'pie' are capitalized.*

**Example 2:**  
Input: `name = "lEETcoDE cHanGE"`  
Output: `"Leetcode Change"`  
*Explanation: Both words are properly capitalized.*

**Example 3:**  
Input: `name = "a"`  
Output: `"A"`  
*Explanation: Only one letter – should be uppercase.*

### Thought Process (as if you’re the interviewee)  
- Split the string by spaces into words.
- For each word: make the first character uppercase, the rest lowercase.
- Rejoin the words with single spaces.
- Be careful of input with extra/multiple spaces or mixed case.

### Corner cases to consider  
- Input with multiple spaces between words
- Already correctly formatted string
- All uppercase or all lowercase string
- Leading or trailing spaces
- Empty string

### Solution

```python
# Simulate Python's str.title(), but handle multiple spaces as needed

def fixProductName(name: str) -> str:
    # Split the string into words (removes extra spaces automatically)
    words = name.strip().split()
    # Capitalize each word
    capped = [word.capitalize() for word in words]
    # Join back with single spaces
    return ' '.join(capped)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), where n is length of string (process each char once).
- **Space Complexity:** O(n), storage for the output string and word list.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you handle hyphenated words (e.g., "apple-pie")?
  *Hint: Split by spaces, also check for hyphens within words and capitalize appropriately.*
- What if words should be separated by underscores instead?
  *Hint: Change join operation accordingly.*
- How would you do this in-place, modifying a char array?
  *Hint: Traverse the array manually, change cases according to word boundary rules.*

### Summary
This is a **string formatting** problem, common for data cleanup and UI display. Uses a split/capitalize/join pattern, applicable to many problems involving title-casing or normalization of user input.
