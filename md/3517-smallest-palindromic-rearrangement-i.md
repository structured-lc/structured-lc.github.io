### Leetcode 3517 (Medium): Smallest Palindromic Rearrangement I [Practice](https://leetcode.com/problems/smallest-palindromic-rearrangement-i)

### Description  
Given a **palindromic** string s (i.e., reading it left-to-right is the same as right-to-left), **rearrange its characters** to form the **lexicographically smallest palindrome possible**.  
Return this smallest possible palindromic rearrangement.  
You are guaranteed s is a palindrome, and consists only of lowercase English letters.

### Examples  

**Example 1:**  
Input: `s = "z"`  
Output: `"z"`  
*Explanation: Only one character, already a palindrome and lexicographically smallest.*

**Example 2:**  
Input: `s = "babab"`  
Output: `"abbba"`  
*Explanation: Count: a(2), b(3). Place most frequent smallest lexicographically on the outside. So, place two a's on sides, three b's (one in center, one left, one right): abbba.*

**Example 3:**  
Input: `s = "daccad"`  
Output: `"acddca"`  
*Explanation: Count: a(2), c(2), d(2). Place smallest first: a, c, d | d, c, a. Full string: acddca.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try every permutation, check if it's a palindrome, and return the smallest.  
  This is not feasible: O(n!) time.

- **Observation:**  
  For a palindrome, letter counts must have at most one odd count (for the center). Since s is already a palindrome, its counts guarantee this property.  
  Lexicographically smallest palindrome is built by putting the smallest available letters at both symmetrical sides.

- **Optimized approach:**  
  1. Count occurrences of each character.
  2. For lexicographical order, process characters from 'a' to 'z'.
  3. For each c, put ⌊count/2⌋ c's at start and end.
  4. If odd count, after filling sides, put the leftover in the center.
  5. Join left + middle (if exists) + right (reversed).

- **Why this works:**  
  Palindromic structure is preserved; picking smaller letters first ensures lex order.

### Corner cases to consider  
- Single character strings.
- All characters the same.
- Strings where all counts are even.
- Strings with one odd count, rest even.
- Very long strings.
- s is already lex smallest.
- s is lex largest.

### Solution

```python
def smallest_palindromic_rearrangement(s):
    # Count occurrences of each character (26 lowercase letters)
    counts = [0] * 26
    for ch in s:
        counts[ord(ch) - ord('a')] += 1

    left = []
    middle = ''
    # Build first half and middle
    for i in range(26):
        c = chr(ord('a') + i)
        # If the count is even, split evenly both sides
        half = counts[i] // 2
        left.append(c * half)
        # If odd, save for the middle character
        if counts[i] % 2 == 1 and middle == '':
            middle = c

    # Join left half
    left_half = ''.join(left)
    # Mirror left half for right half
    right_half = left_half[::-1]
    # Add middle char if exists (at most one)
    return left_half + (middle if middle else '') + right_half
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + 26) ≈ O(n)  
  (Counting frequencies is O(n), building results is O(1) per letter, joining string is O(n). Sorting not required due to fixed alphabet size.)
- **Space Complexity:** O(n)  
  (Output uses O(n), frequency array O(1), minor string building.)

### Potential follow-up questions (as if you’re the interviewer)  

- What if s is not guaranteed to be a palindrome?
  *Hint: How can you tell if it's even possible to rearrange to a palindrome?*

- How would you return all palindromic permutations, not just the smallest?
  *Hint: Consider backtracking with symmetry constraints.*

- How would you do this if the alphabet was not fixed (e.g., Unicode)?
  *Hint: Could you still avoid sorting by using an ordered map/dictionary keyed by character?*

### Summary
This is a classic **palindrome construction & greedy (symmetry greedy)** problem.  
It uses a **counting and two-pointer build** pattern, often applicable to:  
- Anagram and palindrome rearrangement,
- Problems needing lexicographically minimal/maximal outputs with constraints.  
Optimizing by leveraging the fixed 26-letter alphabet removes the need for explicit sorting.


### Flashcard
Count character frequencies, build lexicographically smallest palindrome by placing smallest letters symmetrically from outside-in.

### Tags
String(#string), Sorting(#sorting), Counting Sort(#counting-sort)

### Similar Problems
- Shortest Palindrome(shortest-palindrome) (Hard)