### Leetcode 3541 (Easy): Find Most Frequent Vowel and Consonant [Practice](https://leetcode.com/problems/find-most-frequent-vowel-and-consonant)

### Description  
Given a string `s` containing only lowercase English letters, find the vowel (one of 'a', 'e', 'i', 'o', 'u') and the consonant (all other letters) with the highest frequency.  
Return the sum of these two frequencies.  
If there are no vowels or no consonants in the string, consider their respective frequency as 0.  
If there is a tie in maximum frequency among vowels or consonants, you may pick any one.

### Examples  

**Example 1:**  
Input: `s = "successes"`  
Output: `6`  
Explanation:  
Vowels: 'u' (1), 'e' (2) ⇒ Max vowel freq = 2  
Consonants: 's' (4), 'c' (2) ⇒ Max consonant freq = 4  
Sum = 2 + 4 = 6.

**Example 2:**  
Input: `s = "aeiaeia"`  
Output: `3`  
Explanation:  
Vowels: 'a' (3), 'e' (2), 'i' (2) ⇒ Max vowel freq = 3  
No consonants exist ⇒ Max consonant freq = 0  
Sum = 3 + 0 = 3.

**Example 3:**  
Input: `s = "xzyz"`  
Output: `3`  
Explanation:  
Consonants: 'z' (2), 'x' (1), 'y' (1) ⇒ Max consonant freq = 2  
No vowels exist ⇒ Max vowel freq = 0  
Sum = 0 + 2 = 2.

### Thought Process (as if you’re the interviewee)  
First, since the alphabet is small, I want to count the frequency of each letter.  
A brute-force would be, for each vowel and consonant, loop and count, but that's O(n) per character, which is inefficient.  
So, I'll use a single pass: create a frequency array for all 26 letters.

- Walk through the string once and count the occurrence for each letter.
- For vowels ('a','e','i','o','u'), keep track of the max seen in the frequency array.
- For consonants (all other letters), do the same.
- Finally, sum the two maximum values found.

This uses simple logic, is O(n), and space is O(1) since the alphabet is fixed size.

### Corner cases to consider  
- Input contains only vowels → max consonant freq = 0  
- Input contains only consonants → max vowel freq = 0  
- Input contains a single character  
- Ties in frequency (e.g., two vowels occur twice)  
- Empty string (though according to constraints, s has at least 1 char)

### Solution

```python
def findMostFrequentVowelAndConsonant(s):
    # Initialize array of 26 to count each letter's frequency
    freq = [0] * 26
    vowels = {'a', 'e', 'i', 'o', 'u'}
    
    # Count frequency of each letter
    for ch in s:
        idx = ord(ch) - ord('a')
        freq[idx] += 1

    max_vowel = 0
    max_consonant = 0

    for i in range(26):
        ch = chr(ord('a') + i)
        if freq[i] == 0:
            continue
        if ch in vowels:
            if freq[i] > max_vowel:
                max_vowel = freq[i]
        else:
            if freq[i] > max_consonant:
                max_consonant = freq[i]
    
    return max_vowel + max_consonant
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we make just one pass through the string to count frequencies, and another constant pass over the 26 letters (which is O(1)).
- **Space Complexity:** O(1), since the frequency array is always of size 26 (not dependent on input).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you have to break ties by picking the lexicographically smallest vowel/consonant?  
  *Hint: Track both max frequency and the corresponding letter, update only if the new letter has a higher freq, or equal freq but smaller lexicographically.*

- What if the input string can include uppercase letters?
  *Hint: Normalize the case by converting to lowercase at the start.*

- Could you return which vowel and consonant had the max frequency, not just their sum?
  *Hint: Store both max frequency and which character produced that frequency, then return both values.*

### Summary
This problem is a classic use of frequency counting and simple category separation (vowel/consonant), using fixed-size arrays and constant extra space. The coding pattern is similar to many string counting/interview problems (e.g., most frequent character, anagram counts), and can be applied in many contexts where character grouping and frequency are involved.

### Tags
Hash Table(#hash-table), String(#string), Counting(#counting)

### Similar Problems
