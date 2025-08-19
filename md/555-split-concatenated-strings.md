### Leetcode 555 (Medium): Split Concatenated Strings [Practice](https://leetcode.com/problems/split-concatenated-strings)

### Description  
Given an array of strings `strs`, you can concatenate all the strings together into a loop, where for each string, you may either keep it as is or reverse it (but the order of the strings in the list cannot change). You then "cut" the loop at any position (breaking it into a standard linear string starting at that cut).  
Your job is to choose the configuration and cut so that the resulting string is **lexicographically largest** possible.

### Examples  

**Example 1:**  
Input: `strs = ["abc","xyz"]`  
Output: `"zyxcba"`  
*Explanation: Possible loops include: "abcxyz", "abczyx", "cbaxyz", "cbazyx".  
By reversing both, you can get "cbazyx". If you cut right before the 'a', the resulting string is "zyxcba", which is the largest possible.*

**Example 2:**  
Input: `strs = ["abc"]`  
Output: `"cba"`  
*Explanation: Only options are "abc" and "cba". "cba" is larger (cut at start of reversed string).*

**Example 3:**  
Input: `strs = ["aaa","bbb","ccc"]`  
Output: `"cccbbbaaa"`  
*Explanation: By reversing all or none, and cutting at the right place, the largest is with the reversed last string at the front, i.e., "cccbbbaaa".*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea**: Try all \(2^{n}\) ways of reversing or not each string (n = len(strs)), then for each, try all possible cut positions (O(total string length)). This is not realistic since n can be up to 1000.
- **Optimize**:  
  - For each string, it only matters if it's kept as-is or reversed, so for each, we can immediately replace it with its reversed version if that's larger.
  - Do a **greedy** pre-processing: for each string \(s\), set \(s = \max(s, s[::-1])\) so we always use the lexicographically larger orientation.
  - For each string in `strs`, consider it as the one being "broken" (where the cut will be). For each of its two orientations (original and reversed), for every cut position in that string, create the string by:
    - Put the suffix of that string after the cut.
    - Concatenate all the other (already maximized) strings in the current order.
    - Then append the prefix (before the cut).
    - Check if this is the max string so far.
  - Continue for all positions and all orientations.
- This approach avoids brute-force and makes it feasible, processing each string and cut efficiently.

### Corner cases to consider  
- Single string: Just check both original and reversed.
- Strings with same content (all "a", etc.): Multiple answers are possible, pick lexicographically largest.
- Every string of length 1: ["z", "y", "x"]
- All strings are palindromes.
- The optimal solution may require reversing only some of the strings.
- Strings with different lengths.

### Solution

```python
def splitLoopedString(strs):
    # Step 1: Precompute the best orientation (original or reversed) for each string
    strs = [max(s, s[::-1]) for s in strs]
    n = len(strs)
    ans = ""
    
    for i in range(n):
        original = strs[i]
        reversed_str = original[::-1]
        
        for candidate in [original, reversed_str]:
            len_s = len(candidate)
            # Try every possible cut within this string
            for j in range(len_s):
                # Suffix from j to end, then all the other strings after i, then strings before i, then prefix 0 to j
                suffix = candidate[j:]
                prefix = candidate[:j]
                # Strings after i, then before i:
                rest = []
                for k in range(i+1, n):
                    rest.append(strs[k])
                for k in range(i):
                    rest.append(strs[k])
                middle = ''.join(rest)
                cur = suffix + middle + prefix
                if cur > ans:
                    ans = cur
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × L²), with n = number of strings, L = maximum string length.  
  - For each string (n), process two orientations, and for each, consider all cut positions (up to L).  
  - For each cut, concatenation involves O(total input size).
  - Since the total input string length is ≤1000, this is feasible.
- **Space Complexity:** O(total string length), due to storage for all strings and temporary concatenations.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could also reorder the strings as you like?  
  *Hint: Now you're permuting `strs`; consider sort by best possible orientation of each string.*

- What if you can only reverse one string?  
  *Hint: Consider all choices for the single reversal and pick the best.*

- What if uppercase and lowercase are mixed and you want lexicographical order treating uppercase < lowercase?  
  *Hint: Use appropriate custom comparison with language/tools to distinguish cases.*

### Summary
This problem uses **string orientation optimization** (greedily set each string to its maximal form), and for each, simulates the effect of making the cut at every possible point in every string.  
The key pattern is to optimize local choices then globally "cut" the combined result—found often in string problems, rotations, and array manipulations. This approach can be adapted for problems involving finding the optimal rotation or concatenation under constraints.

### Tags
Array(#array), String(#string), Greedy(#greedy)

### Similar Problems
