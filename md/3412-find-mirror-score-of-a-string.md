### Leetcode 3412 (Medium): Find Mirror Score of a String [Practice](https://leetcode.com/problems/find-mirror-score-of-a-string)

### Description  
Given a string s containing only lowercase English letters, calculate its **mirror score** as follows:  
- The mirror of a letter is defined as its counterpart when the alphabet is reversed. E.g., mirror('a') = 'z', mirror('b') = 'y', …, mirror('z') = 'a'.  
- Starting with all characters unmarked and a score of 0, iterate left-to-right over s.  
- For each character at position i, find the closest unmarked index j to the left (j < i) such that s[j] is the mirror of s[i].  
- If such j exists, mark both i and j (they cannot be used again), and add i - j to the score.  
- If not, move on.  
- Repeat until the string is processed. Return the total score.

### Examples  

**Example 1:**  
Input: `s = "abczyx"`  
Output: `9`  
*Explanation:  
- 'a' (i=0): mirror is 'z', find 'z' at j=5 → mark 0 and 5, score += 5-0=5  
- 'b' (i=1): mirror is 'y', find 'y' at j=4 → mark 1 and 4, score += 4-1=3  
- 'c' (i=2): mirror is 'x', find 'x' at j=3 → mark 2 and 3, score += 3-2=1  
Total score: 5+3+1 = 9*

**Example 2:**  
Input: `s = "aaa"`  
Output: `0`  
*Explanation:  
- No possible pairs as mirror('a') = 'z', but 'z' not in string. Score remains 0.*

**Example 3:**  
Input: `s = "azby"`  
Output: `4`  
*Explanation:  
- 'a' (i=0): mirror is 'z', find 'z' at j=1 → mark 0 and 1, score += 1-0=1  
- 'b' (i=2): mirror is 'y', find 'y' at j=3 → mark 2 and 3, score += 3-2=1  
After first full pass, all letters are marked.  
Total score: 1+1=2*

### Thought Process (as if you’re the interviewee)  
First, I want to be able to quickly check, for any given letter, what its mirror is. Since English lowercase letters are consecutive, the mirror of c can be computed by:  
mirror(c) = chr(ord('a') + ord('z') - ord(c))

For pairing, I need, for every letter, the stack (list) of unmarked indices where it occurs, so I can always pick the closest available j to the left.  
As I scan left-to-right, for each new letter, I check if there is any available position of its mirror to the left (not yet used). If yes, record the closest left index (highest available j < i), mark both, and add i-j to the total score.  
To efficiently find and mark, I'll keep a stack of indices for each letter (since I must always pair i with the closest j < i).  
Brute-force would be: for every i, scan left to find closest unmarked j with s[j] = mirror(s[i]).  
That’s O(n²). However, if I use stacks/dicts, I can optimize this to O(n).

Why use stacks? As I iterate, I process all j for a given character before i, so the last unpaired occurrence of a mirror letter before i will always be the best candidate.

Trade-off: Using a dict of stacks (or lists, using .pop()), code remains simple and optimal.

### Corner cases to consider  
- Empty string (`""`) → should return 0  
- No possible pairings in the string  
- All mirror pairs (e.g., "azbycx")  
- Letters appear multiple times  
- Only one kind of letter ("aaaa")  
- String with no mirror letters at all ("abc")  
- Overlapping pairs are not allowed (so must mark and skip paired indices)

### Solution

```python
def find_mirror_score(s: str) -> int:
    # Dictionary: mirror_char -> stack of unmarked indices with that char
    from collections import defaultdict
    
    unmarked = defaultdict(list)  # char -> list of indices
    
    total_score = 0
    
    for i, c in enumerate(s):
        # The mirror character for current c
        mirror_c = chr(ord('a') + ord('z') - ord(c))
        
        # If we've seen this mirror character before at any earlier (unmarked) position
        if unmarked[mirror_c]:
            # Pair with the last (closest) one
            j = unmarked[mirror_c].pop()
            total_score += i - j
            # Both j and i are now marked (we do NOT add i in stack)
        else:
            # No available mirror pair, record this occurrence
            unmarked[c].append(i)
    
    return total_score
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(s).  
  Each index is processed once, and list pops/appends are amortized O(1).
- **Space Complexity:** O(n), for storing unpaired indices (worst case, if no pairs at all).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input string could contain uppercase and lowercase letters?  
  *Hint: Adjust mirror calculation for case, maybe normalize or make case-insensitive mapping.*

- Can you modify this to return the actual list of index pairs instead of just the score?  
  *Hint: When marking, record the (j, i) pairs in a list.*

- What if the string was streaming and you need to compute score online?  
  *Hint: Use the same stack logic, process as each letter arrives, possibly with memory limits.*

### Summary
The key approach to this problem is **stack-based matching** with efficient character-to-index mapping—sometimes seen in problems involving mirrored pairs, or bracket balancing.  
It leverages the property that the closest earlier available partner will always be at the top of the stack.  
Patterns like this arise in string pairing or greedy "first available" matching problems.


### Flashcard
Compute mirror of each character as chr(ord('a') + ord('z') − ord(c)); maintain stacks of unmatched indices per letter and pair greedily left-to-right.

### Tags
Hash Table(#hash-table), String(#string), Stack(#stack), Simulation(#simulation)

### Similar Problems
