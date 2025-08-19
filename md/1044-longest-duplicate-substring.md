### Leetcode 1044 (Hard): Longest Duplicate Substring [Practice](https://leetcode.com/problems/longest-duplicate-substring)

### Description  
Given a string, find the **longest substring** which appears **at least twice** in the string (the duplicated substrings may overlap). If there are several answers, return any. If there is no such substring, return an empty string. Substrings must be contiguous and are allowed to overlap. Only lowercase English letters are present.

Example:  
- Input: `"banana"`
- Output: `"ana"`
- Here, `"ana"` appears twice (at positions 1 and 3) and overlaps.

### Examples  

**Example 1:**  
Input: `"banana"`  
Output: `"ana"`  
*Explanation: "ana" appears at positions 1-3 and 3-5 (overlap allowed). It is the longest duplicated substring.*

**Example 2:**  
Input: `"abcd"`  
Output: `""`  
*Explanation: No substring appears twice, return empty string.*

**Example 3:**  
Input: `"aaaaa"`  
Output: `"aaaa"`  
*Explanation: The substring "aaaa" appears at position 0-3 and 1-4. It's the longest duplicated substring (other possible outputs: "aaa").*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - Try all possible substrings, check if it appears more than once.  
  - There are O(n²) substrings, checking each would take at least O(n), so overall O(n³). Too slow for n up to 10⁵.

- **Improvements:**  
  - Use a **hash set** to check duplicated substrings for a given length in O(n).  
  - Try all lengths using this technique.

- **Optimized Approach:**  
  - Use **Binary Search** for the possible substring length. For each length k, check if there exists a duplicated substring of length k.
    - Binary search between 1 and n, check via hash set (or rolling hash for fast substring comparison).
    - For each k, slide a window of length k, hash the substring, detect duplicates in O(n).
    - This gives O(n log n) time if substring checking is O(n).
  - To check if substrings are equal quickly, use **Rabin-Karp rolling hash**:
    - Convert substring to integer using rolling hash, store in a set for duplicates.
    - Handle possible hash collisions by checking the actual substrings for verification if needed.

- **Why this approach:**  
  - Handles large input efficiently (binary search × rolling hash is standard for substring search).  
  - Can be implemented without relying on language library tricks.

### Corner cases to consider  
- String with all unique characters: `"abcde"`
- String with all same characters: `"aaaaa"`
- Duplicated substrings overlap: `"aaaa"`
- No duplicate substrings exist: `"ab"`
- Input length at lower bound (`s` length = 2)
- Very long strings (performance for n = 100,000)

### Solution

```python
def longestDupSubstring(s):
    # Binary Search + Rolling Hash (Rabin-Karp)
    n = len(s)
    nums = [ord(c) - ord('a') for c in s]  # Convert chars to int
    mod = (1 << 63) - 1  # Large prime modulus
    
    def search(L):
        base = 26
        h = 0
        for i in range(L):
            h = (h * base + nums[i]) % mod
        hashes = {h}
        baseL = pow(base, L, mod)
        for start in range(1, n - L + 1):
            h = (h * base - nums[start-1] * baseL + nums[start+L-1]) % mod
            if h in hashes:
                return start
            hashes.add(h)
        return -1

    left, right = 1, n
    res_start = -1
    res_len = 0
    while left <= right:
        mid = left + (right - left) // 2
        pos = search(mid)
        if pos != -1:
            left = mid + 1
            res_start = pos
            res_len = mid
        else:
            right = mid - 1
    return s[res_start:res_start + res_len] if res_start != -1 else ""
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Rolling hash search per length: O(n)  
  - Binary search over length: O(log n)  
  - Total: O(n log n)

- **Space Complexity:**  
  - HashSet can store up to O(n) hash values.
  - Extra O(n) for integer representation of s.
  - Total: O(n)

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle **hash collisions** in the rolling hash?
  *Hint: Compare actual substrings on hash matches for verification.*

- How would your approach change if the string could contain **uppercase letters or digits**?
  *Hint: Use a larger base and map all possible input characters.*

- Can you extend this to find the **top k duplicated substrings** instead of just the longest?
  *Hint: Collect all duplicate hashes per length and use trie/data structures for efficient search.*

### Summary
This problem uses the **binary search + rolling hash (Rabin-Karp)** pattern to check for the existence of duplicated substrings efficiently. It’s a classic example of how substring searches in strings are optimized—other problems like "repeated substring pattern," "longest repeated substring using Trie/Suffix Array," and plagiarism detection use similar logic. Binary search divides possibilities, and rolling hash enables fast substring comparison.

### Tags
String(#string), Binary Search(#binary-search), Sliding Window(#sliding-window), Rolling Hash(#rolling-hash), Suffix Array(#suffix-array), Hash Function(#hash-function)

### Similar Problems
