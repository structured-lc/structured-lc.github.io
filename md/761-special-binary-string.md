### Leetcode 761 (Hard): Special Binary String [Practice](https://leetcode.com/problems/special-binary-string)

### Description  
A **special binary string** is a binary string that has:
- an equal number of `'1'`s and `'0'`s,
- and every prefix of the string contains at least as many `'1'`s as `'0'`s.

You are given such a string `s`.  
You can swap any two adjacent, non-empty, special binary substrings within `s` at any time (the substrings must be consecutive, meaning the first ends right before the second starts).  
Your goal is to rearrange `s` using any number of such moves so that the result is **lexicographically largest** possible.

### Examples  

**Example 1:**  
Input: `s = "11011000"`  
Output: `11100100`  
*Explanation: We can break the string into ["1100", "1000"] (both special). Further, "1100" can be broken into ["10", "10"].  
Swapping substrings to maximize lex order:  
Split: ["1100", "1000"] ⇒ "1100" can become "11" + "00", and "1000" is ["10", "00"].  
Reordering gives "11100100".*

**Example 2:**  
Input: `s = "10"`  
Output: `10`  
*Explanation: Already "special", minimal length; no moves possible.*

**Example 3:**  
Input: `s = "101100"`  
Output: `110100`  
*Explanation: "101100" splits into ["10", "1100"]. Swapping these gives "110010";  
But within "1100", we can further reorder ["10", "10"] to "1010",  
So final: ["10", "1100"] → swap → ["1100", "10"] → expand inner "1100" → already "1100".  
So actual output is "110100".*

### Thought Process (as if you’re the interviewee)  

- The problem requires rearranging special substrings to achieve the lexicographically largest result under constrained moves.
- **Brute-force idea:** Try all possible swaps recursively, but this is exponentially slow.
- **Observation:** Any special substring can itself be decomposed into smaller special strings, which can be recursively ordered.
- So, recursively:
  - Split the string into **maximal special substrings**.
  - For each, process it recursively (solve the problem inside the substring).
  - After recursive results, sort the substrings in descending lexicographic order, then concatenate.
- This ensures bigger "1" runs appear earlier; maximizing the result character by character.
- Each substring we recurse on is guaranteed to be a proper special string.
- **Trade-off:** Sorting the substrings at each split introduces some cost, but tree size is bounded (\(n\) ≤ 50).

### Corner cases to consider  
- Single pair: Input = "10" (cannot swap, should return "10")
- All nested: Input = "11110000" (deep recursion required)
- Input with consecutive special substrings: e.g. "101010" (multiple possible swaps)
- Input already lex. largest: No swaps needed
- Minimal size string
- String where inner substrings have different structure

### Solution

```python
def makeLargestSpecial(s: str) -> str:
    # Recursive function to process a special binary string
    subs = []
    count = 0
    start = 0
    
    # Identify all top-level special substrings
    for i, ch in enumerate(s):
        if ch == '1':
            count += 1
        else:
            count -= 1
        if count == 0:
            # The substring s[start+1:i] is itself a special string, so recurse
            inner = makeLargestSpecial(s[start + 1:i])
            # Encapsulate with matching '1' and '0'
            subs.append('1' + inner + '0')
            start = i + 1
    
    # Sort in descending lex order, then join
    subs.sort(reverse=True)
    return ''.join(subs)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  At each recursion, we scan O(n), and at each level, strings are sorted. The overall depth and cost sum up to O(n²) due to limits on recursion and string sizes.
- **Space Complexity:** O(n²)  
  The recursion stack and substring storage can create up to O(n²) space usage for maximal nesting and substring splits.

### Potential follow-up questions (as if you’re the interviewer)  

- Can this approach be implemented iteratively?
  *Hint: Use an explicit stack to emulate recursion, track substrings.*

- How would you adapt your solution if allowed to swap non-adjacent substrings?
  *Hint: Would need a different view—would the answer be different if any order is allowed?*

- What if you want the lexicographically smallest result instead?
  *Hint: Change descending to ascending sort.*

### Summary
This problem follows a classic **recursive divide-and-conquer** pattern: recursively partitioning the input on balanced conditions (special substrings), solving subproblems, and combining by sorting.  
The method leverages properties of "special binary strings" and appears in problems about parsing/balanced substrings, e.g., valid parentheses, Dyck words, etc.  
Sorting at each recursion ensures lexicographic optimality— a standard trick with recursively-defined strings and reordering.


### Flashcard
Recursively split into maximal special substrings, sort them in descending order, and concatenate for the lexicographically largest result.

### Tags
String(#string), Recursion(#recursion)

### Similar Problems
- Valid Parenthesis String(valid-parenthesis-string) (Medium)
- Number of Good Binary Strings(number-of-good-binary-strings) (Medium)