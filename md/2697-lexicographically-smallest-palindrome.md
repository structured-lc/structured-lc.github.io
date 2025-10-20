### Leetcode 2697 (Easy): Lexicographically Smallest Palindrome [Practice](https://leetcode.com/problems/lexicographically-smallest-palindrome)

### Description  
Given a string containing lowercase English letters, you can replace any character in the string with any other lowercase letter as many times as you want. The goal is to transform the string into a **palindrome** (reads the same forward and backward) using the minimum number of character replacements. If there are multiple results with the same minimum number of changes, return the **lexicographically smallest** palindrome possible.

### Examples  

**Example 1:**  
Input: `s = "egcfe"`  
Output: `efcfe`  
Explanation: Only one replacement is needed: change 'g' (index 1) to 'f'. Result is "efcfe", which is a palindrome and lexicographically smallest.

**Example 2:**  
Input: `s = "abcd"`  
Output: `abba`  
Explanation: Two replacements are needed:
- Change 'c' (index 2) to 'b', and 'd' (index 3) to 'a'.
- Result is "abba", a palindrome, and the smallest possible.

**Example 3:**  
Input: `s = "seven"`  
Output: `neven`  
Explanation: Change 's' (index 0) to 'n'. Result is "neven", a palindrome and the smallest possible.

### Thought Process (as if you’re the interviewee)  
- Brute-force: Try every possible set of replacements, check each for palindrome and minimal edit count, then pick the smallest lexicographically. This is clearly impractical for string length up to 1000.
- Key observation: In a palindrome, character at index i must equal character at index n-1-i.
- To minimize replacements: for each pair (i, n-1-i), if they differ, replace the bigger character with the smaller one. This both minimizes changes and guarantees lex smallest lexicographical order.
- Iterate two pointers from left and right, choosing minimal at each mismatch.
- No need for extra data structure, can modify string in place or as a list.

### Corner cases to consider  
- String of length 1 (already a palindrome).
- String is already a palindrome (should return as is).
- All characters same (no change).
- Strings with only two different letters.
- String where minimal replacement at one end is required for lex order.
- Odd/even length strings.

### Solution

```python
def makeSmallestPalindrome(s: str) -> str:
    # Convert string to a list so we can mutate it
    chars = list(s)
    left, right = 0, len(chars) - 1
    
    # Two pointers moving towards the center
    while left < right:
        if chars[left] != chars[right]:
            # Update both to the smaller character for lex order
            smaller = min(chars[left], chars[right])
            chars[left] = chars[right] = smaller
        left += 1
        right -= 1
    
    # Join list back to string
    return ''.join(chars)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string. Each pair is visited exactly once.
- **Space Complexity:** O(n), for converting the string to a list for in-place updates (if restricting to immutable strings); otherwise O(1) extra if allowed to modify.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could only replace each character at most once?  
  *Hint: You'd need to track which indices have been changed and explore possible optimal strategies or combinations.*

- How would you extend this for uppercase + lowercase mixed?  
  *Hint: Normalization, or expand your character comparisons.*

- How would you return not just the palindrome, but the minimum number of changes made?  
  *Hint: Count the number of (left, right) pairs where you had to make a replacement.*

### Summary
The approach here is a classic **two pointer** strategy customized for palindrome processing: iterate inwards, ensuring character equality at mirrored positions, always choosing the lexicographically smaller character to minimize both edit count and lex order. This pattern shows up often in string and palindrome questions, and is efficient for problems with symmetric requirements.


### Flashcard
For each pair (i, n−1−i), if characters differ, replace the lexicographically larger one with the smaller one; this minimizes replacements and ensures lexicographically smallest palindrome.

### Tags
Two Pointers(#two-pointers), String(#string), Greedy(#greedy)

### Similar Problems
