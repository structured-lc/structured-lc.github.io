### Leetcode 3008 (Hard): Find Beautiful Indices in the Given Array II [Practice](https://leetcode.com/problems/find-beautiful-indices-in-the-given-array-ii)

### Description  
Given:
- A 0-indexed string **s**,
- Strings **a** and **b**,
- An integer **k**.

Find all indices **i** in **s** such that:
- The substring starting at **i** and of length `len(a)` is exactly **a** (that is, `s[i : i + len(a)] == a`).
- There exists at least one index **j** such that:  
  - The substring starting at **j** and of length `len(b)` is exactly **b** (`s[j : j + len(b)] == b`).
  - `|j - i| ≤ k`.

Return a sorted list of all such beautiful indices **i**.

### Examples  

**Example 1:**  
Input: `s = "isawsquirrelnearmysquirrelhouseohmy", a = "my", b = "squirrel", k = 15`  
Output: `[16,33]`  
Explanation:  
- The substring "my" appears at indices 16 and 33.  
- There's an occurrence of "squirrel" at index 4: |16−4|=12≤15.  
- There's an occurrence of "squirrel" at index 18: |33−18|=15≤15.  
- So, indices 16 and 33 are beautiful.

**Example 2:**  
Input: `s = "abcdefgabcabcg", a = "abc", b = "g", k = 4`  
Output: `[0,7]`  
Explanation:  
- "abc" appears at indices 0, 7, and 9.  
- "g" appears at indices 6 and 12.  
- For i=0: |6−0|=6>4 and |12−0|=12>4 ⇒ not beautiful.  
- For i=7: |12−7|=5>4, |6−7|=1≤4 ⇒ beautiful.  
- For i=9: |12−9|=3≤4, |6−9|=3≤4 ⇒ beautiful.  
- So, indices 7 and 9 are beautiful.

**Example 3:**  
Input: `s = "xabababx", a = "ab", b = "x", k = 2`  
Output: `[1,3,5]`  
Explanation:  
- "ab" at 1, 3, and 5.  
- "x" at 0 and 7.  
- For i=1: |0−1|=1≤2  
- For i=3: |0−3|=3>2, |7−3|=4>2  
- For i=5: |7−5|=2≤2  
- So, indices 1 and 5 are beautiful.

### Thought Process (as if you’re the interviewee)  
First, brute-force:
- Find all indices **i** where **a** occurs and all **j** where **b** occurs.
- For each i, check if there exists any j such that |i-j| ≤ k.
- This is O(N\*M) where N = number of a’s, M = number of b’s.

Can we optimize?
- Preprocess ALL a and b occurrences.
- For each a-index **i**, use a sorted list of **b**-indices.
- For each i, binary search for any b-index j in [i−k, i+k].
- Since b-positions are sorted, binary search gives O(logM) check per i.

Why is this optimal?
- Finding all a's and b's : O(|s|).
- For each a: O(log M) to check neighbors in b, where M = # b’s.

This is a classic "interval checks using pre-computed positions + binary search" problem, for efficient lookups.

### Corner cases to consider  
- **a** or **b** not in **s** (return []).
- k=0 (exact positions only).
- a and/or b overlap in s.
- Very large s: need per a log(#b) checking.
- Multiple occurrences of a/b overlap.

### Solution

```python
def find_beautiful_indices(s, a, b, k):
    # Find all start indices for substring a in s
    a_positions = []
    for i in range(len(s) - len(a) + 1):
        if s[i:i+len(a)] == a:
            a_positions.append(i)
            
    # Find all start indices for substring b in s
    b_positions = []
    for j in range(len(s) - len(b) + 1):
        if s[j:j+len(b)] == b:
            b_positions.append(j)
    
    # If no a or b substrings found, no beautiful indices
    if not a_positions or not b_positions:
        return []
    
    # b_positions need to be sorted for binary search
    b_positions.sort()
    
    import bisect
    res = []
    for i in a_positions:
        # Find index range for b: [i-k, i+k]
        left = bisect.bisect_left(b_positions, i - k)
        right = bisect.bisect_right(b_positions, i + k)
        if left < right:
            res.append(i)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N + M + P log M),  
  where N is length of s, M is # of b's, P is # of a's.  
  - Finding all occurrences: O(N)  
  - For each i (P a's), a binary search: O(log M)

- **Space Complexity:**  
  O(P + M)  
  - Store a_positions and b_positions, worst case up to O(N).

### Potential follow-up questions (as if you’re the interviewer)  

- What if k is very large/close to the length of s?  
  *Hint: Can we optimize by early exit or batching checks?*

- What if s is huge and a/b are very long?  
  *Hint: How to efficiently search for substrings/patterns (KMP, rolling hash)?*

- What if more than one string b, or multiple patterns?  
  *Hint: Can you generalize this search (Aho-Corasick, Multi-pattern search)?*

### Summary
This problem is a "find all windows matching given substrings, with proximity" pattern.  
- **Pattern:** Sliding window substring search + sorted interval match (binary search).
- **Reusable ideas:**  
  - Preprocessing matches for fast interval queries.
  - Standard substring search—common in text, DNA, or log analytics.
  - Efficient interval containment using binary search in sorted arrays.

### Tags
Two Pointers(#two-pointers), String(#string), Binary Search(#binary-search), Rolling Hash(#rolling-hash), String Matching(#string-matching), Hash Function(#hash-function)

### Similar Problems
