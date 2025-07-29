### Leetcode 1647 (Medium): Minimum Deletions to Make Character Frequencies Unique [Practice](https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique)

### Description  
Given a string, return the **minimum number of characters you must delete** so that no two characters in the string have the same frequency (number of occurrences). In other words, make all character frequencies unique using as few deletions as possible. Only deletions are allowed, not insertions or character replacements.

### Examples  

**Example 1:**  
Input: `"aab"`  
Output: `0`  
*Explanation: Frequencies are {a:2, b:1}. All unique frequencies – no deletions needed.*

**Example 2:**  
Input: `"aaabbbcc"`  
Output: `2`  
*Explanation: Frequencies are {a:3, b:3, c:2}. Delete one 'a' and one 'b' (or two from either character) to get frequencies {a:2, b:2, c:2} → still not unique, so delete one more from a/b to get {a:2, b:1, c:2} → still duplicate, so actually need to eventually get to {a:3, b:2, c:1} or any permutation with unique frequencies. Two deletions suffice.*

**Example 3:**  
Input: `"ceabaacb"`  
Output: `2`  
*Explanation: Frequencies are {c:2, e:1, a:3, b:2}.  
One possible way: delete one 'c' and one 'b' to get {c:1, e:1, a:3, b:1} frequencies {3,1,1,1}. Still not unique. Alternatively, delete one 'c' and one 'a' for {c:1, e:1, a:2, b:2}. Continue deleting until all frequencies are unique. Minimum is 2 deletions.*  

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try all possible ways of deleting characters until all letter counts are unique. This is infeasible for large strings because it’s exponential as the combinations explode.
  
- **Optimization:**  
  Focus on character frequencies, not the actual letters.  
  1. Count the frequency of each character.
  2. Try to adjust the frequency counts so that all are unique, minimizing deletions.
  3. For every frequency, if it’s already taken, decrease it (i.e., delete a character) until it is unique or zero.
  4. Keep track of used frequencies in a set for O(1) lookups.
  5. Add up the number of deletions made.

- **Why this approach:**  
  We minimize deletions by greedily reducing duplicated frequencies (prefer higher reductions for high frequency conflicts).  
  It’s efficient: O(n) to count, O(1) to process (26 lowercase letters), so overall O(n) time and O(1) aux space.

### Corner cases to consider  
- Empty string → No deletions needed.
- Only one character (e.g., `"a"`) → No deletions needed.
- All unique characters (e.g., `"abc"`) → Already unique.
- All same character (e.g., `"aaaa"`) → No conflicts.
- All frequencies same and >1 (e.g., `"aabbcc"`) → Must delete to make unique.
- Large input where many frequencies are the same.

### Solution

```python
def minDeletions(s):
    # 1. Count frequency of each character (26 letters only)
    freq = [0] * 26
    for ch in s:
        freq[ord(ch) - ord('a')] += 1

    # 2. Only care about non-zero frequencies
    freq = [f for f in freq if f > 0]

    # 3. Use a set to track used frequencies
    used = set()
    deletions = 0

    # 4. Process frequencies greedily
    for f in sorted(freq, reverse=True):
        while f > 0 and f in used:
            f -= 1
            deletions += 1
        if f > 0:
            used.add(f)

    return deletions
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n) for counting frequencies, O(1) for sorting (since only up to 26 letters), worst-case O(1) for set operations. Total: O(n).

- **Space Complexity:**  
  O(1) extra space for frequency counts and set (since maximum unique characters is 26). Input does not require extra space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the alphabet was not fixed (e.g., Unicode)?
  *Hint: Generalize the set/map logic, but time/space would increase proportional to alphabet size.*

- Output one possible modified string instead of just the minimum number of deletions?
  *Hint: Track which characters you delete as you process frequencies; reconstruct the result.*

- What if insertions were also allowed?
  *Hint: Now you can both increase and decrease frequencies; try to assign unique frequencies with minimal changes.*

### Summary
This pattern is a **Greedy / Hash Map / Set / Frequency Table** problem.  
It is classic to “make all values unique with the minimum number of changes” and uses greedy frequency reduction.  
Similar strategies are frequently found in string normalization, allocation problems, and greedy conflict resolution tasks.