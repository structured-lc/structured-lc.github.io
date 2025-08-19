### Leetcode 791 (Medium): Custom Sort String [Practice](https://leetcode.com/problems/custom-sort-string)

### Description  
Given two strings, **order** and **s**:  
- **order** is a string of unique lowercase letters that defines a custom ordering of the alphabet.
- **s** is any string (possibly containing repeated or out-of-order letters).
Your task is to **rearrange the characters in** `s` so that they follow the order as in `order`. Characters not present in `order` can appear in any order after the ordered characters.  
The output should be any permutation of `s` that respects this ordering.

### Examples  

**Example 1:**  
Input: `order = "cba"`, `s = "abcd"`  
Output: `"cbad"`  
*Explanation: Order is c → b → a. So, all 'c's come first, then 'b's, then 'a's. The 'd' is not in order, so it can appear at the end.*

**Example 2:**  
Input: `order = "xyz"`, `s = "zyxzyx"`  
Output: `"xxyyzz"`  
*Explanation: Place 'x', then 'y', then 'z', collecting all occurrences: two 'x's, two 'y’s, two 'z’s.*

**Example 3:**  
Input: `order = "kqep"`, `s = "pekeq"`  
Output: `"kqeep"`  
*Explanation: Place all 'k's, then all 'q's, all 'e's, all 'p's, per the order.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each character in `order`, scan `s` and collect all its occurrences, then append leftover characters at the end.
  - This is inefficient: for each char in `order`, you have to traverse all of `s`, leading to O(m×n) time.

- **Optimized approach:**  
  - Use a **character counter (hash map/array)** to count how many times each character appears in `s`.
  - For each character in `order`, **append it as many times as it appears in `s`**.
  - Remove those characters from the counter.
  - After processing `order`, **append any remaining characters in `s` (not in `order`)** at the end, in any order.
  - This makes it O(n + k), where n = length of `s`, k = length of `order`.

- **Why this approach?**  
  - Single pass to count, one pass through `order`, one pass for leftovers.  
  - Preserves all required order constraints, fast, and space usage is minimal.

### Corner cases to consider  
- **Empty string**: If `s` is empty, return `""`.
- **order empty**: If `order` is `""`, return `s` as-is.
- **s contains only characters not in order**: Return all of `s` (order does not matter).
- **Characters in s not in order**: They go last, order unimportant.
- **Single character strings**: Both `order` and `s` are length 1.

### Solution

```python
def customSortString(order: str, s: str) -> str:
    # Step 1: Count occurrences of each character in s
    char_count = {}
    for ch in s:
        char_count[ch] = char_count.get(ch, 0) + 1

    result = []

    # Step 2: Append characters according to the order
    for ch in order:
        if ch in char_count:
            result.extend([ch] * char_count[ch])
            # Mark as used
            del char_count[ch]

    # Step 3: Append the leftover characters (not in order)
    for ch, count in char_count.items():
        result.extend([ch] * count)

    return ''.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + k)  
  - n = length of `s`, k = length of `order`.
  - One pass to count, up to k passes for ordered characters, and up to n for leftovers; all are linear.

- **Space Complexity:** O(1) (constant) if counting lowercase letters (since alphabet size is fixed), or O(m) for general unicode (m = number of unique chars in `s`).

### Potential follow-up questions (as if you’re the interviewer)  

- If `order` can have uppercase and lowercase, and sort is case-insensitive, how would you adapt?  
  *Hint: Normalize all characters before mapping counts. Adjust key access to be consistent.*

- Could you sort in-place if mutable strings were allowed?  
  *Hint: Map each char in `s` to an index in `order` or end-of-order, then sort in-place by those indices.*

- What if `order` can contain missing or duplicate characters?  
  *Hint: For duplicates, skip after first occurrence; for missing, treat as no ordering for those chars.*

### Summary
This problem is a **string sorting/reordering** pattern where a custom order constraint overrides default lexicographical order. The counting map (or arrays if character set is small) is a classic prep step used to optimize multi-scan problems. Similar ideas are useful in **anagrams**, **bucket sort**, and problems with custom comparators. This pattern comes up wherever results have to maintain a prescribed order, not necessarily the default dictionary order.

### Tags
Hash Table(#hash-table), String(#string), Sorting(#sorting)

### Similar Problems
- Sort the Students by Their Kth Score(sort-the-students-by-their-kth-score) (Medium)