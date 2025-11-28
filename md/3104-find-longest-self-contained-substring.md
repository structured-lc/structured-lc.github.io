### Leetcode 3104 (Hard): Find Longest Self-Contained Substring [Practice](https://leetcode.com/problems/find-longest-self-contained-substring)

### Description  
Given a string s, return the length of the **longest self-contained substring**.  
A substring t of s is self-contained if:
- t ≠ s (it cannot be the entire string), and
- for every character in t, that character does **not** appear outside of t in s (i.e., every character in t is unique to that substring within s).

Return the length of the longest such substring. If none exists, return -1.

### Examples  

**Example 1:**  
Input: `s = "abba"`  
Output: `2`  
Explanation:  
The substring "bb" is self-contained since there are no other "b"s outside of it.

**Example 2:**  
Input: `s = "abab"`  
Output: `-1`  
Explanation:  
Every possible substring contains at least one character that is also present outside of it. So, no valid self-contained substring exists.

**Example 3:**  
Input: `s = "abacd"`  
Output: `4`  
Explanation:  
The substring "abac" is self-contained. The only character outside is 'd', which does not occur inside "abac". Since every character inside is unique to "abac" within the whole string, the answer is 4.

### Thought Process (as if you’re the interviewee)  

- Brute-force:  
  Check all possible substrings (excluding the full string), and for each, check all characters to ensure none appear outside the current substring.  
  - For every (left, right) pair (representing substring s[left:right+1]), for every character in the substring, scan if it exists outside [left, right].
  - Time complexity: O(n³), too slow for n ≤ 5\*10⁴.

- Optimized idea:  
  Since the substring is self-contained if each of its characters' occurrences are **fully contained within** the substring, we can:
  - For each character in s, note its *first* and *last* positions.
  - For each unique character, treat its first occurrence as a possible start, and its last occurrence as a possible end.
  - For a range [l, r], collect all characters whose first and last appearances *both* lie inside [l, r].
  - If **all** characters in [l, r] have first and last positions within [l, r], that substring is self-contained.
  - Keep track of the maximum such (r - l + 1) < n.

- Implementation outline:
  - Build dicts: char → first_index, char → last_index.
  - For every possible pair (l, r) where r = last occurrence for some character, and l = first occurrence for some character (l < r).
  - For range [l, r], check if all characters inside occur only within [l, r] (i.e., their first_index and last_index are both within [l, r]).
  - Update max length if valid.

- Trade-offs:
  - Since there are only 26 lowercase English letters, and each letter's range can be checked efficiently, the approach is linear in practice.

### Corner cases to consider  
- String is of length 2 (minimal allowed).
- All characters are unique: no repeated letters.
- All characters are the same.
- Self-contained substring is at the start or end.
- No possible self-contained substring.
- Self-contained substring almost as big as s but not equal to s.
- Input where substring overlaps between same letters.

### Solution

```python
def find_longest_self_contained_substring(s):
    n = len(s)
    # Step 1: Record first and last occurrence for each character
    first = {}
    last = {}
    for i, c in enumerate(s):
        if c not in first:
            first[c] = i
        last[c] = i

    max_len = -1

    # Step 2: For each possible window, try to expand and validate
    for l in range(n):
        # Start expansion from the leftmost unvisited index
        chars_in_window = set()
        r = l
        # Mark initial last boundary for the current window
        max_r = last[s[l]]
        while r <= max_r:
            c = s[r]
            chars_in_window.add(c)
            # Expand right boundary if last occurrence of current char is further
            max_r = max(max_r, last[c])
            r += 1
        # Now candidate substring is s[l:r] (r is exclusive)
        if r - l < n:
            # Validate all characters in window:
            is_valid = True
            for c in chars_in_window:
                if first[c] < l or last[c] >= r:
                    if not (first[c] >= l and last[c] < r):
                        is_valid = False
                        break
            if is_valid:
                max_len = max(max_len, r - l)
    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Each character is processed at most once as a window start.  
  - The while loop only moves r forward and total r increments over all l's is at most n.  
  - Looking up first/last and checking chars_in_window is O(1) per character due to the 26-letter alphabet.

- **Space Complexity:** O(1)  
  - Only constant extra storage for first/last occurrence maps (26 characters), chars_in_window (at most 26 entries).  
  - No recursion, no large data structures besides O(n) for input itself.

### Potential follow-up questions (as if you’re the interviewer)  

- What if s contains upper- and lower-case letters?
  *Hint: Consider how to adjust first/last positions or character code mapping.*

- How would you return not just the length, but the actual substring(s) themselves?
  *Hint: Store (l, r) bounds whenever updating max length; return substring on matching length.*

- Can this method be extended for substrings where each character occurs at most k times in the whole string?
  *Hint: How would you generalize the counting logic?*

### Summary
This problem uses the "interval/window covering" pattern with pre-computed first/last indices, often useful with substring and palindromic interval problems.  
Sliding window and greedy right boundary expansion are both used, similar to "partition labels".  
This method is efficient because the alphabet is small and occurrence mapping turns string checks into constant-time lookups. The solution generalizes to scenarios where unique coverage or containment within ranges is relevant.


### Flashcard
A substring is self-contained if all occurrences of each character stay within it. Track first and last occurrence of each character; for each position, find the longest substring where max(last_occurrence) ≤ current_end.

### Tags
Hash Table(#hash-table), String(#string), Binary Search(#binary-search), Prefix Sum(#prefix-sum)

### Similar Problems
- Select K Disjoint Special Substrings(select-k-disjoint-special-substrings) (Medium)