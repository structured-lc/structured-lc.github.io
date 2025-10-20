### Leetcode 2193 (Hard): Minimum Number of Moves to Make Palindrome [Practice](https://leetcode.com/problems/minimum-number-of-moves-to-make-palindrome)

### Description  
You are given a string s consisting only of lowercase English letters. In one move, you can select any two adjacent characters of s and swap them. The goal is to return the minimum number of moves needed to convert s into a palindrome. The input is guaranteed to be such that it’s always possible to transform s into a palindrome.

### Examples  

**Example 1:**  
Input: `s = "aabb"`  
Output: `2`  
*Explanation: Move 1: "aabb" → "abab"; Move 2: "abab" → "abba". "abba" is a palindrome.*

**Example 2:**  
Input: `s = "letelt"`  
Output: `2`  
*Explanation: Move 1: "letelt" → "letetl"; Move 2: "letetl" → "lettel". "lettel" is a palindrome.*

**Example 3:**  
Input: `s = "abcbae"`  
Output: `2`  
*Explanation: Move 1: "abcbae" → "abcaeb"; Move 2: "abcaeb" → "abaecb". "abaecb" is a palindrome after appropriate swaps.*

### Thought Process (as if you’re the interviewee)  
First, observe that in a palindrome, each character mirrors one on the other end, except for possibly one unique character in strings with odd length.  
A brute-force way would be to try all possible swaps to reach a palindrome, but this is exponentially slow.

Instead, we can use a greedy approach:

- We want to “pair up” characters from the start and end.
- At each step, check if the leftmost character has a matching pair on the right.  
    - If yes, bubble that match towards the right through adjacent swaps (costs number of swaps equal to the distance between them).
    - If no right match is found, this character is the singleton of the palindrome, and we move it to the center (only happens once, only for odd length).
- Repeat until left and right meet or cross.

We can use a list to allow in-place swapping. The key is that, with adjacent swaps, moving a character k positions costs k swaps.

Why greedy? Because delaying any matching or skipping the closest match will always increase the total number of swaps required.

This approach is O(n²) time, since in the worst case we may scan the whole string from both ends repeatedly.

### Corner cases to consider  
- Strings of length 1 (already a palindrome, 0 moves).
- Strings where all characters are distinct (won't occur as per guarantees).
- Strings with all identical characters (already a palindrome).
- Odd length with only one character of odd frequency.
- "Hard" cases: Matching pairs not adjacent, so need to bubble those via many swaps.

### Solution

```python
def min_moves_to_make_palindrome(s: str) -> int:
    # Convert input into a list for in-place character swapping
    chars = list(s)
    left = 0
    right = len(chars) - 1
    moves = 0
    
    while left < right:
        # Find a matching character for chars[left] starting from right
        k = right
        while k > left and chars[k] != chars[left]:
            k -= 1
        
        if k == left:
            # Match not found; this must be the unique center char (odd length)
            # Move chars[left] to the center by swapping with each neighbor
            chars[left], chars[left + 1] = chars[left + 1], chars[left]
            moves += 1
            # retry at same left to match again
        else:
            # Bring chars[k] to position right by adjacent swaps
            for j in range(k, right):
                chars[j], chars[j + 1] = chars[j + 1], chars[j]
                moves += 1
            # now chars[right] matches chars[left]
            left += 1
            right -= 1
    return moves
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²).  
  In the worst case (for each pair to be matched), you may have to traverse nearly the whole substring’s length for each operation.
- **Space Complexity:** O(n).  
  We use an extra list for the string. No recursion or additional data structures are needed.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we allow swapping any (not just adjacent) characters?
  *Hint: Think how the minimum swaps would change. Would greedy sweep from the outside still be optimal?*

- What if the input string cannot be made into a palindrome?
  *Hint: Pre-check character counts for palindrome property before the main logic.*

- How would your solution change if performance requirements were tighter (n may be very large)?
  *Hint: Is there a faster way than O(n²)—could you use data structures for faster look-up and movement counting?*

### Summary
This problem is a classic application of the **greedy two-pointer** technique and simulates *bubble sort swaps* to pair up matching characters from both ends. It’s closely related to making strings anagrams/palindromes with adjacent moves—patterns useful in adjacent swap sorting, greedy pairing, and palindrome construction problems. The main insight is to always pair characters as early as possible, minimizing unnecessary swaps.


### Flashcard
Greedily pair matching characters from ends inward, swapping as needed; each swap moves a character to its mirror position.

### Tags
Two Pointers(#two-pointers), String(#string), Greedy(#greedy), Binary Indexed Tree(#binary-indexed-tree)

### Similar Problems
- Minimum Insertion Steps to Make a String Palindrome(minimum-insertion-steps-to-make-a-string-palindrome) (Hard)
- Minimum Number of Flips to Make Binary Grid Palindromic I(minimum-number-of-flips-to-make-binary-grid-palindromic-i) (Medium)