### Leetcode 893 (Medium): Groups of Special-Equivalent Strings [Practice](https://leetcode.com/problems/groups-of-special-equivalent-strings)

### Description  
Given an array of **strings** all of the same length, two strings are considered *special-equivalent* if you can transform one into the other by any number of swaps of **even-indexed** characters (between themselves) or **odd-indexed** characters (between themselves). The task is to count how many groups of special-equivalent strings are in the array—where each group contains strings that are mutually special-equivalent, and no string outside a group is special-equivalent with those inside.

### Examples  

**Example 1:**  
Input: `["a", "b", "c", "a", "c", "c"]`  
Output: `3`  
Explanation: Three groups: `["a", "a"]`, `["b"]`, `["c", "c", "c"]`

**Example 2:**  
Input: `["aa", "bb", "ab", "ba"]`  
Output: `4`  
Explanation: Four groups: `["aa"]`, `["bb"]`, `["ab"]`, `["ba"]`

**Example 3:**  
Input: `["abc", "acb", "bac", "bca", "cab", "cba"]`  
Output: `3`  
Explanation:  
- Group 1: `["abc", "cba"]` (odd and even swaps can transform one into another)  
- Group 2: `["acb", "bca"]`  
- Group 3: `["bac", "cab"]`

### Thought Process (as if you’re the interviewee)  

Start by examining which operations are allowed: you can swap letters, but only within their even or odd index positions. 

Brute-force:  
- Try to generate all possible equivalent forms for each string by making all possible valid swaps, and use them to group the strings.  
- This would be **very inefficient** as the number of permutations grows rapidly with string length.

Optimization:  
- Notice that the final arrangement of letters at even indexes is independent from those at odd indexes (since swaps never mix the two).
- So, for each string:
    - Extract the letters at even positions, sort them.
    - Extract the letters at odd positions, sort them.
    - Concatenate the results to form a normalized "signature".
- All strings with the same signature are in the same special-equivalent group.
- Use a set to collect unique signatures—its size is the answer.

Trade-offs:  
- This approach ensures: O(n \* k \* log k) time (where n = #strings, k = length),  
   and is easy to implement and highly effective for all constraint-sizes.

### Corner cases to consider  
- Input is empty (`[]`)
- All strings are identical
- All characters are the same (e.g. `["aaa", "aaa"]`)
- All strings are completely distinct, even after normalization
- Strings of length 1 (only one group per unique single character)

### Solution

```python
def numSpecialEquivGroups(words):
    # Set to track unique "signatures"
    unique = set()

    for word in words:
        # Characters at even indexes (0,2,4,...)
        evens = [word[i] for i in range(0, len(word), 2)]
        # Characters at odd indexes (1,3,5,...)
        odds = [word[i] for i in range(1, len(word), 2)]

        # Sort both lists individually
        evens.sort()
        odds.sort()

        # Form the signature as a tuple of both sorted character lists
        signature = (tuple(evens), tuple(odds))
        unique.add(signature)

    return len(unique)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k × log k)
    - n = number of strings
    - k = length of each string
    - For each string, sorting even and odd indexes (each up to ⌊k/2⌋), so total O(k log k) per string  
- **Space Complexity:** O(n × k)
    - Up to n signatures, each storing up to k/2 characters per even and odd half

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle strings of different lengths?
  *Hint: Would special-equivalence still make sense? What if string lengths can be different?*  

- Could you optimize further by not using tuple of sorted chars as signature?
  *Hint: Can you use count arrays instead?*  

- How would you group and output all actual groups (not just the count)?
  *Hint: Instead of a set, use a dict mapping signature → list of words.*

### Summary
The approach leverages the **normalizing-by-sorting pattern**—making use of the fact that only character position parity matters due to allowed swaps. This is a common technique for classifying anagrams and would apply to any problem where portions of a string can be reorganized independently (such as generalized group-anagrams problems).

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Sorting(#sorting)

### Similar Problems
