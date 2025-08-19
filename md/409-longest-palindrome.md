### Leetcode 409 (Easy): Longest Palindrome [Practice](https://leetcode.com/problems/longest-palindrome)

### Description  
Given a string containing only uppercase and lowercase letters (case-sensitive), return the length of the longest palindrome that can be built with those letters. You may use each letter at most as many times as it appears in the string. The palindrome does not need to be a substring—the task is simply to pick the largest multiset of letters from the input that can form a palindrome.

### Examples  

**Example 1:**  
Input: `s = "abccccdd"`  
Output: `7`  
*Explanation: We can use “dccaccd”, “dccbccd”, etc. (the order doesn’t matter, total length = 7). The single extra character can go in the center. The pairs are: 2×'c', 2×'d', and 'a'/'b' can be used once at the center.*

**Example 2:**  
Input: `s = "a"`  
Output: `1`  
*Explanation: The only palindrome is “a” itself.*

**Example 3:**  
Input: `s = "Aa"`  
Output: `1`  
*Explanation: “Aa” is not a palindrome (case-sensitive). You can use either “A” or “a” as a single-letter palindrome.*

### Thought Process (as if you’re the interviewee)  

The brute-force way is to generate all permutations of the letters and check if any form a palindrome, then find the longest. But that's clearly infeasible due to the factorial time complexity.

Instead, let's analyze the properties of palindromes:
- They are symmetric. Each character must appear an even number of times, except *possibly* for one character—which can appear once in the middle if the length is odd.
- For each letter, we can take its count divided by 2, times 2—i.e., count only even pairs.
- If there’s at least one letter left over (with odd count), we can put it in the center—so we add 1 at the end if at least one letter had an odd count.

The optimal approach:
- Count the frequency of each character.
- For each character count, add (count // 2) × 2 to the palindrome length (i.e., use up as many as possible in pairs).
- If there’s any character with an odd count, add 1 to the result for the center.

This logic uses a dictionary or an array (since input is only letters) and a single pass.

### Corner cases to consider  
- Empty string: should return 0.
- All unique letters: should return 1 (any single letter by itself).
- All same letter: should return the whole length.
- Case sensitivity: “Aa” is not a palindrome.
- Input with both lower and upper cases mixed.

### Solution

```python
def longestPalindrome(s):
    # Dictionary to store frequency of each character
    freq = {}
    for char in s:
        freq[char] = freq.get(char, 0) + 1

    length = 0
    odd_found = False

    for count in freq.values():
        # Add maximum number of paired letters
        length += (count // 2) * 2
        # If we found an odd count, reserve one for center
        if count % 2 == 1:
            odd_found = True

    # If any odd count exists, we can put one letter in the center
    if odd_found:
        length += 1

    return length
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input string. We do one pass to count, then another pass through at most 52 keys (upper + lower case).
- **Space Complexity:** O(1) (since character set is fixed 52 letters, dictionary size is constant), or O(n) if considering input and storage for arbitrary unicode.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the approach if you needed to return the actual palindrome string, not just its length?  
  *Hint: You need to build the left and right halves and optionally put the odd center character in between.*

- How does your approach change if the input contains unicode or more than just letters?  
  *Hint: Change the frequency map to accommodate an expanded set and the logic remains the same.*

- Can you solve the problem if the input is streaming (cannot store all input at once)?  
  *Hint: Only store letter counts incrementally; compute answer after processing stream.*

### Summary

This problem is a classic *hashmap counting / greedy* pattern—track frequencies, maximize paired usage, and optimize for a possible central character. It's a common template that applies to problems where element pairing, grouping, or symmetry is required, such as anagram or arrangement challenges.

### Tags
Hash Table(#hash-table), String(#string), Greedy(#greedy)

### Similar Problems
- Palindrome Permutation(palindrome-permutation) (Easy)
- Longest Palindrome by Concatenating Two Letter Words(longest-palindrome-by-concatenating-two-letter-words) (Medium)
- Largest Palindromic Number(largest-palindromic-number) (Medium)