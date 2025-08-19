### Leetcode 2182 (Medium): Construct String With Repeat Limit [Practice](https://leetcode.com/problems/construct-string-with-repeat-limit)

### Description  
Given a string `s` and an integer `repeatLimit`, construct the lexicographically largest possible string (`repeatLimitedString`) using the characters from `s`, where **no letter appears more than `repeatLimit` times consecutively**. You don't have to use all characters from `s`. If the current largest character is "blocked" by the repeat limit, you can insert the next largest available character to break the sequence before continuing with the original one.

### Examples  

**Example 1:**  
Input: `s = "cczazcc", repeatLimit = 3`  
Output: `zzcccac`  
*Explanation:  
- Available sorted characters: z(1), c(4), a(1)
- Use "z" (max count = 1), then "c" (up to 3 times), but can't place "c" 4 times in a row.
- To maximize lex order, place "z", then "c" 3 times, break with "a", then the remaining "c".*

**Example 2:**  
Input: `s = "aababab", repeatLimit = 2`  
Output: `bbabaa`  
*Explanation:  
- Available sorted characters: b(3), a(4)
- Take "b" up to 2 times, then must use "a" to break before adding more "b".
- Lex max: "bb" + "a" + "b" + "aa".*

**Example 3:**  
Input: `s = "abc", repeatLimit = 1`  
Output: `cba`  
*Explanation:  
- With repeatLimit=1, can never repeat a letter.
- Lexicographically largest order: "c", "b", "a".*

### Thought Process (as if you’re the interviewee)  
The brute-force approach is to generate all permutations under the repeat limit, but that's clearly infeasible.  
A better approach:
- **Count** how many times each character appears in `s`.
- **Greedily** pick the largest available character up to `repeatLimit` times, then if blocked, pick the next largest available character to break the streak, then return to the largest again.
- Use a **max-heap** for character selection (store character counts with the highest character first).
- If the repeat limit is hit and no smaller character is available, we're done.

Trade-off: This greedy approach always ensures the result is the lexicographically largest possible under the constraints.

### Corner cases to consider  
- All letters are the same and their count > repeatLimit (cannot consume all).
- repeatLimit is 1 (no consecutive letters).
- Only one character in `s`.
- Only two distinct letters in `s`.
- Letters not at the end of the alphabet (non-'z') are the majority.
- All available distinct letters ≤ repeatLimit (use them all in order).

### Solution

```python
def repeatLimitedString(s: str, repeatLimit: int) -> str:
    # Count each character
    freq = [0] * 26
    for c in s:
        freq[ord(c) - ord('a')] += 1

    res = []
    # Current position in alphabet, start with largest ('z')
    i = 25
    while i >= 0:
        if freq[i] == 0:
            i -= 1
            continue
        
        # Decide how many times we can use this letter
        use = min(freq[i], repeatLimit)
        res.extend([chr(ord('a') + i)] * use)
        freq[i] -= use

        if freq[i] == 0:
            i -= 1
            continue
        
        # Need a break: find next available (smaller) character
        j = i - 1
        while j >= 0 and freq[j] == 0:
            j -= 1
        if j < 0:
            break  # No character available to break the streak
        res.append(chr(ord('a') + j))
        freq[j] -= 1
            
    return ''.join(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + 26²)  
  Counting is O(n). For each distinct character, we may scan the freq array again for a breaker (at most 26×26 for edgeest cases), but overall this is efficient given constant alphabet size.
- **Space Complexity:** O(n + 26)  
  O(n) for the output and O(26) for frequency counting.

### Potential follow-up questions (as if you’re the interviewer)  

- What would you do if the alphabet wasn’t limited to lowercase English letters?  
  *Hint: Consider using heap or a map structure for frequency management.*

- How to handle if you also had to minimize the number of unused characters?  
  *Hint: Is the current solution always optimal for using the maximum number of letters?*

- How would you solve for streaming input where you can't preprocess the entire string?  
  *Hint: Think about online algorithms and maintaining only needed state.*

### Summary
This problem follows a **greedy + frequency counting** pattern, where you greedily try to build the lexicographically largest string at every step, only limited by consecutive appearance rules. The technique is broadly useful in "construct the largest/smallest string under constraints" problems, which often pop up in competition and interview settings. Using frequency arrays (or priority queues for general alphabets) is a classic pattern for letter arrangement constraints.

### Tags
Hash Table(#hash-table), String(#string), Greedy(#greedy), Heap (Priority Queue)(#heap-priority-queue), Counting(#counting)

### Similar Problems
- Rearrange String k Distance Apart(rearrange-string-k-distance-apart) (Hard)