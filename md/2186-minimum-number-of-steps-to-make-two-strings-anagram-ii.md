### Leetcode 2186 (Medium): Minimum Number of Steps to Make Two Strings Anagram II [Practice](https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram-ii)

### Description  
Given two strings **s** and **t**, you must determine the minimum number of characters you need to add to either string so that both strings become anagrams of each other.  
An anagram uses all original characters exactly once, but **you are only allowed to append characters at the end** of either string (not replace or remove).  
Each step involves appending a single character of your choice to the end of **either** string.

### Examples  

**Example 1:**  
Input: `s = "aba", t = "abb"`  
Output: `2`  
*Explanation:  
"s" is missing a 'b', "t" is missing an 'a'.  
Add 'b' to "s" ("aba" → "abab") and 'a' to "t" ("abb" → "abba"). Now both strings = "abab", which are anagrams.*

**Example 2:**  
Input: `s = "leetcode", t = "coats"`  
Output: `7`  
*Explanation:  
Count all letter differences:  
s: l(1), e(3), t(1), c(1), o(1), d(1)  
t: c(1), o(1), a(1), t(1), s(1)  
Difference:  
l(1 from s), e(3 from s), d(1 from s), a(1 from t), s(1 from t)  
Total = 1 + 3 + 1 + 1 + 1 = 7 steps needed.*

**Example 3:**  
Input: `s = "night", t = "thing"`  
Output: `0`  
*Explanation:  
Both are already anagrams—no steps needed.*

### Thought Process (as if you’re the interviewee)  
My first instinct is to count the frequency of each character in both strings.  
For two strings to be anagrams, each must have the same number of each character.  
For each character, the difference in counts shows how many times we must append that specific character to either **s** or **t**.  
I can sum over all character types, adding up the **absolute difference** in their counts, to get the total steps required.

Brute-force (inefficient):  
Try all possible append combinations, check for anagram after each. Exponential time—too slow.

Optimized:  
- Use two arrays (or dicts) to store counts of 'a' to 'z' in s and t
- For each character, compute |countₛ - countₜ| and sum them up  
- No need to actually append—just report the minimal steps required

This approach is O(n + m) time (scan both strings once each), O(1) space (since alphabet size is fixed for lower-case English letters).

### Corner cases to consider  
- Both strings empty → answer is 0
- One string empty → sum of all characters in the other string (all need to be appended)
- Strings already anagrams → 0
- Strings with completely non-overlapping characters (i.e., no letters in common)

### Solution

```python
def min_steps_to_anagram(s: str, t: str) -> int:
    # Initialize counts for 26 lowercase letters
    count_s = [0] * 26
    count_t = [0] * 26

    # Count frequency for each letter in s
    for ch in s:
        idx = ord(ch) - ord('a')
        count_s[idx] += 1

    # Count frequency for each letter in t
    for ch in t:
        idx = ord(ch) - ord('a')
        count_t[idx] += 1

    # For each letter, add up absolute difference in frequency
    total_steps = 0
    for i in range(26):
        total_steps += abs(count_s[i] - count_t[i])

    return total_steps
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n = len(s) and m = len(t); only single pass each string, then a fixed loop over 26 letters.
- **Space Complexity:** O(1), because frequency arrays are always 26 elements regardless of input size (fixed alphabet).

### Potential follow-up questions (as if you’re the interviewer)  

- What if both strings could contain uppercase and lowercase letters?
  *Hint: You'd need an array of at least 52 or use a hashmap for all unicode characters.*

- What if we could also delete characters, not just append?
  *Hint: The solution would become the total number of characters that differ between s and t (as computed already), but details could vary if deletes are cheaper or more expensive than appends.*

- What if the allowed operation was replace, not append?
  *Hint: Can argmin(|countₛ - countₜ|), since each replacement can "fix" a pairwise difference.*

### Summary
This problem is a classic example of the **hash map / frequency counter pattern** for comparing two strings by character frequencies.  
Optimized for fixed, small alphabets, it generalizes to many anagram-related problems.  
Commonly used in coding interviews, text processing tasks, or anywhere anagram checks or minimal mutations are involved.