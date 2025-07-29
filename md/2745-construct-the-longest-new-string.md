### Leetcode 2745 (Medium): Construct the Longest New String [Practice](https://leetcode.com/problems/construct-the-longest-new-string)

### Description  
Given counts of three types of substrings—**x** “AA”, **y** “BB”, and **z** “AB”—construct the longest possible string by concatenating any of these, repeatedly, subject to the following rule:  
- The result must **not** contain “AAA” or “BBB” as any substring (i.e., never have three consecutive 'A's or 'B's).  
Find the maximum total length you can create, using any order.

### Examples  

**Example 1:**  
Input: `x=2, y=2, z=1`  
Output: `10`  
*Explanation: Use AA, AB, BB, AA, BB in the order that prevents three consecutive A's or B's (e.g., "AABAABBB" has length 8, but using all and switching between types gives max length 10).*

**Example 2:**  
Input: `x=1, y=2, z=0`  
Output: `6`  
*Explanation: The optimal string is "AABBAA" or "BBAA", max possible is to interleave without 'BBB', using both AAs, all BBs: 6 chars.*

**Example 3:**  
Input: `x=0, y=0, z=4`  
Output: `8`  
*Explanation: Only ABs are available, so just use all: "ABABABAB" (length 8).*

### Thought Process (as if you’re the interviewee)  
- Start by thinking: what causes “AAA” or “BBB” to appear?  
  If we place more than two AAs or BBs in a row, we’ll hit the forbidden triple.  
- So, **alternate** the usage of AA and BB as much as possible.  
- Place as many (AA, BB) pairs as possible.  
- If counts for AA and BB are not equal, you’ll always be left with one extra AA or BB, which you can only place *once more* before forming three in a row.  
- The AB substrings are completely safe—they never cause three of a letter in a row regardless of placement, because they're "AB".  
- Brute-force: try all interleavings, but that’s exponential.  
- **Greedy optimal:**  
   - Calculate min(x, y) for pairs.  
   - If x ≠ y, one extra AA or BB can be added before breaking the rule.  
   - Add all AB as they are always safe.  
   - Each substring used is length 2.

### Corner cases to consider  
- One or more of x, y, z is zero (e.g., only one type available)
- Very large x or y and very small of the other (e.g., x=100, y=1, z=0)
- z=0 (no ABs to "buffer" the AAs and BBs)
- x==y==0 (no substrings)
- All inputs are equal or all are zero

### Solution

```python
def longestString(x: int, y: int, z: int) -> int:
    # Calculate the number of AA and BB pairs we can have safely
    pairs = min(x, y)
    # If x != y, we can use one extra AA or BB (whichever is in excess)
    if x != y:
        pairs += 1
    # Each substring ("AA", "BB", "AB") has length 2
    return (pairs + z) * 2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1). All operations are arithmetic—no loops, no recursion. Calculation is in constant time.
- **Space Complexity:** O(1). Only a handful of integer variables, no extra storage or recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- What changes if allowed substrings have length greater than 2 (e.g., "AAA", "BBB", "AB")?  
  *Hint: Think about generalizing the forbidden substring rule and pairing logic.*

- How would you modify the algorithm if instead of just "AA", "BB", and "AB", there were also "BA" substrings?  
  *Hint: Does "BA" create any risk for forbidden triples?*

- Can you output an actual example of such a constructed string, not just its length?  
  *Hint: How to interleave substrings to avoid triples in a constructive way?*

### Summary
This problem uses a **greedy alternation** pattern—maximizing the use of pairs, taking care not to exceed the rule (no three-in-a-row), and safely appending any substrings that cannot violate the rule (like "AB"). This is similar to other greedy string or sequence construction problems where local constraints (no consecutive triples) limit how to combine elements. The logic extends to any similar "no k-in-a-row" construction.