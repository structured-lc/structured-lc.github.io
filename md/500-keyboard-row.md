### Leetcode 500 (Easy): Keyboard Row [Practice](https://leetcode.com/problems/keyboard-row)

### Description  
Given an array of strings words, return the words that can be typed using letters of the alphabet on only one row of an American keyboard.

On the American keyboard:
- First row consists of `"qwertyuiop"`
- Second row consists of `"asdfghjkl"` 
- Third row consists of `"zxcvbnm"`

### Examples  

**Example 1:**  
Input: `words = ["Hello","Alaska","Dad","Peace"]`  
Output: `["Alaska","Dad"]`  
*Explanation: "Alaska" can be typed using only the first row. "Dad" can be typed using only the second row.*

**Example 2:**  
Input: `words = ["omk"]`  
Output: `[]`  
*Explanation: "omk" uses letters from different rows (o-1st, m-3rd, k-2nd).*

**Example 3:**  
Input: `words = ["aaaa","asdfghjkl","qwertyuiop"]`  
Output: `["aaaa","asdfghjkl","qwertyuiop"]`  
*Explanation: All words can be typed using letters from only one row.*

### Thought Process (as if you're the interviewee)  
This problem requires checking if all characters in a word belong to the same keyboard row. The approach involves:

1. **Character mapping**: Map each letter to its row number
2. **Row validation**: For each word, check if all characters belong to the same row
3. **Case handling**: Handle both uppercase and lowercase letters

Approaches:
1. **Set intersection**: Use sets to check if word characters intersect with only one row
2. **Character mapping**: Create a lookup table mapping each character to its row
3. **Row by row checking**: Check each word against each row

The character mapping approach is most efficient as it provides O(1) lookup time.

### Corner cases to consider  
- Empty input array
- Single character words
- Words with mixed case letters
- Words with only repeated characters
- All words can be typed with one row
- No words can be typed with one row

### Solution

```python
def findWords(words):
    # Define keyboard rows
    row1 = set("qwertyuiop")
    row2 = set("asdfghjkl")
    row3 = set("zxcvbnm")
    
    result = []
    
    for word in words:
        # Convert to lowercase for comparison
        word_lower = word.lower()
        word_set = set(word_lower)
        
        # Check if word can be typed using only one row
        if (word_set <= row1 or 
            word_set <= row2 or 
            word_set <= row3):
            result.append(word)
    
    return result

# Alternative approach using character mapping
def findWordsMapping(words):
    # Create character to row mapping
    char_to_row = {}
    
    # Map characters to their respective rows
    for char in "qwertyuiop":
        char_to_row[char] = 1
    for char in "asdfghjkl":
        char_to_row[char] = 2
    for char in "zxcvbnm":
        char_to_row[char] = 3
    
    result = []
    
    for word in words:
        if not word:  # Handle empty word
            result.append(word)
            continue
            
        # Get row of first character
        first_char_row = char_to_row[word[0].lower()]
        
        # Check if all characters belong to same row
        can_type = True
        for char in word.lower():
            if char_to_row[char] != first_char_row:
                can_type = False
                break
        
        if can_type:
            result.append(word)
    
    return result

# One-liner approach using all() function
def findWordsOneLiner(words):
    rows = [set("qwertyuiop"), set("asdfghjkl"), set("zxcvbnm")]
    
    return [word for word in words 
            if any(set(word.lower()) <= row for row in rows)]

# Functional approach
def findWordsFunctional(words):
    def can_type_with_one_row(word):
        rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"]
        word_lower = word.lower()
        
        for row in rows:
            if all(char in row for char in word_lower):
                return True
        return False
    
    return [word for word in words if can_type_with_one_row(word)]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m) where n = number of words and m = average length of words. We check each character of each word.
- **Space Complexity:** O(1) for the set approach (fixed size sets), or O(k) for character mapping where k = 26 (alphabet size).

### Potential follow-up questions (as if you're the interviewer)  

- How would you handle special characters or numbers in the input?  
  *Hint: Define additional rows or ignore non-alphabetic characters based on requirements.*

- What if we had a different keyboard layout (like DVORAK)?  
  *Hint: Modify the row definitions to match the new layout.*

- How would you optimize for very large inputs with repeated words?  
  *Hint: Use memoization to cache results for previously processed words.*

- Can you solve this problem if words could contain characters from at most k rows?  
  *Hint: Count unique rows used and check if count ≤ k.*

### Summary
This problem tests string processing and set operations. The key insight is recognizing that we need to check if all characters in a word belong to the same subset (keyboard row). Using sets provides an elegant solution with subset operations, while character mapping offers an alternative approach with explicit row tracking. Both approaches handle the case-insensitive requirement and demonstrate different ways to solve membership testing problems.

### Tags
Array(#array), Hash Table(#hash-table), String(#string)

### Similar Problems
- Find the Sequence of Strings Appeared on the Screen(find-the-sequence-of-strings-appeared-on-the-screen) (Medium)
- Find the Original Typed String I(find-the-original-typed-string-i) (Easy)
- Find the Original Typed String II(find-the-original-typed-string-ii) (Hard)