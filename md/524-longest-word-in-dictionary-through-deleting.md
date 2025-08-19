### Leetcode 524 (Medium): Longest Word in Dictionary through Deleting [Practice](https://leetcode.com/problems/longest-word-in-dictionary-through-deleting)

### Description  
Given a string **s** and a string array **dictionary**, find the *longest word* in the dictionary that can be formed by deleting some characters from **s** without rearranging them (so, the word is a subsequence of **s**). If there are multiple results with the same length, return the one that is *lexicographically smallest*. If no word from the dictionary fits, return an empty string.

### Examples  

**Example 1:**  
Input: `s = "abpcplea"`, `dictionary = ["ale","apple","monkey","plea"]`  
Output: `"apple"`  
*Explanation: We can form "apple" by deleting certain characters from s. It's the longest possible, and among words of length 5, "apple" is lexicographically before "plea".*

**Example 2:**  
Input: `s = "abpcplea"`, `dictionary = ["a","b","c"]`  
Output: `"a"`  
*Explanation: All three words can be formed, but "a" is lexicographically smallest.*

**Example 3:**  
Input: `s = "bab"`, `dictionary = ["ba","ab","a","b"]`  
Output: `"ab"`  
*Explanation: "ab" and "ba" both have length 2, but "ab" is lexicographically smaller.*

### Thought Process (as if you’re the interviewee)  
First, I need to check for each word in the dictionary if it is a *subsequence* of s (can be formed by deleting some characters from s).  
A brute-force is to check each dictionary word by walking through s and matching characters one by one. For each word, use two pointers: one for s, one for the dictionary word. If we match all characters in the dictionary word before running out of s, it's a valid candidate.

Once I have all valid candidates, pick the *longest*. In case of ties (same length), pick the *lexicographically smallest* word.

To optimize, I can iterate through the dictionary once, using the above method for each word, and keep updating my result as I go. Since s and dictionary lengths are up to 1000, this O(len(dictionary) × len(s)) approach is acceptable.

Trade-offs:
- Sorting the dictionary for length and lexicographical order can help avoid manual comparison for the answer, but for clarity and code simplicity, updating the answer during iteration is clean and sufficient.

### Corner cases to consider  
- dictionary is empty → return ""
- s is empty → only empty string words in dictionary can be matched
- Multiple words with same length, must check lexicographical order strictly
- Words are longer than s or with characters not in s
- s and dictionary entries with duplicate characters
- All words require characters that don't appear in s

### Solution

```python
def findLongestWord(s, dictionary):
    def is_subsequence(word, s):
        # Check if word is a subsequence of s using two pointers
        i = 0  # pointer for s
        for char in word:
            # Find char in s starting from i
            while i < len(s) and s[i] != char:
                i += 1
            if i == len(s):  # Reached end of s without matching char
                return False
            i += 1  # move pointer for next char in word
        return True

    result = ""
    for word in dictionary:
        if is_subsequence(word, s):
            # If longer, take this word
            if len(word) > len(result):
                result = word
            # If same length, but lexicographically smaller, take it
            elif len(word) == len(result) and word < result:
                result = word
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(D × S), where D = len(dictionary) and S = len(s). For every word, we scan through s in the worst case.
- **Space Complexity:** O(1) extra (not counting input), aside from the output string. No extra large data structures used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the dictionary is very large (e.g., millions of words)?  
  *Hint: Can you preprocess s to speed up each is_subsequence check, e.g., using character indices and binary search?*

- What if you need to return all matching words, not just one?  
  *Hint: Modify your storage and result selection logic.*

- Can you do it online? Given many queries for different dictionary words and a fixed s?  
  *Hint: Preprocess s for fast subsequence checks.*

### Summary
This solution is based on the **two-pointer technique for checking subsequences** and **greedy selection** for longest and lexicographically smallest word. The pattern is common when selecting optimal elements with constraints.  
This approach is also used for "is subsequence"-type problems and "selecting best among candidates" questions, making it very useful for string matching and filtering tasks.

### Tags
Array(#array), Two Pointers(#two-pointers), String(#string), Sorting(#sorting)

### Similar Problems
- Longest Word in Dictionary(longest-word-in-dictionary) (Medium)