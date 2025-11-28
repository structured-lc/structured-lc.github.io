### Leetcode 3006 (Medium): Find Beautiful Indices in the Given Array I [Practice](https://leetcode.com/problems/find-beautiful-indices-in-the-given-array-i)

### Description  
Given a string **s** and two other strings **a** and **b**, along with an integer **k**, find all indices **i** such that:
- The substring of **s** starting at **i** (`s[i..i+len(a)-1]`) matches **a**.
- There exists some **j** where the substring starting at **j** (`s[j..j+len(b)-1]`) matches **b**.
- The absolute difference |i - j| ≤ k.
Return all such **beautiful indices** **i** in sorted order.

### Examples  

**Example 1:**  
Input: `s = "isawsquirrelnearmysquirrelhouseohmy", a = "my", b = "squirrel", k = 15`  
Output: `[16, 33]`  
Explanation:  
- At index 16, s[16..17] == "my", and "squirrel" occurs at index 4 (|16-4|=12 ≤ 15).
- At index 33, s[33..34] == "my", and "squirrel" occurs at index 18 (|33-18|=15 ≤ 15).

**Example 2:**  
Input: `s = "abcabcabc", a = "ab", b = "bc", k = 2`  
Output: `[0, 3, 6]`  
Explanation:  
- "ab" at indices 0, 3, 6. For each, there's a "bc" at most 2 indices away.

**Example 3:**  
Input: `s = "aaaaa", a = "aa", b = "aa", k = 0`  
Output: `[0, 1, 2, 3]`  
Explanation:  
- "aa" occurs at indices 0, 1, 2, 3. For k=0, only the same-index matches are allowed, which work since both substrings are "aa".

### Thought Process (as if you’re the interviewee)  
Let's first approach this naively:
- For each index **i**, check if substring at **i** matches **a**. If yes, look for all **j** such that substring at **j** is **b** and |i-j| ≤ k.

However, this can be slow since scanning every possible combination is O(N²).

Optimization:
- Precompute all occurrences of **a** and **b** in **s** (using direct substring matching or KMP for efficiency).
- For each index **i** where **a** occurs, use a two-pointer or binary search to efficiently find if there's any **j** in **b**'s starts such that |i-j| ≤ k.
- This reduces the problem to merging two sorted lists with a sliding window, achieving O(N) time after preprocessing.

Trade-offs:
- Simple substring search is fine for small constraints.
- KMP/faster search for large test cases, but introduces code overhead.
- Sorted merge is key for final efficiency.

### Corner cases to consider  
- s shorter than a or b.
- a or b does not appear at all.
- k is 0 or larger than s.
- Overlapping occurrences of a or b.
- Multiple b's within k-window of one a.

### Solution

```python
def find_beautiful_indices(s, a, b, k):
    # Helper to find all start indices of substring 'pat' in 's'
    def find_indices(s, pat):
        indices = []
        for i in range(len(s) - len(pat) + 1):
            if s[i:i+len(pat)] == pat:
                indices.append(i)
        return indices

    indices_a = find_indices(s, a)  # all start indices where a occurs
    indices_b = find_indices(s, b)  # all start indices where b occurs

    beautiful = []
    # Since both indices_a and indices_b are sorted, use two pointers
    j = 0
    for i in indices_a:
        # Move j to the leftmost b position where j >= i - k
        while j < len(indices_b) and indices_b[j] < i - k:
            j += 1
        # Now check if this j or the next few are within |i-j| ≤ k
        temp_j = j
        beautiful_found = False
        while temp_j < len(indices_b) and indices_b[temp_j] <= i + k:
            if abs(indices_b[temp_j] - i) <= k:
                beautiful_found = True
                break
            temp_j += 1
        if beautiful_found:
            beautiful.append(i)
    return beautiful
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M), where N = len(s), M = number of a and b matches.  
  Finding all occurrences of a and b is O(N). For each a, by sliding window/binary search in sorted b-list, overall checking for each a is O(1) amortized.
- **Space Complexity:** O(M), for storing indices of a and b.

### Potential follow-up questions (as if you’re the interviewer)  

- If a and b can overlap, will your algorithm still work?  
  *Hint: What happens if 'aa' is sought in 'aaa'? Test with overlapping.*

- Can this be applied if a or b are very long?  
  *Hint: Consider efficient substring search algorithms like KMP or Rabin-Karp.*

- How would you modify this for multiple queries with varying k?  
  *Hint: Think about preprocessing and efficient range queries.*

### Summary
This problem uses the **sliding window/two pointers** and **substring search** patterns.  
Precomputing candidate starts and merging ranges is a common pattern in string and range problems, and it appears in areas like text processing, genomics, and file search tasks.


### Flashcard
Find Beautiful Indices in the Given Array I (Medium)

### Tags
Two Pointers(#two-pointers), String(#string), Binary Search(#binary-search), Rolling Hash(#rolling-hash), String Matching(#string-matching), Hash Function(#hash-function)

### Similar Problems
