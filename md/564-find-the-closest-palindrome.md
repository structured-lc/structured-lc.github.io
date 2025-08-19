### Leetcode 564 (Hard): Find the Closest Palindrome [Practice](https://leetcode.com/problems/find-the-closest-palindrome)

### Description  
You are given a string `n` representing a positive integer (possibly a very large one). Your task is to return the **closest** integer (not equal to itself) to `n` that is also a palindrome.  
- If two palindromes are equally close, return the smaller one.
- Palindrome numbers read the same forwards and backwards (e.g. 121, 99, 888).

### Examples  

**Example 1:**  
Input: `n = "123"`  
Output: `"121"`  
Explanation: 121 and 131 are the closest palindromes, but 121 is smaller.

**Example 2:**  
Input: `n = "1"`  
Output: `"0"`  
Explanation: 0 is the only smaller palindrome.

**Example 3:**  
Input: `n = "1000"`  
Output: `"999"`  
Explanation: The palindromes closest to 1000 are 999 and 1001. 999 is closer.

### Thought Process (as if you’re the interviewee)  
- **Brute-force**: Try each number before and after n, check for palindrome; but this quickly becomes inefficient for large numbers.
- **Optimal Observation**: The closest palindrome will have the same length as n, or one length more or less (e.g. 999 vs 1000 vs 1001)[2][3].
- **Approach**: 
  - Mirror the first half of n to form a palindrome candidate[2].
  - Try the nearest numbers by altering the first half by ±1 and mirroring again. This handles cases like 1000 (→999 and 1001).
  - Always consider edge palindromes: e.g., 10...01, 9...9 for n like 1000, 100...001[2][3].
  - Pick the candidate with smallest absolute difference from n (excluding n). If tie, pick the smaller[2][4].
- **Why this works**: Close palindromes near n come from tweaking the prefix and mirroring; rarely from wild distant strings.

### Corner cases to consider  
- Single digit numbers ("1" → "0" or "2" → "1").
- Numbers like "10...01" that become smaller one-digit-less palindromes ("1000" → "999").
- Numbers like "99...99" that become larger palindromes ("999" → "1001").
- Input is already a palindrome (should not return itself).
- Leading zeros are never present in the output.

### Solution

```python
def nearestPalindromic(n: str) -> str:
    l = len(n)
    num = int(n)
    # Set for candidates
    candidates = set()
    
    # Edge case: 10...01 (e.g., 1000->999, 1001)
    candidates.add(str(10**(l-1) - 1))     # 999 for n=1000
    candidates.add(str(10**l + 1))         # 10001 for n=9999

    # Find prefix and build palindromes by mirroring
    prefix = int(n[:(l+1)//2])      # Half of the number, rounded up

    for i in [-1, 0, 1]:
        new_prefix = str(prefix + i)
        # Build palindrome by mirroring prefix
        if l % 2 == 0:
            pal = new_prefix + new_prefix[::-1]
        else:
            pal = new_prefix + new_prefix[:-1][::-1]
        candidates.add(pal)

    candidates.discard(n) # Do not include itself

    # Find the closest by absolute difference, tidy for string comparison
    min_diff = float('inf')
    result = ''
    for cand in candidates:
        if cand == n or cand.startswith('-'):
            continue
        cand_num = int(cand)
        diff = abs(cand_num - num)
        if diff < min_diff or (diff == min_diff and cand_num < int(result or '1'*20)):
            min_diff = diff
            result = cand
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n)  
  Reason: Only a handful (5-6) palindrome candidates are generated—mirrored variants and edge palindromes. Each operation is O(length of n)[1][2].
- **Space Complexity:** O(log n)  
  Reason: The space for candidates (set of strings) and to store mirrored parts is O(length of n)[1].

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle negative numbers?  
  *Hint: Negatives aren't seen as positive palindromes, clarify spec or return.*

- What if the number can have leading zeros?  
  *Hint: Palindromes with leading zeros are not valid; how would you prevent accidental outputs like "010".*

- If n is guaranteed to be a palindrome, do we return the next closest, or can we return n itself?  
  *Hint: The problem spec says not to return itself.*

### Summary
This is a classic **"mirror/candidate set + scan"** problem: generate all reasonable palindrome candidates by mirroring around the "center" and adjusting (prefix±1). Handle length change cases, check all candidates, and pick the closest one.  
This pattern—generating minimal variants and picking by metric—shows up in palindrome, number game, and string-to-target-difference problems.

### Tags
Math(#math), String(#string)

### Similar Problems
- Find Palindrome With Fixed Length(find-palindrome-with-fixed-length) (Medium)
- Next Palindrome Using Same Digits(next-palindrome-using-same-digits) (Hard)
- Find the Count of Good Integers(find-the-count-of-good-integers) (Hard)
- Find the Largest Palindrome Divisible by K(find-the-largest-palindrome-divisible-by-k) (Hard)