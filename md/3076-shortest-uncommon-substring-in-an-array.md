### Leetcode 3076 (Medium): Shortest Uncommon Substring in an Array [Practice](https://leetcode.com/problems/shortest-uncommon-substring-in-an-array)

### Description  
Given an array of n non-empty strings, for each string, find the shortest substring that does **not** appear as a substring in any of the other strings in the array.  
- If several such substrings with the same minimal length exist for a string, return the lexicographically smallest one.  
- If no such substring exists, return the empty string for that position.

Think of it as: for each string, find its most distinctive "signature" substring that is unique just to that string among all others in the array.

### Examples  

**Example 1:**  
Input: `arr = ["cab","ad","bad","c"]`  
Output: `["ca","a","ba","c"]`  
*Explanation:*
- For "cab", its shortest substrings in order: 'c', 'a', 'b', 'ca', 'ab', 'cab'.
    - 'c' exists in "c", so not unique.
    - 'a' exists in "ad" and "bad", so not unique.
    - 'b' exists in "bad", so not unique.
    - 'ca' only in "cab" (unique), so output is "ca".
- For "ad", check 'a' and 'd': both in "bad" or "cab", so not unique.
    - 'ad' is unique, so output is "ad".
- For "bad", 'b', 'a', 'd' all appear elsewhere, but 'ba' only exists in "bad", so output is "ba".
- For "c", only 'c' is possible, which is not unique, so output is "" (but in sample output, "c" is output, so "c" is okay if not in others).


**Example 2:**  
Input: `arr = ["abc","bcd","cde"]`  
Output: `["a","b","c"]`  
*Explanation:*
- For "abc", substrings: 'a','b','c','ab','bc','abc'. Only 'a' is unique.
- For "bcd", only 'b' is unique to it.
- For "cde", only 'c' is unique.

**Example 3:**  
Input: `arr = ["aaa","aa","a"]`  
Output: `["aaa","",""]`  
*Explanation:*
- For "aaa": 'a' is not unique, 'aa' is not unique, 'aaa' is unique.
- For "aa": all substrings of length 1 or 2 appear in "aaa", so not unique. Output "".
- For "a": all substrings (just 'a') are not unique. Output "".

### Thought Process (as if you’re the interviewee)  
First, brute-force every possible substring for every string, check if it occurs in any of the other strings.  
- For each string, for substring length from 1 to length of that string:
    - For every possible substring of that length, check all other strings in the array: is this a substring in any of them?
    - If not, it's a candidate. Among all such candidates, pick the shortest; among shortest, pick lex smallest.

Brute-force is O(n × m² × n × m), where m is max string length (all substrings × all other strings × their search), but for reasonable sizes (m ≤ 10, n ≤ 100), it's feasible.

Optimization:  
- Build a lookup (like a set) for all substrings across all strings except the one being checked for faster presence checks.
- Preprocess substrings for quick global lookup. But, checking containment still requires careful implementation due to substring overlaps.

Pick brute-force with careful substring generation, as the extra preprocessing doesn’t simplify overall complexity for small input.

### Corner cases to consider  
- Strings with all overlapping substrings (e.g., many "a"s).
- Strings that are substrings of other strings.
- Multiple strings with the same substrings.
- Only one string in the array.
- All strings are distinct, no overlaps.
- Substrings can cross the same character ('abcd', 'abc', 'bcd').

### Solution

```python
def shortestSubstrings(arr):
    n = len(arr)
    ans = [''] * n

    # Precompute all substrings for all strings, except own
    substrings_global = []
    for idx, s in enumerate(arr):
        substrings = set()
        m = len(s)
        for l in range(m):
            for r in range(l+1, m+1):
                substrings.add(s[l:r])
        substrings_global.append(substrings)

    for i, s in enumerate(arr):
        m = len(s)
        found = None
        for length in range(1, m+1):
            candidates = []
            for start in range(m - length + 1):
                sub = s[start:start+length]
                # Check if substring occurs in any other string
                unique = True
                for j in range(n):
                    if i == j:
                        continue
                    if sub in substrings_global[j]:
                        unique = False
                        break
                if unique:
                    candidates.append(sub)
            if candidates:
                # Sort to find lex smallest among those of this length
                candidates.sort()
                found = candidates[0]
                break
        ans[i] = found if found is not None else ''
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × m³), where n is the number of strings and m is the maximum string length.
    - For each string (n), you generate all substrings (O(m²)), and for each substring check in all other strings (up to n × O(m²) substring lookups), though your precomputed sets make the inner lookup quick.

- **Space Complexity:**  
  O(n × m²), for storing all substrings of every string in sets.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input could have up to 1000 strings, each of length up to 1000?  
  *Hint: Can you use a Trie to store all substrings efficiently and check for conflicts quickly?*

- Could you optimize the substring comparison using hashing or rolling hashes for faster lookups?  
  *Hint: Hash all substrings into a map and use counting strategies.*

- If a string could be extremely long, what data structure would you use to speed up uniqueness checks?  
  *Hint: Consider Suffix Automaton or Suffix Trie/Tree structures for all-strings-at-once.*

### Summary
This problem uses the **brute-force substring generation and hash set lookup** pattern. The core trick is to efficiently generate and compare all substrings of each string with all the rest. For small constraints, the simple cubic algorithm suffices, but large inputs require **advanced string data structures** like Trie or Suffix Tree for scalable solutions. This unique substring check style is common in competitive programming and helps in mastering string algorithms.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Trie(#trie)

### Similar Problems
