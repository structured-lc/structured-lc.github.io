### Leetcode 2157 (Hard): Groups of Strings [Practice](https://leetcode.com/problems/groups-of-strings)

### Description  
You are given an array of strings `words`, each containing unique lowercase English letters (no repeats within any string).  
Two strings are **connected** if you can transform one string’s letters into the other by _exactly one_ of the following:
- **Add** a single letter.
- **Remove** a single letter.
- **Replace** a single letter with any letter (including possibly itself).

Strings are grouped together if:
- They are directly or indirectly _connected_, or
- They are alone without any connections.

You need to find:
- The **number of groups** formed this way.
- The **size of the largest group**.

Return `[number of groups, size of largest group]`.

### Examples  

**Example 1:**  
Input: `words = ["a","b","ab","abc"]`,  
Output: `[1, 4]`  
*Explanation: All strings are connected through add/remove operations: "a" → "ab" → "abc" and "b" → "ab". So only one group of size 4.*

**Example 2:**  
Input: `words = ["a","b","c"]`,  
Output: `[3, 1]`  
*Explanation: No two strings are connected (cannot get from one to another with a single add/remove/replace), so 3 groups of size 1 each.*

**Example 3:**  
Input: `words = ["ab","cd","abc","abd","abce"]`,  
Output: `[2, 4]`  
*Explanation:  
Group 1: "ab" ↔ "abc" ↔ "abd" ↔ "abce".  
Group 2: "cd".  
So, 2 groups; largest group has 4 strings.*

### Thought Process (as if you’re the interviewee)  

First, we need a way to define whether two strings are "connected". For unique lowercase letter strings, their content can be encoded as a 26-bit integer (bitmask).  
- For each string, turn on a bit for each letter.
- "Connected by add/remove": removing or adding a letter from a string flips a single bit.
- "Connected by replace": swap out a bit for another.

**Brute-force:**  
Compare every pair of strings and check if connected. This is O(n²) and too slow for large n.

**Optimized approach:**  
Model the problem as a graph where strings are nodes. Edges exist between "connected" strings (per above). Each bitmask represents a node; connection rules can be efficiently checked by flipping or swapping bits.

We can use **Union-Find (Disjoint Set Union, DSU)**:
- For each string-bitmap, try:
  - **Remove** each letter: mask ^ (1 << i)
  - **Add** each letter: mask | (1 << i)
  - **Replace** each letter: remove one and add another: mask ^ (1 << i) ^ (1 << j)
  - But since every string is in the words list, we only union if that mask exists.
- Union all reachable masks.  
Finally, count group sizes and report.

### Corner cases to consider  
- Empty input (should return [0, 0])
- One word only (should return [1, 1])
- All words are totally disjoint (each is its own group)
- All words mutually connected (one big group)
- Duplicate strings (none, as per problem statement)
- Strings with single character, multiple characters, or maximum 26 letters

### Solution

```python
def groupStrings(words):
    # Convert each word to a 26-bit mask
    mask_to_index = {}
    n = len(words)
    for idx, word in enumerate(words):
        mask = 0
        for c in word:
            mask |= (1 << (ord(c) - ord('a')))
        mask_to_index[mask] = idx  # only need index, since duplicates are not allowed

    parent = [i for i in range(n)]  # Union Find: parent[i] = i initially
    size = [1] * n  # sizes of groups

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]  # path compression
            x = parent[x]
        return x

    def union(x, y):
        rx, ry = find(x), find(y)
        if rx == ry:
            return
        if size[rx] < size[ry]:
            rx, ry = ry, rx
        parent[ry] = rx
        size[rx] += size[ry]

    for idx, word in enumerate(words):
        cur_mask = 0
        for c in word:
            cur_mask |= (1 << (ord(c) - ord('a')))
        # Remove one letter
        for i in range(26):
            if cur_mask & (1 << i):
                neigh = cur_mask ^ (1 << i)
                if neigh in mask_to_index:
                    union(idx, mask_to_index[neigh])
        # Replace one letter
        for i in range(26):
            if cur_mask & (1 << i):
                for j in range(26):
                    if not (cur_mask & (1 << j)):
                        neigh = cur_mask ^ (1 << i) | (1 << j)
                        if neigh in mask_to_index:
                            union(idx, mask_to_index[neigh])

    # Count groups and size of largest group
    from collections import Counter
    count = Counter()
    for i in range(n):
        root = find(i)
        count[root] += 1

    return [len(count), max(count.values()) if count else 0]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × 26²), where n = number of words.
  - For every word, there are up to 26 removals and 26² replacement checks. Each operation is O(1) due to set/dict lookup.
- **Space Complexity:**  
  O(n), for storing masks, parent array, size array, and word map.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you handle words with repeating characters?  
  *Hint: How would the mask representation or "connected" definition change?*

- How would you adapt if allowed to use two or more operations (instead of exactly one) to connect words?  
  *Hint: What graph algorithm would you need to find groups based on multi-step connectivity?*

- If we wanted just the largest group size, can we do it without full union-find?  
  *Hint: Is partial traversal or counting sufficient?*

### Summary
We model each word with a bitmask to use set operations efficiently. By connecting masks using Union-Find for all valid add/remove/replace connections, we can count disjoint groups and largest group sizes. This bitmask + DSU approach is a classic solution for connectivity problems over sets/subsets and arises in word/path graphs, "similar words", and genetic mutation problem patterns.

### Tags
String(#string), Bit Manipulation(#bit-manipulation), Union Find(#union-find)

### Similar Problems
- Word Ladder II(word-ladder-ii) (Hard)
- Similar String Groups(similar-string-groups) (Hard)
- Largest Component Size by Common Factor(largest-component-size-by-common-factor) (Hard)