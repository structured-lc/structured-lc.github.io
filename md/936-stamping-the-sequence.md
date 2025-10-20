### Leetcode 936 (Hard): Stamping The Sequence [Practice](https://leetcode.com/problems/stamping-the-sequence)

### Description  
This problem asks you to **transform an initial string of just question marks ('?') into a given target string** by repeatedly placing a smaller string, called *stamp*, anywhere it fits fully inside the current string. When stamped, the corresponding positions in the current string take the letters of the stamp. Each stamp placement can only overwrite positions where the current letter is a '?' or matches the stamp at that position.  
You have to output an array of indices indicating **where to place the stamp at each move** (leftmost index).  
If it’s not possible to achieve exactly the target in this way (at most 10 × target.length moves), return an empty array.

### Examples  

**Example 1:**  
Input:  
stamp = `"abc"`, target = `"ababc"`  
Output:  
`[0,2]`  
Explanation.  
- Start with `"?????"`  
- Place stamp at index 0: `"abc??"`  
- Place stamp at index 2: `"ababc"`

**Example 2:**  
Input:  
stamp = `"abca"`, target = `"aabcaca"`  
Output:  
`[3,0,1]`  
Explanation.  
- Start with `"???????"`  
- Stamp at 3: `"???abca"`  
- Stamp at 0: `"ab?abca"`  
- Stamp at 1: `"aabcaca"`

**Example 3:**  
Input:  
stamp = `"ab"`, target = `"abab"`  
Output:  
`[0,2]`  
Explanation.  
- Start with `"????"`  
- Stamp at 0: `"ab??"`  
- Stamp at 2: `"abab"`

### Thought Process (as if you’re the interviewee)  
The brute-force approach would be to simulate **stamping from left to right**: at each position, check if stamp can overwrite it, then update the question marks and repeat until target is achieved or no further progress is possible.  
However, this runs into trouble when there are overlaps: sometimes you need to stamp in a specific order such that a later stamp "unlocks" the ability to match an earlier area—greedy left-to-right won’t always work.

A better approach is to **work backwards**:  
- Instead of trying to build the target from "?"s, **try to “erase” the target to "?"s** by finding a substring that matches the stamp (with possible '?'s) and "unstamp" (turn those into '?').  
- Each time we "erase" a stampable substring, record its index.  
- Keep going until all of target is '?'s, or if no progress can be made.

This way, we're always optimally erasing areas we can, and the reverse order of our actions gives the stamping order to construct the target.

Trade-offs:  
- Pros: Guarantees the least dependencies
- Cons: More “backwards” thinking, but easily tracks what’s possible

### Corner cases to consider  
- stamp is the same as target  
- stamp has repeated characters (e.g. "aa")  
- target has no repeated segments matching stamp  
- cannot fully stamp to reach target (should return [])  
- stamp is longer than target  
- target contains chars that never appear in stamp  
- large input sizes (efficiency required)  
- stamp and target both single character

### Solution

```python
def movesToStamp(stamp: str, target: str):
    # Convert target to list for mutability
    target = list(target)
    m, n = len(stamp), len(target)
    res = []
    changed = True
    visited = [False] * (n - m + 1)
    stars = 0  # How many ? already in target
    
    # Helper: can we stamp at pos?
    def can_stamp(pos):
        replaced = False
        for i in range(m):
            if target[pos + i] != '?' and target[pos + i] != stamp[i]:
                return False
            if target[pos + i] != '?':
                replaced = True  # At least one char would be actually replaced
        return replaced

    while stars < n:
        progress = False
        # Try every window
        for i in range(n - m + 1):
            if not visited[i] and can_stamp(i):
                # Stamp: set chars to '?'
                for j in range(m):
                    if target[i + j] != '?':
                        target[i + j] = '?'
                        stars += 1
                visited[i] = True
                progress = True
                res.append(i)
        if not progress:
            return []
    # Reverse to get actual stamping order
    return res[::-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((n - m + 1) × m × n), where n = len(target), m = len(stamp).  
  At most O(n) rounds (since each round turns at least one letter to '?'), and in each round we check each possible window, so up to O(n) × O(n - m + 1) × O(m).
- **Space Complexity:** O(n): due to the visited array and mutated list copy of target, plus result array stores at most n elements.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you want the lexicographically smallest sequence of moves?
  *Hint: Consider BFS or DP over all possibilities rather than greedy reverse simulation.*

- Can you optimize for minimizing the number of stamping operations?
  *Hint: Try dynamic programming to find the minimum sequence.*

- What if you allow overlaps that do not strictly match but some wildcards are permitted in the stamp?
  *Hint: Adapt the can_stamp logic to account for wildcards in the stamp.*

### Summary
This is a **reverse greedy simulation** problem—by “unstamping” the target string to all '?'s, we can guarantee all dependencies are met.  
It’s a common pattern in problems where building up directly is too constrained or introduces circular dependencies (e.g. topological sorting, certain dynamic programming cases).  
Thinking in “reverse” is very powerful for reconstructing operations that have forward constraints.


### Flashcard
Work backwards—greedily stamp from right to left, marking positions that can be stamped, and reverse the order at the end.

### Tags
String(#string), Stack(#stack), Greedy(#greedy), Queue(#queue)

### Similar Problems
