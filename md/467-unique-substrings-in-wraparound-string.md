### Leetcode 467 (Medium): Unique Substrings in Wraparound String [Practice](https://leetcode.com/problems/unique-substrings-in-wraparound-string)

### Description  
We define the string base to be the infinite wraparound string of "abcdefghijklmnopqrstuvwxyz", so base looks like "...zabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcd....". Given a string s, return the number of unique non-empty substrings of s that are present in base.

### Examples  

**Example 1:**  
Input: `s = "a"`  
Output: `1`  
*Explanation: Only the substring "a" of s is in base.*

**Example 2:**  
Input: `s = "cac"`  
Output: `2`  
*Explanation: There are two substrings ("a", "c") of s in base.*

**Example 3:**  
Input: `s = "zab"`  
Output: `6`  
*Explanation: There are six substrings ("z", "a", "b", "za", "ab", and "zab") of s in base.*


### Thought Process (as if you're the interviewee)  
We need to count unique substrings of s that appear in the infinite wraparound alphabet string.

**Key Insight:**
A substring is valid if it consists of consecutive characters in alphabetical order (with wraparound from 'z' to 'a').

**Approach:**
Instead of generating all substrings and checking each one, we can use dynamic programming to count efficiently.

**Key Observation:**
For each character, we want to know the maximum length of valid substring ending at that character. If we know the maximum length ending at character 'c' is k, then there are k unique substrings ending at 'c' (of lengths 1, 2, ..., k).

**Algorithm:**
1. For each position, calculate the length of the longest valid substring ending at that position
2. For each character 'a' to 'z', track the maximum length of valid substring ending with that character
3. Sum up all maximum lengths - this gives us the total count of unique substrings

**Why this works:**
- All substrings ending with the same character and having the same length are identical in a wraparound string
- By tracking only the maximum length for each ending character, we avoid double counting
- The maximum length for each character gives us exactly the number of unique substrings ending with that character


### Corner cases to consider  
- String with single character: Should return 1  
- String with no valid consecutive sequences: Count individual characters  
- String with wraparound (like "za"): Should be counted as valid  
- Repeated patterns: Should not be double counted  


### Solution

```python
# Just like in interviews, please do not use python libraries to take shortcuts.
# They aren't usually allowed in real interviews.
# Add comments to each step of your logic

def findSubstringInWraproundString(s):
    if not s:
        return 0
    
    # Track maximum length of valid substring ending with each character
    max_length = {}
    
    # Current length of valid substring ending at current position
    current_length = 1
    
    # Initialize for first character
    max_length[s[0]] = 1
    
    # Process each character starting from the second
    for i in range(1, len(s)):
        char = s[i]
        prev_char = s[i-1]
        
        # Check if current character continues the sequence
        if (ord(char) - ord(prev_char)) % 26 == 1:
            # Consecutive characters (including wraparound z->a)
            current_length += 1
        else:
            # Sequence breaks, start new sequence
            current_length = 1
        
        # Update maximum length for current character
        max_length[char] = max(max_length.get(char, 0), current_length)
    
    # Sum all maximum lengths to get total unique substrings
    return sum(max_length.values())

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) where n is the length of string s. We iterate through the string once, and each character processing takes constant time.
- **Space Complexity:** O(1) since we store at most 26 entries in the max_length dictionary (one for each letter), which is constant space.


### Potential follow-up questions (as if you're the interviewer)  

- What if the wraparound string had a different alphabet or ordering?  
  *Hint: Modify the consecutive character check condition to match the new alphabet ordering*

- How would you modify this to return the actual unique substrings instead of just the count?  
  *Hint: Store the actual substrings in a set during the DP process, but this would require O(n²) space*

- What if you needed to find the longest valid substring instead of counting all unique ones?  
  *Hint: Simply track and return the maximum value of current_length encountered during the iteration*

### Summary
This problem demonstrates a clever dynamic programming approach that avoids the naive O(n³) solution of checking all substrings. The key insight is that for the wraparound alphabet, we only need to track the maximum length of valid substring ending with each character. This automatically handles uniqueness and provides an efficient O(n) solution. This pattern of using character-based state tracking appears in many string DP problems where the order or relationships between characters matter.
