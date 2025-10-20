### Leetcode 249 (Medium): Group Shifted Strings [Practice](https://leetcode.com/problems/group-shifted-strings)

### Description  
You are given a list of strings, and you need to group them such that strings in the same group are shifted versions of each other.  
A **shifted string** is formed by incrementing each character of a string by the same numeric amount (cyclically in the alphabet, so after 'z' comes 'a').  
For example, "abc" → "bcd" → ... → "xyz" are all shift versions in the same sequence.  
If you compare any two strings, they belong to the same group if the *relative difference* between each of their consecutive letters (modulo 26) forms the same pattern.  
Single-letter strings always belong together.

### Examples  

**Example 1:**  
Input: `["abc", "bcd", "acef", "xyz", "az", "ba", "a", "z"]`  
Output: `[["abc","bcd","xyz"],["acef"],["az","ba"],["a"],["z"]]`  
*Explanation:  
"abc", "bcd", and "xyz" all have differences [1,1].  
"acef" has differences [2,2,1], so it's separate.  
"az" and "ba" both have a difference of .  
"a" and "z" are single letters so go in separate groups.*

**Example 2:**  
Input: `["acd", "dfg", "wyz", "yab", "mop", "bdfh", "a", "x", "moqs"]`  
Output: `[["acd", "dfg", "wyz", "yab", "mop"], ["bdfh", "moqs"], ["a", "x"]]`  
*Explanation:  
Strings like "acd", "dfg", "wyz", "yab", "mop" all share the same shifting difference pattern [2,2].  
"bdfh", "moqs" have [1,2,1]. "a" and "x" are singles.*

**Example 3:**  
Input: `["xyz","yza","zab","abc","bcd"]`  
Output: `[["xyz","yza","zab","abc","bcd"]]`  
*Explanation:  
All have the same difference pattern [1,1].*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  For each string, try to compare against every other string and check if they are shift-equivalent.  
  This would be O(n²), which is not optimal.

- **Optimized:**  
  Observing the property:  
  - The grouping is determined by the *pattern* of consecutive character differences, modulo 26. This difference array is invariant of their starting letter.  
  - For each string, calculate the delta between each consecutive character:  
    For "abc", ('b'-'a', 'c'-'b') = (1,1)  
    For "xyz", ('y'-'x', 'z'-'y') = (1,1) (wrapping modulo 26).  
  - Use this difference (represented as a tuple) as a **key** to a hash map (dictionary), mapping to the group.

- **Trade-offs:**  
  - Time for each string is O(k), where k is the string's length, since we compute the difference pattern once.
  - Space efficiency is good, as we only store unique patterns as keys.

### Corner cases to consider  
- Empty input list []
- All input strings are of length 1
- All strings are unique, i.e., no shared shift pattern
- All strings belong to the same group
- Strings of varying lengths (cannot be grouped together)
- Characters ‘z’ wrapping around to ‘a’

### Solution

```python
def groupStrings(strings):
    from collections import defaultdict

    # Helper to build the key representing the pattern of differences
    def shift_key(s):
        if len(s) == 1:
            # All single letters have the same shift key, e.g. ()
            return ()
        # Build tuple of differences for consecutive characters, modulo 26
        return tuple((ord(s[i+1]) - ord(s[i])) % 26 for i in range(len(s) - 1))

    groups = defaultdict(list)

    for s in strings:
        key = shift_key(s)
        groups[key].append(s)

    return list(groups.values())
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k)  
  Where n = number of strings, k = maximum string length. For each string, building the difference key takes O(k).

- **Space Complexity:** O(n × k)  
  Accounts for storage of the grouped strings and the hash map. The key for each group is at most k-1 in size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle upper- and lower-case letters together?  
  *Hint: Should you normalize the case first?*

- What if we want the groups sorted internally by lex order?  
  *Hint: Sort each group before returning the result.*

- If input is huge, how can you reduce memory usage?  
  *Hint: Do grouping on the fly or use streaming output.*

### Summary
This problem leverages **hashing with canonicalization**—finding a unique signature representing each equivalence class.  
The approach uses *hash map grouping by difference pattern*, a pattern seen in many group-by-feature problems (like "Group Anagrams").  
The concept of a *normalized form as grouping key* can apply to several string transformation/grouping challenges.


### Flashcard
For each string, compute the difference pattern between consecutive letters modulo 26; group strings by identical patterns.

### Tags
Array(#array), Hash Table(#hash-table), String(#string)

### Similar Problems
- Group Anagrams(group-anagrams) (Medium)
- Find Maximum Number of String Pairs(find-maximum-number-of-string-pairs) (Easy)