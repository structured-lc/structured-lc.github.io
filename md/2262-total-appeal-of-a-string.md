### Leetcode 2262 (Hard): Total Appeal of A String [Practice](https://leetcode.com/problems/total-appeal-of-a-string)

### Description  
Given a string `s`, the *appeal* of a string is defined as the number of **distinct** characters in that string.  
Your task: For all possible substrings of `s`, calculate the sum of their appeals.  
For example, for `s = "abbca"`, consider all substrings, calculate the number of distinct letters for each, and sum them up. The challenge is to do this efficiently, since the brute-force method is too slow for large `s`.

### Examples  

**Example 1:**  
Input: `s = "abbca"`  
Output: `28`  
Explanation:  
*All substrings and their appeal:*  
"a": 1  
"ab": 2  
"abb": 2  
"abbc": 3  
"abbca": 3  
"b": 1  
"bb": 1  
"bbc": 2  
"bbca": 3  
"b": 1  
"bc": 2  
"bca": 3  
"c": 1  
"ca": 2  
"a": 1  
*Sum = 28*  

**Example 2:**  
Input: `s = "code"`  
Output: `20`  
Explanation:  
*Each substring and appeal:*  
"c": 1  
"co": 2  
"cod": 3  
"code": 4  
"o": 1  
"od": 2  
"ode": 3  
"d": 1  
"de": 2  
"e": 1  
*Sum = 20*  

**Example 3:**  
Input: `s = "aaaaa"`  
Output: `15`  
Explanation:  
*All substrings have only 'a', so each substring's appeal is 1. There are 5 + 4 + 3 + 2 + 1 = 15 substrings*  

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - Generate all O(n²) substrings, count distinct characters for each substring (O(n)).  
  - Total: O(n³) — Far too slow for large strings.
- **Optimize:**  
  - Need an efficient way to count the appeal for all substrings in O(n) or O(n log n).  
  - Notice: For each character, how many substrings does it newly contribute to as a distinct letter?
  - For each index, track the last index where each character appeared.  
  - The character at position i contributes to all substrings ending at i, starting after its previous occurrence.
  - For every position, the number of substrings where it is a new distinct letter is `(i - last_position[ch])`.
  - Use a running total:  
    - For every position i:  
      - current_appeal += i - last_position[s[i]]
      - total_appeal += current_appeal  
  - Space is only O(26) because s consists of only lowercase English letters, so store last seen positions in an array.

### Corner cases to consider  
- Empty string (`s = ""`) → Appeal is 0.
- All same character (`s = "aaaa..."`) → Each substring appeal is 1.
- All unique characters (`s = "abcde..."`) → Substrings get increasingly higher maximum appeal.
- Very long string.
- String with alternating patterns (e.g. `s = "ababa"`).

### Solution

```python
def totalAppeal(s: str) -> int:
    # Store the last seen index for each character (initialize -1 for 0-based index)
    last = [-1] * 26
    total_appeal = 0
    current_appeal = 0

    for i, ch in enumerate(s):
        idx = ord(ch) - ord('a')
        # For substrings ending at i, the number where ch is a new distinct char = i - last[idx]
        current_appeal += i - last[idx]
        total_appeal += current_appeal
        last[idx] = i  # Update last seen for current char
    return total_appeal
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of s.  
  Explain: Each character is processed once; array updates and additions are O(1).
- **Space Complexity:** O(1), as only a fixed size array of length 26 is used, regardless of input size.


### Potential follow-up questions (as if you’re the interviewer)  

- What changes if the input can contain both lowercase and uppercase letters?  
  *Hint: Expand last seen tracking array and mapping to cover all possible characters.*

- How would you extend this to Unicode strings?  
  *Hint: Use a hashmap (dictionary) for last seen indices to handle arbitrary character sets efficiently.*

- Can you output the appeal of each substring, not just the total?  
  *Hint: Requires generating each substring and their appeal; trade off between memory and time.*

### Summary
This problem uses the "last occurrence" tracking pattern, common in substring and sliding window problems that count distinct or unique character contributions.  
The key idea is to count, for each character at position i, in how many substrings it is newly distinct, using last seen indices to avoid brute force substring enumeration.  
This pattern frequently appears in string problems requiring counts over all substrings, and can be adapted for more complex versions such as distinct letters, unique windows, and combinatorial substring sums.


### Flashcard
For each character, count substrings where it appears as a new distinct character by tracking its last occurrence—O(n) with clever indexing.

### Tags
Hash Table(#hash-table), String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Count Unique Characters of All Substrings of a Given String(count-unique-characters-of-all-substrings-of-a-given-string) (Hard)
- Count Vowel Substrings of a String(count-vowel-substrings-of-a-string) (Easy)
- Vowels of All Substrings(vowels-of-all-substrings) (Medium)
- Find the Median of the Uniqueness Array(find-the-median-of-the-uniqueness-array) (Hard)