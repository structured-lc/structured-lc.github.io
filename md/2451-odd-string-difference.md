### Leetcode 2451 (Easy): Odd String Difference [Practice](https://leetcode.com/problems/odd-string-difference)

### Description  
You are given a list of lowercase alphabetic strings, all of the same length. For each string, you can generate an array of differences between consecutive characters (based on their position in the alphabet). All but one string will share the same difference array; one string's difference array is unique. Your task is to return the string with the unique difference array.

### Examples  

**Example 1:**  
Input: `words = ["adc","wzy","abc"]`  
Output: `"abc"`  
*Explanation: "adc" → [3, -1], "wzy" → [3, -1], "abc" → [1, 1]. The odd out is `"abc"`.*

**Example 2:**  
Input: `words = ["aaa","bob","ccc","ddd"]`  
Output: `"bob"`  
*Explanation: All except "bob" yield [0, 0]; "bob" yields [13, -13]. So "bob" is the odd one out.*

**Example 3:**  
Input: `words = ["acb","bdf","ace","cdf"]`  
Output: `"ace"`  
*Explanation:  
- "acb" → [2, -1]  
- "bdf" → [3, 2]  
- "ace" → [2, 2]  
- "cdf" → [1, 2]  
Suppose others share a difference, but only "ace" has [2, 2].*

### Thought Process (as if you’re the interviewee)  
Start by understanding the pattern: for each word, convert it into a "difference array" by subtracting alphabet positions of adjacent letters.  
Count the frequency of each difference array (e.g., using a dictionary).  
As all but one string will have the same difference array, find the one with frequency == 1 and return the corresponding string.

**Brute-force:**  
- Calculate the difference array for each word.
- Compare each with every other word's array.
- This is O(n²×L), where n=number of words, L=length of word.

**Optimized:**  
- Map each difference array (tuple form for hashability) to a list of words.
- Or count occurrences of each difference array and return the string with the unique array.
- Since L ≤ 20 and n ≤ 100, O(n×L) is efficient.

### Corner cases to consider  
- Minimum input size (words of length 2, array length 3)
- All words are the same except one
- Unique difference array at start or end
- Strings with repeated or sequential characters (e.g., "aaa", "abc", "xyz")

### Solution

```python
def oddString(words):
    # Helper: get difference array for a word
    def get_diff(word):
        return tuple(ord(word[i+1]) - ord(word[i]) for i in range(len(word) - 1))
    
    diff_map = {}
    for word in words:
        diff = get_diff(word)
        if diff in diff_map:
            diff_map[diff].append(word)
        else:
            diff_map[diff] = [word]
    
    # Find the difference array that only has one word mapped to it
    for diff, word_list in diff_map.items():
        if len(word_list) == 1:
            return word_list[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × L), where n = number of words, L = word length. We process each word and compute the difference array (O(L)) for each. Counting in the map is O(1) for each word.
- **Space Complexity:** O(n × L), for storing the difference arrays and their mappings for all words.

### Potential follow-up questions (as if you’re the interviewer)  

- What if multiple words have unique difference arrays?  
  *Hint: How would you distinguish all "odd" ones if the rule changes?*

- Can you do it in a single scan without extra storage?  
  *Hint: Is it possible to determine the odd one out by looking at only the first few difference arrays?*

- How would you generalize this for more complex "difference" patterns (e.g., wraparound alphabet, camelcase, etc.)?  
  *Hint: Consider alternate definitions for differences or extensions to the problem.*

### Summary
The approach leverages *hashing* of difference arrays and grouping, a common *frequency-count* technique for "find the unique" problems. Patterns used here are broadly applicable to string hashing, grouping anagrams, or checking for unique characteristics in large datasets. This problem also illustrates efficient ways to convert string manipulations to mathematical comparisons.