### Leetcode 567 (Medium): Permutation in String [Practice](https://leetcode.com/problems/permutation-in-string)

### Description  
Given two strings, **s1** and **s2**, determine if **s2** contains a contiguous substring that is a permutation of **s1**.  
A permutation means all the same characters as **s1**—with identical frequency—but possibly in a different order, and the substring must be continuous within **s2**.

### Examples  

**Example 1:**  
Input: `s1 = "ab", s2 = "eidbaooo"`  
Output: `True`  
*Explanation: "ba" is a substring of s2 and is also a permutation of s1 ("ab").*

**Example 2:**  
Input: `s1 = "ab", s2 = "eidboaoo"`  
Output: `False`  
*Explanation: No substring matches the character frequency of "ab".*

**Example 3:**  
Input: `s1 = "hello", s2 = "ooolleoooeh"`  
Output: `False`  
*Explanation: No substring has exactly the same character frequency as "hello".*

### Thought Process (as if you’re the interviewee)  
The naive approach is to check every substring of **s2** of length equal to **s1**, and for each, check if it’s a permutation (i.e., the characters and their counts match). This approach checks all O(m-n+1) substrings (if |s2|=m and |s1|=n), and for each substring, counts or sorts the characters, resulting in inefficient O(n\*(m-n+1)) time.

A better solution uses a **sliding window** of size equal to **s1.length** over **s2**:
- For each window, maintain a frequency count for characters.
- Compare this count with the count for **s1**.
- Instead of rebuilding counts from scratch, update the count as the window slides (remove the leftmost character and add the new rightmost character).

Once the two counts match, **s2** contains a permutation of **s1**.

Trade-offs:  
- Brute-force is easy to code but slow for large inputs.
- Sliding window with frequency counters provides O(m) time with O(1) space (since only 26 lowercase letters).

### Corner cases to consider  
- s1 is longer than s2 (always return False)
- s1 or s2 is empty
- s1 or s2 contains repeated characters
- s2 contains multiple, possibly overlapping, permutations of s1
- All characters of s1 are the same
- s2’s length equals s1’s length (must compare directly)

### Solution

```python
def checkInclusion(s1: str, s2: str) -> bool:
    # Edge case: s1 is longer than s2
    len1, len2 = len(s1), len(s2)
    if len1 > len2:
        return False

    # Frequency arrays for 'a' to 'z'
    freq1 = [0] * 26
    freq2 = [0] * 26

    # Count frequencies for s1 and for first window in s2
    for i in range(len1):
        freq1[ord(s1[i]) - ord('a')] += 1
        freq2[ord(s2[i]) - ord('a')] += 1

    # If initial window matches, return True
    if freq1 == freq2:
        return True

    # Slide the window over s2
    for i in range(len1, len2):
        # Add new right character
        freq2[ord(s2[i]) - ord('a')] += 1
        # Remove old left character
        freq2[ord(s2[i - len1]) - ord('a')] -= 1
        if freq1 == freq2:
            return True

    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m), where m = length of s2. Each window is updated in constant time (only 26 counts), sliding over s2 once.
- **Space Complexity:** O(1). Both frequency arrays are of size 26, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the strings could have unicode or mixed-case characters?  
  *Hint: Consider using a hash map instead of fixed-length arrays.*

- How would you return all start indices of permutations if required (like "Find All Anagrams" problem)?  
  *Hint: Store indices where the frequency arrays match.*

- Can you solve it in-place if memory was a concern?  
  *Hint: Reuse arrays, or minimize data structures further.*

### Summary
This solution uses the **fixed-size sliding window** pattern with frequency counting, a fundamental technique for substring matching and anagram detection. It’s widely applicable in problems like “Find All Anagrams in a String,” “Minimum Window Substring,” and real-world tasks such as DNA matching or spell-checking.