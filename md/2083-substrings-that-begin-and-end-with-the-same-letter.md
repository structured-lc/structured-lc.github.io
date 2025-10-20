### Leetcode 2083 (Medium): Substrings That Begin and End With the Same Letter [Practice](https://leetcode.com/problems/substrings-that-begin-and-end-with-the-same-letter)

### Description  
Given a string consisting only of lowercase English letters, find how many substrings (contiguous sequences of characters) both start and end with the same letter. Every substring, of any length (including length 1), should be counted if its first and last characters match.

### Examples  

**Example 1:**  
Input: `s = "abcba"`  
Output: `7`  
*Explanation:*  
Length 1 substrings: `"a"`, `"b"`, `"c"`, `"b"`, `"a"`  
Length 3 substring: `"bcb"`  
Length 5 substring: `"abcba"`  
In total: 5 (length 1) + 1 (length 3) + 1 (length 5) = 7

**Example 2:**  
Input: `s = "abacad"`  
Output: `9`  
*Explanation:*  
Length 1 substrings: `"a"`, `"b"`, `"a"`, `"c"`, `"a"`, `"d"`  
Length 3 substrings: `"aba"`, `"aca"`  
Length 5 substring: `"abaca"`  
Total: 6 (length 1) + 2 (length 3) + 1 (length 5) = 9

**Example 3:**  
Input: `s = "a"`  
Output: `1`  
*Explanation:*  
Only substring: `"a"` (length 1)

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Check every possible substring, and count if its first and last characters match. For each index i, for all end indices ≥ i, compare `s[i]` and `s[j]` and count if equal. But this approach checks O(n²) substrings, which is acceptable for small inputs but too slow for larger strings.

- **Optimized approach:**  
  Instead, for each character, keep track of the positions it appears.  
  Notice that:  
  - Every single letter is a valid substring (length 1).  
  - For any two positions i < j with the same character, the substring s[i...j] starts and ends with this character.
  - For each character with count c, there are c choices for the starting position, and for each, you can pair it with later same characters — but more directly, there are (c choose 2) substrings of length ≥ 2 plus c substrings of length 1.

  Or equivalently, for count c, number of valid substrings is c + c×(c-1)/2 = c×(c+1)/2.

- So, count frequencies for each character, and for each, add c×(c+1)/2 to the result.

### Corner cases to consider  
- Empty string (`s = ""`): should return 0.
- All letters are the same, e.g. `s = "aaaaa"`: all substrings valid.
- All letters are unique, e.g. `s = "abcde"`: only substrings of length 1 count.
- Mixed length / repeated letters.
- Single character string.

### Solution

```python
def numberOfSubstrings(s: str) -> int:
    # Count frequencies for each lowercase letter
    freq = [0] * 26  # 26 lowercase letters
    for c in s:
        freq[ord(c) - ord('a')] += 1

    # For each character, the number of substrings is count × (count + 1) // 2
    result = 0
    for cnt in freq:
        result += cnt * (cnt + 1) // 2
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string. We scan the string once to count frequencies, and loop through 26 letters (constant).
- **Space Complexity:** O(1) extra space (just the frequency array of size 26, independent of input size).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string contained uppercase and lowercase letters?  
  *Hint: Make your frequency counter handle all possible cases; consider ASCII normalization.*

- How would you return the actual substrings, not just the count?  
  *Hint: Use nested loops (brute-force), collect and store matching substrings.*

- Can you solve the problem online, i.e., if the string is coming as a stream?  
  *Hint: For each new character, update your running counters and compute the extra substrings that appear.*

### Summary
This is a counting and combinatorics pattern problem, where you count how many pairs (including identical pair, i.e., single characters) can be formed with repeated identical characters. The core coding pattern is to reduce repeated substring checking (O(n²)) to simple frequency counting (O(n)). This is a common approach for substring/substring-counting problems where character equality properties are central, and similar techniques apply in palindromic substring counting, anagrams, and frequency-based combinatorial substring problems.


### Flashcard
For each character, if it appears k times, it forms k × (k+1)/2 substrings starting and ending with that letter.

### Tags
Hash Table(#hash-table), Math(#math), String(#string), Counting(#counting), Prefix Sum(#prefix-sum)

### Similar Problems
- Number of Good Pairs(number-of-good-pairs) (Easy)
- Sum of Beauty of All Substrings(sum-of-beauty-of-all-substrings) (Medium)
- Count Pairs in Two Arrays(count-pairs-in-two-arrays) (Medium)
- Unique Substrings With Equal Digit Frequency(unique-substrings-with-equal-digit-frequency) (Medium)